
const mongoose = require('mongoose');
const config = require('../../../src/common/config/env.config');
mongoose.connect(config.mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

var UserInfoSchema = new Schema({
    name: String,
    username:String,
    password: String,
    phone:String,
    verifycode:String,
    status:Number // 0 pending , 1 active , -1 remove 
});
var UserInfoModel = mongoose.model('UserInfo', UserInfoSchema );

exports.addNewUser = (data) => {
    return new Promise((resolve, reject) => {
        var query = {'username': data.username}
        UserInfoModel.collection.findOne(query,(error, collection)=>{
            if (error == null) {
                console.log(collection)
                if (collection == null) {
                    UserInfoModel.collection.insert(data, (err, docs)=>{

                        if (err) {
                            console.error("Error UserInfoModel.collection.insert",err)
                            reject(err)
                        } else {
                            console.error("Success UserInfoModel.collection.insert",err)
                            resolve(docs);
                        }
                    }) 
                } else{
                    console.error("User Da ton tai",err)
                    // let tmp = null
                   // resolve(docs);

                }
            }
        })

          
  });
}

exports.updateUser = (data) => {
    return new Promise((resolve, reject) => {

        var query = {'username': data.username};
        UserInfoModel.findOneAndUpdate(query, data, {upsert: true}, (err, doc)=>{
            if (err) {
                console.error("Error UserInfoModel.findOneAndUpdate",err)
                reject(err)
            } else {
                console.error("Success UserInfoModel.findOneAndUpdate",err)
                resolve(doc);
            }
        })

  });
}

