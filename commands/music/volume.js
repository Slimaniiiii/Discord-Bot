const maxVol = client.config.opt.maxVol;
const { MessageEmbed  } = require('discord.js');

module.exports = {
    name: 'volume',
    aliases: ['vol'],
    utilisation: `{prefix}volume [1-${maxVol}]`,
    voiceChannel: true,

    execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing){
            let nomusic = new MessageEmbed()
            .setColor('#a0d87d')
            .setDescription(`No music currently playing ${message.author}.`)
            return message.channel.send({embeds: [nomusic]});
        }

        const vol = parseInt(args[0]);

        if (!vol){
            let currentvol = new MessageEmbed()
            .setColor('#a0d87d')
            .setDescription(`The current volume is ${queue.volume} 🔊\n*To change the volume enter a valid number between **1** and **${maxVol}**.*`)
            return message.channel.send({embeds: [currentvol]});
        } 

        if (queue.volume === vol){
            let cantchangevol = new MessageEmbed()
            .setColor('#a0d87d')
            .setDescription(`The volume you want to change is already the current one ${message.author}.`)
            return message.channel.send({embeds: [cantchangevol]});
        } 

        if (vol < 0 || vol > maxVol){
            let invalidnumber = new MessageEmbed()
            .setColor('#a0d87d')
            .setDescription(`The specified number is not valid. Enter a number between **1** and **${maxVol}** ${message.author}.`)
            return message.channel.send({embeds: [invalidnumber]});
        } 

        const success = queue.setVolume(vol);
        let changedsuccess = new MessageEmbed()
            .setColor('#a0d87d')
            .setDescription(success ? `The volume has been modified to **${vol}**/**${maxVol}**% 🔊` : `Something went wrong ${message.author}.`)

        return message.channel.send({embeds: [changedsuccess]});
    },
};