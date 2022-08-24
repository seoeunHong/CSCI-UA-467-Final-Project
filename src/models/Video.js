const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {type: String, required: true, trim: true, maxLength: 50},
  fileUrl: {type: String, required: true},
  description: {type: String, required: true, trim: true},
  createdAt: {type: Date, required: true, default: Date.now},
  creator: {type: mongoose.Schema.ObjectId, required: true, ref: 'User'},
  hashtags: [{type: String, trim: true}],
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
