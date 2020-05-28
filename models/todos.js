const {Schema, model} = require('mongoose');

const toDoSchema = new Schema({
    name: {type: String, required: true},
    done: Boolean
})

module.exports = model('Todo', toDoSchema);