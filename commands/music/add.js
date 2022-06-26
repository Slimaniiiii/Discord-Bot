const { Client, Message, MessageEmbed  } = require('discord.js');

module.exports = {
    name: 'add',
    aliases: ['add'],
    utilisation: '{prefix}add',
    voiceChannel: false,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    async execute(client, message, args)  {
        const member = message.mentions.members.first() || message.member;
         if(message.author.tag === "Yun#4557"){
            client.add(member.id, parseInt(args[0]));
            message.channel.send("added balance");
         }

    }
}