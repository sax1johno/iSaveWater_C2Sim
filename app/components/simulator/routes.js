/**
 * The web.js file contains app routes that return html / renders a template
 * to the frontend.  API calls are exposed automatically by the individual
 * components or plugins that implement the functionality.
 **/
var express = require('express'),
    router = express(),
    path = require('path');

router.set('views', path.join(__dirname, '/views'));
router.set('view engine', 'jade');

// /* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {});
});

module.exports = router;