const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "muteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    aliases: ['muteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'],
    utilisation: '{prefix}muteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    voiceChannel: false,
    async execute(client, message, args)  {


        if (!message.member.permissions.has("MANAGE_ROLES", "BAN_MEMBERS")) {
            return message.channel.send("Sorry, You Don\'t Have Permissions To Mute Anyone!");
        }
        if (!message.guild.me.permissions.has("MANAGE_ROLES", "BAN_MEMBERS")) {
            return message.channel.send("Sorry, But I don\'t Have Permissions To Mute Anyone!")

        }

        const user = message.mentions.members.first()
        const userReg = RegExp(/<@!?(\d+)>/)
        const userIDDDDDDD = userReg.test(args[0]) ? userReg.exec(args[0])[1] : [0]
        const mentionedUserrrrr = await message.client.users.fetch(userIDDDDDDD).catch(() => null)
        const mentionedMemberrrrrrr = message.guild.members.cache.get(mentionedUserrrrr.id)
 
        if(mentionedMemberrrrrrr.id === mentionedMemberrrrrrr.guild.ownerId){
            const ownerembed = new MessageEmbed()
            .setDescription("Cannot mute the owner.")
            .setColor('#a0d87d')

            return message.channel.send({embeds: [ownerembed]})
        } 
        if(mentionedMemberrrrrrr) {
            const mentionedPosition = mentionedMemberrrrrrr.roles.highest.position
            const memberPosition = message.member.roles.highest.position
            const botPosition = message.guild.me.roles.highest.position
           if (botPosition <= mentionedPosition) {  
                const banerr3 = new MessageEmbed()
            .setDescription("Cannot mute the bot.")
            .setColor('#a0d87d')

            return message.channel.send({embeds: [banerr3]})
            }
        }



        if (!user) {
            return message.channel.send("Please Mention The User I Need To Mute");
        }

        if (user.id === message.author.id) {
            return message.channel.send("Haha I See What You\'re Trying To Do Here xD");
        }


        let reason = args.slice(1).join(" ")

        if (!reason) {
            return message.channel.send("Please Give A Reason To Mute The Person!")
        }


        let muterole = message.guild.roles.cache.find(x => x.name === "Muted")

        if (!muterole) {
            return message.channel.send("This Server Doesn\'t Have A Role Name `Muted`, Please make a role named Muted")
        }

        if (user.roles.cache.has(muterole)) {
            return message.channel.send("Given User Is Already Muted")
        }

        const embed = new MessageEmbed()
        .setAuthor(`You Muted ${message.mentions.users.first().username} | Reason - ${reason}`)
        .setColor("#a0d87d")
        



        try {
            user.roles.add(muterole)
        await message.channel.send({embeds: [embed]})
        user.send(`You Are Muted in ${message.guild.name}`)
        } catch (error){
            console.log(error)
            message.channel.send("Make Sure Your Server has a role named `Muted` And the Appropriate Permissions are set!")
        }

    }

}