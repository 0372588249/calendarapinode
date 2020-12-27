
const mongoose = require('mongoose');
const config = require('../../src/common/config/env.config');
mongoose.connect(config.mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

var ChamNgonTinhYeuSchema = new Schema({
    tacgia:String,
    noidung:String,
    timestamp: Number,
})

var LoveDataSchema = new Schema({
    loveId: String,
    data: String,
    timestamp: Number,
});
var LoveDataModel = mongoose.model('LoveDataBeenLove', LoveDataSchema );

var ChamNgonTinhYeuModel = mongoose.model('ChamNgonTinhYeu', LoveDataSchema );

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }


 exports.addLoveData = (data) => {
    return new Promise((resolve, reject) => {

        let tmp = {
            loveId: makeid(8),
            data: data,
            timestamp: Math.floor(Date.now() / 1000)
        }

        LoveDataModel.collection.insert(tmp, (err, docs)=>{

            if (err) {
                console.error("Error StoryModel.collection.insert",err)
                reject(err)
            } else {
                console.error("Success StoryModel.collection.insert",err)
                resolve(docs);
            }
        })    
  });
}



exports.findLoveDataByLoveId = (loveId) => {

    return new Promise((resolve, reject) => {
        LoveDataModel.find({ loveId: loveId}, (err, res)=>{
            if (err) {
                console.log("err findLoveDataByLoveId.find")
                reject(err);
            } else{
                filtered = res.map(data => {
                                    return data.toObject();
                                });
                resolve(filtered);
            }
        })
    });
}

exports.addChamNgonTinhYeu = (data) => {
    return new Promise((resolve, reject) => {

        ChamNgonTinhYeuModel.collection.insert(data, (err, docs)=>{

            if (err) {
                console.error("Error ChamNgonTinhYeuModel.collection.insert",err)
                reject(err)
            } else {
                console.error("Success ChamNgonTinhYeuModel.collection.insert",err)
                resolve(docs);
            }
        })    
  });
}

exports.findChamNgonTinhYeu = () => {

    return new Promise((resolve, reject) => {

        // ChamNgonTinhYeuModel.find({}).sort('-date').limit(1).exec(function(err, posts){
        //     console.log("Emitting Update...");
        //     socket.emit("Update", posts.length);       
        //     console.log("Update Emmited");
        // });
        ChamNgonTinhYeuModel.find({}, (err, res)=>{
            if (err) {
                console.log("err findChamNgonTinhYeu.find")
                reject(err);
            } else{
                filtered = res.map(data => {
                                    return data.toObject();
                                });
                resolve(filtered);
            }
        })
    });
}