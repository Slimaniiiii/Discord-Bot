const { MessageEmbed } = require('discord.js')
const ms = require('ms')

module.exports = {
    name: 'slowmode',
    aliases: ['slowmode'],
    utilisation: '{prefix}slowmode',
    voiceChannel: false,
    async execute (client, message, args)  {
        if (!message.member.permissions.has(('MANAGE_CHANNELS'))) {
            const slowmodeError = new MessageEmbed()
                .setDescription(`You do not have permissions to enable/disable slowmode.`)
                .setColor('#a0d87d')
            return message.channel.send({embeds: [slowmodeError]})
        }
        if (!args[0]) {
            const slowmodeError2 = new MessageEmbed()
                .setDescription(`You did not provide a time. \n\n Time Units - h(hour), m(minute), s(seconds) \n (Example - ,slowmode 5s)`)
                .setColor('#a0d87d')
            return message.channel.send({embeds: [slowmodeError2]})
        }
        const currentSlowmode = message.channel.rateLimitPerUser
        const reason = args[1] ? args.slice(1).join(" ") : 'Not Specified'

        if (args[0] === 'off') {
            if (currentSlowmode === 0) {
                const slowmodeOfferror = new MessageEmbed()
                    .setDescription(`Slowmode is already off`)
                    .setColor('#a0d87d')
                return message.channel.send({embeds: [slowmodeOfferror]})
            }
            message.channel.setRateLimitPerUser(0, reason)
            const slowmodeOff = new MessageEmbed()
                .setDescription(`Slowmode Disabled`)
                .setColor('#a0d87d')

            return message.channel.send({embeds: [slowmodeOff]})
        }

        const time = ms(args[0]) / 1000
        const slowmodeError3 = new MessageEmbed()
            .setDescription(`This is not a valid time. Please write the time in the units mentioned. \n\n Time Units - h(hour), m(minute), s(seconds) \n (Example - !slowmode 5s)`)
            .setColor('#a0d87d')
        if (isNaN(time)) {
            return message.channel.send({embeds: [slowmodeError3]})
        }

        if (time > 21600000) {
            const slowmodeError4 = new MessageEmbed()
                .setDescription(`Time is too high. Make sure its below 6 hours.`)
                .setColor('#a0d87d')

            return message.channel.send({embeds: [slowmodeError4]})
        }

        if (currentSlowmode === time) {
            const slowmodeError5 = new MessageEmbed()
                .setDescription(`Slowmode is already set to ${args[0]}`)
                .setColor('#a0d87d')
            return message.channel.send({embeds: [slowmodeError5]})
        }
        
        let slowmode = await message.channel.setRateLimitPerUser(time, reason)
        let afterSlowmode = message.channel.rateLimitPerUser
        if(afterSlowmode > 0) {
            const embed = new MessageEmbed()
            .setTitle(`Slowmode Enabled`)
            .addField(`Slowmode Duration`, args[0])
            .addField(`Reason`, reason)
            .setColor('#a0d87d')
            
            return message.channel.send({embeds: [embed]})
        } else if(afterSlowmode === 0) {
            return message.channel.send({embeds: [slowmodeError3]})
        }
    }
    
}