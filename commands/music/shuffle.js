const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'shuffle',
    aliases: ['sh'],
    utilisation: '{prefix}shuffle',
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

        await queue.shuffle();
          const shuffledSongs = new MessageEmbed()
          .setColor('#a0d87d')
          .setDescription(`Queue shuffled **${queue.tracks.length}** song(s) !`)
        return message.channel.send({embeds: [shuffledSongs]});
    },
};