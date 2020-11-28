class OpenWeatherAPI{
    constructor(){
        this.APIKey = 'c58e6bb780cae68578dd9ecad1db5756'
    }
    getIcon(iconCode) {
        return `https://openweathermap.org/img/wn/${iconCode}.png`
    }
    async getByNameOfCity(cityName){
        const responce = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.split('_').join(' ')}&appid=${this.APIKey}&lang=en&units=metric`)
        return await responce.json()
    }
    async getByCoordinatesOfCity(position){
        const [latitude, longitude] = [position.coords.latitude, position.coords.longitude]
        const responce = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.APIKey}&lang=en&units=metric`)
        return await responce.json()
    }
}