const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('roll a makeshift dice')
        .addIntegerOption(option =>
            option.setName('dice')
                .setDescription('the amount of numbers on dice')
                .setRequired(true)),
	async execute(client, interaction) {
        var dice = interaction.options.getInteger("dice");
        var number = Math.floor(Math.random() * dice) + 1;

        await interaction.reply({
            content: number.toString(),
            ephemral: false,
        });
	},
};