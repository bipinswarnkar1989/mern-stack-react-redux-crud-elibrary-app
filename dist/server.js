'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _sourceMapSupport = require('source-map-support');

var _sourceMapSupport2 = _interopRequireDefault(_sourceMapSupport);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bookServer = require('./routes/book.server.route');

var _bookServer2 = _interopRequireDefault(_bookServer);

var _favouriteServer = require('./routes/favourite.server.route');

var _favouriteServer2 = _interopRequireDefault(_favouriteServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect('mongodb://localhost/myapp', {
  useMongoClient: true
});

_sourceMapSupport2.default.install();

const app = (0, _express2.default)();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(_express2.default.static('uploads'));
app.use(_express2.default.static(_path2.default.join(__dirname, 'static')));

// parse application/x-www-form-urlencoded
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());
app.use((0, _morgan2.default)('dev'));

app.use('/api/book', _bookServer2.default);
app.use('/api/favourite', _favouriteServer2.default);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(_path2.default.join(__dirname + '/public/index.html'));
});

//catch 404
app.use((req, res) => {
  res.end('Page Not Found');
});

app.listen(8080, () => {
  console.log('App Server Listening at 8080');
});
//# sourceMappingURL=server.js.map