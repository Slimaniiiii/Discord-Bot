const { Collection, MessageEmbed } = require('discord.js');
const Timeout = new Collection();
const ms = require('ms');

module.exports = (client, message) => {
    if (message.author.bot || message.channel.type === 'dm') return;

    // if(message.channel.type ==='dm'){
    //     message.channel.send('hello'); 
    // }

    const prefix = client.config.app.px;

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    const DJ = client.config.opt.DJ;

    if (cmd && DJ.enabled && DJ.commands.includes(cmd.name)) {
        const roleDJ = message.guild.roles.cache.find(x => x.name === DJ.roleName);

        if (!message.member._roles.includes(roleDJ.id)) {
            let djembed = new MessageEmbed()
            .setColor('#a0d87d')
            .setDescription(`This command is reserved for members with the ${DJ.roleName} role on the server ${message.author}.`)
            return message.channel.send({embeds: [djembed]});
        }
    }

    if (cmd && cmd.voiceChannel) {
        if (!message.member.voice.channel){
            let notinVC = new MessageEmbed()
            .setColor('#a0d87d')
            .setDescription(`You're not in a voice channel ${message.author}.`)
            return message.channel.send({embeds: [notinVC]});
        } 

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id){
            let notinSAMEvc = new MessageEmbed()
            .setColor('#a0d87d')
            .setDescription(`You are not in the same voice channel ${message.author}.`)
            return message.channel.send({embeds: [notinSAMEvc]});
        } 
    }

    if (cmd && cmd.cooldown) {
        if(Timeout.has(`${cmd.name}${message.author.id}`)){
            let cdall = new MessageEmbed()
            .setColor('#a0d87d')
            .setDescription(`You are on a \`${ms(Timeout.get(`${cmd.name}${message.author.id}`) - Date.now(), {long : true})}\` cooldown.`)
            return message.channel.send({embeds: [cdall]});
        } 
        Timeout.set(`${cmd.name}${message.author.id}`, Date.now() + cmd.cooldown);
        setTimeout(() => {
            Timeout.delete(`${cmd.name}${message.author.id}`)
        }, cmd.cooldown)
    }   
     if (cmd && cmd.robcooldown && args[0]) {
        if(Timeout.has(`${cmd.name}${message.author.id}`)){
            let cdrob = new MessageEmbed()
            .setColor('#a0d87d')
            .setDescription(`You are on a \`${ms(Timeout.get(`${cmd.name}${message.author.id}`) - Date.now(), {long : true})}\` cooldown.`)
            return message.channel.send({embeds: [cdrob]});
        } 
        Timeout.set(`${cmd.name}${message.author.id}`, Date.now() + cmd.robcooldown);
        setTimeout(() => {
            Timeout.delete(`${cmd.name}${message.author.id}`)
        }, cmd.robcooldown)
    }
     

    if (cmd) cmd.execute(client, message, args);

};