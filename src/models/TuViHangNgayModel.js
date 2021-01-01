const mongoose = require('mongoose');
const config = require('../common/config/env.config');
mongoose.connect(config.mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

var TuViHangNgaySchema = new Schema({
    id: String,
    tuViHangNgay_content: String,
    date_time: Number,
});
var TuViHangNgayModel = mongoose.model('tuViHangNgays', TuViHangNgaySchema );
exports.findAll = () => {
    return new Promise((resolve, reject) => {
        TuViHangNgayModel.find()
            .exec(function (err, tuViHangNgay) {
                console.log("data",tuViHangNgay)
                if (err) {
                    reject(err);
                } else {
                    filtered_TuViHangNgay = tuViHangNgay.map(tuViHangNgay => {
                        return tuViHangNgay.toObject();
                    });
                    resolve(filtered_TuViHangNgay);
                }
            });
        }
    );
}
exports.addTuViHangNgay = (data) => {
    return new Promise((resolve, reject) => {
        TuViHangNgayModel.collection.insert(data, (err, docs)=>{
            if (err) {
                console.error("Error TuViHangNgayModel.collection.insert",err)
                reject(err)
            } else {
                resolve(docs);
            }
        })    
    });
}

// exports.findTuViHangNgayByTuViHangNgayname = (TuViHangNgayname) => {
//     return new Promise((resolve, reject) => {
//         TuViHangNgayModel.findOne({ TuViHangNgayname: TuViHangNgayname}, (err, res)=>{
//             if (err) {
//                 console.log("err TuViHangNgayModel.find")
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

exports.findTuViHangNgayId = (tuViHangNgayId) => {
    return new Promise((resolve, reject) => {
        TuViHangNgayModel.find({ id: tuViHangNgayId}, (err, res)=>{
            if (err) {
                console.log("err TuViHangNgayModel.find")
                reject(err);
            } else{
                filtered_TuViHangNgayId = res.map(tuViHangNgay => {
                    return tuViHangNgay.toObject();
                });
                resolve(filtered_TuViHangNgayId);
            }
        })
    });
}
exports.addTuViHangNgayId = (data,tuViHangNgay) => {
    console.log("data",data)
    return new Promise((resolve, reject) => {
        TuViHangNgayModel.updateOne({ id: data},tuViHangNgay, (err, docs)=>{
            if (err) {
                console.error("Error TuViHangNgayModel.collection.update",err)
                reject(err)
            } else {
                resolve(docs);
            }
        });
    })
}
exports.DeleteTuViHangNgayId = (data,tuViHangNgay) => {
    console.log("data",data)
    return new Promise((resolve, reject) => {
        TuViHangNgayModel.deleteOne({ id: data},(err, docs)=>{
            if (err) {
                console.error("Error TuViHangNgayModel.collection.delete",err)
                reject(err)
            } else {
                resolve(docs);
            }
        });
    })
}