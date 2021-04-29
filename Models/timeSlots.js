const mongoose = require('mongoose');

const timeSchema = new mongoose.Schema({
    time: {
        type: String,
        required: true
    },
    //comment belong to a user
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
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


const Time = mongoose.model('Time', timeSchema);
module.exports = Time;