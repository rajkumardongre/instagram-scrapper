const express = require('express');
const { fetchPostsByTag, fetchPostsById } = require('../controllers');
const router = express.Router();


router.get('/', (req, res) => res.send("post-api route"));
router.get('/tag/:tag', fetchPostsByTag);
router.get('/:id', fetchPostsById);

module.exports = router;
