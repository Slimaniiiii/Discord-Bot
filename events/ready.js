module.exports = async (client) => {

    console.log(`\x1b[31m Online:\x1b[0m ${client.user.tag}\n->\x1b[33mReady on\x1b[0m \x1b[31m${client.guilds.cache.size}\x1b[0m  servers for a total of \x1b[31m${client.users.cache.size}\x1b[0m  users`);
    client.user.setActivity(client.config.app.playing);
    // client.user.setActivity("✥", {
    //     type:"STREAMING",
    //     url: 'https://www.twitch.tv/....'
    // });
};