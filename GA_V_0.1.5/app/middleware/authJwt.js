const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;

verifyAdminRole = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    User.findByPk(decoded.id).then((user) => {
      if (user.role === "admin") {
        next();
      } else {
        return res.status(403).send({ message: "Require Admin Role!" });
      }
    });
  });
};

module.exports = {
  verifyAdminRole,
};
