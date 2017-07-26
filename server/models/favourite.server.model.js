import mongoose from 'mongoose';
let Schema = mongoose.Schema({
        createdAt: {
            type:Date,
            default:Date.now
        },
        title: String,
        imageUrl: String,
        author: String,
        price: Number,
        year: Number
});

export default mongoose.model('Favourite',Schema);
