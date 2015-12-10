var express = require('express');
var passport = require('passport');
var router = express.Router();

var Survey = require('../models/survey');

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
    Survey.find(function (err, surveys) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('surveys/index', {
                title: 'Users',
                surveys: surveys,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});

/* Render Users main page. */
router.get('/live/:id', requireAuth, function (req, res, next) {
    Survey.find(function (err, surveys) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('surveys/live', {
                title: 'Surveys',
                surveys: surveys,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});

/* Render the Add Users Page */
router.get('/add', requireAuth, function (req, res, next) {
    res.render('surveys/add', {
        title: 'Surveys',
        displayName: req.user ? req.user.displayName : ''
    });
});

/* process the submission of a new user */
router.post('/add', requireAuth, function (req, res, next) {
    var survey = new Survey(req.body);

    Survey.create({
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
            res.redirect('/surveys');
        }
    });
});

/* Render the User Edit Page */
router.get('/:id', requireAuth, function (req, res, next) {
    // create an id variable
    var id = req.params.id;
    // use mongoose and our model to find the right user
    Survey.findById(id, function (err, survey) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //show the edit view
            res.render('surveys/edit', {
                title: 'Surveys',
                survey: survey,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});

/* process the edit form submission */
router.post('/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    var contact = new Survey(req.body);

    Survey._id = id;
    Survey.updated = Date.now();

    // use mongoose to do the update
    Survey.update({ _id: id }, contact, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/surveys');
        }
    });
});

/* run delete on the selected user */
router.get('/delete/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    Survey.remove({ _id: id }, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/surveys');
        }
    });
});


module.exports = router;