import express from 'express';
import bookController from '../controllers/book.server.controller';

const router = express.Router();

router.route('/')
      .get((req,res) => {
       return res.json({ message:'Api working' });
      })


export default router;
