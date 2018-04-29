// npm node modules
var express = require('express');
var bodyParser = require('body-parser');

// express config
var app = express();

var PORT = process.env.PORT || 3000;

// setup express to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use routing modules for routing
require('./routing/apiRoutes')(app);
require('./routing/htmlRoutes')(app);

// listener
app.listen(PORT, () => {
    console.log("App listening on port: " + PORT);
});