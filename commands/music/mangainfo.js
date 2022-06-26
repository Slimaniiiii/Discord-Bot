const Discord = require('discord.js'); //npm i discord.js
const request = require('node-superfetch'); //npm i node-superfetch 

module.exports = {
    name: 'mangainfo',
    aliases: ['mangainfo'],
    utilisation: '{prefix}mangainfo',
    voiceChannel: false,

    async execute(client, message, args) {

        function shorten(text, maxLen = 2000) { //Let’s tell the bot that the maximum number of characters is 2000
            return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
        }
        const query = args.join(' '); //After entering the name

        try {
			const { text } = await request //From here, the bot will start searching for your request 
				.get('https://kitsu.io/api/edge/manga') //To check the bot from kitsu.io api 
				.query({ 'filter[text]': query });//The bot starts collecting the search results
			const body = JSON.parse(text); //after done let's check  
			if (!body.data.length) return message.reply('No Results Found!'); //If your search is missing or wrong, it does not support most languages
			const data = body.data[0].attributes; //Let's extract the data
			const embed = new Discord.MessageEmbed() //Let's see the search results
				.setColor('#a0d87d') //optional ; you can set it random  
				.setURL(`https://kitsu.io/manga/${data.slug}`) //let's show your search results from data
				.setThumbnail(data.posterImage ? data.posterImage.original : null) //your manga poster image 
				.setTitle(data.canonicalTitle) 
				.setDescription(shorten(data.synopsis)) 
				.addField('Type', `${data.subtype} - ${data.status}`, true) //Here it will give you anime description
				.addField('Volumes / Chapters', `${data.volumeCount || '???'} / ${data.chapterCount || '???'}`, true) //To tell you the number of chapters manga
				.addField('Start Date', data.startDate ? new Date(data.startDate).toDateString() : '???', true) //When it was released
				.addField('End Date', data.endDate ? new Date(data.endDate).toDateString() : '???', true); //When it was ended
			return message.channel.send({embeds: [embed] });
		} catch (err) {
			return message.reply(`No Results Found!`); //Let's check if your search has a bug
		}


    },
};