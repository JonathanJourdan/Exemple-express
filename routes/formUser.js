var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

/* GET users from _id. */
router.route('/:_id').get(function (req, res) {
    console.log('req.originalUrl : ', req.originalUrl);
    
    var type = req.method;
    var pathSplit = req.originalUrl.split('/');
    var path = "/"+pathSplit[1];
    
    
    global.schemas[global.actions_json[type+path].schema].find({_id : new ObjectId(req.params._id)}, function (err, result) {
        if (err) { throw err; }
        // result est un tableau de hash
        console.log(result);
    
        res.render(global.actions_json[type+path].view, { 
            title: "Form user\'s datas",
            libelle: "modification",
            form_action: "/modifyUser",
            user: result[0] // il n'y a qu'une réponse possible puisque requête via _id user
        });
        
    });
    
    
    
    
    
    
    
   /* global.db.collection('users')
        .find({
            _id: new ObjectID(req.params._id)
        })
        .toArray(function (err, result) {
            if (err) {
                throw err;
            }
            console.log('formUser: ', result);
            res.render(global.actions_json[type+path].view, {
                title: "Form user\'s datas",
                libelle: "modification",
                form_action: "/modifyUser",
                user: result[0] // il n'y a qu'une réponse possible puisque requête via _id user
            });
        });*/
});

module.exports = router;
