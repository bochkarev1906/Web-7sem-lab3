const html = `<head>
<meta charset="UTF-8">
<meta name="description" content="Lab2_web_dev">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="style.css">
<script type="text/javascript" src="js/openWeatherAPI.js"></script>
<script type="text/javascript" src="js/funcs.js"></script>
<title>Погода</title>
</head>
<body>
<main>
    <section class="header">
        <h1 class="title">Погода здесь</h1>
        <button class="update-button" type="button">Обновить геолокацию</button>
        <button class="update-media"><img class="update-img" src="img/update.png" alt="Обновить геолокацию"></button>
    </section> 
    <section class="weather-here"></section>
    <section class="favorites-header">
        <h2 class="title">Избранное</h2>
        <form class="add-city">
            <input id="add-city-input" type="search" class="input" placeholder="Добавить новый город">
            <button class="add-button" type="submit"><img class="add-city-icon" src="img/add.png" alt="Добавить новый город"></button>
        </form>
    </section>
    <ul class="weather-city-list"></ul>
</main>
<template id="weather-here">
    <section class="weather-here-info">
        <h2 class="name-city"></h2>
        <section class="main">
            <img class="icon-weather" src="" alt="Погода">
            <div class="temperature"></div>
        </section>
    </section>
    <ul class="data-ul">
        <li class="wind-param">
            <span class="name-param">Ветер</span>
            <span class="value-param"></span>
        </li>
        <li class="clouds-param">
            <span class="name-param">Облачность</span>
            <span class="value-param"></span>
        </li>
        <li class="pressure-param">
            <span class="name-param">Давление</span>
            <span class="value-param"></span>
        </li>
        <li class="humidity-param">
            <span class="name-param">Влажность</span>
            <span class="value-param"></span>
        </li>
        <li class="coordinates-param">
            <span class="name-param">Координаты</span>
            <span class="value-param"></span>
        </li>
    </ul>
</template>
<template id="weather-here-loading">
    <section class="loading">
        <h3>Подождите, данные загружаются...</h3>
        <img class="loading-icon" src='img/loading.png' alt="Загрузка данных">
    </section>
</template>
<template id="weather-city">
    <li class="weather-city">
        <section class="favorites-main">
            <h3 class="name-city"></h3>
            <div class="temperature"></div>
            <img class="icon-weather" src="" alt="">
            <button class="delete-button"><img class="icon-delete" src="img/delete.png" alt="Удалить город"></button>
        </section>
        <ul>
            <li class="wind-param">
                <span class="name-param">Ветер</span>
                <span class="value-param"></span>
            </li>
            <li class="clouds-param">
                <span class="name-param">Облачность</span>
                <span class="value-param"></span>
            </li>
            <li class="pressure-param">
                <span class="name-param">Давление</span>
                <span class="value-param"></span>
            </li>
            <li class="humidity-param">
                <span class="name-param">Влажность</span>
                <span class="value-param"></span>
            </li>
            <li class="coordinates-param">
                <span class="name-param">Координаты</span>
                <span class="value-param"></span>
            </li>
        </ul>
    </li>
</template>
<template id="weather-city-loading">
    <li class="weather-city">
        <section class="weather-city">
            <h3 class="name-city"></h3>
        </section>
        <section class="weather-details">
            <section class="loading">
                <h3>Подождите, данные загружаются...</h3>
                <img class="loading-icon" src='img/loading.png' alt="Загрузка данных">
            </section>
        </section>
    </li>
</template>
<script type="text/javascript" src="js/main.js"></script>
</body>`

const readyTemplateHere = `
<section class="weather-here-info">
    <h2 class="name-city">Zheleznogorsk</h2>
    <section class="main">
        <img class="icon-weather" src="https://openweathermap.org/img/wn/01n.png" alt="Погода">
        <div class="temperature">-23°C</div>
    </section>
</section>
<ul class="data-ul">
    <li class="wind-param">
        <span class="name-param">Ветер</span>
        <span class="value-param">1 м/с</span>
    </li>
    <li class="clouds-param">
        <span class="name-param">Облачность</span>
        <span class="value-param">0%</span>
    </li>
    <li class="pressure-param">
        <span class="name-param">Давление</span>
        <span class="value-param">1018 гпа</span>
    </li>
    <li class="humidity-param">
        <span class="name-param">Влажность</span>
        <span class="value-param">83%</span>
    </li>
    <li class="coordinates-param">
        <span class="name-param">Координаты</span>
        <span class="value-param">[56.24, 93.53]</span>
    </li>
</ul>
 `.replace(/\s+/g,' ');

const readyTemplateFavoriteCity = ` <li class="weather-city" cityname="Zheleznogorsk">
<section class="favorites-main">
    <h3 class="name-city">Zheleznogorsk</h3>
    <div class="temperature">-23°C</div>
    <img class="icon-weather" src="https://openweathermap.org/img/wn/01n.png" alt="">
    <button class="delete-button"><img class="icon-delete" src="img/delete.png" alt="Удалить город"></button>
</section>
<ul>
    <li class="wind-param">
        <span class="name-param">Ветер</span>
        <span class="value-param">1 м/с</span>
    </li>
    <li class="clouds-param">
        <span class="name-param">Облачность</span>
        <span class="value-param">0%</span>
    </li>
    <li class="pressure-param">
        <span class="name-param">Давление</span>
        <span class="value-param">1018 гпа</span>
    </li>
    <li class="humidity-param">
        <span class="name-param">Влажность</span>
        <span class="value-param">83%</span>
    </li>
    <li class="coordinates-param">
        <span class="name-param">Координаты</span>
        <span class="value-param">[56.24, 93.53]</span>
    </li>
</ul>
</li> 
    `.replace(/\s+/g,' ');

const jsdom = require("jsdom");
const JSDOM = jsdom.JSDOM;
window = new JSDOM(html).window;
global.document = window.document;
global.window = window;
const chai = require('chai');
chai.use(require('sinon-chai'));
global.fetch = require("node-fetch");
const chaiHtml  = require('chai-html')
chai.use(chaiHtml)

global.navigator = {
    userAgent: 'node.js'
};
    
const geolocate = require('mock-geolocation');
geolocate.use();
const fetchMock = require('fetch-mock');
const expect = require('chai').expect;
const sinon = require("sinon");
const script = require('../funcs');

const baseURL = 'http://localhost:3000';
const responseBody = {"coord":{"lon":93.53,"lat":56.24},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"base":"stations","main":{"temp":-23,"feels_like":-27.44,"temp_min":-23,"temp_max":-23,"pressure":1018,"humidity":83},"visibility":10000,"wind":{"speed":1,"deg":70},"clouds":{"all":0},"dt":1608737051,"sys":{"type":1,"id":8957,"country":"RU","sunrise":1608689892,"sunset":1608714702},"timezone":25200,"id":1538635,"name":"Zheleznogorsk","cod":200}
const weatherHereLoadingTemplate = document.querySelector('template#weather-here-loading')
const weatherCityLoadingTemplate = document.querySelector('template#weather-city-loading')
const weatherCityTemplate = document.querySelector('template#weather-city')
const weatherHereTemplate = document.querySelector('template#weather-here')

describe('setParams()', () => {
    it('Должны установиться верные параметры в пустой шаблон для актуального города', () => {
  
        const newWeatherHere = document.importNode(weatherHereTemplate.content, true)
        script.setParams(newWeatherHere, responseBody)
        script.weatherHere.appendChild(newWeatherHere)
        const wind = document.querySelector('.wind-param')
        const cloud = document.querySelector('.clouds-param')
        const pressure = document.querySelector('.pressure-param')
        const humidity = document.querySelector('.humidity-param')
        const coordinates = document.querySelector('.coordinates-param')
        expect(wind.lastElementChild.textContent).to.equal("1 м/с")
        expect(cloud.lastElementChild.textContent).to.equal("0%")
        expect(pressure.lastElementChild.textContent).to.equal("1018 гпа")
        expect(humidity.lastElementChild.textContent).to.equal("83%")
        expect(coordinates.lastElementChild.textContent).to.equal("[56.24, 93.53]")
        document.querySelector('.weather-here').innerHTML = ""
    })
    
    it('Должны установиться верные параметры в пустой шаблон для избранного города', () => {
        const newWeatherCity = document.importNode(weatherCityTemplate.content, true)
        script.setParams(newWeatherCity, responseBody)
        script.weatherCityFavorites.appendChild(newWeatherCity)
        const wind = document.querySelector('.wind-param')
        const cloud = document.querySelector('.clouds-param')
        const pressure = document.querySelector('.pressure-param')
        const humidity = document.querySelector('.humidity-param')
        const coordinates = document.querySelector('.coordinates-param')
        expect(wind.lastElementChild.textContent).to.equal("1 м/с")
        expect(cloud.lastElementChild.textContent).to.equal("0%")
        expect(pressure.lastElementChild.textContent).to.equal("1018 гпа")
        expect(humidity.lastElementChild.textContent).to.equal("83%")
        expect(coordinates.lastElementChild.textContent).to.equal("[56.24, 93.53]")
        document.querySelector('.weather-city-list').innerHTML = ""
    })
})

describe('weatherHereLoading(), weatherCityLoading()', () => {
    afterEach(() => {
        window = new JSDOM(html).window;
		global.document = window.document;
        global.window = window;
    })

    it('Должен возвращать HTML-элемент загрузки для актуального города', () => {
        script.weatherHere.innerHTML = ""
        script.weatherHere.appendChild(script.weatherHereLoading())
        expect(script.weatherHere.innerHTML.replace(/\s+/g,' ')).to.equal(weatherHereLoadingTemplate.innerHTML.replace(/\s+/g,' '))
        script.weatherHere.innerHTML = ""
  })
    
    it('Должен возвращать HTML-элемент загрузки для избранного города', () => {
  
          script.weatherCityFavorites.innerHTML = ""
          script.weatherCityFavorites.appendChild(script.weatherCityLoading('Moscow'))
          script.weatherCityFavorites.firstElementChild.removeAttribute('cityName')
          expect(script.weatherCityFavorites.innerHTML.replace(/\s+/g,' ')).to.equal(weatherCityLoadingTemplate.innerHTML.replace(/\s+/g,' '))
          script.weatherCityFavorites.innerHTML = ""
    })
      
    
})
describe('weatherHereShow(), weatherCityShow()', () => {
    afterEach(() => {
        window = new JSDOM(html).window;
		global.document = window.document;
        global.window = window;
    })

    it('Должен возвращать HTML-элемент с данными для актуального города', () => {
        script.weatherHere.appendChild(script.weatherHereShow(responseBody))
        expect(script.weatherHere.innerHTML.replace(/\s+/g,' ')).to.equal(readyTemplateHere)
        script.weatherHere.innerHTML = ""
  })
    
    it('Должен возвращать HTML-элемент с данными для избранного города', () => {
  
          script.weatherCityFavorites.appendChild(script.weatherCityShow(responseBody))
          expect(script.weatherCityFavorites.innerHTML.replace(/\s+/g,' ')).to.equal(readyTemplateFavoriteCity)
          script.weatherCityFavorites.innerHTML = ""
    })
      
    
})

describe("loadWeatherFavorites()", () => {
    it("Должен возвращать пустой список", async () => {
      await script.loadWeatherFavorites()
      expect(script.weatherCityFavorites.innerHTML).to.equal("")
    })
    it("Должен возвращать список с 1 городом", async () => {
        script.weatherCityFavorites.appendChild(script.weatherCityShow(responseBody))
        await script.loadWeatherFavorites()
        expect(script.weatherCityFavorites.innerHTML.replace(/\s+/g,' ')).to.equal(readyTemplateFavoriteCity)
        script.weatherCityFavorites.innerHTML = ""
    })
})

mockCity = {
    base: "stations",
    clouds: {all: 90},
    cod: 200,
    coord: {lon: 37, lat: 55},
    main: {temp: 4.15, feels_like: 5.98, temp_min: 3.15, temp_max: 3.15, pressure: 1039, humidity: 91},
    name: "Moscow",
    weather: [{
        description: "overcast clouds",
        icon: "04n",
        id: 804,
        main: "Mist"}],
    wind: {speed: 1, deg: 350}	
};

describe('deleteFromFavorites()', () => {

	it('Должен удалиться город из избранного', async () => {
        cityInput = 'Moscow';
        fetchMock.get(`${baseURL}/weather/city?q=${cityInput}`, mockCity, { overwriteRoutes: false });
		fetchMock.post(`${baseURL}/favourites`, {}, { overwriteRoutes: false });
		fetchMock.delete(`${baseURL}/favourites`, mockCity, { overwriteRoutes: false });
		script.deleteFromFavoritesTest("Moscow", () => {
            expect(script.weatherCityFavorites.innerHTML.replace(/\s+/g,' ')).to.equal("")
            fetchMock.done();
            fetchMock.restore();
		});
	})

	it('Должен вернуть статус 500', async () => {
        cityInput = 'Moscow';
        fetchMock.get(`${baseURL}/weather/city?q=${cityInput}`, mockCity, { overwriteRoutes: false });
		fetchMock.post(`${baseURL}/favourites`, {}, { overwriteRoutes: false });
		fetchMock.delete(`${baseURL}/weather/coordinates?lat=37&lon=55`, 500, { overwriteRoutes: false });
		script.deleteFromFavoritesTest("Moscow", () => {
			expect(script.weatherCityFavorites.innerHTML.replace(/\s+/g,' ')).to.equal(readyTemplateFavoriteCity);
            fetchMock.done();
            fetchMock.restore();
		});
	})
})

describe("addToFavorites()", () => {

    afterEach(() => {
		window = new JSDOM(html).window;
		global.document = window.document;
		global.window = window;
	})

	it('Должен добавить город в избранное', async () => {
        
        cityInput = 'Moscow';
		fetchMock.get(`${baseURL}/weather/city?q=${cityInput}`, mockCity, { overwriteRoutes: false });
		fetchMock.post(`${baseURL}/favourites`, {}, { overwriteRoutes: false });
		script.addToFavoritesTest(cityInput, () => {
            expect(script.weatherCityFavorites.innerHTML.replace(/\s+/g,' ')).to.equal(readyTemplateFavoriteCity);
            fetchMock.done();
            fetchMock.restore();
		});
    })
    
    it('Не должен добавить город в избранное', async () => {
        
        cityInput = 'Moscow';
		fetchMock.get(`${baseURL}/weather/city?q=${cityInput}`, mockCity, { overwriteRoutes: false });
		fetchMock.post(`${baseURL}/favourites`, 500, { overwriteRoutes: false });
		script.addToFavoritesTest(cityInput, () => {
            expect(script.weatherCityFavorites.innerHTML.replace(/\s+/g,' ')).to.equal("");	
            fetchMock.restore();
		});
	})
})

describe('refreshWeatherHere()', () => {

	it('Должен показать информацию об актуальном городе', async () => {

		fetchMock.get(`${baseURL}/weather/coordinates?lat=37&lon=55`, mockCity);
		script.refreshWeatherHere(() => {
            expect(script.weatherHere.innerHTML.replace(/\s+/g,' ')).to.equal(readyTemplateHere)
            fetchMock.done();
            fetchMock.restore();
		});
		geolocate.send({latitude: 37, longitude: 55});
	})

	it('Должен показать информацию об избранном городе', async () => {
        
        fetchMock.get(`${baseURL}/weather/city?q=${cityInput}`, mockCity, { overwriteRoutes: false });
		script.refreshWeatherHere(() => {
            expect(script.weatherHere.innerHTML.replace(/\s+/g,' ')).to.equal(readyTemplateHere)
            fetchMock.done();
            fetchMock.restore();
			done();
		});
		geolocate.sendError({code: 1, message: "DENIED"});
	})

	it('Не должен обновить информацию о городе', async () => {

		fetchMock.get(`${baseURL}/weather/coordinates?lat=37&lon=55`, 500, { overwriteRoutes: false });
		script.refreshWeatherHere(() => {
			expect(script.weatherHere.innerHTML.replace(/\s+/g,' ')).to.equal("");
            fetchMock.done();
            fetchMock.restore();
		});
	})
})
