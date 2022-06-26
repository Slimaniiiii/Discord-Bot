const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'coinflip',
    aliases: ['coinflip'],
    utilisation: '{prefix}coinflip',
    voiceChannel: false,

     async execute (client, message, args)  {
    const responses = ['Heads', 'Tails'];
		const response =
		responses[Math.floor(Math.random() * responses.length)];

			const Embed = new MessageEmbed()
				.setTitle('You filpped a . .')
				.setColor('#a0d87d')
				.setDescription(
					`${response}!`,
				);
			message.channel.send({embeds: [Embed]});
	
    }
}