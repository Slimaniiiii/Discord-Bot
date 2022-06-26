const { MessageEmbed  } = require('discord.js');
module.exports = {
    name: 'progress',
    aliases: ['pbar'],
    utilisation: '{prefix}progress',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing){
            let noqueue = new MessageEmbed()
            .setColor('#a0d87d')
            .setDescription(`No music currently playing ${message.author}.`)
            return message.channel.send({embeds: [noqueue]});
        } 

        const progress = queue.createProgressBar();
        const timestamp = queue.getPlayerTimestamp();

        if (timestamp.progress == 'Infinity'){
            let live = new MessageEmbed()
            .setColor('#a0d87d')
            .setDescription(`Playing a live, no data to display.`)
            return message.channel.send({embeds: [live]});
        } 

        message.channel.send(`${progress} (**${timestamp.progress}**%)`);
    },
};