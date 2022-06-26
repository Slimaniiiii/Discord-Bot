const mongo = require('mongoose');
module.exports = mongo.model(
    'PatSchema',
    new mongo.Schema({
        id: String,
        toid: String,
        counting: {type: Number , default: 0}    })
)

