const { Player } = require('discord-player');
const { Client, Intents } = require('discord.js');
const schema = require('./schema');
const countschema = require('./schemaCount');
const hugschema = require('./schemaHug');
const slapschema = require('./slapSchema');
const punchschema = require('./punchSchema');
const patschema = require('./patSchema');
const mongo = require('mongoose');
mongo.connect(process.env.atlas, {
    useUnifiedTopology: true,
    useNewUrlParser:true
})
global.client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ],
    disableMentions: 'everyone',
});

client.config = require('./config');

global.player = new Player(client, client.config.opt.discordPlayer);
require('./src/loader');
require('./src/events');


//functions
client.bal = (id) => new Promise(async ful =>{
    const data = await schema.findOne({id});
    if(!data) return ful(0);
    ful(data.coins);
})


client.add = (id, coins) =>  {
    schema.findOne({ id }, async(err, data) =>  {
        if(err) throw err;
        if(data) {
            data.coins += coins;
        }else{
            data=new schema({id, coins})
        }
        data.save();
    })
}
//kissing count
client.fullcount = (id, toid) => new Promise(async ful =>{
    const data = await countschema.findOne({id, toid});
    if(!data) return ful(0);
    ful(data.counting);
})


client.count = (id, toid, counting) =>  {
    countschema.findOne({ id, toid }, async(err, data) =>  {
        if(err) throw err;
        if(data) {
            data.counting += 1;
        }else{
            data=new countschema({id, toid, counting})
        }
        data.save();
    })
}
//hug count
client.hugcount = (id, toid) => new Promise(async ful =>{
    const data = await hugschema.findOne({id, toid});
    if(!data) return ful(0);
    ful(data.counting);
})

client.hug = (id, toid, counting) =>  {
    hugschema.findOne({ id, toid }, async(err, data) =>  {
        if(err) throw err;
        if(data) {
            data.counting += 1;
        }else{
            data=new hugschema({id, toid, counting})
        }
        data.save();
    })
}
//slap count
client.slapcount = (id, toid) => new Promise(async ful =>{
    const data = await slapschema.findOne({id, toid});
    if(!data) return ful(0);
    ful(data.counting);
})

client.slap = (id, toid, counting) =>  {
    slapschema.findOne({ id, toid }, async(err, data) =>  {
        if(err) throw err;
        if(data) {
            data.counting += 1;
        }else{
            data=new slapschema({id, toid, counting})
        }
        data.save();
    })
}

//punch count
client.punchcount = (id, toid) => new Promise(async ful =>{
    const data = await punchschema.findOne({id, toid});
    if(!data) return ful(0);
    ful(data.counting);
})

client.punch = (id, toid, counting) =>  {
    punchschema.findOne({ id, toid }, async(err, data) =>  {
        if(err) throw err;
        if(data) {
            data.counting += 1;
        }else{
            data=new punchschema({id, toid, counting})
        }
        data.save();
    })
}
//pat count
client.patcount = (id, toid) => new Promise(async ful =>{
    const data = await patschema.findOne({id, toid});
    if(!data) return ful(0);
    ful(data.counting);
})

client.pat = (id, toid, counting) =>  {
    patschema.findOne({ id, toid }, async(err, data) =>  {
        if(err) throw err;
        if(data) {
            data.counting += 1;
        }else{
            data=new patschema({id, toid, counting})
        }
        data.save();
    })
}

client.rmv = (id, coins) =>  {
    schema.findOne({ id }, async(err, data) =>  {
        if(err) throw err;
        if(data) {
            data.coins -= coins;
        }else{
            data=new schema({id, coins: -coins})
        }
        data.save();
    })
}
client.login(process.env.token);