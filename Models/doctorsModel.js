const mongoose = require('mongoose');

const doctorsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    availableSlots: {
        type: Date ,
        required: true
    },
    timeRange: [{
        type: String,
        required: true
    }],
    timeSlots: [{
        type: String,
    }]
}, {
    timestamps: true,
    writeConcern: {
        j: true,
        wtimeout: 1000
      }
});


const Doctor = mongoose.model('Doctor', doctorsSchema);
module.exports = Doctor;