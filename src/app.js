const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geolocation')
const weatherData = require('./utils/weather')
const { request } = require('express')

const app = express()


const publucDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(publucDir))


app.get('', (req, res) =>{
  res.render('index',{
    title:'Weather app',
    name:'Sairaj Jadhav'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title:'About Me',
    name:'Sairaj Jadhav'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title:'Help',
    message:'Do you need any help?'
  })
})

app.get('/products', (req, res) => {

  if(!req.query.search){
    return res.send({
      error:"Error"
    })
  }

  res.send({
    products:[]
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({
      error:"Please enter valid Address."
    })
  }
  const address = req.query.address

  geocode(address, (error, {latitude, longitude, location} = {}) => {
    if(error) {
      return res.send({
        error
      })
    }
  
    weatherData(latitude, longitude, (error, forecastData) => {
      if(error){
        return res.send({
          error
        })
      }
      res.send({
        location,
        forecast:forecastData,
        address:req.query.address
      })
    })
  })
  

  // res.send({
  //   address:req.query.address
  // })

})

app.get('/about/*', (req, res) => {
  res.render('404', {
    title:'404',
    message:"About not found!",
    name:'Sairaj Jadhav'
  })
})
app.get('/help/*', (req, res) => {
  res.render('404', {
    title:'404',
    message:'Help not found!',
    name:'Sairaj Jadhav'
  })
})
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message:'Page Not Found!'
  })
})


app.listen(3000, () => {
  console.log("Server is up at 3000");
  
})


