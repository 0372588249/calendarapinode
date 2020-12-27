
const mongoose = require('mongoose');
const config = require('../common/config/env.config');
mongoose.connect(config.mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

var CareSchema = new Schema({
    careid: String,
    care_name: String,
    description_care: String,
});
var CareModel = mongoose.model('carecards', CareSchema );
exports.findAll = () => {
    
    return new Promise((resolve, reject) => {
        CareModel.find({}, (err, res)=>{
            console.log("err, res", err, res)
            if (err) {
                console.log("err CareModel.find")
                reject(err);
            } else{
                filtered = res.map(data => {
                                    return data.toObject();
                                });
                resolve(filtered);
            }
        })
        
        }
    );
}
exports.addCare = (data) => {
    return new Promise((resolve, reject) => {
        CareModel.collection.insert(data, (err, docs)=>{
            if (err) {
                console.error("Error CareModel.collection.insert",err)
                reject(err)
            } else {
                resolve(docs);
            }
        })    
    });
}
exports.findCareId = (careId) => {
    return new Promise((resolve, reject) => {
        CareModel.find({ id: careId}, (err, res)=>{
            if (err) {
                console.log("err CareModel.find")
                reject(err);
            } else{
                filtered_careId = res.map(care => {
                    return care.toObject();
                });
                resolve(filtered_careId);
            }
        })
    });
}
exports.addCareId = (data,care) => {
    console.log("data",data)
    return new Promise((resolve, reject) => {
        CareModel.updateOne({ id: data},care, (err, docs)=>{
            if (err) {
                console.error("Error CareModel.collection.update",err)
                reject(err)
            } else {
                resolve(docs);
            }
        });
        
    })
        // )

        // const cat = new CareModel(care)
        // cat._id=data
        // console.log("cat",cat)
        // cat.save().then(doc => {
        //       console.log("eeee",doc)
        //       resolve(doc);
        //     })
        //     .catch(err => {
        //       console.error("eeee",err)
        //       reject(err);
        //     })
        // }
}
exports.DeleteCareId = (data,care) => {
    console.log("data",data)
    return new Promise((resolve, reject) => {
        CareModel.deleteOne({ id: data},(err, docs)=>{
            if (err) {
                console.error("Error CareModel.collection.delete",err)
                reject(err)
            } else {
                resolve(docs);
            }
        });
        
    })
        // )

        // const cat = new CareModel(care)
        // cat._id=data
        // console.log("cat",cat)
        // cat.save().then(doc => {
        //       console.log("eeee",doc)
        //       resolve(doc);
        //     })
        //     .catch(err => {
        //       console.error("eeee",err)
        //       reject(err);
        //     })
        // }
}




// exports.addStories = (data) => {
//     return new Promise((resolve, reject) => {
//         StoryModel.collection.insertMany(data, (err, docs)=>{

//             if (err) {
//                 console.error("Error StoryModel.collection.insert",err)
//                 reject(err)
//             } else {
//                 console.error("Success StoryModel.collection.insert",err)
//                 resolve(docs);
//             }
//         })    
//   });
// }





