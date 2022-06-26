const Discord = module.require("discord.js");

module.exports = {
  name: "rate",
  aliases: ['rate'],
  utilisation: '{prefix}rate',
  voiceChannel: false,
  async execute (client, message, args)  {
    const ratedperson = message.mentions.users.first() || args.join(" ")   ;
    const number = [1,2,3,4,5,6,7,8,9,10];
    const randomnumber = (number[Math.floor(Math.random() * number.length)]);

    if(!ratedperson) return message.channel.send("Who/What do you want to rate?");
     
      const embed = new Discord.MessageEmbed()
      .setColor("#a0d87d")
      .setDescription(`Rated ${ratedperson} **${randomnumber}/10**`)      
       message.channel.send({ embeds: [embed] });

  },
};