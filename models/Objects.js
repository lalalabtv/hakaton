const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    long: {type: String, required: true},
    lot: {type: String, required: true},
    name: {type: String, required: true}
})

module.exports= model('Object', schema)
