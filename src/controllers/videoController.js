const mongoose = require('mongoose');

const Video = mongoose.model('Video');
const User = mongoose.model('User');

const home = async (req, res) => {
  const videos = await Video.find({}).sort({createdAt: 'desc'}).populate('creator');
  res.render('homepage', {pageTitle: 'Share your ______ moments!', videos});
};

const watch = async (req, res) => {
  const {id} = req.params;
  const video = await Video.findById(id).populate('creator');
  if (!video) {
    return res.render('404', {pageTitle: 'There is no such moment'});
  }
  const isEqual = String(video.creator._id) === String(res.locals.loggedInUser._id);
  console.log(isEqual);
  return res.render('watch', {pageTitle: video.title, video, isEqual});
};

const getEdit = async (req, res) => {
  const {id} = req.params;
  const {
    user: {_id},
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.render('404', {pageTitle: 'There is no such moment!'});
  }
  if (String(video.creator) !== String(_id)) {
    return res.status(403).redirect('/');
  }
  return res.render('edit', {pageTitle: `Editing ${video.title}`, video});
};

const postEdit = async (req, res) => {
  const {id} = req.params;
  const {
    user: {_id},
  } = req.session;
  const {title, description, hashtags} = req.body;
  const video = await Video.exists({_id: id});
  if (!video) {
    return res.status(404).render('404', {pageTitle: 'There is no such moments!'});
  }
  if (String(video.creator) !== String(_id)) {
    return res.status(403).redirect('/');
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: hashtags.split(',').map(word => (word.startsWith('#') ? word : `#${word}`)),
  });
  res.redirect(`/videos/${id}`);
};

const getUpload = (req, res) => {
  res.render('upload', {pageTitle: 'Share your moments!'});
};

const postUpload = async (req, res) => {
  const {
    user: {_id},
  } = req.session;
  const {location: fileUrl} = req.file;
  const {title, description, hashtags} = req.body;
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl,
      creator: _id,
      hashtags: hashtags.split(',').map(word => (word.startsWith('#') ? word : `#${word}`)),
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    res.redirect('/');
  } catch (error) {
    res.status(400).render('upload', {
      pageTitle: 'Share your moments!',
      errorMessage: 'Cannot Save',
    });
  }
};

const deleteVideo = async (req, res) => {
  const {id} = req.params;
  const {
    user: {_id},
  } = req.session;
  const video = await Video.findById(id);
  const user = await User.findById(_id);
  if (!video) {
    return res.status(404).render('404', {pageTitle: 'Video not found.'});
  }
  if (String(video.creator) !== String(_id)) {
    return res.status(403).redirect('/');
  }
  await Video.findByIdAndDelete(id);
  user.videos.splice(user.videos.indexOf(id), 1);
  user.save();
  return res.redirect('/');
};

const search = async (req, res) => {
  const {keyword} = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, 'i'),
      },
    }).populate('creator');
  }
  res.render('search', {pageTitle: 'Search', videos});
};
module.exports = {home, watch, getEdit, postEdit, getUpload, postUpload, deleteVideo, search};
