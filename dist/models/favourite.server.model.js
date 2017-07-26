'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bookServer = require('./book.server.model');

var _bookServer2 = _interopRequireDefault(_bookServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Schema = _mongoose2.default.Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  book: {
    type: _mongoose2.default.Schema.ObjectId,
    ref: 'Book'
  }
});

exports.default = _mongoose2.default.model('Favourite', Schema);
//# sourceMappingURL=favourite.server.model.js.map