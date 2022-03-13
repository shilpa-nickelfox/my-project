var mongoose = require('mongoose');
var schema = mongoose.Schema;
const crypto = require('crypto');
  
// Create Model for user

var AdminUserSchema = mongoose.Schema({
    name              : String,
    email             : String,
    password          : String,
    authorizeToken    : String,
    lastLogin         : Date,
    resetPasswordToken: {
      type: String,
      required: false
  },

  resetPasswordExpires: {
      type: Date,
      required: false
  },
    userStatus          : { type : Number, default : 1 },
    created_at          : { type : Date, default: Date.now },
    updated_at          : { type : Date, default: Date.now }
});

AdminUserSchema.methods.generatePasswordReset = function() {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};
// on every save, add the date
AdminUserSchema.pre('save', function(next) {
    // get the current date
    // var currentDate = new Date();
    var currentDate = new Date();
  
    // change the updated_at field to current date
    this.updated_at = currentDate;
  
    // if created_at doesn't exist, add to that field
    if (!this.created_at)
      this.created_at = currentDate;
  
    next();
  });

var Adminuser = mongoose.model("Adminuser", AdminUserSchema);

module.exports = Adminuser;