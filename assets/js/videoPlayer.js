/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/videoPlayer.js":
/*!**************************************!*\
  !*** ./src/client/js/videoPlayer.js ***!
  \**************************************/
/***/ (() => {

eval("const video = document.querySelector('video');\nconst playBtn = document.getElementById('play');\nconst playBtnIcon = playBtn.querySelector('i');\nconst muteBtn = document.getElementById('mute');\nconst muteBtnIcon = muteBtn.querySelector('i');\nconst volumeRange = document.getElementById('volume');\nconst currenTime = document.getElementById('currenTime');\nconst totalTime = document.getElementById('totalTime');\nconst timeline = document.getElementById('timeline');\nconst fullScreenBtn = document.getElementById('fullScreen');\nconst fullScreenIcon = fullScreenBtn.querySelector('i');\nconst videoContainer = document.getElementById('videoContainer');\nconst videoControls = document.getElementById('videoControls');\n\nlet controlsTimeout = null;\nlet controlsMovementTimeout = null;\nlet volumeValue = 0.5;\nvideo.volume = volumeValue;\n\nconst handlePlayClick = e => {\n  if (video.paused) {\n    video.play();\n  } else {\n    video.pause();\n  }\n  playBtnIcon.classList = video.paused ? 'fas fa-play' : 'fas fa-pause';\n};\n\nconst handleMuteClick = e => {\n  if (video.muted) {\n    video.muted = false;\n    video.volume = 0.5;\n  } else {\n    video.muted = true;\n    video.volume = 0;\n  }\n  muteBtnIcon.classList = video.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';\n  volumeRange.value = video.muted ? 0 : 0.5;\n};\n\nconst handleVolumeChange = event => {\n  const {\n    target: {value},\n  } = event;\n  if (video.muted) {\n    video.muted = false;\n    muteBtnIcon.classList = 'fas fa-volume-mute';\n  }\n\n  video.volume = value;\n\n  if (Number(value) === 0) {\n    muteBtnIcon.classList = 'fas fa-volume-mute';\n    video.muted = true;\n  } else {\n    video.muted = false;\n    muteBtnIcon.classList = 'fas fa-volume-up';\n  }\n};\n\nconst formatTime = seconds => {\n  if (seconds >= 3600 * 1000) {\n    return new Date(seconds * 1000).toISOString().substring(11, 19);\n  } else {\n    return new Date(seconds * 1000).toISOString().substring(14, 19);\n  }\n};\n\nconst handleLoadedMetadata = () => {\n  totalTime.innerText = formatTime(Math.floor(video.duration));\n  timeline.max = Math.floor(video.duration);\n};\n\nconst handleTimeUpdate = () => {\n  currenTime.innerText = formatTime(Math.floor(video.currentTime));\n  timeline.value = Math.floor(video.currentTime);\n};\n\nconst handleTimelineChange = event => {\n  const {\n    target: {value},\n  } = event;\n  video.currentTime = value;\n};\n\nconst handleFullscreen = () => {\n  const fullscreen = document.fullscreenElement;\n  if (fullscreen) {\n    document.exitFullscreen();\n    fullScreenIcon.classList = 'fas fa-expand';\n  } else {\n    videoContainer.requestFullscreen();\n    fullScreenIcon.classList = 'fas fa-compress';\n  }\n};\n\nconst hideControls = () => videoControls.classList.remove('showing');\n\nconst handleMouseMove = () => {\n  if (controlsTimeout) {\n    clearTimeout(controlsTimeout);\n    controlsTimeout = null;\n  }\n  if (controlsMovementTimeout) {\n    clearTimeout(controlsMovementTimeout);\n    controlsMovementTimeout = null;\n  }\n  videoControls.classList.add('showing');\n  controlsMovementTimeout = setTimeout(hideControls, 3000);\n};\n\nconst handleMouseLeave = () => {\n  controlsTimeout = setTimeout(hideControls, 3000);\n};\n\nplayBtn.addEventListener('click', handlePlayClick);\nmuteBtn.addEventListener('click', handleMuteClick);\nvolumeRange.addEventListener('input', handleVolumeChange);\nvideo.addEventListener('loadedmetadata', handleLoadedMetadata);\nvideo.addEventListener('timeupdate', handleTimeUpdate);\nvideoContainer.addEventListener('mousemove', handleMouseMove);\nvideoContainer.addEventListener('mouseleave', handleMouseLeave);\ntimeline.addEventListener('input', handleTimelineChange);\nfullScreenBtn.addEventListener('click', handleFullscreen);\nif (video.readyState === 4) {\n  handleLoadedMetadata();\n}\n\n\n//# sourceURL=webpack://final-project-template/./src/client/js/videoPlayer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/videoPlayer.js"]();
/******/ 	
/******/ })()
;