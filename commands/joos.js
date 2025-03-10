const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('joos')
		.setDescription('joos joos joos'),
	async execute(client, interaction) {
		await interaction.reply(`:joos:`);
	},
};