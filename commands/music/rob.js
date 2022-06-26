const { Client, Message, MessageEmbed, args } = require('discord.js');
const { Collection } = require('discord.js');

const Timeout = new Collection();
module.exports = {
    name: 'rob',
    aliases: ['rob'],
    utilisation: '{prefix}rob',
    voiceChannel: false,
    robcooldown:  1000 * 60 * 60 * 1,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    async execute(client, message, args)  {
      const user = message.mentions.users.first();
      if(!user){
        const whoembed = new MessageEmbed()
        .setColor("#a0d87d")
        .setDescription(`\n\n Please mention a user to rob. \n (Example - ,rob @[mentioneduser])`);
       return message.channel.send({embeds: [whoembed]})
      } 
      
      if(user.id === message.author.id) return message.reply('You cannot rob yourself.');
          const coinsToRob = Math.floor(Math.random() * 200) +1;
          if(await client.bal(user.id) < coinsToRob){
            let insuff = new MessageEmbed()
            .setColor("#a0d87d")
            .setDescription('That user have insuffucient balance.');
              return message.reply({embeds:[insuff]});
          } 
        // await client.rmv(user.id, coinsToRob);
        // await client.add(message.author.id, coinsToRob);

        function random(){
            const num = Math.floor(Math.random() * 2);
            return num === 1;
        }

        if(random() === true){
            const embed = new MessageEmbed()
            .setColor("#a0d87d")
            .setDescription(`:pirate_flag: You robbed **${coinsToRob}** gold coins from ${user}!`)
            message.channel.send({embeds: [embed]})
            await client.rmv(user.id, coinsToRob);
            await client.add(message.author.id, coinsToRob);
 
        }else{
         let loseembed = new MessageEmbed()
         .setColor('#a0d87d')
         .setDescription(`You failed to rob ${user}. better luck next time!`)
         message.channel.send({embeds: [loseembed]});
        }


    }
}