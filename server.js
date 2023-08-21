const express = require('express');
const dotenv = require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`Hello Am Live ✨ now`);
});

app.listen(PORT, () => {
  console.log(`server starting and run on port ${PORT}`);
});
