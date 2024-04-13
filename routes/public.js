const express = require('express');
const router = express.Router();


router.get('/', (req, res) => res.render("home"));
router.get('/demo/tag', (req, res) => res.render("tag"));
router.get('/demo/post/:id', (req, res) => res.render("post"));

module.exports = router;
