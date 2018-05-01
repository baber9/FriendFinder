// use friendsArray from friends.js
var friendsArray = require('../data/friends');

module.exports = (app) => {
    
    // GET api/tabls returns all friends from friendsArray in JSON
    app.get("/api/friends", (req, res) => {
        res.json(friendsArray);
    });

    // POST - used to handle form data
    app.post("/api/friends", (req, res) => {

        var newUser = req.body;
        
        // scores arr comes over as strings, must convert to ints
        for (i = 0; i < newUser.scores.length; i++) {
            newUser.scores[i] = parseInt(newUser.scores[i]);
        }


        // logic for compatibility
        findMatch(newUser, friendsArray);

        friendsArray.push(req.body);
        

        res.json(friendsArray);
    });  
};

function findMatch(newUser, friendsArray) {
    
    // Array of objs of all users vs new user comparison
    var compatibilityAllArr = [];

    // Loop through each user
    for (var i = 0; i < friendsArray.length; i++) {
        
        // go through each user to compare new user
        var user = friendsArray[i];

        // Array to hold current calc comparisons for new user vs all users
        var compatibilityEachArr = [];

        // Loop through all scores for current [i] user
        for (var j = 0; j < newUser.scores.length; j++) {
            
            // calculate absolute difference
            var compatScore = Math.abs(newUser.scores[j] - user.scores[j]);
            // push difference to compEachArr
            compatibilityEachArr.push(compatScore);
            
        }
        // create new obj with compEachArr
        var compatEachObj = {
            id: i,
            compatScore: compatibilityEachArr
        };
        // push new obj to compAllArr
        compatibilityAllArr.push(compatEachObj);
    }

    console.log(compatibilityAllArr);

    // NEED TO ADD ALL SCORES TO SEE WHO HAS LOWEST COMBINED WHICH WOULD BE CLOSEST MATCH.
    
}