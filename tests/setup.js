jest.setTimeout(30000); // 5000 is default

require('../models/User'); // require the model because mongoose doesn't connect it while being ran by jest

const mongoose = require('mongoose');
const keys = require('../config/keys');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useMongoClient: true });
