const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('secret :3')
		.addStringOption(option =>
			option.setName('message')
				.setDescription("message here!!11!1")
				.setRequired(true))
		.addStringOption(option =>
			option.setName('channelid')
				.setDescription("put channel id here :-)")),
	async execute(client, interaction) {
		if (interaction.user.id !== "792884837353652264" && interaction.user.id !== "567185519063203846") {
			return interaction.reply({
				content: "nuh uh, you cannot use this command :3",
				ephemeral: true,
			});
		}

		const message = interaction.options.getString('message');
		const channelId = interaction.options.getString('channelid');
		let targetChannel = null;

		if (channelId) {
			try {
				targetChannel = await client.channels.fetch(channelId);
			} catch (error) {
				console.error(`Error fetching channel with ID ${channelId}:`, error);
				return interaction.reply({
					content: `Error: \`\`\`Could not find or access the channel with ID: ${channelId}\`\`\``,
					ephemeral: true,
				});
			}
		}

		if (!targetChannel) {
			targetChannel = interaction.channel;
		}

		if (!targetChannel) {
			return interaction.reply({
				content: "Error: Could not determine a valid channel to send the message.",
				ephemeral: true,
			});
		}

		try {
			await targetChannel.send(message);
			await interaction.reply({
				content: "Message sent successfully.",
				ephemeral: true,
			});
		} catch (error) {
			console.error(`Error sending message to channel ${targetChannel?.id || "unknown"}:`, error);
			await interaction.reply({
				content: `Error: \`\`\`${error.message}\`\`\``,
				ephemeral: true,
			});
		}
	},
};