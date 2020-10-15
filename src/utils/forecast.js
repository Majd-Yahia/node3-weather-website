const request = require('request')
// const url = 'http://api.weatherstack.com/current?access_key=90235738429c99ab727baf04d15744e3&query=37.8267&units=f'

// request({url: url, json: true}, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to weather survice!')
//     } else if (response.body.success === false) {
//         console.log(response.body.error.info)
//     } else {
//         console.log(response.body.current.weather_descriptions[0] + ". it is currently " + response.body.current.temperature +" degrees out. it feels like " + response.body.current.feelslike + ' degrees out')
//     }
// })

const forecast = (latitude, longtitude, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=90235738429c99ab727baf04d15744e3&query=' + latitude + ',' + longtitude
    
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather survice!', undefined)
        } else if (body.success === false) {
            callback(body.error.info, undefined)
        } else {
            callback(undefined,
                'Observation was taken at ' + body.current.observation_time + '. ' + body.current.weather_descriptions[0] + '. it is currently ' + body.current.temperature + ' degrees out. there is a ' + body.current.precip + 
                '% chance of rain, with a wind speed of ' + body.current.wind_speed + body.current.wind_dir +'.'
                
            )
        }
    })
}

module.exports = forecast