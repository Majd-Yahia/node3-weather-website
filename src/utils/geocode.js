const request = require('request')

// Geocoding
// Address -> lat/long -> Weather
// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places.json?access_token=pk.eyJ1Ijoib3ZhZG9zZSIsImEiOiJja2c4MHpyYnEwOHp6MnBvM2ZlemgzbTMyIn0.9hDA4Cs_iRxXQVF_6wXN3A&limit=1'

//  request({url:geocodeURL, json: true}, (error, response) => {

//     if (error) {
//        console.log('Unable to connect to location services!')
//     } else if (response.body.message === 'Not Found') {
//        console.log('Please enter a valid location')
//     } else {
//        const latitude = response.body.features[0].center[0] 
//        const longtiude = response.body.features[0].center[1]
//        callback(latitude, longtiude) 
//     }
// })

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoib3ZhZG9zZSIsImEiOiJja2c4MHpyYnEwOHp6MnBvM2ZlemgzbTMyIn0.9hDA4Cs_iRxXQVF_6wXN3A&limit=1'

    request({url, json: true}, (error, {body} = {}) => { 
        if(error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Please enter a valid location', undefined)

        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0]
            }) 
        }
    })
}

module.exports = geocode