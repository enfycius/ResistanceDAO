const db = require("../models");
const config = require("../config/auth.config");
var sleep = require('system-sleep');
const Board = db.board;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.getBoards = (req, res) => {
  // Save User to Database
  Board.findAll({})
    .then(boards => {

      res.status(200).send(boards);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.postBoard = (req, res) => {
  // Save User to Database

  console.log("tst");

  console.log(req.body.content);

  console.log(req.body.title);

  Board.create({
    title: req.body.title,
    content: req.body.content,
  })
    .then(board => {
      res.status(200);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
