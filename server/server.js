import express from 'express';
import bodyParser from 'body-parser';
import SourceMapSupport from 'source-map-support';
import path from 'path';
import logger from 'morgan';
import mongoose from 'mongoose';

import bookRoutes from './routes/book.server.route';

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

app.use(express.static('static'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(logger('dev'));

app.use('/api/book',bookRoutes);



//catch 404
app.use(function(req,res){
  res.end('Page Not Found');
})

app.listen(8080,() => {
  console.log('App Server Listening at 8080');
})
