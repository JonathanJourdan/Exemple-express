var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    
    var type = req.method;
    var path = req.originalUrl;
    
// Ici index représente le fichier hbs
// Le deuxieme parametres sont les données au format json
  res.render(global.actions_json[type+path].view, { title: 'Express' });
});

module.exports = router;
