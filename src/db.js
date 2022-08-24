const mongoose = require('mongoose');
require('dotenv/config');
require('./models/Video');
require('./models/User');

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

const handleOpen = () => console.log('✅ Connected to DB');
const handleError = error => console.log('❌ DB Error', error);

db.on('error', handleError);
db.once('open', handleOpen);
