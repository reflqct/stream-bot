const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('onl')
		.setDescription('Dev: Checks if the bot is online and functional'),
	async execute(interaction) {
		await interaction.reply('<@' + interaction.user.toString() + '>' + ' Online!');
	},
};