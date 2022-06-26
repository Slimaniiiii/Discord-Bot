const Discord = require('discord.js'); //npm i discord.js
const superagent = require('superagent'); //npm i superagent

module.exports = {
    name: 'slap',
    aliases: ['slap'],
    utilisation: '{prefix}slap',
    voiceChannel: false,

    async execute(client, message, args) {
      const user = message.mentions.users.first();
        if (!message.mentions.users.first()) return message.channel.send("Who do you want to slap?"); //if no one is mentions , lets reply as
        if (user.id === message.author.id) return message.channel.send('You cannot slap yourself.');
        const { body } = await superagent
        .get("https://nekos.life/api/v2/img/slap"); //wut we need 
        client.slap(message.author.id, message.mentions.users.first().id, 2)
        const slappedcount = await client.slapcount(message.author.id, message.mentions.users.first().id);

        const embed = new Discord.MessageEmbed() //onec Discordjs is updated to 12.2.0 , richembed is removed ! they replaced now as MessageEmbed
            .setColor("#a0d87d") // you can set it as you went
            .setTitle(`${message.author.username} slapped ${message.mentions.users.first().username}!`) // lets reply like this if we mentions
            .setImage(body.url) //lets show slap image (GIF}
            .setFooter(slappedcount === 0 ? `This is their first slap from you!` : `That's ${slappedcount} slaps now.`)
            message.channel.send({ embeds: [embed] });
    
    },
};