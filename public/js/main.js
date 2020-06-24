const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationMsg = document.querySelector('#msgone')
const forecastMsg = document.querySelector('#msgtwo')

weatherForm.addEventListener('submit', (e) => {

  // console.log("test");
  cityName = search.value
  // console.log(cityName);
  
  locationMsg.textContent = 'loading...';
  forecastMsg.textContent = '';

  const url = `http://localhost:3000/weather?address=${cityName}`
  
  fetch(url).then((response) => {
    response.json().then((data) => {
      if(data.error){
          locationMsg.textContent = data.error        
      }else {
        locationMsg.textContent = data.location;
        forecastMsg.textContent = data.forecast;
      }
      
    })
})

  e.preventDefault();

})

 
 