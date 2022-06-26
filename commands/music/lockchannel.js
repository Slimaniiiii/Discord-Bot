const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'lockchannel',
    aliases: ['lockchannel'],
    utilisation: '{prefix}lockchannel',
    voiceChannel: false,
    async execute(client, message, args)  {

        if(!message.member.permissions.has('MANAGE_CHANNELS')) {
            const lockchannelError = new MessageEmbed()
            .setDescription('You don\'t have permission to lock channels!')
            .setColor("#a0d87d")

            return message.channel.send({embeds: [lockchannelError]})
        }

        if(!message.guild.me.permissions.has('MANAGE_CHANNELS')) {
            const errorembedf = new MessageEmbed()
            .setDescription("I do not have permission to lock channels.")
            .setColor('#a0d87d')
            return message.channel.send({embeds: [errorembedf]})
        } 

        let channel = message.mentions.channels.first();
        let reason = args.join(" ") || 'Not Specified'

        if(channel) {
            reason = args.join(" ").slice(22) || 'Not Specified'
        } else (
            channel = message.channel
        )
        if(channel.permissionsFor(message.guild.id).has('SEND_MESSAGES') === false) {
            const lockchannelError2 = new MessageEmbed()
            .setDescription(`${channel} is already locked!`)
            .setColor("#a0d87d")

            return message.channel.send({embeds: [lockchannelError2]})
        }

        channel.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: false })

        const embed = new MessageEmbed()
        .setTitle(`Channel Locked!`)
        .setDescription(`**Channel:** ${channel} \n **Reason:** ${reason}`)
        .setColor("#a0d87d")

        message.channel.send({embeds: [embed]})

    }
}