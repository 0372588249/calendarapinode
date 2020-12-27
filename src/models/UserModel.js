const mongoose = require('mongoose');
const config = require('../common/config/env.config');
mongoose.connect(config.mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    id: String,
    username: String,
    salt: String,
    password: String,
    email: String,
    first_name: String,
    created_at: Number,
    role: Number,
    info: Object,
});
var UserModel = mongoose.model('users', UserSchema );
exports.findAll = () => {
    return new Promise((resolve, reject) => {
        UserModel.find()
            .exec(function (err, user) {
                console.log("data",user)
                if (err) {
                    reject(err);
                } else {
                    filtered_user = user.map(user => {
                        return user.toObject();
                    });
                    resolve(filtered_user);
                }
            });
        }
    );
}
exports.addUser = (data) => {
    return new Promise((resolve, reject) => {
        UserModel.collection.insert(data, (err, docs)=>{
            if (err) {
                console.error("Error userModel.collection.insert",err)
                reject(err)
            } else {
                resolve(docs);
            }
        })    
    });
}

exports.findUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        UserModel.findOne({ username: username}, (err, res)=>{
            if (err) {
                console.log("err userModel.find")
                reject(err);
            } else{
                if (res) {
                    filtered = res.toObject() 
                    resolve(filtered); 
                } else{
                    resolve(null);
                }
                
            }
        })
    });
}

exports.findUserId = (userId) => {
    return new Promise((resolve, reject) => {
        UserModel.find({ id: userId}, (err, res)=>{
            if (err) {
                console.log("err userModel.find")
                reject(err);
            } else{
                filtered_userId = res.map(user => {
                    return user.toObject();
                });
                resolve(filtered_userId);
            }
        })
    });
}
exports.addUserId = (data,user) => {
    console.log("data",data)
    return new Promise((resolve, reject) => {
        UserModel.updateOne({ id: data},user, (err, docs)=>{
            if (err) {
                console.error("Error userModel.collection.update",err)
                reject(err)
            } else {
                resolve(docs);
            }
        });
    })
}
exports.DeleteUserId = (data,user) => {
    console.log("data",data)
    return new Promise((resolve, reject) => {
        UserModel.deleteOne({ id: data},(err, docs)=>{
            if (err) {
                console.error("Error userModel.collection.delete",err)
                reject(err)
            } else {
                resolve(docs);
            }
        });
    })
}