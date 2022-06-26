const { MessageEmbed } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'search',
    aliases: ['sh'],
    utilisation: '{prefix}search [song name]',
    voiceChannel: true,

    async execute(client, message, args) {
        if (!args[0]){
            let invalid = new MessageEmbed()
            .setColor('#a0d87d')
            .setDescription(`Please enter a valid search ${message.author}.`) 
            return message.channel.send({embeds: [invalid]});
        } 

        const res = await player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length){
            let nores = new MessageEmbed()
            .setColor('#a0d87d')
            .setDescription(`No results found ${message.author}.`) 
            return message.channel.send({embeds: [nores]});
        } 

        const queue = await player.createQueue(message.guild, {
            metadata: message.channel
        });

        const embed = new MessageEmbed();

        embed.setColor('#a0d87d');
        embed.setAuthor(`Results for ${args.join(' ')}`, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const maxTracks = res.tracks.slice(0, 10);

        embed.setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\nSelect choice between **1** and **${maxTracks.length}** or **cancel** ⬇️`);

        embed.setTimestamp();
        embed.setFooter('Music comes first -  ', message.author.avatarURL({ dynamic: true }));

        message.channel.send({ embeds: [embed] });

        const collector = message.channel.createMessageCollector({
            time: 15000,
            errors: ['time'],
            filter: m => m.author.id === message.author.id
        });

        collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'cancel'){
                let cancelled = new MessageEmbed()
                .setColor('#a0d87d')
                .setDescription(`Search cancelled `)
                return message.channel.send({embeds: [cancelled]}) && collector.stop();
            } 

            const value = parseInt(query.content);

            if (!value || value <= 0 || value > maxTracks.length){
                let invalidResponse = new MessageEmbed()
                .setColor('#a0d87d')
                .setDescription(`Invalid response, try a value between **1** and **${maxTracks.length}** or **cancel**.`)
                return message.channel.send({embeds: [invalidResponse]});
            } 

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(message.member.voice.channel);
            } catch {
                await player.deleteQueue(message.guild.id);
                let cantjoin = new MessageEmbed()
                .setColor('#a0d87d')
                .setDescription(`I can't join the voice channel ${message.author}.`) 
                return message.channel.send({embeds: [cantjoin]});
            }
           const loadingSearch = new MessageEmbed()
           .setColor('#a0d87d')
           .setDescription(`Loading your search.`)   
            await message.channel.send({embeds: [loadingSearch]});

            queue.addTrack(res.tracks[query.content - 1]);

            if (!queue.playing) await queue.play();
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time'){
                let timedout = new MessageEmbed()
                .setColor('#a0d87d')
                .setDescription(`Search timed out ${message.author}.`) 
                return message.channel.send({embeds: [timedout]});
            } 
        });
    },
};