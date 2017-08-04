'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFavourites = exports.addFavourite = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _favouriteServer = require('../models/favourite.server.model');

var _favouriteServer2 = _interopRequireDefault(_favouriteServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const addFavourite = exports.addFavourite = (req, res) => {
  console.log(req.body);
  //Create a new instance of Book model
  const newFavourite = new _favouriteServer2.default();
  newFavourite.book = req.body.id;
  newFavourite.save((err, favourite) => {
    if (err) {
      return res.json({ 'success': false, 'message': 'Some Error' });
    }

    _favouriteServer2.default.findOne({ '_id': favourite._id }).populate('book').exec((err, f) => {
      if (err) {
        return res.json({ 'success': false, 'message': 'Some Error' });
      }

      return res.json({ 'success': true, 'message': 'Favourite fetched successfully', f });
    });
  });
};
//import models
const getFavourites = exports.getFavourites = (req, res, next) => {
  _favouriteServer2.default.find().populate('book').exec((err, favourites) => {
    if (err) {
      return res.json({ 'success': false, 'message': 'Some Error' });
    }

    return res.json({ 'success': true, 'message': 'Favourites fetched successfully', favourites });
  });
};
//# sourceMappingURL=favourite.server.controller.js.map