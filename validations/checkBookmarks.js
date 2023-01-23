const checkName = (req, res, next) => {
    if (req.body.name) {
      next();
    } else {
      res.status(400).json({ error: "Name is required" });
    }
  };

  const checkBoolean = (req, res, next) => {
    const { is_favorite } = req.body;
    if (typeof is_favorite === "boolean") {
      next();
    } else {
      res.status(400).json({ error: "is_favorite must be a boolean value" });
    }
  };

//   VALIDATE URL 
const validateURL = (req, res, next) => {
    if (
      req.body.url.substring(0, 7) === "http://" ||
      req.body.url.substring(0, 8) === "https://"
    ) {
      return next();
    } else {
      res
        .status(400)
        .json({ error: `You forgot to start your url with http:// or https://` });
    }
  };


  module.exports = {
    checkName,
    checkBoolean,
    validateURL,
  }