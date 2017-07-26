import mongoose from 'mongoose';
//import models
import  Favourite from '../models/favourite.server.model';
export const addFavourite = (req,res) => {
        console.log(req.body);
        //Create a new instance of Book model
        const newFavourite = new Favourite();
        newFavourite.book = req.body.id;
        newFavourite.save((err,favourite) => {
          if(err){
          return res.json({'message':'Some Error'});
          }

          Favourite.findOne({'_id':favourite._id}).populate('book').exec((err,f) => {
            if(err){
            return res.json({'message':'Some Error'});
            }

            return res.json({'message':'Favourite fetched successfully',f});
          });
        })

}

 export const getFavourites = (req,res,next) => {
         Favourite.find().populate('book').exec((err,favourites) => {
           if(err){
           return res.json({'message':'Some Error'});
           }

           return res.json({'message':'Favourites fetched successfully',favourites});
         })
}
