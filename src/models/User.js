const crypto = require('crypto');
const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({

  username:{
    type:String
  },
  email: {
    type: String,
    required:true
  },
  password: {
    type: String,
    required:true
  }
},
{
  collection: 'User'
})

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};
UserSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

module.exports =mongoose.model('User', UserSchema);