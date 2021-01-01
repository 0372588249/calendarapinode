const mongoose = require('mongoose');
const config = require('../common/config/env.config');
mongoose.connect(config.mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

var DayEventSchema = new Schema({
    id: String,
    dayEvent_content: String,
    date_time: Number,
});
var DayEventModel = mongoose.model('dayEvents', DayEventSchema );
exports.findAll = () => {
    return new Promise((resolve, reject) => {
        DayEventModel.find()
            .exec(function (err, dayEvent) {
                console.log("data",dayEvent)
                if (err) {
                    reject(err);
                } else {
                    filtered_DayEvent = dayEvent.map(dayEvent => {
                        return dayEvent.toObject();
                    });
                    resolve(filtered_DayEvent);
                }
            });
        }
    );
}
exports.addDayEvent = (data) => {
    return new Promise((resolve, reject) => {
        DayEventModel.collection.insert(data, (err, docs)=>{
            if (err) {
                console.error("Error DayEventModel.collection.insert",err)
                reject(err)
            } else {
                resolve(docs);
            }
        })    
    });
}

// exports.findDayEventByDayEventname = (DayEventname) => {
//     return new Promise((resolve, reject) => {
//         DayEventModel.findOne({ DayEventname: DayEventname}, (err, res)=>{
//             if (err) {
//                 console.log("err DayEventModel.find")
//                 reject(err);
//             } else{
//                 if (res) {
//                     filtered = res.toObject() 
//                     resolve(filtered); 
//                 } else{
//                     resolve(null);
//                 }
                
//             }
//         })
//     });
// }

exports.findDayEventId = (dayEventId) => {
    return new Promise((resolve, reject) => {
        DayEventModel.find({ id: dayEventId}, (err, res)=>{
            if (err) {
                console.log("err DayEventModel.find")
                reject(err);
            } else{
                filtered_DayEventId = res.map(dayEvent => {
                    return dayEvent.toObject();
                });
                resolve(filtered_DayEventId);
            }
        })
    });
}
exports.addDayEventId = (data,dayEvent) => {
    console.log("data",data)
    return new Promise((resolve, reject) => {
        DayEventModel.updateOne({ id: data},dayEvent, (err, docs)=>{
            if (err) {
                console.error("Error DayEventModel.collection.update",err)
                reject(err)
            } else {
                resolve(docs);
            }
        });
    })
}
exports.DeleteDayEventId = (data,dayEvent) => {
    console.log("data",data)
    return new Promise((resolve, reject) => {
        DayEventModel.deleteOne({ id: data},(err, docs)=>{
            if (err) {
                console.error("Error DayEventModel.collection.delete",err)
                reject(err)
            } else {
                resolve(docs);
            }
        });
    })
}