const Doctor = require('../Models/doctorsModel');
let slot = [];
const Time = require('../Models/timeSlots');

module.exports.availableSlots = async (req,res) => {
    // await Doctor.deleteMany();
    // await Time.deleteMany()
    try {
        let doctor = await Doctor.find({availableSlots: req.body.date});
        let n = [];
        let newTime = doctor.map(i => {
            console.log(i.timeRange)
            i.timeRange.map(j => {
                n.push(j.split(','));
            })
        })
        let t = [];
        slot = []
        console.log(n)
        n.map((i) => {
            i.map(j => {
                t.push(j.split('-'))
            })
        });
        t.map(i => {
            let t1 = Number(i[0]);
            let t2 = Number(i[1]);
            while(t1 !== t2){
                slot.push(`${t1+'-'+Number(t1+0.5)}`)
                t1 = t1 + .5
            }
        })
        if(doctor){
            return res.status(200).json({
                success: true,
                data: doctor,
                time: slot
            });
        }else{
            return res.status(400).json({
                message: `fetching of time slots failed`
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: `fetching of time slots failed`
        }); 
    }
    
}


module.exports.doctorTime = (req,res) => {
    let newTime = req.body.timeRange.split(',');
    let t = [];
    newTime.map((i) => {
        t.push(i.split('-'))
    });

    t.map(i => {
        let t1 = Number(i[0]);
        let t2 = Number(i[1]);
        while(t1 !== t2){
            slot.push(`${t1+'-'+Number(t1+0.5)}`)
            t1 = t1 + .5
        }
    })
    req.body.timeSlots = [...slot];
    let doctor = new Doctor(req.body);

    if(!doctor){
        return res.status(400)
        .json({success: false, error: err});
    }
    doctor.save().then(() => {
        console.log(doctor,'doctor');
        return res.status(201).json({
            success: true,
            message: `Doctor ${doctor.name} is available 
            on ${doctor.availableSlots} at time ${doctor.timeRange}`,
            slot: slot
        })
    }).catch((error) => {
        return res.status(400).json({
            error,
            message: 'error in creating the doctor time slots'
        })
    })
}


module.exports.selectTimeSlot = async (req,res) => {
    let doctor = await Doctor.find({availableSlots: req.body.date});
    let n = [];
    let newTime = doctor.map(i => {
        if(i.timeSlots){
            i.timeSlots.map(j => {
                n.push(j.split(','));

            })
        }
    })
    let t = [];
    slot = []
    console.log(n)
    n.map((i) => {
        i.map(j => {
            t.push(j.split('-'))
        })
    });
    t.map(i => {
        let t1 = Number(i[0]);
        let t2 = Number(i[1]);
        while(t1 !== t2){
            slot.push(`${t1+'-'+Number(t1+0.5)}`)
            t1 = t1 + .5
        }
    })
    let selectTime = req.body.time;
    let ti = slot.filter((i) => i !== selectTime.time);
    slot = [...ti];
    let d = await Doctor.findOneAndUpdate({timeSlot: req.body.time}, { $set: { timeSlot: slot } })
    if(d){
        return res.status(200).json({message: `Time slot: ${req.body.time} successfully booked`})
    }else{
        return res.status(400).json({message: 'Sorry no time slot available for this time'})
    }
}
