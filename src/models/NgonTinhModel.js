
const mongoose = require('mongoose');
const config = require('../../src/common/config/env.config');
mongoose.connect(config.mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

var CategorySchema = new Schema({
    catId: String,
    catName: String,
    kdCatName: String,
    root: String
});
var CategoryModel = mongoose.model('CategoryNgonTinh2', CategorySchema );

var StorySchema = new Schema({
    catId: String,
    detail: String,
    title:String,
    storyId: String
})

var StoryModel = mongoose.model('StoryNgonTinh4', StorySchema);


exports.addStories = (data) => {
    return new Promise((resolve, reject) => {

        StoryModel.collection.insertMany(data, (err, docs)=>{

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

exports.findStoryByCatId = (catId) => {

    return new Promise((resolve, reject) => {
        StoryModel.find({ catId: catId}, (err, res)=>{
            if (err) {
                console.log("err StoryModel.find")
                reject(err);
            } else{
                filtered_stories = res.map(story => {
                                    return story.toObject();
                                });
                resolve(filtered_stories);
            }
        })

        // CategoryModel.find()
        //     .exec(function (err, cats) {
        //         if (err) {
        //             reject(err);
        //         } else {
        //             filtered_cats = cats.map(user => {
        //                 return user.toObject();
        //             });
        //             resolve(filtered_cats);
        //         }
        //     });
    });
  
}



exports.addCategory = (data) => {
    return new Promise((resolve, reject) => {
        const cat = new CategoryModel(data)
        cat.save().then(doc => {
              console.log("eeee",doc)
              resolve(doc);
            })
            .catch(err => {
              console.error("eeee",err)
              reject(err);
              
            })
     
  });
    
}

exports.addCategories = (data) => {
    return new Promise((resolve, reject) => {

        CategoryModel.collection.insert(data, (err, docs)=>{

            if (err) {
                console.error("Error CategoryModel.collection.insert",err)
                reject(err)
            } else {
                resolve(docs);
            }
        })    
  });
    
}



exports.findAll = () => {

    return new Promise((resolve, reject) => {
        CategoryModel.find()
            .exec(function (err, cats) {
                if (err) {
                    reject(err);
                } else {
                    filtered_cats = cats.map(user => {
                        return user.toObject();
                    });
                    resolve(filtered_cats);
                }
            });
    });
  
}