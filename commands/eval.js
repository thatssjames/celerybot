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
		.setName('eval')
		.setDescription(':shushing_face: only james can use this :-)')
    	.addStringOption(option =>
			option.setName('code')
				.setDescription("javascript code here")
				.setRequired(true)),
    async execute(client, interaction) {
        if (interaction.user.id !== "792884837353652264" && interaction.user.id !== "567185519063203846") {
            return interaction.reply({
                content: "nuh uh, you cannot use this command :3",
                ephemeral: true,
            });
        }

        await interaction.deferReply();

        const code = interaction.options.getString("code");
        let result;

        try {
            result = await eval(code);

            if (typeof result === "object") {
                result = "```json\n" + JSON.stringify(result, null, 2) + "```";
            } else if (result === undefined) {
                result = "```Your code was executed successfully, but it returned undefined or null.```";
            } else {
                result = result.toString();
            }

            await interaction.editReply({
                content: result,
                ephemeral: false,
            });
        } catch (error) {
            await interaction.editReply({
                content: `Error: ${error.message}`,
                ephemeral: false,
            });
        }
    }
};
