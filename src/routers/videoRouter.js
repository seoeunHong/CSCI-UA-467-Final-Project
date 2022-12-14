const express = require('express');
const {watch, getEdit, postEdit, getUpload, postUpload, deleteVideo} = require('../controllers/videoController');
const {protectorMiddleware, publicOnlyMiddleware, videoUpload} = require('../middleware');

const videoRouter = express.Router();

videoRouter.get('/:id([0-9a-f]{24})', watch);
videoRouter.route('/:id([0-9a-f]{24})/edit').all(protectorMiddleware).get(getEdit).post(postEdit);
videoRouter.route('/:id([0-9a-f]{24})/delete').all(protectorMiddleware).get(deleteVideo);
videoRouter.route('/upload').all(protectorMiddleware).get(getUpload).post(videoUpload.single('video'), postUpload);

module.exports = videoRouter;
