const Discord = require('discord.js'); //npm i discord.js


module.exports = {
    name: 'kill',
    aliases: ['kill'],
    utilisation: '{prefix}kill',
    voiceChannel: false,

    async execute(client, message, args) {

   

        const user = message.mentions.users.first();


        if (!message.mentions.users.first()) return message.channel.send("Target?"); //if no one is mentions , lets reply as
        if(user.id === message.author.id) return message.channel.send('You changed your mind ~'); 
        var  kills =[
            `:gun: You shot ${message.mentions.users.first().username}  between the eyes.`,
            `:crossed_swords: **${message.author.username}** decapitates **${message.mentions.users.first().username}** with a sword.`,
            `:dagger: **${message.author.username}** stabbed **${message.mentions.users.first().username}** in the heart.`,
            `:axe:  **${message.author.username}** murders  **${message.mentions.users.first().username}** with an axe.`,
            `:bow_and_arrow: **${message.mentions.users.first().username}** takes an arrow to the knee.`,
            `:cloud_lightning: **${message.author.username}** wanted to kill **${message.mentions.users.first().username}** but was struck by lightning.`,
            `:bomb: **${message.author.username}** throws a bomb at **${message.mentions.users.first().username}** directly exploding them to pieces.`,
            `:chains: **${message.mentions.users.first().username}** was tortured by **${message.author.username}** to death.`,
            `:magic_wand: **${message.author.username}** strikes a deadly curse at **${message.mentions.users.first().username}**.`,
            `:right_facing_fist: **${message.author.username}** challenges **${message.mentions.users.first().username}** to a fist fight to the death, **${message.mentions.users.first().username}** wins.`,
            `:right_facing_fist: **${message.author.username}** challenges **${message.mentions.users.first().username}** to a fist fight to the death, **${message.author.username}** wins.`,
            `:blue_car: **${message.mentions.users.first().username}** was run over by **${message.author.username}**.`,
        ];
        const randomkills =  (kills[Math.floor(Math.random() * kills.length)]);
        const embed = new Discord.MessageEmbed() //onec Discordjs is updated to 12.2.0 , richembed is removed ! they replaced now as MessageEmbed
        .setColor("#a0d87d") // you can set it as you went
        .setTitle(`${message.author.username} :hammer_pick: ${message.mentions.users.first().username}`) // lets reply like this if we mentions
        .setDescription(`${randomkills}`)//your personnel Footer
        .setTimestamp();
        message.channel.send({ embeds: [embed] });

    },
};