const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

// To use the partial we need to include it
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) =>{
		if(err) {
			console.log('Unable to append to server.log')
		}
	});
	next();
});

// Website is under the maintainance
app.use((req, res, next) => {
	res.render('maintainance.hbs', {
		title: 'This website is hacked fish'
	});
});

app.use(express.static(__dirname + '/public'));
// This is the about section 
app.get('/about', (req, res) =>{
	res.render('about.hbs', {
		pageTitle: 'About Page',		
	});
});

app.get('/', (req, res) =>{
	res.render('home.hbs', {
		pageTitle: ' on the home directory This is rendering using the feature in express known as partials from header file',
		Welcome: ' Welcome to out dynamic page'
	});
});

app.get('/bad', (req, res) =>{
	res.send({
		name: 'Unwanted page is access',
		errors: [
			'This is not the right page',
			// 'This page is unable to access'
		]
	});
});

app.listen(3000, ()=>{
	console.log('Server is up on port 3000');
});