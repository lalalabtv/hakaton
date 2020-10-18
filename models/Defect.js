const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    comment: {type: String, required: true},
    state: {type: String, default: 50},
    uState: {type: String, default: 50},
    priority: {type: String, default: 20}
})

module.exports= model('Defect', schema)
