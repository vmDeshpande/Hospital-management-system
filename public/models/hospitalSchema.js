const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    cities: [
        {
            name: {
                type: String,
                required: true,
            },
            hospitals: [
                {
                    name: {
                        type: String,
                        required: true,
                    },
                    inventory: {
                        medicalEquipment: {
                            type: Number,
                            default: 0,
                        },
                        beds: {
                            type: Number,
                            default: 0,
                        },
                    },
                    doctors: [
                       {
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
                    }
                    ],
                }
            ]
        }
    ]
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;