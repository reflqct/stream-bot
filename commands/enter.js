const { SlashCommandBuilder, PremissionsBitField, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('enter')
    .setDescription('Enter a user into the roleplay')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user in question')
        .setRequired(true))
    .addRoleOption(option =>
      option
        .setName('party')
        .setDescription('The party the user is joining')
        .setRequired(false))
    .addStringOption(option => option
        .setName('name')
        .setDescription('The name the user would like to use')
        .setRequired(false))
    .addRoleOption(option =>
          option
            .setName('mlc')
            .setDescription('Select the MLC role if the user would be an MLC by default.')
            .setRequired(false)),
  async execute(interaction) {
    const target = await interaction.options.getMember('user')
    const party = await interaction.options.getRole('party')
    const name = await interaction.options.getString('name')
    const mlc = await interaction.options.getRole('mlc')
    if (await !interaction.member.roles.cache.some(role => role.name === 'Administrator')) {
      await interaction.reply('You do not have the permissions to execute this command. Contact your server administrator for more information.')
    } else {
      await target.roles.add(party)
      if (mlc != null) {
      await target.roles.add(mlc)
      }
      await target.setNickname(name)
      await interaction.reply('Welcome to the Benelux.')
    }
  },
};