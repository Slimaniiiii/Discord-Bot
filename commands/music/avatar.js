
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "avatar",
    aliases: ['pfp'],
    utilisation: '{prefix}avatar',
    voiceChannel: false,


    async execute(client, message, args){
        // .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic:true}))

        const target = message.mentions.users.first();
        if(!target) return message.reply("Please specify the user");
        const response = new MessageEmbed()
        .setColor('#a0d87d')
        .setAuthor(`${target.tag}\'s Avatar`)
        .setImage(target.displayAvatarURL({dynamic: true, size: 256}))

        message.channel.send({embeds: [response]});
          
    }
}