
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "8ball",
    aliases: ['8b'],
    utilisation: '{prefix}8ball',
    voiceChannel: false,


    async execute(client, message, args){
        if(!args[0]) return message.reply('please ask a full question');
        if(args[0].length === 1) return message.reply('Ask a good question');
        let replies = ["Yes~!", "No....", "I dont  think so", "Of course", "Definetly", "Better not tell you now"]

        let result =  Math.floor((Math.random() * replies.length));
        let question = args.slice().join(" ");
        let ballembed = new MessageEmbed()
        .setColor("#cc9bd7")
        .addField("Answer", replies[result])


        // message.channel.send(ballembed);
        message.channel.send({ embeds: [ballembed] });
    }
}