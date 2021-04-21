const express = require('express');

function routes(Post) {
  const postRouter = express.Router();
  postRouter.route('/posts')
    .post((req, res) => {
      const post = new Post(req.body);
      post.save();
      res.status(201).json(post)
    })
    .get((req, res) => {
      const { query } = req;
      Post.find(query, (err, posts) => {
        if (err) {
          return res.send(err);
        }
        return res.json(posts);
      });
    });
  postRouter.use('/posts/:postId', (req, res, next) =>{
    Post.findById(req.params.postId, (err, post) => {
      if (err) {
        return res.send(err);
      }
      if(post) {
        req.post = post;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  postRouter.route('/posts/:postId')
    .get((req, res) =>  res.json(req.post))
    .put((req, res) => {
      const { post } = req;
      post.title = req.body.title;
      post.date = req.body.date;
      post.content = req.body.content;
      req.post.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(post);
        });
      return res.json(post);
    })
    .patch((req, res) => {
      const { post } = req;

      if (req.body._id) {
        delete req.body._id;
      }
      Object.entries(req.body).forEach(item => {
        const key = item[0];
        const value = item[1];
        post[key] = value;
      });
      req.post.save((err) => {
      if (err) {
        return res.send(err);
      }
      return res.json(post);
      });
    })
    .delete((req, res) => {
      req.post.remove((err) => {
        if(err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      })
    });
 
return postRouter; 
}

module.exports = routes;