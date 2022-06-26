const { MessageEmbed  } = require('discord.js');
module.exports = {
    name: 'back',
    aliases: ['previous'],
    utilisation: '{prefix}back',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing){
               let noqueue = new MessageEmbed()
               .setColor("#a0d87d")
               .setDescription(`No music currently playing ${message.author}.`)
            return message.channel.send({embeds: [noqueue]});
        } 

        if (!queue.previousTracks[1]){
            let nomusic = new MessageEmbed()
            .setColor("#a0d87d")
            .setDescription(`There was no music played before ${message.author}.`)
            return message.channel.send({embeds: [nomusic]});
        } 

        await queue.back();
         const previoustrack= new MessageEmbed()
         .setColor("#a0d87d")
         .setDescription(`Playing the **previous** track `)
         
        message.channel.send({embeds: [previoustrack]});
    },
};