const mongoose = require('mongoose');

const timeSchema = new mongoose.Schema({
    time: {
        type: String,
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
}, {
    timestamps: true,
    writeConcern: {
        j: true,
        wtimeout: 1000
      }
});


const Time = mongoose.model('Time', timeSchema);
module.exports = Time;