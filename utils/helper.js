exports.SortByAndOrderByProperty = (posts, property, direction) => {
  if (direction == "asc") {
    posts.sort((a, b) => (a[`${property}`] > b[`${property}`] ? 1 : -1));
  } else {
    posts.sort((a, b) => (a[`${property}`] > b[`${property}`] ? -1 : 1));
  }
  return posts;
};

exports.checkIsSort = (param) => {
  const allowedParams = ["id", "reads", "likes", "popularity"];

  if (allowedParams.includes(param)) {
    return true;
  }

  return false;
};

exports.checkDirection = (param) => {
  const allowedParams = ["asc", "desc"];
  if (allowedParams.includes(param)) {
    return true;
  }

  return false;
};
