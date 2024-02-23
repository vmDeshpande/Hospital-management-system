const mongoose = require('mongoose');

const doctorsSchema = new mongoose.Schema({
    doctor_name: {
        type: String,
    },
    specialization: {
        type: String,
    },
    patient_id: {
        type: String,
    },
    working_days: {
        type: String,
    },
})

const Doctor = mongoose.model('doctors', doctorsSchema);

module.exports = Doctor;
