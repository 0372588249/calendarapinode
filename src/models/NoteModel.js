const mongoose = require('mongoose');
const config = require('../common/config/env.config');
mongoose.connect(config.mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

var NoteSchema = new Schema({
    id: String,
    note_title: String,
    note_content: String,
    date_time: Number,
});
var NoteModel = mongoose.model('notes', NoteSchema );
exports.findAll = () => {
    return new Promise((resolve, reject) => {
        NoteModel.find()
            .exec(function (err, note) {
                console.log("data",note)
                if (err) {
                    reject(err);
                } else {
                    filtered_note = note.map(note => {
                        return note.toObject();
                    });
                    resolve(filtered_note);
                }
            });
        }
    );
}
exports.addNote = (data) => {
    return new Promise((resolve, reject) => {
        NoteModel.collection.insert(data, (err, docs)=>{
            if (err) {
                console.error("Error NoteModel.collection.insert",err)
                reject(err)
            } else {
                resolve(docs);
            }
        })    
    });
}

// exports.findNoteByNotename = (Notename) => {
//     return new Promise((resolve, reject) => {
//         NoteModel.findOne({ Notename: Notename}, (err, res)=>{
//             if (err) {
//                 console.log("err NoteModel.find")
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

exports.findNoteId = (noteId) => {
    return new Promise((resolve, reject) => {
        NoteModel.find({ id: noteId}, (err, res)=>{
            if (err) {
                console.log("err NoteModel.find")
                reject(err);
            } else{
                filtered_noteId = res.map(note => {
                    return note.toObject();
                });
                resolve(filtered_noteId);
            }
        })
    });
}
exports.addNoteId = (data,note) => {
    console.log("data",data)
    return new Promise((resolve, reject) => {
        NoteModel.updateOne({ id: data},note, (err, docs)=>{
            if (err) {
                console.error("Error NoteModel.collection.update",err)
                reject(err)
            } else {
                resolve(docs);
            }
        });
    })
}
exports.DeleteNoteId = (data,note) => {
    console.log("data",data)
    return new Promise((resolve, reject) => {
        NoteModel.deleteOne({ id: data},(err, docs)=>{
            if (err) {
                console.error("Error NoteModel.collection.delete",err)
                reject(err)
            } else {
                resolve(docs);
            }
        });
    })
}