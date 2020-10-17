const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true, default: 1},
    publicSign: {type: String, required: true, default: 1 },
    privateSign: {type: String, required: true, default: 1}
})

module.exports= model('User', schema)
