const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Init Express
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// index page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jean Scalabrin'
    })
})

//about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Jean Scalabrin'
    })
})

// help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'help text',
        name: 'Jean Scalabrin'
    })
})

// weather page
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must a provide a address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, { locationName, forecast, weatherIcon} = {}) => {
            if(error) {
                return res.send({
                    error
                })
            }

            res.send({
                locationName,
                forecast,
                weatherIcon
            })

        })
    })
})

// Article not found page Help
app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help artcile not found!',
        name: 'Jean Scalabrin'
    })
})

// 404 page
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found!',
        name: 'Jean Scalabrin'
    })
})

app.listen(3000, () => {
    console.log('Server is up port 3000.')
})