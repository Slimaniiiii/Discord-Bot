const { Client, Message, MessageEmbed  } = require('discord.js');

module.exports = {
    name: 'work',
    aliases: ['work'],
    utilisation: '{prefix}work',
    voiceChannel: false,
    cooldown: 1000 * 60 * 60 * 2,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    async execute(client, message, args)  {
         const jobs = ['programmer', 'builder', 'waiter', 'bus driver'];
         const jobIndex = Math.floor(Math.random() * jobs.length);

         const coins = Math.floor(Math.random() * 200) +1;

         const embed = new MessageEmbed()
         .setColor('#a0d87d')
         .setDescription(`You worked as a ${jobs[jobIndex]} and earned **${coins}** coins.`)
         message.channel.send({embeds: [embed]});
         client.add(message.author.id, coins);
    }
}