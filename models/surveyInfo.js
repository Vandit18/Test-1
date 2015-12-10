// Import mongoose and bcrypt
var mongoose = require('mongoose');

// need an alias for mongoose.Schema
var Schema = mongoose.Schema;

// Define our user Schema
var surveySchema = new Schema({
    surveyTopic: String,
    startDate: Number,
    endDate: Number,
    salt: String,
    provider: String,
    providerId: String,
    providerData: {},
    created: Number,
    updated: Number
}, {
    collection: 'surveyInfo'
});

module.exports = mongoose.model('surveyInfo', surveySchema);