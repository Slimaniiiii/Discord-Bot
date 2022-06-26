const { MessageEmbed  } = require('discord.js');
module.exports = {
    name: 'pause',
    aliases: [],
    utilisation: '{prefix}pause',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue){
            let nomusic = new MessageEmbed()
            .setColor('#a0d87d')
            .setDescription(`No music currently playing ${message.author}.`)
            return message.channel.send({embeds: [nomusic]});
        } 

        const success = queue.setPaused(true);
        let pausedsuccess = new MessageEmbed()
        .setColor('#a0d87d')
        .setDescription(success ? `Current music ${queue.current.title} paused ` : `Something went wrong ${message.author}.`)
        return message.channel.send({embeds: [pausedsuccess]});
    },
};