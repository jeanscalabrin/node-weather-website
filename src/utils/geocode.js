const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=59e5b4abc0ea607dfdc29e223e50f8c0&query=' + encodeURIComponent(address)

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Não foi possível conectar-se ao serviço de localização.', undefined)
        } else if (body.error) {
            callback('Não foi possível localizar o endereço. Tente uma nova busca.', undefined)
        } else {
            if(body.data.length === 0) {
                return callback('Não foi possivel localizar o endereço. Tente uma nova busca.', undefined)
            }
            callback(undefined, {
            latitude: body.data[0].latitude,
            longitude: body.data[0].longitude,
            })
        }
    })
}

module.exports = geocode