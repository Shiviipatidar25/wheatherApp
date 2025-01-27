document.addEventListener('DOMContentLoaded',()=>{
     const cityInput = document.getElementById("city-input");
     const getWeatherBtn = document.getElementById("get-weather-btn");
     const weatherInfo = document.getElementById("weather-info");
     const cityNameDisplay = document.getElementById("city-name");
     const temperatureDisplay = document.getElementById("temperature");
     const descriptionDisplay= document.getElementById("description");
     const errorMessage = document.getElementById("error-message");
    


     const API_KEY = "fcbe54f9b30b6646b93cce55f0d6b3f1"; //api  // env variables

     getWeatherBtn.addEventListener('click' , async() => {
        const city = cityInput.value.trim()
        if(!city) return;
        // wile making any web request 
        // it may thow an error
        //server/database is always in another continent //it takes time
        try {
             const weatherData = await fetchWeatherData(city)
             displayWeatherData(weatherData);

        } catch (error) {
            showError()
            
        }



   });


      async function fetchWeatherData(city){
        //gets the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response =  await fetch(url);
        console.log(typeof response);
        console.log('RESPONSE' , response);
        if(!response.ok){
         throw new Error("City Not found");
      }
      const data = await response.json();
      return data



    }

     function displayWeatherData(data){
        //display
        console.log(data);
        const {name , main , weather} = data
        cityNameDisplay.textContent = name
        //temperatureDisplay.textContent = `temperature : ${main.temp}`;
        // Display temperature with the degree Celsius symbol (°C)
        temperatureDisplay.textContent = `Temperature: ${main.temp}°C`;  // Adding °C symbol after the temperature

        descriptionDisplay.textContent = `weather : ${weather[0].description}`;
       

        // Get weather description
        
       
         

        //unlock the display

        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add("hidden");
        


     }

     //wheather app

     function showError(){
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add("hidden");

     }


     

} )
