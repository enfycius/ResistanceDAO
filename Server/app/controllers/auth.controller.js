const db = require("../models");
const config = require("../config/auth.config");
var sleep = require('system-sleep');
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    role: 1
  })
    .then(user => {

      res.send({ message: "User registered successfully!" });
      // if (req.body.roles) {
      //   Role.findAll({
      //     where: {
      //       name: {
      //         [Op.or]: req.body.roles
      //       }
      //     }
      //   }).then(roles => {
      //     user.setRoles(roles).then(() => {
      //       res.send({ message: "User registered successfully!" });
      //     });
      //   });
      // } else {
        // user role = 1
        // console.log("test");

        // console.log(user);

       

        // user.setRoles([1]).then(() => {
        //   console.log(user);
        //   console.log("Test");
          
        // });
      // }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: user.role,
          accessToken: token
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
