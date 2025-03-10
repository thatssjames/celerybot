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