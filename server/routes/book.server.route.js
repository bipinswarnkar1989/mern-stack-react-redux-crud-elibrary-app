import express from 'express';
import * as  bookController from '../controllers/book.server.controller';


const router = express.Router();

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

router.route('/')
      .get(bookController.getBooks)
      .post(bookController.addBook);

router.route('/:id')
      .get(bookController.getBookById);



export default router;
