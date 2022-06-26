const Discord = require('discord.js');
const superagent = require('superagent');


module.exports = {
    name: 'pat',
    aliases: ['pat'],
    utilisation: '{prefix}pat',
    voiceChannel: false,
    async execute (client, message, args)  {
               const user = message.mentions.users.first();

               if (!message.mentions.users.first()) return message.channel.send("Who do you want to pat?"); //if no one is mentions , lets reply as
               if(user.id === message.author.id) return message.channel.send('You cannot pat yourself.');
               
               const { body } = await superagent
               .get("https://nekos.life/api/v2/img/pat");
               client.pat(message.author.id, message.mentions.users.first().id, 2)
               const patcount = await client.patcount(message.author.id, message.mentions.users.first().id);
               
               const embed = new Discord.MessageEmbed() //onec Discordjs is updated to 12.2.0 , richembed is removed ! they replaced now as MessageEmbed
               .setColor("#a0d87d") // you can set it as you went
               .setTitle(`${message.author.username} pats ${message.mentions.users.first().username}!`) // lets reply like this if we mentions
               .setImage(body.url) // hug gif well showing here
               .setFooter(patcount === 0 ? `This is their first pat from you!` : `That's ${patcount} pats now.`)
               message.channel.send({ embeds: [embed] });
    }
}