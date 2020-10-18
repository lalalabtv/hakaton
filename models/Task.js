const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    fio: {type: String, required: true, unique: true},
    datePreventStart: {type: String, required: true},
    dateStart: {type: String , required:true, default: 1},
    dateEnd: {type: String, required: true,default: 1},
    place: {type: String, required: true},
    confirmed: {type: String, required:true, default: "Ожидается"},
    defects: [{type: Types.ObjectId, ref: 'Defect'}],
    deadLine: {type: String, default: 1}
})

module.exports= model('Task', schema)
