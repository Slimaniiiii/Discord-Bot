const ms = require('ms');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'seek',
    aliases: ['settime', 'timeto'],
    utilisation: '{prefix}seek [time]',
    voiceChannel: true,

    async execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing){
              let noqueue = new MessageEmbed()
              .setColor('#a0d87d')
              .setDescription(`No music currently playing ${message.author}.`)
            return message.channel.send({embeds: [noqueue]});
        } 

        const timeToMS = ms(args.join(' '));

        if (timeToMS >= queue.current.durationMS){
            let wrongIndicatedTime = new MessageEmbed()
            .setColor('#a0d87d')
            .setDescription(`The indicated time is higher than the total time of the current song ${message.author}. \n*Try for example a valid time like **5s, 10s, 20 seconds, 1m**...*`)
            return message.channel.send({embeds: [wrongIndicatedTime]});
        } 

        await queue.seek(timeToMS);
            const seekSuccess = new MessageEmbed()
            .setColor('#a0d87d')
            .setDescription(`Time set on the current song **${ms(timeToMS, { long: true })}** `)
        message.channel.send({embeds: [seekSuccess]});
    },
};