import express from 'express';
import bodyParser from 'body-parser';
import SourceMapSupport from 'source-map-support';
import path from 'path';
import logger from 'morgan';
import mongoose from 'mongoose';

import bookRoutes from './routes/book.server.route';
import favouriteRoutes from './routes/favourite.server.route';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/myapp', {
  useMongoClient: true,
});

SourceMapSupport.install();

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static('uploads'));
app.use(express.static(path.join(__dirname, 'static')));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use('/api/book',bookRoutes);
app.use('/api/favourite',favouriteRoutes);


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

//catch 404
app.use((req,res) => {
  res.end('Page Not Found');
})

app.listen(8080,() => {
  console.log('App Server Listening at 8080');
})
