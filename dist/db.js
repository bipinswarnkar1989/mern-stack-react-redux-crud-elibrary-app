'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dbUrl = 'mongodb://localhost/boookStore';

const connectDb = dbUrl => {
  _mongoose2.default.Promise = global.Promise;
  return _mongoose2.default.connect(dbUrl, {
    useMongoClient: true
  });
};

exports.default = connectDb;
//# sourceMappingURL=db.js.map