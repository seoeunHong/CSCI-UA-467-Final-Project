require('./db');
require('dotenv/config');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const {localsMiddleware} = require('./middleware');

const app = express();

const publicPath = path.resolve(__dirname);
console.log(publicPath);

// enable sessions
const session = require('express-session');

const sessionOptions = {
  secret: 'secret cookie thang (store this elsewhere!)',
  resave: false,
  saveUninitialized: false,
};
app.use(session(sessionOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// body parser setup
app.use(bodyParser.urlencoded({extended: false}));

const rootRouter = require('./routers/rootRouter');
const userRouter = require('./routers/userRouter');
const videoRouter = require('./routers/videoRouter');

app.use(localsMiddleware);
app.use('/uploads', express.static('uploads'));
app.use('/static', express.static('assets'));
app.use('/', rootRouter);
app.use('/users', userRouter);
app.use('/videos', videoRouter);

const PORT = process.env.PORT || 3001;

const handleListening = () => console.log(`✅ Server listening on PORT: ${PORT}`);

app.listen(PORT, handleListening);
