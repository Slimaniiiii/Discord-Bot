const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'restart',
    aliases: [],
    utilisation: '{prefix}restart',
    voiceChannel: false,



      async execute(client, message, args){
        if(message.author.tag === "Yun#4557"){
            let restartmsg =  "restarting...";
            let restartembed = new MessageEmbed()
            .setColor("#a0d87d")
            .setDescription(restartmsg)
            await message.channel.send({ embeds: [restartembed] });
            process.exit(0);
        }
    }
    };