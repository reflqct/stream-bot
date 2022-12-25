const { SlashCommandBuilder, PremissionsBitField } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a user')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user in question')
        .setRequired(true))
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Kick reason to send to the user')
        .setRequired(true)),
  async execute(interaction) {
    const target = await interaction.options.getUser('user')
    const reason = await interaction.options.getString('reason')
    if (await !interaction.member.roles.cache.some(role => role.name === 'Administrator')) {
      await interaction.reply('You do not have the permissions to execute this command. Contact your server administrator for more information.')
    } else {
      await target.send('You have been kicked from the Benelux Political Simulation. This means you have been removed but can rejoin if invited again. The reason provided from the user who kicked you was: ' + reason )
      await interaction.deferResponse()
      await interaction.guild.members.ban(target)
      await interaction.reply('The user has been banned.')
    }
  },
};