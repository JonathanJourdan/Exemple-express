var express = require('express');
var router = express.Router();
//var ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

/* Remove one new user into database. */
router.route('/:_id').get(function (req, res) {
    console.log('req.originalUrl ?????? : ', req.originalUrl);
    
    var type = req.method;
    var pathSplit = req.originalUrl.split('/');
    var path = "/"+pathSplit[1];
    
    global.schemas[global.actions_json[type+path].schema].remove({_id: new ObjectId(req.params._id)},
        function (err, result) {
            if (err) {
                throw err;
            }
            console.log('delete User  !!!!!!!!: ', result);
        
          global.schemas[global.actions_json[type+path].schema].find(function (err, listusers) {
              if (err) {
                throw err;
            }

              res.render(global.actions_json[type+path].view, {
                    title: 'Utilisateur supprimé avec succées !',
                    users: listusers
                });
            });
        } // fin callback du delete
    ); // fin de l'insert()
}); // fin de la gestion de la route

module.exports = router;