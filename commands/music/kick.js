const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'kick',
    aliases: ['kick'],
    utilisation: '{prefix}kick',
    voiceChannel: false,
    async execute(client, message, args) {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!message.member.permissions.has('KICK_MEMBERS')) {
            const kickerror = new MessageEmbed()
            .setDescription("You Don\'t Have Permissions To Kick Members")
            .setColor('#a0d87d')

            return message.channel.send({embeds: [kickerror]})
        } else if(!message.guild.me.permissions.has('KICK_MEMBERS')) {
            const kickerror2 = new MessageEmbed()
            .setDescription("I Don\'t Have Permissions To Kick Members. Make Sure You Have Given Me Appropriate Permissions")
            .setColor('#a0d87d')

            return message.channel.send({embeds: [kickerror2]})
        } else if (!mentionedMember) {
            const kickerror3 = new MessageEmbed()
            .setDescription("You Need To Mentioned a Member That You Want to Kick")
            .setColor('#a0d87d')

            return message.channel.send({embeds: [kickerror3]})
        }
        const userReg = RegExp(/<@!?(\d+)>/)
        const userIDD = userReg.test(args[0]) ? userReg.exec(args[0])[1] : [0]
        const mentionedUser = await message.client.users.fetch(userIDD).catch(() => null)
        const mentionedMemberr = message.guild.members.cache.get(mentionedUser.id)
        if(mentionedMemberr.id === mentionedMemberr.guild.ownerId){
            const ownerembed = new MessageEmbed()
            .setDescription("Denied")
            .setColor('#a0d87d')

            return message.channel.send({embeds: [ownerembed]})
        }

        const mentionedPosition = mentionedMember.roles.highest.position
        const memberPosition = message.member.roles.highest.position
        const botPosition = message.guild.me.roles.highest.position

        if(memberPosition <= mentionedPosition) {  
            const kickerr = new MessageEmbed()
            .setDescription("You Can Not Kick This Member Because their role is higher/equal to yours")
            .setColor('#a0d87d')
            
            return message.channel.send({embeds: [kickerr]})
        } else if (botPosition <= mentionedPosition) {
            const kickerr2 = new MessageEmbed()
            .setDescription("I Can Not Kick This Member Because their role is higher/equal to mine")
            .setColor('#a0d87d')

            return message.channel.send({embeds: [kickerr2]})
        }
        

        const reason = args.slice(1).join(' ')

        try {
            await mentionedMember.kick([reason])

            const kickSuccess = new MessageEmbed()
            .setTitle('Success')
            .setDescription(`Kicked ${mentionedMember} ${reason ? `for **${reason}**` : ''}`)
            .setColor('#a0d87d')

            message.channel.send({embeds: [kickSuccess]})

        } catch (error) {
            console.log(error)
            const errorEmbed = new MessageEmbed()
            .setDescription("ERR :x: - There Was an Error Kicking This Member")
            .setColor('#a0d87d')
            
            message.channel.send({embeds: [errorEmbed]})
        }
    }
}
