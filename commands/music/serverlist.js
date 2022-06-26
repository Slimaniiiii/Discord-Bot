const Discord = require("discord.js");
const ownerid = "209421404595027968";

module.exports = {
    name: "serverlist",


  async execute (bot, message, args)  {
    if (message.author.id == ownerid) {
      if (!message.guild.me.permissions.has("ADMINISTRATOR"))
        return message.channel
          .send("I Dont Have Permissions")
          .then(msg => msg.delete({ timeout: 5000 }));

      let i0 = 0;
      let i1 = 10;
      let page = 1;

      let description =
        `Total Servers - ${bot.guilds.cache.size}\n\n` +
        bot.guilds.cache
          .sort((a, b) => b.memberCount - a.memberCount)
          .map(r => r)
          .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)
          .slice(0, 10)
          .join("\n\n");

      let embed = new Discord.MessageEmbed()
        .setAuthor(bot.user.tag, bot.user.displayAvatarURL({dynamic : true}))
        
        .setColor("#e4d7a0")
        .setFooter(`Page - ${page}/${Math.ceil(bot.guilds.cache.size / 10)}`)
        .setDescription(description);

      let msg = await message.channel.send({embeds: [embed]});

      await msg.react("⬅");
      await msg.react("➡");
      await msg.react("❌");

      let collector = msg.createReactionCollector(
        (reaction, user) => user.id === message.author.id
      );

      collector.on("collect", async (reaction, user) => {
        if (reaction._emoji.name === "⬅") {
          // Updates variables
          i0 = i0 - 10;
          i1 = i1 - 10;
          page = page - 1;

          // if there is no guild to display, delete the message
          if (i0 + 1 < 0) {
            console.log(i0)
            return msg.delete();
          }
          if (!i0 || !i1) {
            return msg.delete();
          }

          description =
            `Total Servers - ${bot.guilds.cache.size}\n\n` +
            bot.guilds.cache
              .sort((a, b) => b.memberCount - a.memberCount)
              .map(r => r)
              .map(
                (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)
              .slice(i0, i1)
              .join("\n\n");

          // Update the embed with new informations
          embed
            .setFooter(
              `Page - ${page}/${Math.round(bot.guilds.cache.size / 10 + 1)}`
            )
            .setDescription(description);

          // Edit the message
          msg.edit({embeds: [embed]});
        }

        if (reaction._emoji.name === "➡") {
          // Updates variables
          i0 = i0 + 10;
          i1 = i1 + 10;
          page = page + 1;

          // if there is no guild to display, delete the message
          if (i1 > bot.guilds.cache.size + 10) {
            return msg.delete();
          }
          if (!i0 || !i1) {
            return msg.delete();
          }

          description =
            `Total Servers - ${bot.guilds.cache.size}\n\n` +
            bot.guilds.cache
              .sort((a, b) => b.memberCount - a.memberCount)
              .map(r => r)
              .map(
                (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)
              .slice(i0, i1)
              .join("\n\n");

          // Update the embed with new informations
          embed
            .setFooter(
              `Page - ${page}/${Math.round(bot.guilds.cache.size / 10 + 1)}`
            )
            .setDescription(description);

          // Edit the message
          msg.edit({embeds: [embed]});
        }

        if (reaction._emoji.name === "❌") {
          return msg.delete();
        }

        // Remove the reaction when the user react to the message
        await reaction.users.remove(message.author.id);
      });
    } else {
      return;
    }
  }
};