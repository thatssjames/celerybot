/*
MIT License

Copyright (c) 2025 thatssjames

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

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
