const mongoose = require('mongoose');

const { Schema } = mongoose;

const backlogModel = new Schema(
  {
    date: {type:String},
    title: {type: String},
    shortDescription: {type: String},
    description: {type: String}
  }
);

module.exports = mongoose.model('Backlog', backlogModel);