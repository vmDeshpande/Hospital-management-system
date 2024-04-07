const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: false,
        required: true,
      },
    name: {
        type: String,
        unique: false,
        required: true
    },
    age: {
        type: Number,
        unique: false,
        required: true
    },
    issues: {
        type: String,
        unique: false,
        required: true
    },
    city: {
        type: String,
        unique: false,
        required: false
    },
    hospital: {
        type: String,
        unique: false,
        required: false
    },
    bed: {
        type: String
    }
    
});

const Post = mongoose.model('appointments', appointmentSchema);

module.exports = Post;
