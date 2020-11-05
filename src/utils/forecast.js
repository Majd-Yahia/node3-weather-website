const request = require('request')

const forecast = (location, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=90235738429c99ab727baf04d15744e3&query=' + location
    
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather survice!', undefined)
        } else if (body.success === false) {
            callback(body.error.info, undefined)
        } else {
            callback(undefined,body)
        }
    })
}

module.exports = forecast