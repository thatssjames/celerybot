const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('gives you very nice help'),
	async execute(client, interaction) {
        const embed = new MessageEmbed()
        .setTitle("Celery Bot - Cut")
        .setColor(0x161616)
        .setDescription(`Thanks for installing Celery Bot - Cut!\nCelery Bot is known for our amazing AI feature. Want to support us while also getting even better commands? Pay for our "Uncut" version!\nNeed help? Contact us here: https://celerybot.xyz/discord. Slash commands all have descriptions in them, so you'll know what they do.`);
    	
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setURL('https://celerybot.xyz/invite')
                    .setLabel('Invite Celery Bot - Cut')
                    .setStyle('LINK')
            );
        
		await interaction.reply({ embeds: [embed], components: [row] });
	},
};