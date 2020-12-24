const localURL = 'http://localhost:3000';
const weatherHere = document.querySelector('.weather-here')
const weatherCityFavorites = document.querySelector('.weather-city-list')

const refreshWeatherHere = () =>{
    weatherHere.innerHTML = ""
    const loadingCity = weatherHereLoading()
    weatherHere.append(loadingCity)
    navigator.geolocation.getCurrentPosition (async position => {
        fetch(`${localURL}/weather/coordinates?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
            .then(resp => resp.json())
            .then(weather => {
                weatherHere.innerHTML = ""
                weatherHere.append(weatherHereShow(weather))
            })
            .catch(() => {
                alert('Что-то пошло не так... Пожалуйста, обновите страницу')
            })
            /*
        openWeatherAPI.getByCoordinatesOfCity(position)
            .then(weather => {
                weatherHere.innerHTML = ""
                weatherHere.append(weatherHereShow(weather))
            })
            .catch(() => {
                 alert('Что-то пошло не так... Пожалуйста, обновите страницу')
            })*/
    }, error => {
        //openWeatherAPI.getByNameOfCity("Saint Petersburg")
        fetch(`${localURL}/weather/city?q=Moscow`)
        .then(resp => resp.json())
        .then(weather => {
            weatherHere.innerHTML = ""
            weatherHere.append(weatherHereShow(weather))
        })
        .catch(() => alert('Что-то пошло не так... Пожалуйста, обновите страницу'))
    })
}
const weatherHereLoading = () => {
    const weatherHereLoadingTemp = document.querySelector('template#weather-here-loading')
    return document.importNode(weatherHereLoadingTemp.content, true)
}
const weatherHereShow = (weather) => {
    const weatherHereShowTemp = document.querySelector('template#weather-here')
    const newWeatherHere = document.importNode(weatherHereShowTemp.content, true)
    setParams(newWeatherHere, weather)
    return newWeatherHere
}
const loadWeatherFavorites = () => {
    fetch(`${localURL}/favourites`).then(resp => resp.json()).then(data => {
        favoritesList = data ? data : [];
        let citiesToLoad = []
        for (const i in favoritesList) {
            const cityName = favoritesList[i]
            if (!weatherCityFavorites.querySelector(`.weather-city[cityName=${cityName}]`))
                citiesToLoad.push(cityName)
        }
        citiesToLoad.forEach(cityToLoad => {
            weatherCityFavorites.append(weatherCityLoading(cityToLoad))
            const newCityElement = weatherCityFavorites.querySelector(`.weather-city[cityName=${cityToLoad}]`)
            openWeatherAPI.getByNameOfCity(cityToLoad)
                .then(weather => 
                    weatherCityFavorites.replaceChild(weatherCityShow(weather), newCityElement))
                .catch(() => alert('Что-то пошло не так... Пожалуйста, обновите страницу'))
        })
    })
    .catch(err => {});
};

const weatherCityLoading = (cityName) => {
    const weatherCityLoadingTemp = document.querySelector('template#weather-city-loading')
    const newWeatherCityLoading = document.importNode(weatherCityLoadingTemp.content, true)
    newWeatherCityLoading.querySelector('.name-city').innerText = cityName.split('_').join(' ')
    newWeatherCityLoading.firstElementChild.setAttribute('cityName', cityName)
    return newWeatherCityLoading
}
const weatherCityShow = (weather) => {
    const weatherCityShowTemp = document.querySelector('template#weather-city')
    const newWeatherCity = document.importNode(weatherCityShowTemp.content, true)
    setParams(newWeatherCity, weather)
    newWeatherCity.querySelector('.delete-button').addEventListener('click', deleteFromFavorites)
    newWeatherCity.firstElementChild.setAttribute('cityName', weather.name.split('_').join(' '))
    return newWeatherCity
}
const setParams = (element, weatherObject) => {
    const {name, icon, temperature, wind, cloud, pressure, humidity, coordinates} = getParams(element)
    name.innerHTML = weatherObject.name
    icon.src = getIcon(weatherObject.weather[0].icon)
    temperature.innerHTML = `${Math.round(weatherObject.main.temp)}°C`
    wind.innerHTML = `${weatherObject.wind.speed} м/с`
    cloud.innerHTML = `${weatherObject.clouds.all}%`
    pressure.innerHTML = `${weatherObject.main.pressure} гпа`
    humidity.innerHTML = `${weatherObject.main.humidity}%`
    coordinates.innerHTML = `[${weatherObject.coord.lat.toFixed(2)}, ${weatherObject.coord.lon.toFixed(2)}]`
    return element
}
const getParams = weatherCity => {
    return {
        name: weatherCity.querySelector('.name-city'),
        icon: weatherCity.querySelector('.icon-weather'),
        temperature: weatherCity.querySelector('.temperature'),
        wind: weatherCity.querySelector('.wind-param .value-param'),
        cloud: weatherCity.querySelector('.clouds-param .value-param'),
        pressure: weatherCity.querySelector('.pressure-param .value-param'),
        humidity: weatherCity.querySelector('.humidity-param .value-param'),
        coordinates: weatherCity.querySelector('.coordinates-param .value-param')
    }
}
const addToFavorites = async event => {
    event.preventDefault()
    const cityName1 = event.currentTarget.firstElementChild.value.split(' ').join('_');
    if (cityName1 === ''){
        alert('Введите название города')
    }
    else{
        const cityName = cityName1[0].toUpperCase() + cityName1.slice(1);
        event.currentTarget.firstElementChild.value = ''
        let cityExisted = false;
        for (const cityElement of weatherCityFavorites.children) {
            const thisCity = cityElement.querySelector('.name-city').innerText
            if (cityName.split('_').join(' ') === thisCity){
                alert('Этот город уже есть в избранном')
                cityExisted = true
                break
            }
        }
        if (cityExisted === false){
            weatherCityFavorites.append(weatherCityLoading(cityName))
            fetch(`${localURL}/weather/city?q=${cityName.split('_').join(' ')}`).then(resp => resp.json()).then(data => {
                if (data.name !== undefined) {
                    postCity(data, cityName);
                } 
                else {
                    alert(`${cityName} не найден!`);
                    const loading = weatherCityFavorites.querySelector(`.weather-city[cityName=${cityName}]`)
                    weatherCityFavorites.removeChild(loading)
                }
            })
            .catch()
        }
    }
}

const addToFavoritesTest = async cityInput=> {
    const cityName1 = cityInput
    if (cityName1 === ''){
        alert('Введите название города')
    }
    else{
        const cityName = cityName1[0].toUpperCase() + cityName1.slice(1);
        let cityExisted = false;
        for (const cityElement of weatherCityFavorites.children) {
            const thisCity = cityElement.querySelector('.name-city').innerText
            if (cityName.split('_').join(' ') === thisCity){
                alert('Этот город уже есть в избранном')
                cityExisted = true
                break
            }
        }
        if (cityExisted === false){
            weatherCityFavorites.append(weatherCityLoading(cityName))
            fetch(`${localURL}/weather/city?q=${cityName.split('_').join(' ')}`).then(resp => resp.json()).then(data => {
                if (data.name !== undefined) {
                    postCity(data, cityName);
                } 
                else {
                    alert(`${cityName} не найден!`);
                    const loading = weatherCityFavorites.querySelector(`.weather-city[cityName=${cityName}]`)
                    weatherCityFavorites.removeChild(loading)
                }
            })
            .catch()
        }
    }
}

function postCity(data, cityName) {
	fetch(`${localURL}/favourites`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
		},
        body: `name=${data.name}`
    }).then(resp => resp.json()).then(() => {
        const loading = weatherCityFavorites.querySelector(`.weather-city[cityName=${cityName}]`)
        weatherCityFavorites.replaceChild(weatherCityShow(data), loading)
	}).catch(function () {
		alert('Что-то пошло не так... Пожалуйста, обновите страницу.')
	});
    /*}).then(resp => resp.json()).then(data2 => {
        const loading = weatherCityFavorites.querySelector(`.weather-city[cityName=${cityName}]`)
        if (data2.result.upserted !== undefined){
            console.log(data);
            weatherCityFavorites.replaceChild(weatherCityShow(data), loading)
        }
        else{
            const nodes1 = weatherCityFavorites.querySelectorAll(`.weather-city[cityName=${cityName}]`)
            const loading1 = nodes1[nodes1.length - 1]
            weatherCityFavorites.removeChild(loading1)
            alert("Этот город уже добавлен!")
        }
    }).catch(function () {
        const nodes2 = weatherCityFavorites.querySelectorAll(`.weather-city[cityName=${cityName}]`)
        const loading2 = nodes2[nodes2.length - 1]
        weatherCityFavorites.removeChild(loading2)
    });*/
}
const deleteFromFavorites = event => {
    const thisCityName = event.currentTarget.parentElement.firstElementChild.innerHTML
    fetch(`${localURL}/favourites`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        body: `name=${thisCityName}`
    })
    .then(resp => resp.json())
    .then(() => {})
    .catch(err => {
        alert(err);
        alert("Город не был удалён");
    });
    let citiesToRemove = []
    for (const cityElement of weatherCityFavorites.children) {
        const thisCity = cityElement.querySelector('.name-city').innerText
        if (thisCityName === thisCity)
            citiesToRemove.push(cityElement)
    }
    citiesToRemove.forEach(cityToRemove => weatherCityFavorites.removeChild(cityToRemove))
}

const deleteFromFavoritesTest = cityName => {
    const thisCityName = cityName
    fetch(`${localURL}/favourites`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        body: `name=${thisCityName}`
    })
    .then(resp => resp.json())
    .then(() => {})
    .catch(err => {
        alert(err);
        alert("Город не был удалён");
    });
    let citiesToRemove = []
    for (const cityElement of weatherCityFavorites.children) {
        const thisCity = cityElement.querySelector('.name-city').innerText
        if (thisCityName === thisCity)
            citiesToRemove.push(cityElement)
    }
    citiesToRemove.forEach(cityToRemove => weatherCityFavorites.removeChild(cityToRemove))
}

function getIcon(iconCode) {
    return `https://openweathermap.org/img/wn/${iconCode}.png`
}

refreshWeatherHere()
loadWeatherFavorites()

module.exports = {
    weatherHereLoading, 
    weatherCityLoading, 
    weatherHereShow, 
    weatherCityShow, 
    refreshWeatherHere,
    getIcon, 
    setParams, 
    getParams, 
    deleteFromFavorites,
    addToFavorites,
    postCity,
    loadWeatherFavorites, 
    deleteFromFavoritesTest, 
    addToFavoritesTest, 
    weatherHere, 
    weatherCityFavorites 
}

