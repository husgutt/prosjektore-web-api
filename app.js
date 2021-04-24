const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express();
const db = mongoose.connect(`mongodb://${process.env.USER}:${process.env.PASSWORD}@${process.env.DB_HOST}/${process.env.DB}`);
const port = process.env.PORT || 3000;
const Post = require('./models/postModel')
const postRouter = require('./routes/postRouter')(Post);
const Backlog = require('./models/backlogModel')
const backlogRouter = require('./routes/backlogRouter')(Backlog);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', postRouter);
app.use('/api', backlogRouter);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
 