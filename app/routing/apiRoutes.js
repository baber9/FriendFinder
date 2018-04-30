// use friendsArray from friends.js
var friendsArray = require('../data/friends');

module.exports = (app) => {
    
    // GET api/tabls returns all friends from friendsArray in JSON
    app.get("/api/friends", (req, res) => {
        res.json(friendsArray);
    });

    // POST - used to handle form data
    app.post("/api/friends", (req, res) => {
        
        // scores arr is coming over as strings, this converts them all
        for (i = 0; i < req.body.scores.length; i++) {
            req.body.scores[i] = parseInt(req.body.scores[i]);
        }

        // logic for compatibility

        friendsArray.push(req.body);

        res.json(friendsArray);
    });  
};