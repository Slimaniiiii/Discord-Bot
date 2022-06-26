module.exports = {
    app: {
        px: ',',    
    },

    opt: {
        DJ: {   
            enabled: false,
            roleName: 'DJ',
            commands: ['back', 'rate', 'punch', 'pat','imdb', 'hug', 'coinflip', 'mangainfo', 'anime', 'animeinfo', 'kiss', 'avatar', 'timeout', 'meme','8ball', 'kick' , 'nickname', 'ban', 'clear', 'filter', 'loop', 'pause', 'resume', 'seek', 'shuffle', 'skip', 'stop', 'volume']
        },
        maxVol: 100,
        loopMessage: false,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};
