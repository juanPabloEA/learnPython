var mongoose = require('mongoose');
var gridfs = require('./gridfs');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
//var  q = require('q')

var dbConn =  'mongodb://127.0.0.1:27017/mongouploads';
var db ;
var gfs;
function init() {
    
    return mongoose.connect(dbConn, {useMongoClient: true})
      .then(function () {
        db = mongoose.connection;
        mongoose.Promise = global.Promise;
        gfs = Grid(db , mongoose.mongo);
        gfs.collection('uploads');
      })
      .catch(function (err) {
        throw err;
      });
  }
  
  
  module.exports = {
    init: init,
    dbConn: dbConn,
    db: db,
    gfs: gfs
  };