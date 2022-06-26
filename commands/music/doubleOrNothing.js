const { Client, Message, MessageEmbed  } = require('discord.js');

module.exports = {
    name: 'bet',
    aliases: ['bet'],
    utilisation: '{prefix}bet',
    voiceChannel: false,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    async execute(client, message, args)  {
       if(!args[0]){
             let noamountargs = new MessageEmbed()
             .setColor("a0d87d")
             .setDescription('\n\nPlease specify an amount to bet!\n Ex: ,bet 100\n')
           return message.reply({embeds: [noamountargs]});
       } 
       if(isNaN(args[0])){
        let isnotanumber = new MessageEmbed()
        .setColor("a0d87d")
        .setDescription('Argument must be a number')
        return message.reply({embeds:[isnotanumber]});
       } 
       const amountToBet =  parseInt(args[0]);
       if(await client.bal(message.author.id) < amountToBet){
        let insuffBalance = new MessageEmbed()
        .setColor("a0d87d")
        .setDescription('Insufficient balance')
           return message.reply({embeds:[insuffBalance]});
       } 
       if( amountToBet < 0){
        let negative = new MessageEmbed()
        .setColor("a0d87d")
        .setDescription('You cannot bet a negative number')
           return message.reply({embeds:[negative]});
       } 

       function random(){
           const num = Math.floor(Math.random() * 2);
           return num === 1;
       }

      

       if(random() === true){
           const winAmount = amountToBet * 2;
           let embed = new MessageEmbed()
           .setColor('#a0d87d')
           .setDescription(`Congratz you won **${winAmount}** gold coins!`)
           message.channel.send({embeds: [embed]});
           client.add(message.author.id, winAmount);

       }else{
        let embed = new MessageEmbed()
        .setColor('#a0d87d')
        .setDescription(`Oops! You lost **${amountToBet}** coins!, better luck next time.`)
        message.channel.send({embeds: [embed]});
        client.rmv(message.author.id, amountToBet);
       }
    }
}