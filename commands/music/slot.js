const Discord = require('discord.js');
const config = require("../../struct/emoji.json");


module.exports = {
    name: 'slot',
    aliases: ['slot'],
    utilisation: '{prefix}slot',
    voiceChannel: false,

    async execute(client, message, args) {

/* SPIN ANIMATION (use own or check mine)*/
const slotemoji = ":money_mouth:";
const customemoji = "<a:"+ config.emojiname +":"+ config.emojiid + ">";
if(config.haveEmoji === '1') slotemoji = customemoji;

/* ITEMS (SLOTS) */

let items = ['💵','💍','💯']; 

/* RANDOM */
let $ = items[Math.floor(items.length * Math.random())];
let $$ = items[Math.floor(items.length * Math.random())];
let $$$ = items[Math.floor(items.length * Math.random())];

/* EMBEDS */
if(await client.bal(message.author.id) < 200){
  let insuff = new Discord.MessageEmbed()
  .setColor("#a0d87d")
  .setDescription('You need **200** gold coins to activate the slot machine.');
    return message.reply({embeds:[insuff]});
} 

const play = new Discord.MessageEmbed()
    .setTitle("Slot Machine")
    .setDescription("• "+slotemoji+"  "+slotemoji+"  "+slotemoji+" •")
    .setColor('RANDOM')
    .setFooter("Let us see if you're in luck?")

const $1 = new Discord.MessageEmbed()
    .setTitle("Slot Machine")
    .setDescription("• "+$+"  "+slotemoji+"  "+slotemoji+" •")
    .setColor('RANDOM')
    .setFooter("Let us see if you're in luck?")
 
const $2 = new Discord.MessageEmbed()
    .setTitle("Slot Machine")
    .setDescription("• "+$+"  "+$$+"  "+slotemoji+" •")
    .setColor('RANDOM')
    .setFooter("Let us see if you're in luck?")
 
 
const $3 = new Discord.MessageEmbed()
    .setTitle("Slot Machine")
    .setDescription("• "+$+"  "+$$+"  "+$$$+" •")
    .setColor('RANDOM')
    .setFooter("Let us see if you're in luck?")

 /* SPIN THE SLOTS */
 
 spinner = await message.channel.send({embeds:[play]})
   setTimeout(() => {
   spinner.edit({embeds: [$1]});
  }, 600);
  setTimeout(() => {
   spinner.edit({embeds:[$2]});
  }, 1200);
  setTimeout(() => {
   spinner.edit({embeds: [$3]});
  }, 1800);
  const coinsALL = Math.floor(Math.random() * 3000) +1;
  const coinsTWO = Math.floor(Math.random() * 1000) +1;

/* DEDUCT RESULTS */
// You can add/remove user balance in respective result (if using some currency system)
client.rmv(message.author.id, 200);
if($$ !== $ && $$ !== $$$) {
    setTimeout(() => {
        let youlost = new Discord.MessageEmbed()
        .setColor("#a0d87d")
        .setDescription("\n\nYou lost! \n[-**200** gold coins for activating the slot machine]")
      message.channel.send({embeds:[youlost]})
    }, 2000);
       }
       else if($ === $$ && $ === $$$) {
        setTimeout(() => {
            let youwon = new Discord.MessageEmbed()
            .setColor("#a0d87d")
            .setDescription(`\n\nYou won **${coinsALL}** gold coins! \n[-**200** gold coins for activating the slot machine]`)
          message.channel.send({embeds:[youwon]})
          client.add(message.author.id, coinsALL);
        }, 2000)}
        else {
            setTimeout(() => {
            let equalslots = new Discord.MessageEmbed()
            .setColor("#a0d87d")
            .setDescription(`\n\n2 slots are equal... you won **${coinsTWO}** gold coins! \n[-**200** gold coins for activating the slot machine]`)
          message.channel.send({embeds:[equalslots]})
          client.add(message.author.id, coinsTWO);
        }, 2000)}
   
},
};
