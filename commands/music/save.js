const { MessageEmbed  } = require('discord.js');

module.exports = {
    name: 'save',
    aliases: ['sv'],
    utilisation: '{prefix}save',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing){
            let nomusic = new MessageEmbed()
            .setColor('#a0d87d')
            .setDescription(`No music currently playing ${message.author}.`)
            return message.channel.send({embeds: [nomusic]});
        }
            
        message.author.send(`You saved the track ${queue.current.title} | ${queue.current.author} from the server ${message.guild.name} `).then(() => {
            let successmsg = new MessageEmbed()
            .setColor('#a0d87d')
            .setDescription(`I have sent you the title of the music by private messages`)
            message.channel.send({embeds: [successmsg]});
        }).catch(error => {
            let msgerror = new MessageEmbed()
            .setColor('#a0d87d')
            .setDescription(`Unable to send you a private message ${message.author}.`)
            message.channel.send({embeds: [msgerror]});
        });
    },
};