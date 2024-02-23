const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    doctorName: {
        type: String,
        required: true,
    },
    issue: {
        type: String,
        required: true,
    },
});

const hospitalSchema = new mongoose.Schema({
    hospitalName: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    doctors: [doctorSchema],
});

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: false,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    hospitals: [hospitalSchema],
    phone: {
        type: String,
        required: true,
    },
    aadhaar: {
        type: String,
        required: true,
        unique: true,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
