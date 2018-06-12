var express = require("express");
var router = express.Router();
var appContext;
var url = require("url");

function dynamicRouter(app) {
//Context applicatif
appContext = app;
//Perform Automate action
router.use(manageAction);
//routeur global
appContext.use(router);
    
}

/* Fonction qui permet d'aguiller les requêtes HTTP
vers le bon contrôleur en fonction de l'action du pathname */
function manageAction(req, res, next) {
var path; // Le pathname après le port 3000 dans l'URL.
var type; //(GET ou POST, ... http méthode)
var controler; // nom du contrôleur à charger
path = url.parse(req.url).pathname;
// Il faut supprimer pour le routage le param après l'action
if (path.split('/').length > 0) path = '/'+path.split('/')[1]
type = req.method;
if (typeof global.actions_json[type + path] == 'undefined') {
console.log("Erreur pas d'action : " + path);
next();
}
else {
instanceModule = require('./routes/'
+ global.actions_json[type + path].controler);
router.use(path, instanceModule);
next();
}
    
}

module.exports = dynamicRouter;
