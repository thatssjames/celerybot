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
const fetch = require('node-fetch');

const PEXELS_API_URL = 'https://api.pexels.com/v1/search';
const PEXELS_API_KEY = 'nope on a rope';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('furry')
		.setDescription('furry?'),
	async execute(client, interaction) {
        const query = "cat";
		const response = await fetch(`${PEXELS_API_URL}?query=${query}&per_page=15`, {
			headers: {
				Authorization: PEXELS_API_KEY,
			},
		});

		if (!response.ok) {
			return interaction.reply('An error occured while fetching images with Celery AI. Are you sure query is a valid response?');
		}

		const data = await response.json();
		const images = data.photos;

		if (images.length === 0) {
			return interaction.reply('An error occured while fetching images with Celery AI. Are you sure query is a valid response?');
		}
        
		const randomIndex = Math.floor(Math.random() * images.length);
		const randomImage = images[randomIndex].src.medium;

		interaction.reply(randomImage);
	},
};
