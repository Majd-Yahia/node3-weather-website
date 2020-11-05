const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


const address = document.querySelector('#address')
const date = document.querySelector('#date')
const temp = document.querySelector('#temp')
const feelsLike = document.querySelector('#feels_like')
const description = document.querySelector('#description')

const cloud = document.querySelector('#cloud')
const humid = document.querySelector('#humid')

const weatherIcon = document.querySelector('#weather_icon')

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()

    const location = search.value
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch ('/weather?address=' + location).then( (response) => {
    response.json().then( (data) => {
        if(data.error){
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = ''
            messageTwo.textContent =  ''

            console.log(data)

            address.textContent = data.forecastData.request.query
            date.textContent = data.forecastData.location.localtime
            temp.textContent = data.forecastData.current.temperature + '\°'
            feelsLike.textContent = 'feels like ' + data.forecastData.current.feelslike + '\°'
            description.textContent = data.forecastData.current.weather_descriptions[0]
            cloud.textContent = 'Cloud: ' + data.forecastData.current.cloudcover + '%'
            humid.textContent = 'Humidity: ' + data.forecastData.current.humidity + '%'

            weatherIcon.src = '/img/partlyCloudy.png'
            
            }
        })
    })

})