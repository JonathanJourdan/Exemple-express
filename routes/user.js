var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    // Ici index représente le fichier hbs
    // Le deuxieme parametres sont les données au format json
    var type = req.method;
    var path = req.originalUrl;
    
    global.schemas[global.actions_json[type+path].schema].find(function (err, result) {
        if (err) { throw err; }
        // result est un tableau de hash
        console.log(result);
    
        res.render(global.actions_json[type+path].view, { 
            title: 'Liste des utilisateurs',
            users: result
        });
        
    });
    
    
    
    
 /*global.db.collection('users').find().toArray(function(err, result){
        if(err){
            throw err;
        }
        console.log(result);
        res.render(global.actions_json[type+path].view, { 
            title: 'Liste des utilisateurs',
            users: result
        });
        
    });*/
});


module.exports = router;