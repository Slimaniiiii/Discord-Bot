const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'purge',
    aliases: ['purge'],
    utilisation: '{prefix}purge',
    voiceChannel: false,
    async execute(client, message, args)  {
        if (!message.member.permissions.has("MANAGE_MESSAGES"))
            return message.channel.send(`You Do Not Have Permissions To Use This Command, ${message.author.username}`);

    if(!message.guild.me.permissions.has('MANAGE_MESSAGES')) {
            const errorembedf = new MessageEmbed()
            .setDescription("I do not have permission to delete messages.")
            .setColor('#a0d87d')

            return message.channel.send({embeds: [errorembedf]})
        } 
        if (!args[0]) {
            return message.channel.send("Please Enter An Amount Between 1 and 100")
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;

        } else {
            deleteAmount = parseInt(args[0]);
        }

        await message.channel.bulkDelete(deleteAmount, true);

        const embed = new MessageEmbed()
            .setDescription(`Successfully Deleted **${deleteAmount}** Messages`)
            
            .setColor('#a0d87d')

        await message.channel.send({embeds: [embed]});

    }
}