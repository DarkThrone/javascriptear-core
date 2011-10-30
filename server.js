
/**
 * Module dependencies.
 */

var express   = require('express'),
    everyauth = require('everyauth'),
    util      = require('util'),
    Promise   = everyauth.Promise,
    users     = require('./resources/users');

    app = module.exports = express.createServer(),

    port = 8765;





everyauth.twitter
  .consumerKey('YSDI9gJhqY3bKKhKjojjw')
  .consumerSecret('87iZCpL2bvQAZI7mss7WDjJ3ykFe6e0ndfAHLnhTsU')
  .findOrCreateUser(function(session, accessToken, accessSecret, twitterUser) {
    var promise = new Promise();
    users.findOrCreateUserData(twitterUser, promise);
    return promise;
  })
  .redirectPath('/');



app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'hola' }));
  app.use(everyauth.middleware());
  app.use(express.compiler({ src: __dirname + '/public', enable: ['sass'] }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler()); 
});


app.get('/', function(req, res){
  res.render('index', {
    title: 'Javascript Argentina'
  });
});

everyauth.helpExpress(app);
app.listen(port);
console.log("Express server listening on port %d", app.address().port);
