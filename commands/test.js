const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('a test slash command'),
	async execute(client, interaction) {
        const embed = new MessageEmbed()
        .setTitle("Test Successful")
        .setColor(0x161616)
        .setDescription("Test successful! Embeds & slash commands work.");
    	
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setURL('https://celerybot.xyz/invite')
                    .setLabel('Invite Celery Bot')
                    .setStyle('LINK')
            );
        
		await interaction.reply({ embeds: [embed], components: [row] });
	},
};