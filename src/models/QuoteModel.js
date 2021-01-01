const mongoose = require('mongoose');
const config = require('../common/config/env.config');
mongoose.connect(config.mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

var QuoteSchema = new Schema({
    id: String,
    author: String,
    Quote_content: String,
});
var QuoteModel = mongoose.model('quotes', QuoteSchema );
exports.findAll = () => {
    return new Promise((resolve, reject) => {
        QuoteModel.find()
            .exec(function (err, quote) {
                console.log("data",quote)
                if (err) {
                    reject(err);
                } else {
                    filtered_Quote = quote.map(quote => {
                        return quote.toObject();
                    });
                    resolve(filtered_Quote);
                }
            });
        }
    );
}
exports.addQuote = (data) => {
    return new Promise((resolve, reject) => {
        QuoteModel.collection.insert(data, (err, docs)=>{
            if (err) {
                console.error("Error QuoteModel.collection.insert",err)
                reject(err)
            } else {
                resolve(docs);
            }
        })    
    });
}

// exports.findQuoteByQuotename = (Quotename) => {
//     return new Promise((resolve, reject) => {
//         QuoteModel.findOne({ Quotename: Quotename}, (err, res)=>{
//             if (err) {
//                 console.log("err QuoteModel.find")
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

exports.findQuoteId = (quoteId) => {
    return new Promise((resolve, reject) => {
        QuoteModel.find({ id: quoteId}, (err, res)=>{
            if (err) {
                console.log("err QuoteModel.find")
                reject(err);
            } else{
                filtered_QuoteId = res.map(quote => {
                    return quote.toObject();
                });
                resolve(filtered_QuoteId);
            }
        })
    });
}
exports.addQuoteId = (data,quote) => {
    console.log("data",data)
    return new Promise((resolve, reject) => {
        QuoteModel.updateOne({ id: data},quote, (err, docs)=>{
            if (err) {
                console.error("Error QuoteModel.collection.update",err)
                reject(err)
            } else {
                resolve(docs);
            }
        });
    })
}
exports.DeleteQuoteId = (data,quote) => {
    console.log("data",data)
    return new Promise((resolve, reject) => {
        QuoteModel.deleteOne({ id: data},(err, docs)=>{
            if (err) {
                console.error("Error QuoteModel.collection.delete",err)
                reject(err)
            } else {
                resolve(docs);
            }
        });
    })
}