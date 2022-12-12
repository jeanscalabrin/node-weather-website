const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8f22cd5866e500348efd56948768fcf6&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    request({ url, json: true}, (error, { body }) => {

        if(error) {
            callback('Não foi possível conectar-se ao serviço de Clima e Tempo. Tente novamente.', undefined)
        } else if (body.success === false) {
            callback('Não foi possível localizar as coordeandas, por favor tente novamente.', undefined)
        } else {
            callback(undefined, {
                locationName: body.location.name + ' - ' + body.location.region + ', ' + body.location.country,
                forecast: body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out. There is ' + body.current.precip + 'mm of rain and ' + body.current.humidity + '% humidity.',
                weatherIcon: body.current.weather_icons
            })
        }
    })
}

module.exports = forecast