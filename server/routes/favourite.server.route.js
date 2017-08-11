import express from 'express';
import * as  favouriteController from '../controllers/favourite.server.controller';

const router = express.Router();



router.route('/')
      .get(favouriteController.getFavourites)
      .post(favouriteController.addFavourite);

router.route('/:id')
      .delete(favouriteController.deleteFavourite);


export default router;
