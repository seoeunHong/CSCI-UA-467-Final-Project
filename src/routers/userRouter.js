const express = require('express');
const {logout, see} = require('../controllers/userController');
const {protectorMiddleware, publicOnlyMiddleware} = require('../middleware');

const userRouter = express.Router();

userRouter.get('/logout', protectorMiddleware, logout);
userRouter.get('/:id', see);

module.exports = userRouter;
