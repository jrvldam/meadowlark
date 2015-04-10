// adela.moreno@rtve.es
var express = require('express');
var swig = require('swig');
var fortune = require('./lib/fortune.js');
var weatherData = require('./lib/weather.js');

var app = express();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.disable('x-powered-by');

app.use(express.static(__dirname + '/public'));

// middlewares
app.use(function(req, res, next)
{
	if(!res.locals.partials) res.locals.partials = {};
	res.locals.partials.weather = weatherData.getWeatherData();
	next();
});

app.get('/', function(req, res)
{
	res.render('home');
});
app.get('/about', function(req, res)
{
	res.render('about', {fortune: fortune.getFortune()});
});
app.get('/jq', function(req, res)
{
	res.render('jquery-test');
});
app.get('/headers',function(req, res)
{
	res.set('Content-Type', 'text/plain');
	var s = '';
	for(var name in req.headers)
	{
		s += name + ': ' + req.headers[name] + '\n';
	}
	res.send(s);
});
app.use(function(req, res)
{
	res.status(404);
	res.render('404');
});
app.use(function(err, req, res, next)
{
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function()
{
	console.log( 'Server listening on port ' +
	app.get('port') + '...' );
});