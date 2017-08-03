'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Schema = _mongoose2.default.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    title: String,
    filePath: String,
    fileName: String,
    author: String,
    price: Number,
    year: Number
});

exports.default = _mongoose2.default.model('Book', Schema);
//# sourceMappingURL=book.server.model.js.map