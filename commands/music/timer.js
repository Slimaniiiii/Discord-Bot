const { MessageEmbed } = require('discord.js');
const ms = require('ms');
module.exports = {
    name: 'timer',
    aliases: ['timer'],
    utilisation: '{prefix}timer',
    voiceChannel: false,
async execute (client, message, args, con)  {

    if(!args[0]) return message.channel.send({ content: "Please define a time.\nEx: \`10m\` is 10 minutes." }).catch(e => {});
    if(!args[1]) return message.channel.send({ content: "Please define a thing for the timer to remind you about.\nEx: \`Become MLG Gamer\`" }).catch(e => {});

    let embed1 = new MessageEmbed()
    .setColor("#a0d87d")
    .setTitle(`Timer Set!`)
    .setAuthor(`${message.author.tag}'s Timer`, message.author.displayAvatarURL())
    .setDescription(`I will remind you in \`${args[0]}\` to \`${args.slice(1).join(" ")}\``)
    .setTimestamp()
    // .setFooter(":timer:")

    let embed2 = new MessageEmbed()
    .setColor("#a0d87d")
    .setTitle(`Timer Up!`)
    .setAuthor(`${message.author.tag}'s Timer`, message.author.displayAvatarURL())
    .setDescription(`**Time: **\`${args[0]}\`\n**Note: **\`${args.slice(1).join(" ")}\``)
    .setTimestamp()
    // .setFooter(":timer:")

    message.channel.send({ embeds: [embed1] }).catch(e => {})

    setTimeout(async () => {
        message.channel.send({ content: `<@${message.author.id}>`, embeds: [embed2] }).catch(e => {})
    }, ms(args[0]));

}

}