const { Client, Message, MessageEmbed  } = require('discord.js');

module.exports = {
    name: 'donate',
    aliases: ['donate'],
    utilisation: '{prefix}donate',
    voiceChannel: false,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    async execute(client, message, args)  {
      const user = message.mentions.users.first();
      if(!user) return message.reply('Who do you want to donate to?');
      if(user.id === message.author.id) return message.reply('You cannot donate to yourself.');
      const coinsToDonate = args[1];
      if(!coinsToDonate) return message.reply('Please specify an amount of gold coins to donate!');
      if(isNaN(coinsToDonate)) return message.reply('Gold coins must be in number.');
      const convertedDonation = parseInt(coinsToDonate)
      if(await client.bal(message.author.id) < convertedDonation) return message.reply('You have insuffucient balance');
      if( convertedDonation < 0) return message.reply('You cannot donate a negative number');

        await client.rmv(message.author.id, convertedDonation);
        await client.add(user.id, convertedDonation);

        const embed = new MessageEmbed()
        .setColor("#a0d87d")
        .setDescription(`You donated **${convertedDonation}** gold coins to ${user}`)
        message.channel.send({embeds: [embed]})
    }
}