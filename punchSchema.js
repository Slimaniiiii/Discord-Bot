const mongo = require('mongoose');
module.exports = mongo.model(
    'Punchcount',
    new mongo.Schema({
        id: String,
        toid: String,
        counting: {type: Number , default: 0}
    })
)

