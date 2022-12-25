const { SlashCommandBuilder} = require('discord.js');

module.exports = {
	data:
    new SlashCommandBuilder()
		.setName('voterid')
		.setDescription('Gives you a permanent voterid to use in elections'),
	async execute(interaction) {
        const uid = interaction.user.id
        const target = interaction.user
        const vid = 'test'
        target.send('This is your voter id. **Never share this with anyone or else your vote may be compromised.** VID: ' + vid)
		await interaction.reply('Your voter ID has been sent in DMs.');

    
	},
};