const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
  try {
     const currentUser = await User.findById(req.session.user._id);
  res.render('hikes/index.ejs', {
      hikes: currentUser.hikes,
    });
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
});

router.get('/new', async (req, res) => {
    res.render('hikes/new.ejs');
  });


  router.post('/', async (req, res) => {
    try {
       const currentUser = await User.findById(req.session.user._id);
     currentUser.hikes.push(req.body); 
      await currentUser.save();
     res.redirect(`/users/${currentUser._id}/hikes`);
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  });

  router.get('/:hikeId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const hike = currentUser.hikes.id(req.params.hikeId);
      res.render('hikes/show.ejs', {
        hike: hike,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  });


  router.delete('/:hikeId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      currentUser.hikes.id(req.params.hikeId).deleteOne();
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/hikes`);
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  });
  router.get('/:hikeId/edit', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const hike = currentUser.hikes.id(req.params.hikeId);
      res.render('hikes/edit.ejs', {
        hike: hike,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  });

  router.put('/:hikeId', async (req, res) => {
    try {
     const currentUser = await User.findById(req.session.user._id);
        const hike = currentUser.hikes.id(req.params.hikeId);
    hike.set(req.body);
      await currentUser.save();
       res.redirect(
        `/users/${currentUser._id}/hikes/${req.params.hikeId}`
      );
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  });

  module.exports = router;