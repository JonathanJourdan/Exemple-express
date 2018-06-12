var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

/* Insert one new user into database. */
router.route('/').get(function (req, res) {
    console.log('req.originalUrl : ', req.originalUrl);
    
    var type = req.method;
    var pathSplit = req.originalUrl.split('/');
    var path = "/"+pathSplit[1];
    
    if (!req.query.hasOwnProperty("_id")) req.query._id = new ObjectId();
    
    global.schemas[global.actions_json[type+path].schema].create([req.query], function (err, result) {
        if (err) { throw err; }
        // result est un tableau de hash
        console.log('createUser: ', result);
    
        res.render(global.actions_json[type+path].view, { 
            title: 'Creating User without error with datas below :',
            user: result[0]._doc
        });
        
    });
    
    
    
    
    
    /*global.db.collection('users').insert([req.query],
        function (err, result) {
            if (err) {
                throw err;
            }
            console.log('createUser: ', result);
            res.render(global.actions_json[type+path].view, {
                title: 'Creating User without error with datas below :',
                user: result.ops[0]
            });
        } // fin callback de l'insert
    );*/ // fin de l'insert()
}); // fin de la gestion de la route

module.exports = router;