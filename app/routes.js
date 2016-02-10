/**
 * The web.js file contains app routes that return html / renders a template
 * to the frontend.  API calls are exposed automatically by the individual
 * components or plugins that implement the functionality.
 **/
var express = require('express'),
    router = express(),
    path = require('path'),
    simulator = require('./components/simulator/routes');

// Set up the components to use in this app.
router.use(simulator);

module.exports = router;