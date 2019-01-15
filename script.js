const appId = '9ff6613d0257d7b1411683c92f9091f2';
var units = 'metric';
var unitsFake = 'metric';
var searchType;
var tempInCelcius, tempInFahrenheit, celcius, fahrenheit;

//determine the search type
function getSearchType(searchTerm){
       if(searchTerm.length === 6 && Number.parseInt(searchTerm) === searchTerm)
             searchType = 'zip';
       else
             searchType = 'q';

}
//call to openWeatherAPI
function searchWeather(searchTerm){
    getSearchType(searchTerm);

    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchType}=${searchTerm}&APPID=${appId}&units=${units}`).then(result =>{
        return result.json();
    }).then(result => {
        init(result);
    })
}


function init(resultFromServer){
       //type of weather
       if(resultFromServer.message === 'city not found')
         {
             document.body.style.backgroundImage = 'url("default.jpg")';
             document.getElementById('error').style.visibility = 'visible';
             document.getElementById('weatherContainer').style.visibility = 'hidden';
         }
         else{
       console.log(resultFromServer);
       switch(resultFromServer.weather[0].main)
       {
           case 'Thunderstorm':
              document.body.style.backgroundImage = 'url("thunder.jpg")';
               break;
           case 'Drizzle':
           case 'Rain':
              document.body.style.backgroundImage = 'url("rain.jpg")';
              break;
           case 'Snow':
              document.body.style.backgroundImage = 'url("snow.jpg")'; 
               break;   
           case 'Mist':
              document.body.style.backgroundImage = 'url("mist.jpg")';           
               break;    
           case 'Haze':
           case 'Smoke':
           case 'Fog':
              document.body.style.backgroundImage = 'url("haze.jpg")';           
               break;    
           case 'Clear':
                if(resultFromServer.weather[0].icon === '01n')      //for night-clear
                {
                    document.body.style.backgroundImage = 'url("clearNight.jpg")';                        
                }             
                else   //for day-clear
                {
                    document.body.style.backgroundImage = 'url("clear.jpg")';
                }
               break;
           case 'Clouds':
              document.body.style.backgroundImage = 'url("cloudy.jpg")';             
               break;    
       }     

       //getting ids from HTML
       var temperature = document.getElementById('temperature');
       var weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
       var weatherIconImg = document.getElementById('weatherIconImg');
       var windSpeed = document.getElementById('windSpeed');
       var humidity = document.getElementById('humidity'); 

       //displaying the icon
       weatherIconImg.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png'; 

       //displaying the weather description
       let resultWeatherDescription = resultFromServer.weather[0].description;
       weatherDescriptionHeader.innerHTML = resultWeatherDescription.charAt(0).toUpperCase() + resultWeatherDescription.slice(1);

       //displaying temperature
       temperature.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176' +'C'; 
       tempInCelcius = Math.floor(resultFromServer.main.temp);

       //displaying windSpeed
       windSpeed.innerHTML = 'Wind Speed is ' +Math.floor(resultFromServer.wind.speed) + 'm/s';

       //displaying humidity
       humidity.innerHTML = 'Humidity is ' + resultFromServer.main.humidity + '%';

       //displaying cityName
       city.innerHTML = resultFromServer.name;
  
       //displaying longitude and latitude
       latitude.innerHTML = "Latitude: "+resultFromServer.coord.lat;
       longitude.innerHTML = "Longitude: "+resultFromServer.coord.lon;       

       document.getElementById('weatherContainer').style.visibility = 'visible';
       document.getElementById('error').style.visibility = 'hidden';

       document.getElementById('convert').addEventListener('click', ()=>{
        if(unitsFake === 'metric')
        {
            celcius = tempInCelcius;
            tempInFahrenheit = ((celcius * 9)/5) + 32;
            temperature.innerHTML = Math.floor(tempInFahrenheit) + '&#176' +'F'; 
            fahrenheit = Math.floor(tempInFahrenheit);
            unitsFake ='imperial';
        }
        else if(unitsFake === 'imperial')
        {
              celcius = ((fahrenheit - 32) * 5)/9;
              temperature.innerHTML = Math.floor(celcius)+ 1 + '&#176' +'C';
              unitsFake = 'metric';
        }
    })
       
    }
}




//getting value from search bar
document.getElementById('searchBtn').addEventListener('click', ()=>{
       var searchTerm = document.getElementById('searchInput').value;
       if(searchTerm)
          searchWeather(searchTerm);
})


