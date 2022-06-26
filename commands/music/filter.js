const { MessageEmbed  } = require('discord.js');
module.exports = {
    name: 'filter',
    aliases: [],
    utilisation: '{prefix}filter [filter name]',
    voiceChannel: true,

    async execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing){
            let noqueue = new MessageEmbed()
            .setColor("#a0d87d")
            .setDescription(`No music currently playing ${message.author}. `)
            return message.channel.send({embeds: [noqueue]});
        } 

        const actualFilter = queue.getFiltersEnabled()[0];

        if (!args[0]){
            let noargs = new MessageEmbed()
            .setColor("#a0d87d")
            .setDescription(`Please specify a valid filter to enable or disable ${message.author}. \n${actualFilter ? `Filter currently active ${actualFilter} (${client.config.app.px}filter ${actualFilter} to disable it).\n` : ''}`)
            return message.channel.send({embeds: [noargs]});
        } 

        const filters = [];

        queue.getFiltersEnabled().map(x => filters.push(x));
        queue.getFiltersDisabled().map(x => filters.push(x));

        const filter = filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

        if (!filter){
            let notfilter = new MessageEmbed()
            .setColor("#a0d87d")
            .setDescription(`This filter doesn't exist ${message.author}. \n${actualFilter ? `Filter currently active ${actualFilter}.\n` : ''}List of available filters ${filters.map(x => `**${x}**`).join(', ')}.`)
            return message.channel.send({embeds: [notfilter]});
        } 

        const filtersUpdated = {};

        filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

        await queue.setFilters(filtersUpdated);
        const successfilter = new MessageEmbed()
        .setColor("#a0d87d")
        .setDescription(`The filter ${filter} is now **${queue.getFiltersEnabled().includes(filter) ? 'enabled' : 'disabled'}** \n*Reminder the longer the music is, the longer this will take.*`)
        message.channel.send({embeds: [successfilter]});
    },
};