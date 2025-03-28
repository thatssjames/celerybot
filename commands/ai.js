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
        .setName("ai")
        .setDescription("Talk to Celery AI.")
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message you want to send to Celery AI.')
                .setRequired(true)),
    async execute(client, interaction) {
        const message = interaction.options.getString('message');

        const requestBody = {
            messages: [
                { role: 'user', content: message }
            ],
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
                return interaction.reply('There was an error communicating with the AI.');
            }

            if (response.statusCode === 200) {
                const aiResponse = body.choices?.[0]?.message?.content;
                if (!aiResponse) return interaction.reply('AI did not return a valid response.');

                const containsFilteredWords = filterWords.some(word => new RegExp(`\\b${word}\\b`, 'i').test(aiResponse));
                if (containsFilteredWords) return interaction.reply("[FILTERED]");

                interaction.reply(aiResponse);
            } else {
                console.error('Error from Groq API:', body);
                interaction.reply('An error occurred while processing the AI response.');
            }
        });
    }
};
