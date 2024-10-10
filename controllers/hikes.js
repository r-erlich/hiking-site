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

  router.get("/all", async (req, res)=> {
    try {
      const users = await User.find({}).select("username hikes")
      res.render("hikes/hikes.ejs", {users})
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  })

  

  router.get('/:hikeId', async (req, res) => {
    try {
      const selectedUserId = req.baseUrl.split("/")[2]
      
      const currentUser = await User.findById(selectedUserId);
      const hike = currentUser.hikes.id(req.params.hikeId);

      const ownerOfHike = selectedUserId === req.session.user._id

      res.render('hikes/show.ejs', {
        hike: hike,
        owner: ownerOfHike
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