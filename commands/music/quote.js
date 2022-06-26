const Discord = require('discord.js'); //npm i discord.js
module.exports = {
    name: 'quote',
    aliases: ['quote'],
    utilisation: '{prefix}quote',
    voiceChannel: false,

    async execute(client, message, args) {
        async function getQuoteRandom() {
            const response = await fetch('https://api.quotable.io/random')
            const data = await response.json()
            return (`${data.content} - ${data.author}`)
          }
           
              
        const embedquote = new Discord.MessageEmbed()
            .setColor("#a0d87d")
            .setDescription(getQuoteRandom())


            message.channel.send({embeds: [embedquote]})
            // .then(quote => message.channel.send(quote))
        

 
  
    
    },
};