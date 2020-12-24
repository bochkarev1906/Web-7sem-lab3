const express = require('express')
const app = express()
const port = 3000
const apiKey = 'c58e6bb780cae68578dd9ecad1db5756'
const siteURL = 'https://api.openweathermap.org/data/2.5/weather';
const connectionDB = "mongodb+srv://dbUser:gfhjkm@cluster0.vutlw.mongodb.net/lab3?retryWrites=true&w=majority";
const bodyParser = require('body-parser');
const request = require('request');
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({ extended: true }));
app.get('/weather/city', (req, res) => {
	request.get(`${siteURL}?q=${req.query.q}&appid=${apiKey}&units=metric`, (error, response, body) => {
		if (response !== null && response.statusCode === 404){
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('content-type', 'application/json; charset=utf-8');
			return res.status(404).send(body);
		}
		else{
			return sendRes(res, error, body);
		}
	});
});	

app.get('/weather/coordinates', (req, res) => {
	request.get(`${siteURL}?lat=${req.query.lat}&lon=${req.query.lon}&appid=${apiKey}&units=metric`, (err, response, body) => {
		return sendRes(res, err, body);
	});
});

MongoClient.connect(connectionDB, { useUnifiedTopology: true }, (err, database) => {
	if (err) {
		return console.log(err)
	}

	global.DB = database.db()
	console.log('Соединение с БД установлено!')

	app.options('*', (req, res) => {
		res.set('Access-Control-Allow-Origin', '*');
		res.set('Access-Control-Allow-Headers', 'Content-Type');
		res.set('Access-Control-Allow-Methods', '*');
		res.setHeader('content-type', 'application/json; charset=utf-8');
		res.send('ok');
	});


	app.listen(port, () => {
		console.log('Слушаем порт ' + port);
	});               
})

app.delete('/favourites', (req, res) => {
	db=global.DB
	db.collection('cities').deleteOne({name: req.body.name}, (err, results) => {
		sendRes(res, err, req.body)
	})
});

app.get('/favourites', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('content-type', 'application/json; charset=utf-8');
	db=global.DB
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
	db = global.DB;
	db.collection('cities').insertOne(req.body, (err, results) => {
		sendRes(res, err, err ? null : results.ops[0])
	});
});

function sendRes(res, err, ok) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('content-type', 'application/json; charset=utf-8');
	if(err) {
		return res.status(500).send({message: err});
	}
	return res.send(ok);	
}

module.exports = app