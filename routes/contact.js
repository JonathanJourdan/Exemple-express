var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function (req, res, next) {
    // Ici index représente le fichier hbs
    // Le deuxieme parametres sont les données au format json
    if ((req.session.passport) && (req.session.passport.user != null)) { //test de la session
        
    var type = req.method;
    var path = req.originalUrl;
    
 
global.schemas[global.actions_json[type+path].schema].find(function (err, result) {
        if (err) { throw err; }
        // result est un tableau de hash
        console.log(result);
    
        res.render(global.actions_json[type+path].view, { 
            title: global.actions_json[type+path].titre,
            result: result
        });
        
    });
    
    
    } else res.redirect('/'); // affichage boîte de login si pas authentifié
    
   /* global.db.collection(global.actions_json[type+path].collection).find().toArray(function(err, result){
        if(err){
            throw err;
        }
        console.log(result);
        res.render(global.actions_json[type+path].view, { 
            title: global.actions_json[type+path].titre,
            result: result
        });
        
    });*/
});


module.exports = router;