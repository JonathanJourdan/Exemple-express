var express = require('express');
var router = express.Router();
/* GET home page. */

router.get('/', function (req, res, next) {
    if ((req.session.passport) && (req.session.passport.user != null)) { //test de la session
        var type = req.method;
        var path = req.originalUrl;

        console.log('logged out');
        req.session.destroy(function (err) {
            res.render(global.actions_json[type + path].view, {
                title: 'Vous etes déconnecté'
            });
        });

    } else res.redirect('/'); // affichage boîte de login si pas authentifié
});

module.exports = router;