const { MessageEmbed } = require("discord.js")

const userReg = RegExp(/<@!?(\d+)>/)

module.exports = {
    name: 'ban',
    aliases: ['ban'],
    utilisation: '{prefix}ban',
    voiceChannel: false,
    async execute(client, message, args)  {
        const userID = userReg.test(args[0]) ? userReg.exec(args[0])[1] : [0]
        const mentionedUser = await message.client.users.fetch(userID).catch(() => null)

        if(!message.member.permissions.has('BAN_MEMBERS')) {
            const banerror = new MessageEmbed()
            .setDescription("You Don\'t Have Permissions To Ban Members")
            .setColor('#a0d87d')

            return message.channel.send({embeds: [banerror]})
        } else if(!message.guild.me.permissions.has('BAN_MEMBERS')) {
            const banerror2 = new MessageEmbed()
            .setDescription("I Don\'t Have Permissions To Ban Members. Make Sure You Have Given Me Appropriate Permissions")
            .setColor('#a0d87d')

            return message.channel.send({embeds: [banerror2]})
        } else if(!mentionedUser) {
            const banerror3 = new MessageEmbed()
            .setDescription("You Need To Mention a Member to Ban")
            .setColor('#a0d87d')

            return message.channel.send({embeds: [banerror3]})
        }

        const allBans = await message.guild.bans.fetch();

        if(allBans.get(mentionedUser.id)) {
            const banerr = new MessageEmbed()
            .setDescription("The User is Already Banned")
            .setColor('#a0d87d')

            return message.channel.send({embeds: [banerr]})
        }

        const mentionedMember = message.guild.members.cache.get(mentionedUser.id)
        if(mentionedMember.id === mentionedMember.guild.ownerId){
            const ownerembed = new MessageEmbed()
            .setDescription("Denied")
            .setColor('#a0d87d')

            return message.channel.send({embeds: [ownerembed]})
        } 
        if(mentionedMember) {
            const mentionedPosition = mentionedMember.roles.highest.position
            const memberPosition = message.member.roles.highest.position
            const botPosition = message.guild.me.roles.highest.position

            if(memberPosition <= mentionedPosition) {
                const banerr2 = new MessageEmbed()
            .setDescription("You Can Not Ban This Member Because their role is higher/equal to yours")
            .setColor('#a0d87d')

            return message.channel.send({embeds: [banerr2]})
            } else if (botPosition <= mentionedPosition) {
                const banerr3 = new MessageEmbed()
            .setDescription("I Can Not Ban This Member Because their role is higher/equal to mine")
            .setColor('#a0d87d')

            return message.channel.send({embeds: [banerr3]})
            }
        }

        const reason = args.slice(1).join(' ')

        message.guild.members.ban(mentionedUser.id, {reason: reason})

        const banSuccess = new MessageEmbed()
        .setTitle('Success!')
        .setDescription(`Banned ${mentionedUser} ${reason ? `for **${reason}**` : ''}`)

        message.channel.send({embeds: [banSuccess]})

        
     }
}