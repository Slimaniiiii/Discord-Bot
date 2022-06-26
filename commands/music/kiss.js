const Discord = require('discord.js'); //npm i discord.js
const superagent = require('superagent'); //npm i superagent

module.exports = {
    name: 'kiss',
    aliases: ['kiss'],
    utilisation: '{prefix}kiss',
    voiceChannel: false,

    async execute(client, message, args) {
        // if (!message.channel.nsfw) return message.channel.send(" :x: Woops, **you can not use this outside a room** **`NSFW`** !")
        if (!message.mentions.users.first()) return message.channel.send("Who do you want to kiss?");
        if (message.mentions.users.first().id === message.author.id) return message.channel.send('You cannot kiss yourself.');
        const { body } = await superagent
        .get("https://nekos.life/api/kiss");
        client.count(message.author.id, message.mentions.users.first().id, 2)

        const kissedCount = await client.fullcount(message.author.id, message.mentions.users.first().id);

        const embed = new Discord.MessageEmbed()
        .setColor("#a0d87d")
        .setTitle(`${message.author.username} has kissed ${message.mentions.users.first().username}!`)
        .setImage(body.url) 
        .setFooter(kissedCount === 0 ? `This is their first kiss from you!` : `That's ${kissedCount} kisses now.`)
        message.channel.send({ embeds: [embed] });
    },
};