const { SlashCommandBuilder, PremissionsBitField, EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('transcript')
    .setDescription('Transcribe a ticket and get the bot to send a transcript in the channel')
    .addChannelOption(option =>
      option
        .setName('ticket')
        .setDescription('The ticket that needs to be transcribed')
        .setRequired(true))
    .addUserOption(option =>
      option
        .setName('open')
        .setDescription('The user who opened the ticket')
        .setRequired(true))
    .addUserOption(option => option
        .setName('close')
        .setDescription('The user who closed the ticket')
        .setRequired(true))
    .addStringOption(option =>
          option
            .setName('description')
            .setDescription('Description of ticket in question')
            .setRequired(true)),
  async execute(interaction) {
    const ticket = await interaction.options.getChannel('ticket')
    const open = await interaction.options.getUser('open')
    const close = await interaction.options.getUser('close')
    const desc = await interaction.options.getString('description')

    if (await !interaction.member.roles.cache.some(role => role.name === 'Administrator')) {
      await interaction.reply('You do not have the permissions to execute this command. Contact your server administrator for more information.')
    } else {
      await interaction.deferReply()
      const chan = await interaction.guild.channels.cache.find(channel => channel.name === 'transcripts' && channel.type === ChannelType.GuildAnnouncement)
      await chan.send(ticket.toString() + '\n Opened by: ' + open.toString() + '\n Closed by: ' + close.toString() + '\n **Description of Ticket:** ' + desc);
      await interaction.followUp('transcribed')
    }
  },
};