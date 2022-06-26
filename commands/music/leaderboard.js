const { Client, Message, MessageEmbed, Collection  } = require('discord.js');

module.exports = {
    name: 'leaderboard',
    aliases: ['ld'],
    utilisation: '{prefix}leaderboard',
    voiceChannel: false,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    async execute(client, message, args)  {
          
        const collection = new Collection();
        await Promise.all(
            message.guild.members.cache.map(async(member) => {
                const id = member.id;
                const bal = await client.bal(id);
                return bal !== 0 ? collection.set(id, {
                    id,
                    bal
                })
                : null
            })
        );
         const data =  collection.sort((a ,b) => b.bal - a.bal).first(10);
         const lddata = (data.map((val, i ) => {
            // Number.prototype.toFixedSpecial = function(n) {
            //     var str = this.toFixed(n);
            //     if (str.indexOf('e+') === -1)
            //       return str;
              
            //     // if number is in scientific notation, pick (b)ase and (p)ower
            //     str = str.replace('.', '').split('e+').reduce(function(b, p) {
            //       return b + Array(p - b.length + 2).join(0);
            //     });
                
            //     if (n > 0)
            //       str += '.' + Array(n + 1).join(0);
                
            //     return str;
            //   };
            function nFormatter(num, digits) {
              const lookup = [
                { value: 1, symbol: "" },
                { value: 1e3, symbol: "k" },
                { value: 1e6, symbol: "M" },
                { value: 1e9, symbol: "B" },
                { value: 1e12, symbol: "T" },
                { value: 1e15, symbol: "P" },
                { value: 1e18, symbol: "E" }
              ];
              const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
              var item = lookup.slice().reverse().find(function(item) {
                return num >= item.value;
              });
              return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
            }
              
              // const balance = val.bal.toFixedSpecial(0); 
              const balance = nFormatter(val.bal,1); 
            return `\n\n${i+1} ${client.users.cache.get(val.id).tag} → **${balance} gold coins**`
        }));
        
         const embed = new MessageEmbed()
         .setColor('#a0d87d')
         .setTitle(`Leaderboard in *${message.guild.name}*`)
         .setDescription(`${lddata}`)
         message.channel.send({embeds: [embed]})
         
  
    }
}