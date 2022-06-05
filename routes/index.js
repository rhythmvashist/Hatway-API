const express = require("express");
const axios = require("axios");
const router = express.Router();
const config = require("../config");
const {
  checkIsSort,
  checkDirection,
  removeDuplicate,
} = require("../utils/helper");

router.get("/api/ping", (req, res) => {
  res.status(200).send({ success: true });
});

router.get("/api/posts", async (req, res) => {
  const tags = req.query.tag;
  const sortBy = req.query.sortBy || "id";
  const direction = req.query.direction || "asc";

  if (!tags) {
    res.status(400).send({ error: "Tags parameter is required" });
  }

  if (!checkIsSort(sortBy)) {
    res.status(400).send({ error: "sortBy parameter is invalid" });
  }

  if (!checkDirection(direction)) {
    res.status(400).send({ error: "direction parameter is invalid" });
  }

  //
  const tagList = tags.split(",");
  let holder = {};
  let output = [];


  // make concurrent api calls
  const requests = tagList.map((tag) =>
    axios.get(`${config.BASE_URL}?tag=${tag}`)
  );

  try {
    // wait until all the api calls resolves
    const result = await Promise.all(requests);
    result.map((postData) => {

      // filter the response to ensure no duplicate post is sent back to the client
      postData.data.posts.forEach((post) => {
        if (!holder[post.id]) {
          holder[post.id] = 1;
          output.push(post);
        }
      });
    });
    
    return res.send({ posts: output });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

module.exports = router;
