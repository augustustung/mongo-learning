const express = require('express');

const router = new express.Router;

const User = require('../controllers/user.controller');
const Post = require('../controllers/post.controller');

router.get('/', (req, res) => res.send('ok'));
// user routes
router.post('/user/create', User.CreateUser);
router.post('/user/find', User.findAllUser);
router.post('/user/find/post', User.postsByUser);
// post routes
router.post('/post/create', Post.CreatePost);
router.post('/post/populate', Post.UserByPost);

module.exports = router;