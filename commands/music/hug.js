const Discord = require('discord.js'); //npm i discord.js
const superagent = require('superagent'); //npm i superagent

module.exports = {
    name: 'hug',
    aliases: ['hug'],
    utilisation: '{prefix}hug',
    voiceChannel: false,

    async execute(client, message, args) {
        const user = message.mentions.users.first();

        if (!message.mentions.users.first()) return message.channel.send("Who do you want to hug?"); //if no one is mentions , lets reply as
        if(user.id === message.author.id) return message.channel.send('You cannot hug yourself.');
        
        const { body } = await superagent
        .get("https://nekos.life/api/hug"); //lets see wut we went
        client.hug(message.author.id, message.mentions.users.first().id, 2)
        const huggedcount = await client.hugcount(message.author.id, message.mentions.users.first().id);

        const embed = new Discord.MessageEmbed() //onec Discordjs is updated to 12.2.0 , richembed is removed ! they replaced now as MessageEmbed
        .setColor("#a0d87d") // you can set it as you went
        .setTitle(`${message.author.username} hugged ${message.mentions.users.first().username}!`) // lets reply like this if we mentions
        .setImage(body.url) // hug gif well showing here
        .setFooter(huggedcount === 0 ? `This is their first hug from you!` : `That's ${huggedcount} hugs now.`)
        message.channel.send({ embeds: [embed] });

    },
};