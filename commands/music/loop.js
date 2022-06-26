const { QueueRepeatMode } = require('discord-player');
const { MessageEmbed  } = require('discord.js');


module.exports = {
    name: 'loop',
    aliases: ['lp', 'repeat'],
    utilisation: '{prefix}loop <queue>',
    voiceChannel: true,

    execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing){
            let noqueue = new MessageEmbed()
            .setColor('#a0d87d')
            .setDescription(`No music currently playing ${message.author}.`)
            return message.channel.send({embeds: [noqueue]});
        } 

        if (args.join('').toLowerCase() === 'queue') {
            if (queue.repeatMode === 1){
                let disablecurrentloop = new MessageEmbed()
                .setColor('#a0d87d')
                .setDescription(`You must first disable the current music in the loop mode (${client.config.app.px}loop) ${message.author}.`)
                return message.channel.send({embeds: [disablecurrentloop]});
            } 

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);
            const successEnabled = new MessageEmbed()
            .setColor('#a0d87d')
            .setDescription(success ? `Repeat mode **${queue.repeatMode === 0 ? 'disabled' : 'enabled'}** the whole queue will be repeated endlessly 🔁` : `Something went wrong ${message.author}.`)
            return message.channel.send({embeds: [successEnabled]});
        } else {
            if (queue.repeatMode === 2){
                      let checkrepeatMode = new MessageEmbed()
                      .setColor('#a0d87d')
                      .setDescription(`You must first disable the current queue in the loop mode (${client.config.app.px}loop queue) ${message.author}.`)
                return message.channel.send({embeds: [checkrepeatMode]});
            } 

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);
                 const greaterSuccess = new MessageEmbed()
                 .setColor('#a0d87d')
                 .setDescription(success ? `Repeat mode **${queue.repeatMode === 0 ? 'disabled' : 'enabled'}** the current music will be repeated endlessly (you can loop the queue with the <queue> option) 🔂` : `Something went wrong ${message.author}.`)
            return message.channel.send({embeds: [greaterSuccess]});
        };
    },
};