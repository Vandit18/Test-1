// Import mongoose and bcrypt
var mongoose = require('mongoose');

// need an alias for mongoose.Schema
var Schema = mongoose.Schema;

// Define our user Schema
var contactSchema = new Schema({
    surveyTopic: String,
    surveyQuestion: String,
    surveyOption1: String,
    surveyOption2: String,
    surveyOption3: String,
    surveyOption4: String,
    salt: String,
    provider: String,
    providerId: String,
    providerData: {},
    created: Number,
    updated: Number
}, {
    collection: 'ContactInfo'
});

module.exports = mongoose.model('Contact', contactSchema);