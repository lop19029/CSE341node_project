
/************ Andres ************/
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    uName: {
        type:String,
        required: true 
    },
    email: {
        type:String,
        required: true 
    },
    password: {
        type:String,
        required: true
    },
    role: {
        type:String,
        required: true, 
        default:"regular"
    },
});

module.exports = mongoose.model('User', userSchema);