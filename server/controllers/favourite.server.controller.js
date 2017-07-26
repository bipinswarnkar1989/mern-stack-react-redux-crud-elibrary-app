import mongoose from 'mongoose';
//import models
import  Favourite from '../models/favourite.server.model';
export const addFavourite = (req,res) => {
        console.log(req.body);
        //Create a new instance of Book model
        const newFavourite = new Favourite(req.body);
        newFavourite.save((err,favourite) => {
          if(err){
          return res.json({'message':'Some Error'});
          }

          return res.json({'message':'Favourite added successfully',favourite});
        })

}

 export const getFavourites = (req,res,next) => {
         Book.find().exec((err,favourites) => {
           if(err){
           return res.json({'message':'Some Error'});
           }

           return res.json({'message':'Favourites fetched successfully',favourites});
         })
}
