const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Must Specify The Task Name'],
        maxlength : [50, 'Task Name should not exceed 50 characters'],
        trim : true,
    },
    completed : {
        type : Boolean,
        default : false,

    }
});

module.exports = mongoose.model('Task', TaskSchema);