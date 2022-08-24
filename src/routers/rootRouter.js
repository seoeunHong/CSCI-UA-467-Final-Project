const express = require('express');

const rootRouter = express.Router();

const {getJoin, postJoin, getLogin, postLogin} = require('../controllers/userController');
const {home, search} = require('../controllers/videoController');
const {protectorMiddleware, publicOnlyMiddleware} = require('../middleware');

rootRouter.get('/', home);
rootRouter.route('/join').all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter.route('/login').all(publicOnlyMiddleware).get(getLogin).post(postLogin);
rootRouter.get('/search', search);

module.exports = rootRouter;
