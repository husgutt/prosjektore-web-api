const mongoose = require('mongoose');

const { Schema } = mongoose;

const postModel = new Schema(
  {
    date: {type:String},
    title: {type: String},
    content: {type: String}
  }
);

module.exports = mongoose.model('Post', postModel);