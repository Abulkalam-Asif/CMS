require("dotenv").config();
const express = require('express');
const cors = require('cors');
const dbConnect = require('./dbConnect');
const session = require("express-session");
const cookieParser = require("cookie-parser");

dbConnect();
const app = express();
const port = 5000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  },
  resave: false
}));



// Routes
app.use('/api', require('./routes'));

app.listen(port, () => {
  console.log(`api listening on port ${port}`);
});