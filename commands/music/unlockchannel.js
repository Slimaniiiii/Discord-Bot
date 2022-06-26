const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'unlockchannel',
    aliases: ['unlockchannel'],
    utilisation: '{prefix}unlockchannel',
    voiceChannel: false,
    async execute(client, message, args)  {
        
        if(!message.member.permissions.has('MANAGE_CHANNELS')) {
            const unlockchannelError = new MessageEmbed()
            .setDescription('You don\'t have permission to unlock channels!')
            .setColor("#a0d87d")

            return message.channel.send({embeds: [unlockchannelError]})
        }
        if(!message.guild.me.permissions.has('MANAGE_CHANNELS')) {
            const errorembedf = new MessageEmbed()
            .setDescription("I do not have permission to unlock channels.")
            .setColor('#a0d87d')
            return message.channel.send({embeds: [errorembedf]})
        } 

        let channel = message.mentions.channels.first() || message.channel;

        if(channel.permissionsFor(message.guild.id).has('SEND_MESSAGES') === true) {
            const unlockchannelError2 = new MessageEmbed()
            .setDescription(`${channel} is not locked!`)
            .setColor("#a0d87d")

            return message.channel.send({embeds: [unlockchannelError2]})
        }

        channel.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: true })

        const embed = new MessageEmbed()
        .setTitle(`Channel Unlocked!`)
        .setDescription(`${channel} is now unlocked. Everyone can speak now.`)
        .setColor("#a0d87d")

        message.channel.send({embeds: [embed]})
    }
}