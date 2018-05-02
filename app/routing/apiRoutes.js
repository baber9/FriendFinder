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

        // call findMatch (returns match obj & compatibility %) = ie, [friendObj, 33.0]
        var match = findMatch(newUser, friendsArray);

        // push new friend to friendsArray, after finding match
        friendsArray.push(req.body);
        
        res.json(match);
    });  
};

function findMatch(newUser, friendsArray) {
    
    // Array of objs of all users vs new user comparison
    var compAllArr = [];

    // Loop through each user
    for (var i = 0; i < friendsArray.length; i++) {
        
        // user is set to user from friendsArray
        var user = friendsArray[i];

        // Array to hold current calc comparisons for new user vs all users
        var compEachArr = [];

        // var to hold calc for current user vs new user
        var compatScore = 0;

        // Loop through each score for this user
        for (var j = 0; j < newUser.scores.length; j++) {
            
            // calculate absolute difference and add to compatScore (lower is better)
            compatScore += Math.abs(newUser.scores[j] - user.scores[j]);
        }

        // push score to compEachArr
        compEachArr.push(compatScore);
        
        // create new obj with compEachArr
        var compatEachObj = {
            id: i,
            compatScore: compatScore
        };
        
        // push new obj to compAllArr
        compAllArr.push(compatEachObj);
    }

    // sort to find lowest score (most compatible)
    compAllArr.sort((a, b) => {
        return a.compatScore > b.compatScore;
    });

    // compatability score (40 is worst score possible, 0 is best)
    // calculate % match
    var compatPerc = (40 - compAllArr[0].compatScore)/40 * 100;

    // return matching friend obj & compatibility percentage
    return [friendsArray[compAllArr[0].id], compatPerc.toFixed(1)];
    
}