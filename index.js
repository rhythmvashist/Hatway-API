const express = require("express");
const axios = require("axios");

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World checking!')
})

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:${3000}`);
});
