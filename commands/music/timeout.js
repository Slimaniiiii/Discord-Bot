module.exports = {
    name: 'timeout',
    aliases: ['timeout'],
    utilisation: '{prefix}timeout',
    voiceChannel: false,

    async execute(client, message, args) {
        const fetch = require('node-fetch');
        const ms = require('ms');
        const time = args.slice(1).join('');

        if(!time) return message.channel.send('please specify the time!');
        const user = message.mentions.users.first();
        const millieseconds = ms(time);
        if(!user) return message.channel.send('no user specified');
        if(user.id === client.user.id) return message.channel.send('Cannot perform that action');
        if(user.id === message.author.id) return message.channel.send('you cannot mute yourself');
        if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('Denied');
        
        if(!millieseconds || millieseconds < 10000 || millieseconds > 2419200000){
            return message.channel.send('invalid time');
        };
        const iosTime = new Date(Date.now() + millieseconds).toISOString();
        await fetch(`https://discord.com/api/guilds/${message.guild.id}/members/${user.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ communication_disabled_until: iosTime }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bot ${client.token}`
            },
        });
        message.channel.send(`${user.username} has been timed out for \`${time}\` !`);
    },
};