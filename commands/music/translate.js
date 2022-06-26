const discord = require("discord.js");
const translate = require('@iamtraction/google-translate');

module.exports = {
  name: "translate",
  aliases: ['translate'],
  utilisation: '{prefix}translate',
  voiceChannel: false,
  async execute (client, message, args) {
        const txt = args.slice(1).join(" ")
        const lang = args[0]
        if(!lang){
          let noLanguage = new discord.MessageEmbed()
          .setDescription("Provide the ISO code of the language. Ex: !translate fr Hello")
          .setColor("#a0d87d")
          return message.channel.send({embeds: [noLanguage]})
        } 
        if(!txt){
          let notext = new discord.MessageEmbed()
          .setDescription("Provide a text to translate.")
          .setColor("#a0d87d")
          return message.channel.send({embeds: [notext]})
        } 
        translate(txt, { to: lang }).then(res => {
          const embed = new discord.MessageEmbed()
          .setDescription(res.text)
          .setColor("#a0d87d")
          message.channel.send({ embeds: [embed] });
    }).catch(err => {
      let errorprovide = new discord.MessageEmbed()
      .setColor("#a0d87d")
      .setDescription("Please provide a valid ISO language code.")
      message.channel.send({embeds: [errorprovide]})
    });
  },
};