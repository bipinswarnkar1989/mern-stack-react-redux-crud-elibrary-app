'use strict';

Object.defineProperty(exports, "__esModule", {
      value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bookServer = require('../controllers/book.server.controller');

var bookController = _interopRequireWildcard(_bookServer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

// //set multer diskstorage
// var storage = multer.diskStorage({
// 	destination: function(req,file,callback){
// 		callback(null, './uploads');
// 	},
// 	filename: function(req,file,callback){
// 		//callback(null,file.fileldname+'_'+file.originalname.replace(path.extname(file.originalname),'_')+'_'+Date.now()+path.extname(file.originalname));
// 		var datetimestamp = Date.now();
//         callback(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
// 	}
// });
//
// var upload = multer({ storage: storage }).single('file');

router.route('/').get(bookController.getBooks).post(bookController.addBook);

router.route('/:id').get(bookController.getBookById).delete(bookController.deleteBook);

exports.default = router;
//# sourceMappingURL=book.server.route.js.map