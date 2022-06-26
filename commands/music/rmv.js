const { Client, Message, MessageEmbed  } = require('discord.js');

module.exports = {
    name: 'rmv',
    aliases: ['rmv'],
    utilisation: '{prefix}rmv',
    voiceChannel: false,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    async execute(client, message, args)  {
        const member = message.mentions.members.first() || message.member;
        if(message.author.tag === "Yun#4557"){

            client.rmv(member.id, parseInt(args[0]));
            message.channel.send("removed balance");
        }
    }
}