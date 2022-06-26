const Discord = require('discord.js');
const moment = require("moment");

module.exports = {
    name: 'userinfo',
    aliases: ['ui'],
    utilisation: '{prefix}userinfo',
    voiceChannel: false,

    /**
     * 
     * @param {ContextMenuInteraction} interaction 
     */
    
    async execute (client, message, args, interaction)  {
        try {
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
            const embed = new Discord.MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL({dynamic:true}))
            .setThumbnail(member.user.displayAvatarURL({dynamic:true}))
            .setColor("#a0d87d")
            .setFooter(`ID: ${message.author.id}`)
            .setTimestamp()
            .addField('Joined this server: ',`<t:${parseInt(member.joinedAt / 1000)}:R>`, true)
            .addField("Created: ",`<t:${parseInt(member.user.createdAt / 1000)}:R>`, true)
            .addField(`Roles [${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]`,`${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "No Roles"}`, true)
            
        message.channel.send({embeds:[embed]});
        } catch (error) {
            message.channel.send("Error, can be cause of missing permissions.");
        }
       
    }
}