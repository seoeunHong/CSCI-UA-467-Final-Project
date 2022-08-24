const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = mongoose.model('User');

const getJoin = (req, res) => {
  res.render('join', {pageTitle: 'Join'});
};

const postJoin = async (req, res) => {
  const {name, username, email, password, password2} = req.body;
  const pageTitle = 'Join';
  if (password !== password2) {
    return res.status(400).render('join', {pageTitle, errorMessage: 'Password confirmation does not match'});
  }
  const exists = await User.exists({$or: [{username}, {email}]});
  if (exists) {
    return res.status(400).render('join', {pageTitle, errorMessage: 'This username/email is already taken'});
  }
  try {
    await User.create({
      name,
      username,
      email,
      password,
    });
  } catch {
    return res.status(400).render('join', {pageTitle, errorMessage: 'Cannot save your data'});
  }
  return res.redirect('/login');
};
const getLogin = (req, res) => {
  res.render('login', {pageTitle: 'Log in'});
};
const postLogin = async (req, res) => {
  const {username, password} = req.body;
  const pageTitle = 'Log in';
  const user = await User.findOne({username});
  if (!user) {
    return res.status(400).render('login', {pageTitle, errorMessage: 'An account with this username does not exists.'});
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render('login', {pageTitle, errorMessage: 'Password does not match with the username'});
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect('/');
};

const logout = (req, res) => {
  req.session.destroy();
  return res.redirect('/');
};

const see = async (req, res) => {
  const {id} = req.params;
  const user = await User.findById(id).populate({
    path: 'videos',
    populate: {
      path: 'creator',
      model: 'User',
    },
  });
  if (!user) {
    return res.status(404).render('404', {pageTitle: 'User not found'});
  }
  return res.render('profile', {pageTitle: user.name, user, videos: user.videos});
};

module.exports = {getJoin, postJoin, getLogin, postLogin, logout, see};
