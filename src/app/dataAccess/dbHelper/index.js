const dbConfig = require('../../../config/constants');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
module.exports.connection = mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});