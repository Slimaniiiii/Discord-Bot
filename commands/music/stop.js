const { MessageEmbed  } = require('discord.js');

module.exports = {
    name: 'stop',
    aliases: ['dc'],
    utilisation: '{prefix}stop',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing){
            let nonmusic = new MessageEmbed()
            .setColor('#a0d87d')
            .setDescription(`No music currently playing ${message.author}.`)
            return message.channel.send({embeds: [nonmusic]});
        } 

        queue.destroy();
        let musicstoppedsuccess = new MessageEmbed()
        .setColor('#a0d87d')
        .setDescription(`Music stopped into this server.`)
        message.channel.send({embeds: [musicstoppedsuccess]});
    },
};