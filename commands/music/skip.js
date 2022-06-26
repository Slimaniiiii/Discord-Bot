const { MessageEmbed  } = require('discord.js');

module.exports = {
    name: 'skip',
    aliases: ['sk'],
    utilisation: '{prefix}skip',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing){
            let nonmusic = new MessageEmbed()
            .setColor('#a0d87d')
            .setDescription(`No music currently playing ${message.author}.`)
            return message.channel.send({embeds: [nonmusic]});
        } 

        const success = queue.skip();
        let skippedsuccess = new MessageEmbed()
        .setColor('#a0d87d')
        .setDescription(success ? `Current music ${queue.current.title} skipped ` : `Something went wrong ${message.author}.`)
        return message.channel.send({embeds: [skippedsuccess]});
    },
};