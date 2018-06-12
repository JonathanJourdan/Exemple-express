var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
var bodyParser = require('body-parser');
var url = require('url');
var session = require('express-session');
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;

global.schemas = {};
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/gretajs', function (err) {
    if (err) {
        throw err;
    } else console.log('Connected to db !!!');
});
// chargement des schémas depuis le fichier de configuration JSON dans une variable
var database_schemas = JSON.parse(fs.readFileSync("database_schema.json", 'utf8'));
// Initialisation de chaque schéma par association entre le schéma et la collection
for (modelName in database_schemas) {
    global.schemas[modelName] = mongoose.model(modelName, database_schemas[modelName].schema,
        database_schemas[modelName].collection);
    console.log("schema chargé !");
}




//Chargement des controleurs
/* Chargement configuration JSON des actions --> controleurs */
global.actions_json = JSON.parse(fs.readFileSync("./routes/config_actions.json", 'utf8'));


var hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials', function() {
    console.log('partials registered');
});


hbs.registerHelper('compare', function(lvalue, rvalue, options) {
    console.log("####### Compare lvalue :",lvalue," et rvalue: ",rvalue);
    if(arguments.length < 3)
        throw new Error("Handlebars Helper 'compare' needs 2 parameters");
    var operator = options.hash.operator || "==";
    var operators = {
        '==': function(l,r) {
            return l == r;
        },
'tabEmpty': function (obj) {
if (!obj || obj.length == 0)
return true;
return false;
}
    }
    if(!operators[operator])
        throw new Error("'compare' doesn't know the operator" + operator);
    var result = operators[operator](lvalue, rvalue);
    if(result){
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: true
}));
app.use(session({
    name: 'sessiongreta',
    secret: 'AsipfGjdp*%dsDKNFNFKqoeID1345',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false} // à mettre à true uniquement navec un site https.
}));
app.use(passport.initialize());
app.use(passport.session());

//méthode d'écriture et de lecture en session d'un utilisateur via l'id user, et 
passport.serializeUser(function(user, done) {
    done(null, { _id: user.id,
                 name : user.name,
                 firstName : user.firstName,
                 function : user.function
               });
});

passport.deserializeUser(function(id, done) {
    global.schemas["Users"].findById(id, function(err, user) {
done(err, user);
});
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        global.schemas["Users"].findOne({
            login: username
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                console.log("pas d'utilisateur trouvé");
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }
            if (user.mdp != password) {
                console.log("password erroné");
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            console.log("utilisateur : ", user);
            return done(null, user);
        });
    }
));

app.post('/signin', passport.authenticate('local'), function (req, res) {
    if (req.session.passport.user != null) {
        res.redirect('/index'); //le user est authentifié on affiche l’index il est en session
    } else {
        res.redirect('/'); // il n’est pas présent on renvoie à la boîte de login
    }
});
// Routes Managed dynamicaly
require('./dynamicRouter')(app);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Controleurs
//Routes Managed dynamically
require('./dynamicRouter')(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



//Configuration de la connexion à la base de données
/*global.db = {};

var mongoClient = require('mongodb').MongoClient;
//Connection URL
var url = 'mongodb://127.0.0.1:27017/gretajs';
//Use connect method to connect to the server
mongoClient.connect(url, function(err, db){
    global.db = db; //On met en global la connexion à la base
    console.log("Connected successfully to server: GLOBAL.db initialized");
});*/

module.exports = app;
