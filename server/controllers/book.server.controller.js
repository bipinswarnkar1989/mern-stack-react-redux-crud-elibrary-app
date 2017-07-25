import mongoose from 'mongoose';
//import models
import  Book from '../models/book.server.model';
export const addBook = (req,res) => {
        console.log(req.body);
        //Create a new instance of Book model
        const newBook = new Book(req.body);
        newBook.save((err,book) => {
          if(err){
          return res.json({'message':'Some Error'});
          }

          return res.json({'message':'Book added successfully',book});
        })

}

 export const getBooks = (req,res,next) => {
         Book.find().exec((err,books) => {
           if(err){
           return res.json({'message':'Some Error'});
           }

           return res.json({'message':'Books fetched successfully',books});
         })
}
