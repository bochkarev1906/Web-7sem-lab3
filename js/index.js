const express = require('express')
const app = express()
const port = 3000
const apiKey = 'c58e6bb780cae68578dd9ecad1db5756'
const siteURL = 'https://api.openweathermap.org/data/2.5/weather';
const connectionDB = "mongodb+srv://dbUser:gfhjkm@cluster0.vutlw.mongodb.net/lab3?retryWrites=true&w=majority";
const bodyParser = require('body-parser');
const request = require('request');
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect(connectionDB, (err, database) => {
	if (err) {
		return console.log(err)
	}
    app.use(bodyParser.urlencoded({ extended: true }));
	console.log('Connected to Database')
    
    app.get('/weather/city', (req, res) => {
		request(`${siteURL}?q=${req.query.q}&appid=${apiKey}&units=metric`, (error, response, body) => {
			return sendResult(res, err, body);
		});
	});	

	app.get('/weather/coordinates', (req, res) => {
		request(`${siteURL}?lat=${req.query.lat}&lon=${req.query.lon}&appid=${apiKey}&units=metric`, (err, response, body) => {
			return sendResult(res, err, body);
		});
	});

	app.listen(port, () => {
		console.log('Connected to port ' + port);
	});               
})