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

const { SlashCommandBuilder, PermissionFlagsBits } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const request = require('request');
const fs = require('fs');
const path = require('path');

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_API_KEY = 'nope on a rope';
const filterWords = ["nigga", "nigger", "@everyone", "@here", "@", "discord.gg", "discord.com/invite", "n i g g e r"];
const serversFile = path.join(__dirname, 'servers.json');

if (!fs.existsSync(serversFile)) fs.writeFileSync(serversFile, JSON.stringify({}, null, 4));

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setaichannel")
        .setDescription("Set a channel for AI interactions.")
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to set as AI interaction channel')
                .setRequired(false)),
    async execute(client, interaction) {
    	if (!interaction.guild) {
            const noPermsEmbed = new MessageEmbed()
                .setTitle('Error')
                .setDescription('You must run this command in your guild.')
                .setColor('RED');
            return interaction.reply({ embeds: [noPermsEmbed], ephemeral: true });
        }
        
        const deprecationEmbed = new MessageEmbed()
                .setTitle('Error')
                .setDescription('This command is no longer in use. We apologise for any inconvenience caused.')
                .setColor('RED');
        return interaction.reply({ embeds: [deprecationEmbed], ephemeral: true });

        /*const channel = interaction.options.getChannel('channel') || interaction.channel;
        const guildId = interaction.guild.id;

        let serverData;
        try {
            serverData = JSON.parse(fs.readFileSync(serversFile, 'utf8'));
        } catch (error) {
            console.error('Error reading servers.json:', error);
            const errorEmbed = new MessageEmbed()
                .setTitle('Error')
                .setDescription('An error occurred while reading server data.')
                .setColor('RED');
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        serverData[guildId] = { channelId: channel.id };

        try {
            fs.writeFileSync(serversFile, JSON.stringify(serverData, null, 4));
        } catch (error) {
            console.error('Error writing to servers.json:', error);
            const errorEmbed = new MessageEmbed()
                .setTitle('Error')
                .setDescription('An error occurred while saving server data.')
                .setColor('RED');
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        await interaction.reply(`AI interaction channel set to ${channel.toString()}.`);

        const listener = async (message) => {
            if (message.guild.id !== guildId || message.channel.id !== channel.id || message.author.bot || message.content.startsWith('/')) return;

            const requestBody = {
                messages: [{ role: 'user', content: message.content }],
                model: "llama3-8b-8192"
            };

            const options = {
                url: GROQ_API_URL,
                method: 'POST',
                json: requestBody,
                headers: {
                    'Authorization': `Bearer ${GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            };

            request(options, (error, response, body) => {
                if (error) {
                    console.error('Error calling Groq API:', error);
                    return message.reply("An error occurred while processing your request.");
                }

                if (response.statusCode === 200) {
                    const aiResponse = body.choices?.[0]?.message?.content;
                    if (!aiResponse) return message.reply("AI response was empty.");

                    const containsFilteredWords = filterWords.some(word => new RegExp(word, 'gi').test(aiResponse));
                    if (containsFilteredWords) return message.reply("[FILTERED]");

                    message.reply(aiResponse);
                } else {
                    console.error('Error from Groq API:', body);
                    message.reply("An error occurred while fetching AI response.");
                }
            });
        };
        
        if (!client.messageListeners) client.messageListeners = {};
        if (!client.messageListeners[guildId]) {
            client.messageListeners[guildId] = listener;
            client.on('messageCreate', listener);
        }*/
    }
};
