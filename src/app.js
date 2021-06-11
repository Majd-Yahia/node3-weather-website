const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { response } = require('express')
const cors = require('cors')

const geocode = require('./utils/geocode')
const namecast = require('./utils/namecast')
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
app.use(cors())

app.get('', (req, res) => {
    res.render("index", {
        title: "Panda Weather",
        name: "Majd Yahia"
    })
})


app.get('/about', (req,res) => {
    res.render('about', {
        title: "Panda Weather",
        name: "Majd Yahia"
    })
})


app.get('/contact', (req,res) => {
    res.render('contact', {
        title: "Panda Weather",
        message: "Please contact via email: Majd.M4a4@gmail.com",
        name: "Majd Yahia"
    })
})

//Weather Page!
app.get('/weather', (req,res) => {
    
    if(!req.query.address) {
        return res.send({
            error: "Address must be provided!"
        })
    }

    forecast(req.query.address, (error, forecastData) => {
        if(error){
            return res.send({ error })
        } 
        res.send({
            forecastData
        })
    })
   
})

app.get('/location', (req, res) => {
    namecast(req.lat, req.lng, (error, data)=> {
        if(error){
            return res.send({error});
        }

        res.send({data});
    });
})  


app.get('/contact/*', (req, res) => {
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


app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})