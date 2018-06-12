var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function (req, res, next) {
    // Ici index représente le fichier hbs
    // Le deuxieme parametres sont les données au format json
    //console.log("coucou exos");
//
//    var readFile = require('fs').readFile;
//
//    readFile('countries.json', function (error, result) {
//
//        if (!error) {
//            res.render('exos', {
//                result: JSON.parse(result),
//                title: "Liste des pays"
//            });
//
//        } else {
//            console.log("Erreur accés fichier : ", error);
//        }
//
//    });
    
    if ((req.session.passport) && (req.session.passport.user != null)) { //test de la session
    
    var type = req.method;
    var path = req.originalUrl;
   
    
    
    global.schemas[global.actions_json[type+path].schema].find(function (err, result) {
        if (err) { throw err; }
        // comms est un tableau de hash
        res.render(global.actions_json[type+path].view, { 
            title: result.titre,
            exos: result[0]
        });
        
    });
    
     } else res.redirect('/'); // affichage boîte de login si pas authentifié
    
    
/*global.db.collection('exos').find().toArray(function(err, result){
        if(err){
            throw err;
        }
        console.log(result);
        res.render(global.actions_json[type+path].view, { 
            title: 'Liste des exos',
            exos: result[0]
        });
        
    });*/
});



module.exports = router;