const { QueryType } = require('discord-player');
const { MessageEmbed  } = require('discord.js');


module.exports = {
    name: 'play',
    aliases: ['p'],
    utilisation: '{prefix}play [song name/URL]',
    voiceChannel: true,

    async execute(client, message, args) {
        if (!args[0]){
            let invalidsearch = new MessageEmbed()
            .setColor('#a0d87d')
            .setDescription(`Please enter a valid search ${message.author}.`)
            return message.channel.send({embeds: [invalidsearch]});
        } 

        const res = await player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length){
            let noresultsFound = new MessageEmbed()
            .setColor('#a0d87d')
            .setDescription(`No results found ${message.author}.`)
            return message.channel.send({embeds: [noresultsFound]});
        }

        const queue = await player.createQueue(message.guild, {
            metadata: message.channel
        });

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            await player.deleteQueue(message.guild.id);
            let cantjoin = new MessageEmbed()
            .setColor('#a0d87d')
            .setDescription(`I can't join the voice channel ${message.author}... try again ? `)
            return message.channel.send({embeds: [cantjoin]});
        }
        let LoadingTrack = new MessageEmbed()
        .setColor('#a0d87d')
        .setDescription(`Loading your ${res.playlist ? 'playlist' : 'track'}.`)
         await message.channel.send({embeds: [LoadingTrack]});

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};