const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sayreply')
		.setDescription('secret :3 x2')
		.addStringOption(option =>
			option.setName('message')
				.setDescription("message here!!11!1")
				.setRequired(true)),
	async execute(client, interaction) {
		if (interaction.user.id !== "792884837353652264" && interaction.user.id !== "567185519063203846") {
			return interaction.reply({
				content: "nuh uh, you cannot use this command :3",
				ephemeral: true,
			});
		}

		const message = interaction.options.getString('message');
		interaction.reply(message)
	},
};