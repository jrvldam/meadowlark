var express = require('express');
var fortune = require('./lib/fortune.js');

var app = express();

var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res)
{
	res.render('home');
});
app.get('/about', function(req, res)
{
	res.render('about', {fortune: fortune.getFortune()});
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
})
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

app.listen(app.get('port'), function()
{
	console.log( 'Express started on http://localhost:' +
	app.get('port') + '; press Ctrl-C to terminate.' );
});