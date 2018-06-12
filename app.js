var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Chargement des controleurs

/* Chargement configuration JSON des actions --> controleurs */
global.actions_json = JSON.parse(fs.readFilesSync("./routes/config_actions.json", 'utf8'));
var indexRouter = require('./routes/index');
var exos = require('./routes/exos');
var countries = require('./routes/countries');
var contact = require('./routes/contact');
var user = require('./routes/user');
var formUser = require('./routes/formUser');
var modifyUser = require('./routes/modifyUser');
var newUser = require('./routes/newUser');
var createUser = require('./routes/createUser');


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
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Controleurs
app.use('/', indexRouter);
app.use('/exos', exos);
app.use('/countries', countries);
app.use('/contact', contact);
app.use('/user', user);
app.use('/formUser', formUser); // affichera le formulaire
app.use('/modifyUser', modifyUser); // valide les données dans la base
app.use('/newUser', newUser);
app.use('/createUser', createUser);



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
global.db = {};

var mongoClient = require('mongodb').MongoClient;
//Connection URL
var url = 'mongodb://127.0.0.1:27017/gretajs';
//Use connect method to connect to the server
mongoClient.connect(url, function(err, db){
    global.db = db; //On met en global la connexion à la base
    console.log("Connected successfully to server: GLOBAL.db initialized");
});

module.exports = app;
