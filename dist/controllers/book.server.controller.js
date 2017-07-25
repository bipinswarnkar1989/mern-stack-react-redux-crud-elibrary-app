'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBooks = exports.addBook = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bookServer = require('../models/book.server.model');

var _bookServer2 = _interopRequireDefault(_bookServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const addBook = exports.addBook = (req, res) => {
  console.log(req.body);
  //Create a new instance of Book model
  const newBook = new _bookServer2.default(req.body);
  newBook.save((err, book) => {
    if (err) {
      return res.json({ 'message': 'Some Error' });
    }

    return res.json({ 'message': 'Book added successfully', book });
  });
};
//import models
const getBooks = exports.getBooks = (req, res, next) => {
  _bookServer2.default.find().exec((err, books) => {
    if (err) {
      return res.json({ 'message': 'Some Error' });
    }

    return res.json({ 'message': 'Books fetched successfully', books });
  });
};
//# sourceMappingURL=book.server.controller.js.map