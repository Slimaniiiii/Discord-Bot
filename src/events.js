const { MessageEmbed  } = require('discord.js');

player.on('error', (queue, error) => {
    console.log(`Error emitted from the queue ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    console.log(`Error emitted from the connection ${error.message}`);
});

player.on('trackStart', (queue, track) => {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    let startedplaying = new MessageEmbed()
    .setColor('#a0d87d')
    .setDescription(`Started playing ${track.title} in **${queue.connection.channel.name}**.`)
    queue.metadata.send({embeds: [startedplaying]});
});

player.on('trackAdd', (queue, track) => {
    let trackadded = new MessageEmbed()
            .setColor('#a0d87d')
            .setDescription(`Track *${track.title}* added in the queue `)
          queue.metadata.send({embeds: [trackadded]});
});


player.on('botDisconnect', (queue) => {
    let disconnected = new MessageEmbed()
    .setColor('#a0d87d')
    .setDescription('I was manually disconnected from the voice channel, clearing queue...')
    queue.metadata.send({embeds: [disconnected]});
});

player.on('channelEmpty', (queue) => {
    let emptychannel = new MessageEmbed()
    .setColor('#a0d87d')
    .setDescription('Nobody is in the voice channel, leaving the voice channel...')
    queue.metadata.send({embeds: [emptychannel]});
});

player.on('queueEnd', (queue) => {
    let finishedqueue = new MessageEmbed()
    .setColor('#a0d87d')
    .setDescription('I finished reading the whole queue.')
    queue.metadata.send({embeds: [finishedqueue]});
});




