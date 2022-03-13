var mongoose = require('mongoose');

/**
 * Mlab DB Credentials
 */

 mongoose.connect('mongodb+srv://User:5dynFtlLmDq8FUWK@cluster0.jmzgi.mongodb.net/test',  { useNewUrlParser: true,useUnifiedTopology: true}, function(err,db){

    // if(err) throw err;
    if (err) { return console.error('failed',err);} else{ console.log("db connected"); } 

});

module.exports = mongoose.connection;