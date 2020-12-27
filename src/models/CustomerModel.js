const mongoose = require('mongoose');
const config = require('../common/config/env.config');
mongoose.connect(config.mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const HistoryModel = require('./HistoryModel');

var CustomerSchema = new Schema({
    id: String ,
    card: String,
    name: String,
    address: String,
    email: String,
    dob: Number,
    phone_number: Number,
    created_at: Number,
    info: Object,
    create_time: Number,
    update_time: Number,
    history: Object
});
var CustomerModel = mongoose.model('customer', CustomerSchema );
exports.findAll = () => {
    return new Promise((resolve, reject) => {
        CustomerModel.find()
            .exec(function (err, customer) {
                console.log("data",customer)
                if (err) {
                    reject(err);
                } else {
                    filtered_customer = customer.map(user => {
                        return user.toObject();
                    });
                    resolve(filtered_customer);
                }
            });
        }
    );
}
exports.addCustomer = (data) => {
    return new Promise((resolve, reject) => {
        CustomerModel.collection.insert(data, (err, docs)=>{
            if (err) {
                console.error("Error customerModel.collection.insert",err)
                reject(err)
            } else {
                resolve(docs);
            }
        })    
    });
}
exports.findCustomerId = (customerId) => {
    return new Promise((resolve, reject) => {
        CustomerModel.find({ id: customerId}, (err, res)=>{
            if (err) {
                console.log("err customerModel.find")
                reject(err);
            } else{
                filtered_customerId = res.map(customer => {
                    return customer.toObject();
                });
                resolve(filtered_customerId);
                console.log("customer",filtered_customerId[0]);
            }
        })
    });
}
exports.addCustomerId = (data,customer) => {
    console.log("data",data)
    return new Promise((resolve, reject) => {
        CustomerModel.updateOne({ id: data},customer, (err, docs)=>{
            if (err) {
                console.error("Error customerModel.collection.update",err)
                reject(err)
            } else {
                resolve(docs);
            }
        });
    })
}
exports.DeleteCustomerId = (data,customer) => {
    console.log("data",data)
    return new Promise((resolve, reject) => {
        CustomerModel.deleteOne({ id: data},(err, docs)=>{
            if (err) {
                console.error("Error customerModel.collection.delete",err)
                reject(err)
            } else {
                resolve(docs);
            }
        });
        
    })
}




