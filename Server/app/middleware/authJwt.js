const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

const role = ["ROLE_USER", "ROLE_MODERATOR", "ROLE_ADMIN"];

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  // console.log(token);

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {

        if (user.role === "admin") {
          next();
          return;
        }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
 };

isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    
    // console.log(user.role);
    // console.log(user)


    // console.log(role[user.role]);
  
      if (role[user.role] === "ROLE_MODERATOR") {
        next();
        return;
      }

      res.status(403).send({
        message: "Require Moderator Role!"
      });
    });
  };

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
  
        if (user.role === "moderator") {
          next();
          return;
        }

        if (user.role === "admin") {
          next();
          return;
        }

      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  }

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;
