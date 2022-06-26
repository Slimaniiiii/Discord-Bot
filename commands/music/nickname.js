
//start by defining discord.js
const Discord = require('discord.js');

module.exports = {
    name: 'nicknamenicknamenicknamenicknamenicknamenickname',
    aliases: ['nicknamenicknamenicknamenicknamenickname'],
    utilisation: '{prefix}nicknamenicknamenicknamenicknamenickname',
    voiceChannel: false,


execute(client, message, args)  {

    
    if (!message.member.permissions.has('MANAGE_NICKNAMES')) return message.reply(`You cannot use this command as you do not have the \`MANAGE_NICKNAMES\` permission`);
    if (!message.guild.me.permissions.has('MANAGE_NICKNAMES')) return message.reply('I cant use this command');

    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const nickName = args.slice(1).join(" ");
    var redBlob = message.guild.emojis.cache.find(emoji => emoji.name === 'redblob')


    if (!args[0]) return message.reply('You did not mention a user for me to change there nickname!');
    if (!mentionedMember) return message.reply('Please mention a user for me to change there nickname \`>nickname @user nickname\`');
    if (!nickName) return message.reply('Please mention a nickname for me to change this users nickname');
    if (!mentionedMember.kickable) return message.reply('This User Has a senior rank then me i cant change his nickname')

     mentionedMember.setNickname(nickName).catch(err => console.log(err)) &&  message.reply(`Successfuly Changed ${mentionedMember} Nickname to ${nickName}`);

},

};