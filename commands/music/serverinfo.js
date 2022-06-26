const { Client, CommandInteraction, MessageEmbed, Interaction } = require("discord.js");

module.exports = {
  name: "serverinfo",
  aliases: ['si'],
  utilisation: '{prefix}serverinfo',
  voiceChannel: false,

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */


  async execute (client, interaction, args)  {
try {
  const Embed = new MessageEmbed()
  .setColor("#a0d87d")
  .setAuthor(interaction.guild.name, interaction.guild.iconURL({dynamic:true}))
  .setThumbnail(interaction.guild.iconURL({dynamic:true}))
  .addFields(
      {
          name: "GENERAL",
          value: 
          `
          Name: ${interaction.guild.name}
          Created: <t:${parseInt(interaction.guild.createdTimestamp / 1000)}:R>
          Owner: <@${interaction.guild.ownerId}> 

          Description: ${interaction.guild.description ? interaction.guild.description : "There's no description." }
          
          `
      },
  )
  .addField("USERS", 
    `
    *Members:* **${interaction.guild.members.cache.filter((m) => !m.user.bot).size}**   *Bots:* **${interaction.guild.members.cache.filter((m) => m.user.bot).size}** *Total:* **${interaction.guild.memberCount}**
    `
)
.addField("CHANNELS",
    `
    Text: ${interaction.guild.channels.cache.filter((c) => c.type === "GUILD_TEXT").size}
    Voice: ${interaction.guild.channels.cache.filter((c) => c.type === "GUILD_VOICE").size}
    Threads: ${interaction.guild.channels.cache.filter((c) => c.type === "GUILD_NEWS_THREAD" && "GUILD_PRIVATE_THREAD" && "GUILD_PUBLIC_THREAD").size}
    Categories: ${interaction.guild.channels.cache.filter((c) => c.type === "GUILD_CATEGORY").size}
    Stages: ${interaction.guild.channels.cache.filter((c) => c.type === "GUILD_STAGE_VOICE").size}
    News: ${interaction.guild.channels.cache.filter((c) => c.type === "GUILD_NEWS").size}
    Total: ${interaction.guild.channels.cache.size}
    `, true
)
.addField("EMOJIS & EMOJIS",
        `
        Animated: ${interaction.guild.emojis.cache.filter((e) => e.animated).size}
        Static: ${interaction.guild.emojis.cache.filter((e) => !e.animated).size}
        Stickers: ${interaction.guild.stickers.cache.size}
        Total: ${interaction.guild.stickers.cache.size + interaction.guild.emojis.cache.size}
        `, true
)
.addField("NITRO STATISTICS",
    `
    Tier: ${interaction.guild.premiumTier.replace("TIER_", "")}
    Boosts: ${interaction.guild.premiumSubscriptionCount}
    Boosters: ${interaction.guild.members.cache.filter((m) => m.premiumSince).size}
    `, true


)
  interaction.reply({ embeds: [Embed] })

  
} catch (error) {
  interaction.reply("Error");
}
    





    //   .addFields(
    //     {
    //         name: "GENERAL",
    //         value: 
    //         `
    //         Name: ${interaction.guild.name}
    //         Created: <t:${parseInt(interaction.guild.createdTimestamp / 1000)}:R>
    //         Owner: <@${interaction.guild.ownerId}> 

    //         Description: ${interaction.guild.description ? interaction.guild.description : "There's no description." }
            
    //         `
    //     },
        // {
        //     name: "USERS",
        //     value:
        //     `
        //     Members: ${interaction.guild.members.cache.filter((m) => !m.user.bot).size}   Bots: ${interaction.guild.members.cache.filter((m) => m.user.bot).size}
        //     Total: ${interaction.guild.memberCount}
        //     `
        // },
        // {
        //     name: "CHANNELS",
        //     value:
        //     `
        //     Text: ${interaction.guild.channels.cache.filter((c) => c.type === "GUILD_TEXT").size}
        //     Voice: ${interaction.guild.channels.cache.filter((c) => c.type === "GUILD_VOICE").size}
        //     Threads: ${interaction.guild.channels.cache.filter((c) => c.type === "GUILD_NEWS_THREAD" && "GUILD_PRIVATE_THREAD" && "GUILD_PUBLIC_THREAD").size}
        //     Categories: ${interaction.guild.channels.cache.filter((c) => c.type === "GUILD_CATEGORY").size}
        //     Stages: ${interaction.guild.channels.cache.filter((c) => c.type === "GUILD_STAGE_VOICE").size}
        //     News: ${interaction.guild.channels.cache.filter((c) => c.type === "GUILD_NEWS").size}

        //     Total: ${interaction.guild.channels.cache.size}
        //     `
        // },
        // {
        //     name:"EMOJIS & EMOJIS",
        //     value:
        //     `
        //     Animated: ${interaction.guild.emojis.cache.filter((e) => e.animated).size}
        //     Static: ${interaction.guild.emojis.cache.filter((e) => !e.animated).size}
        //     Stickers: ${interaction.guild.stickers.cache.size}

        //     Total: ${interaction.guild.stickers.cache.size + interaction.guild.emojis.cache.size}
        //     `
        // },
    //     {
    //         name:"NITRO STATISTICS",
    //         value:
    //         `
    //         Tier: ${interaction.guild.premiumTier.replace("TIER_", "")}
    //         Boosts: ${interaction.guild.premiumSubscriptionCount}
    //         Boosters: ${interaction.guild.members.cache.filter((m) => m.premiumSince).size}
    //         `
    //     }
    // )
      
   
  },
};

