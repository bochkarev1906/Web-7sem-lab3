const refreshWeatherHere = () =>{
    weatherHere.innerHTML = ""
    const loadingCity = weatherHereLoading()
    weatherHere.append(loadingCity)
    navigator.geolocation.getCurrentPosition (async position => {
        openWeatherAPI.getByCoordinatesOfCity(position)
            .then(weather => {
                weatherHere.innerHTML = ""
                weatherHere.append(weatherHereShow(weather))
            })
            .catch(() => {
                 alert('Что-то пошло не так... Пожалуйста, обновите страницу')
            })
    }, error => {
        openWeatherAPI.getByNameOfCity("Saint Petersburg")
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
    const favoritesList = JSON.parse(localStorage.getItem('favoritesList'))
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
}
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
    icon.src = openWeatherAPI.getIcon(weatherObject.weather[0].icon)
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
        const listStorage = JSON.parse(localStorage.getItem('favoritesList'));
        for (var i = 0; i < listStorage.length; i++){
            if (listStorage[i] === cityName) {
                cityExisted = true;
                alert('Этот город уже есть в избранном')
                break;
            }
        }
        if (cityExisted === false){
            weatherCityFavorites.append(weatherCityLoading(cityName))
            const response = await openWeatherAPI.getByNameOfCity(cityName)
            if (response.cod === 200) {
                const favoritesList = JSON.parse(localStorage.getItem('favoritesList'))
                localStorage.setItem('favoritesList', JSON.stringify([cityName, ...favoritesList]))
                const loading = weatherCityFavorites.querySelector(`.weather-city[cityName=${cityName}]`)
                weatherCityFavorites.replaceChild(weatherCityShow(response), loading)
            } 
            else{
                if (response.cod === '404'){
                    alert(`${cityName} не найден`)
                    const loading = weatherCityFavorites.querySelector(`.weather-city[cityName=${cityName}]`)
                    weatherCityFavorites.removeChild(loading)
                } 
            } 
        }
    }
}
const deleteFromFavorites = event => {
    const thisCityName = event.currentTarget.parentElement.firstElementChild.innerHTML
    const favoritesList = JSON.parse(localStorage.getItem('favoritesList').split('_').join(' '))
    localStorage.setItem('favoritesList', JSON.stringify(favoritesList.filter(cityName => cityName !== thisCityName)))
    let citiesToRemove = []
    const favoritesList1 = JSON.parse(localStorage.getItem('favoritesList').split('_').join(' '))
    for (const cityElement of weatherCityFavorites.children) {
        const thisCityName = cityElement.querySelector('.name-city').innerText
        if (!(favoritesList1.includes(thisCityName)))
            citiesToRemove.push(cityElement)
    }
    citiesToRemove.forEach(cityToRemove => weatherCityFavorites.removeChild(cityToRemove))
}