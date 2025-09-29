let mongoose = require('mongoose') 
let {Schema} = mongoose

let todoSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    text: { type: String, required: true },
    mediaPath: String,
    mediaType: {
        type: String,
        enum: ['image', 'video', 'audio', null],
        default: null
    }
}, { timestamps: true })

module.exports = mongoose.model('Todo', todoSchema)