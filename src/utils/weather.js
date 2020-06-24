const request = require('request')


const weatherData = (latitude, longitide, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitide}&exclude=minutely,hourly&units=metric&appid=1e98ac666ee4c14152280468c9379cdc`


  request({url, json:true}, (error, {body})=>{
    if(error){
      callback('Unable to connect to Weather', undefined)
    }else{
      currentTemp = body.current.temp,
      maxTemp = body.daily[0].temp.max,
      minTemp = body.daily[0].temp.min
      callback(undefined,`The current temperature is ${currentTemp} degrees. The maximum temperature for today could be ${maxTemp} degrees, and the minimum temperature for today could be ${minTemp}`)
    }
  })
}



module.exports = weatherData