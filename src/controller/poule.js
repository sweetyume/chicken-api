import mongoose from 'mongoose';
import {Router} from 'express';
import Poule from '../model/poule';
import bodyParser from 'body-parser';
export default ({
  config,
  db
}) => {
  let api = Router();
  // 'v1/poule/add'
  api.post('/add', (req, res) => {
    let newChicken = new Poule();
    newChicken.name = req.body.name;
    newChicken.color = req.body.color;

    newChicken.save((err) => {
      if (err) {
        res.send(err);
      }
      res.json({
        message: 'Chicken saved successfully'
      });
    });
  });

  // 'v1/poule'
  api.get('/', (req, res) => {
    Poule.find({}, (err, poules) => {
      if (err) {
        res.send(err);
      }
      res.json(poules);
    });
  });

  // 'v1/poule/:id'

  api.get('/:id', (req, res) => {
    Poule.findById(req.params.id, (err, poule) => {
      if (err) {
        res.send(err);
      }
      res.json(poule);
    });
  });

  // 'v1/poule/update/:id'

  api.post('/update/:id', (req, res) => {
    const _id = req.params.id;
    Poule.findOneAndUpdate({
      _id
    }, req.body, {
      new: true
    }, (err, updatePoule) => {
      if (err) return res.send("Poule could not be changed");
      res.send(updatePoule);
    });
  });

  // 'v1/poule/delete/:id'
  api.delete('/delete/:id', (req, res) => {
    const _id = req.params.id;
    Poule.remove({
      _id
    }, (err, poule) => {
      if (err) return res.send("Poule could not be deleted");
      res.send(poule);
    });
  });
  return api;
};
