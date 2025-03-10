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
const math = require('mathjs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('calc')
        .setDescription('very cool calculator!!1!1'),
    async execute(client, interaction) {
        if (!interaction.channel) {
            const errorEmbed = new MessageEmbed()
                .setTitle("Error")
                .setColor("RED")
                .setDescription("Celery Bot - Cut **must be added to a guild** to use this command!")
                .setFooter("Celery Bot - Cut")
            	.setTimestamp();

            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        let expression = '';

        const createButtonRows = () => {
            return [
                new MessageActionRow().addComponents(
                    new MessageButton().setCustomId('1').setLabel('1').setStyle('SECONDARY'),
                    new MessageButton().setCustomId('2').setLabel('2').setStyle('SECONDARY'),
                    new MessageButton().setCustomId('3').setLabel('3').setStyle('SECONDARY'),
                    new MessageButton().setCustomId('+').setLabel('+').setStyle('PRIMARY'),
                    new MessageButton().setCustomId('clear').setLabel('C').setStyle('DANGER')
                ),
                new MessageActionRow().addComponents(
                    new MessageButton().setCustomId('4').setLabel('4').setStyle('SECONDARY'),
                    new MessageButton().setCustomId('5').setLabel('5').setStyle('SECONDARY'),
                    new MessageButton().setCustomId('6').setLabel('6').setStyle('SECONDARY'),
                    new MessageButton().setCustomId('-').setLabel('-').setStyle('PRIMARY'),
                    new MessageButton().setCustomId('delete').setLabel('⌫').setStyle('DANGER')
                ),
                new MessageActionRow().addComponents(
                    new MessageButton().setCustomId('7').setLabel('7').setStyle('SECONDARY'),
                    new MessageButton().setCustomId('8').setLabel('8').setStyle('SECONDARY'),
                    new MessageButton().setCustomId('9').setLabel('9').setStyle('SECONDARY'),
                    new MessageButton().setCustomId('x').setLabel('×').setStyle('PRIMARY'),
                    new MessageButton().setCustomId('=').setLabel('=').setStyle('SUCCESS')
                ),
                new MessageActionRow().addComponents(
                    new MessageButton().setCustomId('0').setLabel('0').setStyle('SECONDARY'),
                    new MessageButton().setCustomId('.').setLabel('.').setStyle('SECONDARY'),
                    new MessageButton().setCustomId('/').setLabel('÷').setStyle('PRIMARY'),
                    new MessageButton().setCustomId('sqrt').setLabel('√').setStyle('PRIMARY'),
                    new MessageButton().setCustomId('pi').setLabel('π').setStyle('PRIMARY')
                ),
                new MessageActionRow().addComponents(
                    new MessageButton().setCustomId('sin').setLabel('sin').setStyle('PRIMARY'),
                    new MessageButton().setCustomId('cos').setLabel('cos').setStyle('PRIMARY'),
                    new MessageButton().setCustomId('tan').setLabel('tan').setStyle('PRIMARY'),
                    new MessageButton().setCustomId('(').setLabel('(').setStyle('SECONDARY'),
                    new MessageButton().setCustomId(')').setLabel(')').setStyle('SECONDARY')
                )
            ];
        };

        const embed = new MessageEmbed()
            .setTitle("Calculator")
            .setColor(0x3498db)
            .setDescription('`0`')
            .setFooter('Use the buttons below to calculate!')
            .setTimestamp();

        const message = await interaction.reply({ embeds: [embed], components: createButtonRows(), fetchReply: true });

        const filter = i => i.user.id === interaction.user.id;
        
        try {
            const collector = message.createMessageComponentCollector({ filter, time: 60000 });

            collector.on('collect', async i => {
                if (i.customId === 'clear') {
                    expression = '';
                } else if (i.customId === 'delete') {
                    expression = expression.slice(0, -1);
                } else if (i.customId === '=') {
                    try {
                        expression = math.evaluate(expression.replace(/x/g, '*').replace(/÷/g, '/')).toString();
                    } catch (error) {
                        expression = 'Error';
                    }
                } else if (i.customId === 'sqrt') {
                    try {
                        expression = math.sqrt(math.evaluate(expression)).toString();
                    } catch (error) {
                        expression = 'Error';
                    }
                } else if (i.customId === 'sin' || i.customId === 'cos' || i.customId === 'tan') {
                    expression += `${i.customId}(`;
                } else if (i.customId === 'pi') {
                    expression += Math.PI.toString();
                } else {
                    expression += i.customId;
                }

                const updatedEmbed = new MessageEmbed()
                    .setTitle("Calculator")
                    .setColor(0x3498db)
                    .setDescription(`\`${expression || '0'}\``)
                    .setFooter('Use the buttons below to calculate!')
                    .setTimestamp();

                await i.update({ embeds: [updatedEmbed], components: createButtonRows() });
            });

            collector.on('end', collected => {

            });

        } catch (error) {
            console.error(error);
            const errorEmbed = new MessageEmbed()
                .setTitle("Error")
                .setColor(0xff0000)
                .setDescription("There was an error running the calculator. Please try again.")
                .setFooter("Something went wrong with the calculator command");

            interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
        }
    },
};
