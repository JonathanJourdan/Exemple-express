var express = require('express');
var router = express.Router();
/* GET formUser page to insert a new user */

router.get('/', function (req, res, next) {
    
    var type = req.method;
    var path = req.originalUrl;
    
    res.render(global.actions_json[type+path].view,

        {
            title: 'Create a new user',
            libelle: "creation",
            form_action: "/createUser"
        });
});

module.exports = router;