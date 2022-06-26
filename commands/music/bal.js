const { Client, Message, MessageEmbed  } = require('discord.js');

module.exports = {
    name: 'balance',
    aliases: ['bal'],
    utilisation: '{prefix}bal',
    voiceChannel: false,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    async execute(client, message, arg)  {
        const member = message.mentions.members.first() || message.member;

        const bal = await client.bal(member.id);

        Number.prototype.toFixedSpecial = function(n) {
            var str = this.toFixed(n);
            if (str.indexOf('e+') === -1)
              return str;
          
            // if number is in scientific notation, pick (b)ase and (p)ower
            str = str.replace('.', '').split('e+').reduce(function(b, p) {
              return b + Array(p - b.length + 2).join(0);
            });
            
            if (n > 0)
              str += '.' + Array(n + 1).join(0);
            
            return str;
          };

    //    const balance = bal.toLocaleString('fullwide', {useGrouping:false});
       const balance = bal.toFixedSpecial(0); 

        const embed = new MessageEmbed()
        .setColor('#a0d87d')
        .setDescription(`You have **${balance}** gold coins.`)
        message.channel.send({embeds: [embed]});

    }
}