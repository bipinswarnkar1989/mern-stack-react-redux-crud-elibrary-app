import mongoose from 'mongoose';
import multer from 'multer';
import fs from 'fs';
//import models
import  Book from '../models/book.server.model';
import  Favourite from '../models/favourite.server.model';

//set multer storage
let storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null, './uploads');
  },
  filename: (req,file,cb) => {
    const date = Date.now();
    const yourfilename = file.originalname.split('.')[file.originalname.split('.').length - 2].replace(/ /g, '_');
    cb(null, file.fieldname + '-' + date + '_'+ yourfilename + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
  }
});

const Upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
            if (file.mimetype === 'application/pdf') {
                cb(null, true);
            } else {
                cb(new Error('Only pdf allowed'), false);
            }
        }
}).single('file');


export const addBook = (req,res) => {
        Upload(req,res,(err) => {
          if(err){
            console.log('ERROR:'+err);
            return res.json({'success':false,'message':'Failed. Only pdf allowed',err});;
          }
          else{
            console.log(req.body);
            //Create a new instance of Book model
            const newBook = new Book(req.body);
            newBook.filePath = req.file.path;
            newBook.fileName = req.file.filename;
            newBook.save((err,book) => {
              if(err){
              return res.json({'success':false,'message':'Some Error'});
              }

              return res.json({'success':true,'message':'Book added successfully',book});
            })
          }
        });


}

 export const getBooks = (req,res,next) => {
         Book.find().exec((err,books) => {
           if(err){
           return res.json({'message':'Some Error'});
           }

           return res.json({'message':'Books fetched successfully',books});
         })
}

export const getBookById = (req,res) => {
  Book.find({_id:req.params.id}).exec((err,book) => {
    if(err){
    return res.json({'success':false,'message':'Some Error'});
    }
    if(book.length){
      return res.json({'success':true,'message':'Book fetched by id successfully',book});
    }
    else{
      return res.json({'success':false,'message':'Book with the given id not found'});
    }
  })
}

export const deleteBook = (req,res) => {
  Book.findByIdAndRemove(req.params.id,(err,book) => {
    if(err){
    return res.json({'success':false,'message':'Some Error','error':err});
    }
    fs.unlink(book.filePath);
    Favourite.remove({'book':req.params.id},(err) => {
      if(err){
        return res.json({'success':false,'message':'Some error','error':err});
      }
      return res.json({'success':true,'message':book.title+' deleted successfully'});
    })

  })
}

export const editBook = (req,res) => {
  Upload(req,res, (err) => {
    if(err){
      console.log('ERROR:'+err);
      return res.json({'success':false,'message':'Failed. Only pdf allowed',err});;
    }
    else{
      console.log('id:'+req.body._id);
      fs.unlink(req.body.filePath);
      req.body.filePath = req.file.path;
      req.body.fileName = req.file.filename;
      Book.findOneAndUpdate({_id:req.body._id}, req.body, { new: true }, (err,book) => {
        if(err){
        return res.json({'success':false,'message':'Some Error','error':err});
        }
        console.log(book);
        return res.json({'success':true,'message':'Updated successfully',book});
      })
    }
  })
}
