const mongoose = require('mongoose');
const config = require('../common/config/env.config');
mongoose.connect(config.mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

var LaughStorySchema = new Schema({
    id: String,
    laughStory_title: String,
    laughStory_content: String
});
var LaughStoryModel = mongoose.model('laughstorys', LaughStorySchema );
exports.findAll = () => {
    return new Promise((resolve, reject) => {
        LaughStoryModel.find()
            .exec(function (err, laughStory) {
                console.log("data",laughStory)
                if (err) {
                    reject(err);
                } else {
                    filtered_laughStory = laughStory.map(laughStory => {
                        return laughStory.toObject();
                    });
                    resolve(filtered_laughStory);
                }
            });
        }
    );
}
exports.addLaughStory = (data) => {
    return new Promise((resolve, reject) => {
        LaughStoryModel.collection.insert(data, (err, docs)=>{
            if (err) {
                console.error("Error LaughStoryModel.collection.insert",err)
                reject(err)
            } else {
                resolve(docs);
            }
        })    
    });
}

// exports.findLaughStoryByLaughStoryname = (LaughStoryname) => {
//     return new Promise((resolve, reject) => {
//         LaughStoryModel.findOne({ LaughStoryname: LaughStoryname}, (err, res)=>{
//             if (err) {
//                 console.log("err LaughStoryModel.find")
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

exports.findLaughStoryId = (laughStoryId) => {
    return new Promise((resolve, reject) => {
        LaughStoryModel.find({ id: laughStoryId}, (err, res)=>{
            if (err) {
                console.log("err LaughStoryModel.find")
                reject(err);
            } else{
                filtered_LaughStoryId = res.map(laughStory => {
                    return laughStory.toObject();
                });
                resolve(filtered_LaughStoryId);
            }
        })
    });
}
exports.addLaughStoryId = (data,laughStory) => {
    console.log("data",data)
    return new Promise((resolve, reject) => {
        LaughStoryModel.updateOne({ id: data},laughStory, (err, docs)=>{
            if (err) {
                console.error("Error LaughStoryModel.collection.update",err)
                reject(err)
            } else {
                resolve(docs);
            }
        });
    })
}
exports.DeleteLaughStoryId = (data,laughStory) => {
    console.log("data",data)
    return new Promise((resolve, reject) => {
        LaughStoryModel.deleteOne({ id: data},(err, docs)=>{
            if (err) {
                console.error("Error LaughStoryModel.collection.delete",err)
                reject(err)
            } else {
                resolve(docs);
            }
        });
    })
}