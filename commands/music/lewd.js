const Discord = module.require("discord.js");
const NSFW = require("discord-nsfw");
const nsfw = new NSFW();


module.exports = {
    name: "lewdlewdlewdlewdlewdlewdlewdlewd",
    aliases: ['lewdlewdlewdlewdlewdlewdlewdlewd'],
    utilisation: '{prefix}lewdlewdlewdlewdlewdlewdlewd',
    voiceChannel: false,
  async execute(client, message, args)  {
    var errMessage = "This is not an NSFW Channel";
    if (!message.channel.nsfw) {
      message.react("💢");

      return message.reply(errMessage).then((msg) => {
        setTimeout(() => msg.delete(), 3000);
      });
    }

    const image = await nsfw.lewd();
    const embed = new Discord.MessageEmbed()
    .setColor("#a0d87d")
    .setImage(image);
    message.channel.send({ embeds: [embed] });
  },
};