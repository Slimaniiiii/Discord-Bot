const Discord = require('discord.js'); //npm i discord.js
const imdb = require("imdb-api");
module.exports = {
    name: 'imdb',
    aliases: ['imdb'],
    utilisation: '{prefix}imdb',
    voiceChannel: false,

    async execute(client, message, args) {
          try {
            if(!args.length){
                return message.channel.send('Provide a movie name please.')
         }
        const imob = new imdb.Client({apiKey: "5e36f0db"})
        let movie = await imob.get({'name': args.join(" ")})
        const embed = new Discord.MessageEmbed() 
        .setAuthor('imdb.com')
        .setTitle(movie.title)
        .setColor('#a0d87d')
        .setThumbnail(movie.poster)
        .setFooter(`Ratings: ${movie.rating}`)
        .addField("Description:", `${movie.plot}`)
        .addField("Country", movie.country, true)
        .addField("Languages", movie.languages, true)
        .addField("Type", movie.type, true);
 
        message.channel.send({ embeds: [embed] });
 
          } catch (error) {
            console.log(error)
            return message.reply(`No Results Found!`)
          }
    },
};