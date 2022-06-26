const { MessageEmbed } = require('discord.js');
const urban = require('relevant-urban');
const badwords = require('bad-words');
const filter = new badwords()

filter.addWords(...require('../../struct/filter.json'));
const text = require('../../struct/string');

module.exports = {
  name: 'define',
  aliases: [ 'urban', 'ud' ],
  utilisation: '{prefix}define ',
  voiceChannel: false,
  async execute (client, message, args)  {
try {
  if (!args.length) {
      
    return message.channel.send("What are you looking for?");
  };

  if (filter.isProfane(args.join(' '))
  && !message.channel.nsfw
  && message.channel.type === 'text'){
    return message.channel.send(`\\❌ ${message.author}, You cannot look-up for the definition of that term in a sfw channel!\n\nNot a profane word? Contact my developer through the command \`feedback\` and ask to whitelist the word!`);
  };

  const defs = await urban(encodeURI(args.join(' '))).catch(() => null);

  if (!defs){
    return message.channel.send(`\\❌ ${message.author}, No definition found for **${args.join(' ')}**`);
  };
  let embedd = new MessageEmbed()
  .setColor('#a0d87d')
  .setURL(defs.urbanURL)
  .setTitle(`Definition of ${defs.word}`)
  .setAuthor('Urban Dictionary', 'https://files.catbox.moe/kkkxw3.png', 'https://www.urbandictionary.com/')
  .addFields([
    {
      name: 'Definition', value: message.channel.nsfw === true || message.channel.nsfw === undefined
      ? text.truncate(defs.definition)
      : text.truncate(filter.clean(defs.definition), 1000)
    },{
      name: 'Examples', value: message.channel.nsfw === true || message.channel.nsfw === undefined
      ? text.truncate(defs.example || 'N/A')
      : text.truncate(filter.clean(defs.example || 'N/A'), 1000)
    },{
      name: 'Submitted by', value: message.channel.nsfw === true || message.channel.nsfw === undefined
      ? text.truncate(defs.author || 'N/A', 250)
      : text.truncate(filter.clean(defs.author || 'N/A'), 250)
    }
  ]);
  return message.channel.send({embeds: [embedd]});

} catch (error) {
  message.channel.send("No results.");
}
   
  }
}