const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  username: {type: String, require: true, unique: true},
  password: {type: String},
  name: {type: String, required: true},
  videos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Video'}],
});

userSchema.pre('save', async function () {
  // "this" here means the user being saved
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User,
};
