var express = require('express');
var passport = require('passport');
var router = express.Router();

var Contact = require('../models/contact');

/* Utility functin to check if user is authenticatd */
function requireAuth(req, res, next){

    // check if the user is logged in
    if(!req.isAuthenticated()){
        return res.redirect('/login');
    }
    next();
}

/* Render Users main page. */
router.get('/', requireAuth, function (req, res, next) {
    Contact.find(function (err, contacts) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('contacts/index', {
                title: 'Users',
                contacts: contacts,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});

/* Render Users main page. */
router.get('/live/:id', requireAuth, function (req, res, next) {
    Contact.find(function (err, contacts) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('contacts/live', {
                title: 'Surveys',
                contacts: contacts,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});

/* Render the Add Users Page */
router.get('/add', requireAuth, function (req, res, next) {
    res.render('contacts/add', {
        title: 'Contacts',
        displayName: req.user ? req.user.displayName : ''
    });
});

/* process the submission of a new user */
router.post('/add', requireAuth, function (req, res, next) {
    var contact = new Contact(req.body);

    Contact.create({
        surveyTopic: req.body.surveyTopic,
        surveyQuestion: req.body.surveyQuestion,
        surveyOption1: req.body.surveyOption1,
        surveyOption2: req.body.surveyOption2,
        surveyOption3: req.body.surveyOption3,
        surveyOption4: req.body.surveyOption4,
        provider: 'local',
        created: Date.now(),
        updated: Date.now()
    }, function (err, User) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/contacts');
        }
    });
});

/* Render the User Edit Page */
router.get('/:id', requireAuth, function (req, res, next) {
    // create an id variable
    var id = req.params.id;
    // use mongoose and our model to find the right user
    Contact.findById(id, function (err, contact) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //show the edit view
            res.render('contacts/edit', {
                title: 'Contacts',
                contact: contact,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});

/* process the edit form submission */
router.post('/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    var contact = new Contact(req.body);

    contact._id = id;
    contact.updated = Date.now();

    // use mongoose to do the update
    Contact.update({ _id: id }, contact, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/contacts');
        }
    });
});

/* run delete on the selected user */
router.get('/delete/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    Contact.remove({ _id: id }, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/contacts');
        }
    });
});


module.exports = router;