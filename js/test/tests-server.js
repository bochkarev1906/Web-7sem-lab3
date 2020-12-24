const request = require('request');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const sinon = require('sinon');
require('sinon-mongo');
const server = require('../index') 
const MongoClient = require('mongodb').MongoClient;
const Collection = require('mongodb/lib/collection');
chai.use(chaiHttp);

const apiKey = 'c58e6bb780cae68578dd9ecad1db5756'
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';

describe('GET /weather/coordinates', () => {
	
	it('Должен возвращать правильный ответ', (done) => {
		
		const responseObject = {
			statusCode: 200,
		};
		const responseBody = {"coord":{"lon":37.62,"lat":55.75},"weather":[{"id":701,"main":"Mist","description":"mist","icon":"50d"}],"base":"stations","main":{"temp":-5,"feels_like":-9.82,"temp_min":-5,"temp_max":-5,"pressure":1024,"humidity":92},"visibility":1500,"wind":{"speed":3,"deg":250},"clouds":{"all":90},"dt":1608104795,"sys":{"type":1,"id":9029,"country":"RU","sunrise":1608098060,"sunset":1608123377},"timezone":10800,"id":524901,"name":"Moscow","cod":200}
		const lon = 37.62;
		const lat = 55.75;

		requestMock = sinon.mock(request);
		requestMock.expects("get").once()
			.withArgs(`${baseURL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
			.yields(null, responseObject, JSON.stringify(responseBody));

		chai.request(server) 
			.get(`/weather/coordinates?lat=${lat}&lon=${lon}`)
			.end((err, res) => {
				res.should.have.status(200);
				const info = res.body
				flag_coord = info.hasOwnProperty('coord')
				flag_weather = info.hasOwnProperty('weather')
				flag_name = info.hasOwnProperty('name')
				flag_clouds = info.hasOwnProperty('clouds')
				flag_wind = info.hasOwnProperty('wind')
				flag_cod = info.hasOwnProperty('cod')
				flag_coord.should.eql(true)
				flag_weather.should.eql(true)
				flag_name.should.eql(true)
				flag_clouds.should.eql(true)
				flag_wind.should.eql(true)
				flag_cod.should.eql(true)
                requestMock.verify();
                requestMock.restore();
                done();
        });
	})

	it('Должен возвращать неправильный ответ', (done) => {
		
		const lon = 37.62;
		const lat = 55.75;

		requestMock = sinon.mock(request);
		requestMock.expects("get")
			.once()
			.withArgs(`${baseURL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
			.yields(new Error(), null, null);

		chai.request(server) 
			.get(`/weather/coordinates?lat=${lat}&lon=${lon}`)
			.end((err, res) => {
				res.should.have.status(500);
                requestMock.verify();
                requestMock.restore();
                done();
        });
	})
})

describe('GET /weather/city', () => {
	
	it('Должен возвращать правильный ответ', (done) => {
		
		const responseObject = {
			statusCode: 200,
		};
		const responseBody = {"coord":{"lon":37.62,"lat":55.75},"weather":[{"id":701,"main":"Mist","description":"mist","icon":"50d"}],"base":"stations","main":{"temp":-5,"feels_like":-9.82,"temp_min":-5,"temp_max":-5,"pressure":1024,"humidity":92},"visibility":1500,"wind":{"speed":3,"deg":250},"clouds":{"all":90},"dt":1608104795,"sys":{"type":1,"id":9029,"country":"RU","sunrise":1608098060,"sunset":1608123377},"timezone":10800,"id":524901,"name":"Moscow","cod":200}
		const city = 'Krasnoyarsk'

		requestMock = sinon.mock(request);
		requestMock.expects("get")
			.once()
			.withArgs(`${baseURL}?q=${city}&appid=${apiKey}&units=metric`)
			.yields(null, responseObject, JSON.stringify(responseBody));

		chai.request(server) 
			.get('/weather/city?q=' + city)
			.end((err, res) => {
				res.should.have.status(200);
                const info = res.body
				flag_coord = info.hasOwnProperty('coord')
				flag_weather = info.hasOwnProperty('weather')
				flag_name = info.hasOwnProperty('name')
				flag_clouds = info.hasOwnProperty('clouds')
				flag_wind = info.hasOwnProperty('wind')
				flag_cod = info.hasOwnProperty('cod')
				flag_coord.should.eql(true)
				flag_weather.should.eql(true)
				flag_name.should.eql(true)
				flag_clouds.should.eql(true)
				flag_wind.should.eql(true)
				flag_cod.should.eql(true)
                requestMock.verify();
                requestMock.restore();
                done();
		});	
    })
	
	it('Должен возвращать статус 404 при неверном названии города', (done) => {

		const responseObject = {
			statusCode: 404,
		};
		const city = 'Bfdbfbfgfggc'
		
		requestMock = sinon.mock(request);
		requestMock.expects("get")
		.once()
		.withArgs(`${baseURL}?q=${city}&appid=${apiKey}&units=metric`)
		.yields(null, responseObject, null);
		
		chai.request(server)
		.get('/weather/city?q=' + city)
		.end((err, res) => {
			res.should.have.status(404);
			requestMock.verify();
			requestMock.restore();
			done();
		});
	})
	
    it('Должен возвращать неправильный ответ', (done) => {
		
		const city = 'Moscow'

		requestMock = sinon.mock(request);
		requestMock.expects("get")
			.once()
			.withArgs(`${baseURL}?q=${city}&appid=${apiKey}&units=metric`)
			.yields(new Error(), null, null);

		chai.request(server) 
			.get('/weather/city?q=' + city)
			.end((err, res) => {
				res.should.have.status(500);
                requestMock.verify();
                requestMock.restore();
                done();
        });
	})
})

describe('POST /favourites', () => {

	it('Должен возвращать правильный ответ', (done) => {

		body = `name=Tokyo`

		mockCollectionCities = sinon.mongo.collection();
		mockCollectionCities.insertOne.yields(null, { ops: [{ name: 'Tokyo' }]});
		global.DB = sinon.mongo.db({
			cities: mockCollectionCities
		});

		chai.request(server) 
			.post('/favourites')
			.send(body)
			.end((err, res) => {
				res.should.have.status(200);
				sinon.assert.calledOnce(mockCollectionCities.insertOne);
                done();
        });
	})
	
	it('Должен возвращать неправильный ответ', (done) => {

		body = `name=Tokyo`

		mockCollectionCities = sinon.mongo.collection();
		mockCollectionCities.insertOne.yields(new Error(), null);
		global.DB = sinon.mongo.db({
			cities: mockCollectionCities
		});

		chai.request(server) 
			.post('/favourites')
			.send(body)
			.end((err, res) => {
				res.should.have.status(500);
				sinon.assert.calledOnce(mockCollectionCities.insertOne);
                done();
        });
	})
})

describe('DELETE /favourites', () => {

	it('Должен возвращать правильный ответ', (done) => {

		mockCollectionCities = sinon.mongo.collection();
		body = `name=Tokyo`
		mockCollectionCities.deleteOne.yields(null, { name: 'Tokyo' });
		global.DB = sinon.mongo.db({
			cities: mockCollectionCities
		});

		chai.request(server) 
			.delete('/favourites')
			.send(body)
			.end((err, res) => {
				res.should.have.status(200);
				sinon.assert.calledOnce(mockCollectionCities.deleteOne);
                done();
        });
	})

	it('Должен возвращать неправильный ответ', (done) => {

		mockCollectionCities = sinon.mongo.collection();
		body = `name=Tokyo`
		mockCollectionCities.deleteOne.yields(new Error(), null);
		global.DB = sinon.mongo.db({
			cities: mockCollectionCities
		});

		chai.request(server) 
			.delete('/favourites')
			.send(body)
			.end((err, res) => {
				res.should.have.status(500);
				sinon.assert.calledOnce(mockCollectionCities.deleteOne);
                done();
        });
	})
})

describe('GET /favourites', () => {

	it('Должен возвращать правильный ответ', (done) => {

		mockCollectionCities = sinon.mongo.collection();
		cities = [{name: 'Tokyo'}, {name: 'Moscow'}, {name: 'Krasnoyarsk'}, {name: 'Madrid'}]
		mockCollectionCities.find.returns(sinon.mongo.documentArrayCallback(null, cities));
		global.DB = sinon.mongo.db({
			cities: mockCollectionCities
		});

		chai.request(server) 
			.get('/favourites')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.eql(['Tokyo', 'Moscow', 'Krasnoyarsk', 'Madrid'])
				sinon.assert.calledOnce(mockCollectionCities.find);
                done();
        });
	})
	
	it('Должен возвращать неправильный ответ', (done) => {

		mockCollectionCities = sinon.mongo.collection();
		mockCollectionCities.find.returns(sinon.mongo.documentArrayCallback(new Error(), null));
		global.DB = sinon.mongo.db({
			cities: mockCollectionCities
		});

		chai.request(server) 
			.get('/favourites')
			.end((err, res) => {
				res.should.have.status(500);
				sinon.assert.calledOnce(mockCollectionCities.find);
                done();
        });
	})
})

sinon.mongo.documentArrayCallback = (err, result) => {
    if (!result) result = [];
    if (result.constructor !== Array) result = [result];

    return {
      	sort: sinon.stub().returnsThis(),
     	toArray: function f() {
        	var callback = arguments[arguments.length - 1];
       		callback.apply(null, [err, result]);
    	}
 	}
}