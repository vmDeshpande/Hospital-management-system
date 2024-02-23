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
                        // Add more inventory items as needed
                    },
                }
            ]
        }
    ]
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;