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

exports.removeDuplicate = (holder, posts) => {};
