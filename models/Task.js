const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Must Specify The Task Name'],
        maxlength : [20, 'Task Name should not exceed 2 characters'],
        trim : true,
    },
    completed : {
        type : Boolean,
        default : false,

    }
});

module.exports = mongoose.model('Task', TaskSchema);