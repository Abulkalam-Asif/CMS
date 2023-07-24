require("dotenv").config();
const express = require('express');
const cors = require('cors');
const dbConnect = require('./dbConnect');

dbConnect();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', require('./routes'));

app.listen(port, () => {
  console.log(`api listening on port ${port}`);
});