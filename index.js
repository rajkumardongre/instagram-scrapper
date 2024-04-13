const express = require('express');
// const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const publicRoutes = require('./routes/public');
const publicAPIRoutes = require('./routes/posts-api');

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded());

// view engine
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;

app.get('/test', (req, res) => {
	res.send("Hello from InstaScrapper")
});

// Public routes
app.use("/api/posts", publicAPIRoutes)
app.use("/", publicRoutes)


app.listen(port, () => console.log(`Listening on port ${port}`))
