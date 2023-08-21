const express = require('express');
const { default: mongoose } = require('mongoose');
const dotenv = require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json());

//connect to the mongo database

mongoose
  .connect(process.env.MONGO_URI)
  .then(res => console.log(`Connected to mongo database`))
  .catch(err => console.error(err));

app.get('/', (req, res) => {
  res.send(`Hello Am Live ✨ now`);
});

app.listen(PORT, () => {
  console.log(`server starting and run on port ${PORT}`);
});
