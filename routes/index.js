const express = require("express");
const axios = require("axios");
const router = express.Router();
const config = require("../config");
const {
  checkIsSort,
  checkDirection,
  SortByAndOrderByProperty,
} = require("../utils/helper");

// Routing the /api/ping call
router.get("/api/ping", (req, res) => {
  res.status(200).send({ success: true });
});

// routing the /api/post acall
router.get("/api/posts", async (req, res) => {
  const tags = req.query.tag;
  const sortBy = req.query.sortBy || "id";
  const direction = req.query.direction || "asc";


  // check all query params passed by the client are valid
  if (!tags) {
    return res.status(400).send({ error: "Tags parameter is required" });
  }

  if (!checkIsSort(sortBy)) {
    return res.status(400).send({ error: "sortBy parameter is invalid" });
  }

  if (!checkDirection(direction)) {
    return res.status(400).send({ error: "direction parameter is invalid" });
  }

  //if user passed multiple tags split the string into
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

    // Sort and arrange the post according to the SortBy and direction parameter passed by the client
    output = SortByAndOrderByProperty(output, sortBy, direction);
    return res.send({ posts: output });
  } catch (err) {
    // Catch exception if any concurrent calls goes wrong
    return res.status(500).json({ error: String(err) });
  }
});

module.exports = router;
