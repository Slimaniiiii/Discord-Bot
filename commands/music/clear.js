const { MessageEmbed  } = require('discord.js');
module.exports = {
    name: 'clear',
    aliases: ['cq'],
    utilisation: '{prefix}clear',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing){
            let noqueue = new MessageEmbed()
            .setColor('#a0d87d')
            .setDescription(`No music currently playing ${message.author}.`)
            return message.channel.send({embeds: [noqueue]});
        } 

        if (!queue.tracks[0]){
            let notracks = new MessageEmbed()
            .setColor('#a0d87d')
            .setDescription(`No music in the queue after the current one ${message.author}.`)
            return message.channel.send({embeds: [notracks]});
        } 

        await queue.clear();
         const clearqueue = new MessageEmbed()
         .setColor('#a0d87d')
         .setDescription(`The queue has just been cleared`)
        message.channel.send({embeds: [clearqueue]});
    },
};