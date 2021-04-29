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
    timeRange: {
        type: String,
        required: true
    }
    //comment belong to a user
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    // post: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Post'
    // },
    // likes: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Like'
    // }]
}, {
    timestamps: true
});


const Doctor = mongoose.model('Doctor', doctorsSchema);
module.exports = Doctor;