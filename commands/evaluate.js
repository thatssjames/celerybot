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