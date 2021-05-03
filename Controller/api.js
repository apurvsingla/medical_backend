const Doctor = require('../Models/doctorsModel');
let slot = [];
const Time = require('../Models/timeSlots');

module.exports.availableSlots = async (req,res) => {
    try {
        let doctor = await Doctor.find({availableSlots: req.body.date});
        if(doctor){
            return res.status(200).json({
                success: true,
                data: doctor,
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
    if(doctor){
        let selectTime = req.body.time;
        let newTime = ''
        doctor.map(i => {
            slot.push(i.timeSlots)
            i.timeSlots.map(j => {
                if(j === selectTime){
                    newTime = j;
                }
            })
        });
        var newArr = [];
        for(var i = 0; i < slot.length; i++)
        {
            newArr = newArr.concat(slot[i]);
        }

        let ind = newArr.indexOf(newTime);
        newArr.splice(ind,1);
        let d = await Doctor.findOneAndUpdate({availableSlots: req.body.date}, { $set: { timeSlots: newArr } })
        if(d){
            return res.status(200).json({message: `Time slot: ${req.body.time} successfully booked`})
        }else{
            return res.status(400).json({message: 'Sorry no time slot available for this time'})
        }
    }else{
        return res.status(400).json({message: 'Sorry no time slot available for this time'})
    }
    
    
}
