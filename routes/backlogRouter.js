const express = require('express');

function routes(Backlog) {
  const backlogRouter = express.Router();
  backlogRouter.route('/backlogs')
    .post((req, res) => {
      const backlog = new Backlog(req.body);
      backlog.save();
      res.status(201).json(backlog)
    })
    .get((req, res) => {
      const { query } = req;
      Backlog.find(query, (err, backlogs) => {
        if (err) {
          return res.send(err);
        }
        return res.json(backlogs);
      });
    });
  backlogRouter.use('/backlogs/:backlogId', (req, res, next) =>{
    Backlog.findById(req.params.backlogId, (err, backlog) => {
      if (err) {
        return res.send(err);
      }
      if(backlog) {
        req.backlog = backlog;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  backlogRouter.route('/backlogs/:backlogId')
    .get((req, res) =>  res.json(req.backlog))
    .put((req, res) => {
      const { backlog } = req;
      backlog.title = req.body.title;
      backlog.date = req.body.date;
      backlog.shortDescription = req.body.shortDescription;
      backlog.description = req.body.description;
      req.backlog.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(backlog);
        });
      return res.json(backlog);
    })
    .patch((req, res) => {
      const { backlog } = req;

      if (req.body._id) {
        delete req.body._id;
      }
      Object.entries(req.body).forEach(item => {
        const key = item[0];
        const value = item[1];
        backlog[key] = value;
      });
      req.backlog.save((err) => {
      if (err) {
        return res.send(err);
      }
      return res.json(backlog);
      });
    })
    .delete((req, res) => {
      req.backlog.remove((err) => {
        if(err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      })
    });
 
return backlogRouter; 
}

module.exports = routes;