/**
 * The web.js file contains app routes that return html / renders a template
 * to the frontend.  API calls are exposed automatically by the individual
 * components or plugins that implement the functionality.
 **/
var express = require('express'),
    router = express(),
    path = require('path'),
    _ = require('underscore');

router.set('views', path.join(__dirname, '/views'));
router.set('view engine', 'jade');

// /* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {});
});

// GET and render the template passed in
router.get('/partial/:partialName', function(req, res) {
    var partialName = req.param('partialName');
    console.log("rendering partial", partialName);
    if (!_.isUndefined(partialName) && !_.isNull(partialName)) {
        res.render(req.param('partialName'));
    } else {
        res.status(404).send("Partial not found");
    }
});

module.exports = router;