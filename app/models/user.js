let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//user schema definition
let UserSchema = new Schema(
  {
    email: { type: String, required: true },
    forename: { type: String, required: true },
    surname: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now }
  },
  {
    versionKey: false
  }
);

// Sets the createdAt parameter equal to the current time
UserSchema.pre('save', next => {
  now = new Date();
  if(!this.dateCreated) {
    this.dateCreated = now;
  }
  next();
});

module.exports = mongoose.model('user', UserSchema);
