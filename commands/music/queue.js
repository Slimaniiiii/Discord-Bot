const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'queue',
    aliases: ['q'],
    utilisation: '{prefix}queue',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue){
                 let notqueue = new MessageEmbed()
                 .setColor('#a0d87d')
                 .setDescription(`No music currently playing ${message.author}.`)
            return message.channel.send({embeds: [notqueue]});
        } 

        if (!queue.tracks[0]){
            let nomusic = new MessageEmbed()
            .setColor('#a0d87d')
            .setDescription(`No music in the queue after the current one ${message.author}.`)
            return message.channel.send({embeds: [nomusic]});
        }

        const embed = new MessageEmbed();
        const methods = ['', '🔁', '🔂'];

        embed.setColor('#a0d87d');
        embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }));
        embed.setAuthor(`Server queue - ${message.guild.name} ${methods[queue.repeatMode]}`, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (requested by : ${track.requestedBy.username})`);

        const songs = queue.tracks.length;
        const nextSongs = songs > 5 ? `And **${songs - 5}** other song(s)...` : `In the playlist **${songs}** song(s)...`;

        embed.setDescription(`Current ${queue.current.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`);

        embed.setTimestamp();
        embed.setFooter('Music comes first -  ', message.author.avatarURL({ dynamic: true }));

        message.channel.send({ embeds: [embed] });
    },
};