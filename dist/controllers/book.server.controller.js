'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteBook = exports.getBookById = exports.getBooks = exports.addBook = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _bookServer = require('../models/book.server.model');

var _bookServer2 = _interopRequireDefault(_bookServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//set multer storage
let storage = _multer2.default.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const date = Date.now();
    const yourfilename = file.originalname.split('.')[file.originalname.split('.').length - 2].replace(/ /g, '_');
    cb(null, file.fieldname + '-' + date + '_' + yourfilename + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
  }
});
//import models


const Upload = (0, _multer2.default)({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only pdf allowed'), false);
    }
  }
}).single('file');

const addBook = exports.addBook = (req, res) => {
  Upload(req, res, err => {
    if (err) {
      console.log('ERROR:' + err);
      return res.json({ 'success': false, 'message': 'Failed. Only pdf allowed', err });;
    } else {
      console.log(req.body);
      //Create a new instance of Book model
      const newBook = new _bookServer2.default(req.body);
      newBook.filePath = req.file.path;
      newBook.fileName = req.file.filename;
      newBook.save((err, book) => {
        if (err) {
          return res.json({ 'success': false, 'message': 'Some Error' });
        }

        return res.json({ 'success': true, 'message': 'Book added successfully', book });
      });
    }
  });
};

const getBooks = exports.getBooks = (req, res, next) => {
  _bookServer2.default.find().exec((err, books) => {
    if (err) {
      return res.json({ 'message': 'Some Error' });
    }

    return res.json({ 'message': 'Books fetched successfully', books });
  });
};

const getBookById = exports.getBookById = (req, res) => {
  _bookServer2.default.find({ _id: req.params.id }).exec((err, book) => {
    if (err) {
      return res.json({ 'success': false, 'message': 'Some Error' });
    }
    if (book.length) {
      return res.json({ 'success': true, 'message': 'Book fetched by id successfully', book });
    } else {
      return res.json({ 'success': false, 'message': 'Book with the given id not found' });
    }
  });
};

const deleteBook = exports.deleteBook = (req, res) => {
  _bookServer2.default.findByIdAndRemove(req.params.id, (err, book) => {
    if (err) {
      return res.json({ 'success': false, 'message': 'Some Error', 'error': err });
    }
    _fs2.default.unlink(book.filePath);
    return res.json({ 'success': true, 'message': book.title + ' deleted successfully' });
  });
};
//# sourceMappingURL=book.server.controller.js.map