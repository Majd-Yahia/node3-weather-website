const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { response } = require('express')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve (for static folder index.html)
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Majd Yahia"
    })
})


app.get('/about', (req,res) => {
    res.render('about', {
        title: "About Me",
        name: "Majd Yahia"
    })
})


app.get('/help', (req,res) => {
    res.render('help', {
        title: "Help page",
        message: "Please contact 079xxxxxx",
        name: "Majd"
    })
})


//Weather Page!
app.get('/weather', (req,res) => {
    
    if(!req.query.address) {
        return res.send({
            error: "Address must be provided!"
        })
    }

    geocode(req.query.address, (error, { latitude , longtitude, location} = {} ) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longtitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            } 

            res.send({
                description: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    
})

//
// This below is example!
//
// app.get('/products', (req, res) => {
    
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     } 

//     console.log(req.query)
//     res.send({
//         products: []
//     })
    
// })



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404 Page",
        name: "Majd Yahia",
        message: "Help Article Not found!"
    })
})


app.get('*', (req,res) => {
    res.render('404', {
        title: "404 Page",
        name: "Majd Yahia",
        message: "Page Not Found!"
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})