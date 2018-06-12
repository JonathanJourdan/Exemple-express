var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//var ObjectID = require('mongodb').ObjectID;
var ObjectId = mongoose.Types.ObjectId;

/* SET user from _id with new data for an update into mongoDB . */
router.route('/:_id').get(function (req, res) {
    console.log('req.originalUrl : ', req.originalUrl);
    
    var type = req.method;
    var pathSplit = req.originalUrl.split('/');
    var path = "/"+pathSplit[1];
    
    
    
    
    global.schemas[global.actions_json[type+path].schema].findOneAndUpdate({_id : new ObjectId(req.params._id)}, {$set : req.query}, {new: true}, function (err, result) {
        if (err) { throw err; }
        // result est un tableau de hash
        
        console.log('modifyUser: ', result);
        
       global.schemas[global.actions_json[type+path].schema].find({
                _id: new ObjectId(req.params._id)
            }, function (err, result) {
                if (err) {
                    throw err;
                }
                console.log('users: ', result);
                res.render(global.actions_json[type+path].view, {
                    title: 'User modified without error',
                    user: result[0]
                });
            });
        
    });
    
    
    
    
    /*global.db.collection('users').update({
            _id: new ObjectID(req.params._id)
        }, {
            $set: req.query
        },
        function (err, result) {
            if (err) {
                throw err;
            }
            console.log('modifyUser: ', result);
            global.db.collection('users').find({
                _id: new ObjectID(req.params._id)
            }).toArray(function (err, result) {
                if (err) {
                    throw err;
                }
                console.log('users: ', result);
                res.render(global.actions_json[type+path].view, {
                    title: 'User modified without error',
                    user: result[0]
                });
            }); // fin du find() après update
        } // fin callback de l'update
    );*/ // fin de l'update()
}); // fin de la gestion de la route
module.exports = router;