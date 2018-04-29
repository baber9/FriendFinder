// MODULE TO HANDLE ROUTING FOR hmtl PAGE REQUESTS

// npm node module ('path')
var path = require('path');

// export routes (to be used by server.js)
module.exports = (app) => {

    // get req for survey.html
    app.get('/survey', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/survey.html'));
    });

    // get req for home.html
    app.get('*', (req, res) => {
        console.log(req.url);

        // checks to see if root or 'home' was entered
        if(req.url === "/" || req.url === '/home') {
            res.sendFile(path.join(__dirname, "../public/home.html"));
        } else {
            res.sendFile(path.join(__dirname, "../public/404.html"));
        }
    });
};