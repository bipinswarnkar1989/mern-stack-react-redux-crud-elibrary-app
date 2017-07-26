import mongoose from 'mongoose';
import Book from './book.server.model';
let Schema = mongoose.Schema({
        createdAt: {
            type:Date,
            default:Date.now
        },
      book: {
        type:mongoose.Schema.ObjectId,
        ref: 'Book'
      }
});

export default mongoose.model('Favourite',Schema);
