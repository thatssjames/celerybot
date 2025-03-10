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
		.setName('source')
		.setDescription('the source code to this project'),
	async execute(client, interaction) {
        const embed = new MessageEmbed()
        .setTitle("Thanks for using Celery Bot!")
        .setColor(0x161616)
        .setDescription("Want a copy of this bot for yourself? Get it now by clicking the link below!\n**DO NOT** remove this command as this command is part of the MIT license, which you can view [here](https://github.com/thatssjames/celerybot) by clicking the 'LICENSE' file.");
    	
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setURL('https://github.com/thatssjames/celerybot')
                    .setLabel('View Source Code')
                    .setStyle('LINK')
            );
        
		await interaction.reply({ embeds: [embed], components: [row] });
	},
};
