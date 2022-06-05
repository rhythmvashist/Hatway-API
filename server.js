const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const routes = require("./routes");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.disable("x-powered-by");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", routes);

app.get("/", (req, res) => {
  res
    .status(200)
    .send({ message: "please redirect api calls to /api/ endpoint" });
});

app.listen(config.PORT, () => {
  console.log(`Example app listening at http://localhost:${config.PORT}`);
});

module.exports = app;
