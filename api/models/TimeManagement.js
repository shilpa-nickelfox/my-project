const { times } = require('async');
const mongoose = require('mongoose');
const schema = mongoose.Schema;


// time Model for user

const timeSchema = mongoose.Schema({
  projectName: String,
  client: String,
  template: String,
  start: { type: Number, default: 0},
  end: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});


// on every save, add the date
timeSchema.pre('save', function (next) {
  var currentDate = new Date();
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

const TimeSchema = mongoose.model("TimeSchema", timeSchema);

module.exports = TimeSchema;