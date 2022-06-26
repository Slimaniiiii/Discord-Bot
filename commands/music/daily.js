const { Client, Message, MessageEmbed  } = require('discord.js');

module.exports = {
    name: 'daily',
    aliases: ['daily'],
    utilisation: '{prefix}daily',
    voiceChannel: false,
    cooldown: 1000 * 60 * 60 * 24,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    async execute(client, message, args)  {
    

         const coins = Math.floor(Math.random() * 2000) +1;

         const embed = new MessageEmbed()
         .setColor('#a0d87d')
         .setDescription(`You received **${coins}** gold coins today. please wait 24 hours for the next daily!`)
         message.channel.send({embeds: [embed]});
         client.add(message.author.id, coins);
    }
}