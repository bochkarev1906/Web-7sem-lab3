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
	
	app.options('*', (req, res) => {
		res.set('Access-Control-Allow-Origin', '*');
		res.set('Access-Control-Allow-Headers', 'Content-Type');
		res.set('Access-Control-Allow-Methods', '*');
		res.setHeader('content-type', 'application/json; charset=utf-8');
		res.send('ok');
	});

    app.use(bodyParser.urlencoded({ extended: true }));
	console.log('Соединение с БД установлено!')
    
    app.get('/weather/city', (req, res) => {
		request(`${siteURL}?q=${req.query.q}&appid=${apiKey}&units=metric`, (error, response, body) => {
			return sendRes(res, err, body);
		});
	});	

	app.get('/weather/coordinates', (req, res) => {
		request(`${siteURL}?lat=${req.query.lat}&lon=${req.query.lon}&appid=${apiKey}&units=metric`, (err, response, body) => {
			return sendRes(res, err, body);
		});
	});

	app.delete('/favourites', (req, res) => {
		db = database.db();
		db.collection('cities').deleteOne({name: req.body.name}, (err, results) => {
			sendRes(res, err, JSON.stringify('Город удален из избранного!'))
		})
	});

	app.get('/favourites', (req, res) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('content-type', 'application/json; charset=utf-8');
		db = database.db();
		db.collection('cities').find({}).toArray((err, items) => {
			results = null;
			if (!err) {
				results = [];
				for (item of items) {
					results.push(item.name)
				}
			}
			sendRes(res, err, results);	
		});
	});

	app.post('/favourites', (req, res) => {
		db = database.db();
		db.collection('cities').insertOne(req.body, (err, results) => {
			sendRes(res, err, err ? null : results.ops[0])
		});
	});

	app.listen(port, () => {
		console.log('Слушаем порт ' + port);
	});               
})

function sendRes(res, err, ok) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('content-type', 'application/json; charset=utf-8');
	if(err) {
		return res.status(500).send({message: err});
	}
	return res.send(ok);	
}