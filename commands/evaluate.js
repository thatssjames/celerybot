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
const { evaluate } = require('mathjs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('evaluate')
		.setDescription('solve a math expression')
		.addStringOption(option =>
			option.setName('expression')
				.setDescription("expression for celery bot to solve")
				.setRequired(true)),
	async execute(client, interaction) {
		const expression = interaction.options.getString('expression');

		try {
			const result = evaluate(expression);
            await interaction.reply(result.toString());
		} catch (error) {
			await interaction.reply(`An error occurred while evaluating the expression: ${expression}. Please check the syntax.`);
		}
	},
};
