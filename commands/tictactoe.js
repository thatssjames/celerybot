const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tictactoe')
		.setDescription('Play tic-tac-toe against an AI opponent!'),
	async execute(client, interaction) {
        let game = {
            board: ["~", "~", "~", "~", "~", "~", "~", "~", "~"],
            player: "X",
            winner: null
        };

        const createButtonRows = () => [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8]
        ].map(row =>
            new MessageActionRow().addComponents(
                row.map(i =>
                    new MessageButton()
                        .setLabel(game.board[i])
                        .setCustomId(i.toString())
                        .setStyle(
                            game.board[i] === "X"
                                ? 'SUCCESS'
                                : game.board[i] === "O"
                                ? 'DANGER'
                                : 'SECONDARY'
                        )
                        .setDisabled(game.board[i] !== "~")
                )
            )
        );

        await interaction.reply({ content: "ticcy taccy toe", components: createButtonRows() });

        const filter = i => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            await i.deferUpdate();
            const index = parseInt(i.customId);

            if (game.board[index] !== "~") {
                return;
            }

            game.board[index] = game.player;

            if (checkWinner(game.board, game.player)) {
                game.winner = game.player;
                await interaction.editReply({
                    content: `You win!`,
                    components: createButtonRows(),
                });
                collector.stop();
                return;
            }

            game.player = "O";
            const aiChoice = getAIMove(game.board);

            if (aiChoice !== -1) {
                game.board[aiChoice] = game.player;
            }

            if (checkWinner(game.board, game.player)) {
                game.winner = game.player;
                await interaction.editReply({
                    content: `AI wins!`,
                    components: createButtonRows(),
                });
                collector.stop();
                return;
            }
            
            if (game.board.every(cell => cell !== "~")) {
                await interaction.editReply({
                    content: "It's a tie!",
                    components: createButtonRows(),
                });
                collector.stop();
                return;
            }
            
            game.player = "X";
            await interaction.editReply({
                content: "Your move!",
                components: createButtonRows(),
            });
        });

        function getAIMove(board) {
            const emptyCells = board.map((val, index) => val === "~" ? index : null).filter(val => val !== null);
            return emptyCells.length > 0 ? emptyCells[Math.floor(Math.random() * emptyCells.length)] : -1;
        }

        function checkWinner(board, player) {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            return winPatterns.some(pattern => pattern.every(index => board[index] === player));
        }
    },
};