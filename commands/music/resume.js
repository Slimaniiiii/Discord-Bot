const { MessageEmbed  } = require('discord.js');
module.exports = {
    name: 'resume',
    aliases: ['rs'],
    utilisation: '{prefix}resume',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue){
            let nomusic = new MessageEmbed()
            .setColor('#a0d87d')
            .setDescription(`No music currently playing ${message.author}.`)
            return message.channel.send({embeds: [nomusic]});
        } 

        const success = queue.setPaused(false);
        let resumedsuccess = new MessageEmbed()
        .setColor('#a0d87d')
        .setDescription(success ? `Current music ${queue.current.title} resumed ` : `Something went wrong ${message.author}.`)
        return message.channel.send({embeds: [resumedsuccess]});
    },
};