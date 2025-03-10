const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

const PEXELS_API_URL = 'https://api.pexels.com/v1/search';
const PEXELS_API_KEY = 'nope on a rope';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bird')
		.setDescription('bird??!!'),
	async execute(client, interaction) {
        const query = "bird";
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
