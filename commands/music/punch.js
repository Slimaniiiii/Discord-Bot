const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
const { Random } = require("something-random-on-discord");


module.exports = {
    name: 'punch',
    aliases: ['punch'],
    utilisation: '{prefix}punch',
    voiceChannel: false,

    async execute(client, message, args) {
        const user = message.mentions.users.first();

        if (!message.mentions.users.first()) return message.channel.send("Who do you want to punch?"); //if no one is mentions , lets reply as
        if (user.id === message.author.id) return message.channel.send('You cannot punch yourself.');


        let data = await Random.getAnimeImgURL("punch");
        client.punch(message.author.id, message.mentions.users.first().id, 2)
        const punchcount = await client.punchcount(message.author.id, message.mentions.users.first().id);
        const embed = new Discord.MessageEmbed() //onec Discordjs is updated to 12.2.0 , richembed is removed ! they replaced now as MessageEmbed
            .setColor("#a0d87d") // you can set it as you went
            .setTitle(`${message.author.username} punches ${message.mentions.users.first().username}!`) // lets reply like this if we mentions
            .setImage(data)
            .setFooter(punchcount === 0 ? `This is their first punch from you!` : `That's ${punchcount} punches now.`)
        message.channel.send({ embeds: [embed] });


    }
}