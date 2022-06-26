const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['h'],
    showHelp: false,
    utilisation: '{prefix}help',

    execute(client, message, args) {
        const commands = client.commands.filter(x => x.showHelp !== false);
        var space = " ";
        const embed = new MessageEmbed() 
        .setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }))
        .setTitle(`Enabled: ${commands.size}`,true)
        .setColor('#a0d87d')
        .addField("Description:", `A list of commands for entertainment`)
        .addField("Music:", `\n\n__You have to be in a voice channel!__\n ${space} play(p)\n pause\n resume\n back\n skip(sk)\n queue(q)\n clear(cq)\n loop(lp, repeat)\n volume(vol)\n search(sh)\n settime(seek or timeto)\n shuffle\n nowplaying(np)\n filter\n stop\n save\n progress\n`, true)
        .addField("Fun:", "\n\nkill\n rate\n 8ball\n punch\n slap\n kiss\n hug\n pat\n meme\n coinflip\n", true)
        .addField("Utility:", "\n\navatar\n timer\n lyrics\n animeinfo\n mangainfo\n imdb\n define\n translate\n serverinfo(si)\n userinfo(ui)\n weather\n", true)
        .addField("Moderation:", "\n\nban\n unban\n slowmode\n kick\n lockchannel\n unlockchannel\n timeout\n purge\n", true)
        .addField("Economy:", "\n\nbalance(bal)\n daily\n slot\n work\n bet\n rob\n donate\n leaderboard\n", true)
        // .addField("NSFW:", "\n\n__Will not work unless you are in a NSFW channel!__\n lewd\n thigh\n hentai\n hentaithigh(hthigh)\n hentaiass(hass)\n boobs\n", true)
        .setTimestamp();
        // `\n\n**${name}**\n__Triggers__\n${triggers.join(', ')}\n__Description__\n${description}`
        message.channel.send("DM sent.")
        message.author.send({ embeds: [embed] });
        },
    };