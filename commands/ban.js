const { SlashCommandBuilder, PremissionsBitField } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a user')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user in question')
        .setRequired(true))
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Ban reason to send to the user')
        .setRequired(true)),
  async execute(interaction) {
    const target = await interaction.options.getUser('user')
    const reason = await interaction.options.getString('reason')
    if (await !interaction.member.roles.cache.some(role => role.name === 'Administrator')) {
      await interaction.reply('You do not have the permissions to execute this command. Contact your server administrator for more information.')
    } else {
      await target.send('You have been banned from the Benelux political simulation. Therefore, you cannot join the server again. This can occur for a number of reasons, but essentially, you have broken rules too many times or too seriously to still be a net positive for the server. The reason provided from the user who banned you was: ' + reason )
      await interaction.deferResponse()
      await interaction.guild.members.ban(target)
      await interaction.reply('The user has been banned.')
    }
  },
};