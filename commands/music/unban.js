const { MessageEmbed, Message } = require("discord.js")

const userReg = RegExp(/<@!?(\d+)>/)

module.exports = {
    name: 'unban',
    aliases: ['unban'],
    utilisation: '{prefix}unban',
    voiceChannel: false,
    async execute (client, message, args)  {
        const userID = userReg.test(args[0]) ? userReg.exec(args[0])[1] : [0]
        const mentionedUser = await message.client.users.fetch(userID).catch(() => null)

        if(!message.member.permissions.has('BAN_MEMBERS')) {
            const unbanerror = new MessageEmbed()
            .setDescription("You Don\'t Have Permissions To Unban Members")
            .setColor('#a0d87d')

            return message.channel.send({embeds: [unbanerror]})
        } else if(!message.guild.me.permissions.has('BAN_MEMBERS')) {
            const unbanerror2 = new MessageEmbed()
            .setDescription("I Don\'t Have Permissions To Unban Members. Make Sure You Have Given Me Appropriate Permissions")
            .setColor('#a0d87d')

            return message.channel.send({embeds: [unbanerror2]})
        } else if(!mentionedUser) {
            const unbanerror3 = new MessageEmbed()
            .setDescription("You Need To Mention a Banned Member to Unban")
            .setColor('#a0d87d')

            return message.channel.send({embeds: [unbanerror3]})
        }
        const mentionedMember = message.guild.members.cache.get(mentionedUser.id)
        if(mentionedMember.id === mentionedMember.guild.ownerId){
            const ownerembed = new MessageEmbed()
            .setDescription("Denied")
            .setColor('#a0d87d')

            return message.channel.send({embeds: [ownerembed]})
        } 

        const allBans = await message.guild.bans.fetch()
        const bannedUser = allBans.get(mentionedUser.id)

        if(!bannedUser) {
            const unbanerr = new MessageEmbed()
            .setDescription("This Member is Not Banned")
            .setColor('#a0d87d')    
            
            return message.channel.send({embeds: [unbanerr]})
        }

        const reason = args.slice(1).join(' ')

        message.guild.members.unban(mentionedUser.id, [reason]).catch(err => console.log(err))

        const unbanSuccess = new MessageEmbed()
        .setTitle('Success!')
        .setDescription(`Unbanned ${mentionedUser} ${reason ? `for **${reason}**` : ''}`)
        .setColor('#a0d87d')


        message.channel.send({embeds: [unbanSuccess]})


    }
}