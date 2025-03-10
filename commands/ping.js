const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('am i dead yet???'),
	async execute(client, interaction) {
		await interaction.reply(`wow i guess i am not dead weeeeeee`);
	},
};