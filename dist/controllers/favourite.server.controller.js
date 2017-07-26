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
  const newFavourite = new _favouriteServer2.default(req.body);
  newFavourite.save((err, favourite) => {
    if (err) {
      return res.json({ 'message': 'Some Error' });
    }

    return res.json({ 'message': 'Favourite added successfully', favourite });
  });
};
//import models
const getFavourites = exports.getFavourites = (req, res, next) => {
  Book.find().exec((err, favourites) => {
    if (err) {
      return res.json({ 'message': 'Some Error' });
    }

    return res.json({ 'message': 'Favourites fetched successfully', favourites });
  });
};
//# sourceMappingURL=favourite.server.controller.js.map