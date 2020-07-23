import React from 'react';
import Moment from 'react-moment';


function WeatherSection() {


  React.useEffect(() => {
    getLocation()
    return () => {

    }
  }, [])

  let [weather,setWeather]=React.useState(null)


  async function getDataFromAPI(lat, lon) {
    let APIKey = "34b3c9a4df17efe4139628aba0f8d947";
    console.log(APIKey);
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`
    );
    let data = await res.json();
    console.log(data, "this is weather data");
    setWeather(data)
  };

  const showLocation = (position) => {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
  

    getDataFromAPI(latitude, longitude);
  };

  const errorHandler = (err) => {
    if (err.code == 1) {
      alert("Error: Access is denied!");
    } else if (err.code == 2) {
      alert("Error: Position is unavailable!");
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      // timeout at 60000 milliseconds (60 seconds)
      var options = { timeout: 60000 };
      navigator.geolocation.getCurrentPosition(
        showLocation,
        errorHandler,
        options
      );
    } else {
      alert("Sorry, browser does not support geolocation!");
    }
  };

console.log(weather)
  return (
    <div className="ui-block">
      {
        weather
        ?<>
         {/* W-Weather */}
      <div className="widget w-wethear">
        <a href="#" className="more">
          <svg className="olymp-three-dots-icon">
            <use xlinkHref="#olymp-three-dots-icon" />
          </svg>
        </a>
        <div className="wethear-now inline-items">
      <div className="temperature-sensor">{weather.main.temp}°</div>
          <div className="max-min-temperature">
            <span>{weather.main.temp_min}°</span>
            <span>{weather.main.temp_max  }°</span>
          </div>
         <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}></img>
        </div>
        <div className="wethear-now-description">
      <div className="climate">{weather.weather[0].description}</div>
          <span>
            Real Feel: <span>{weather.main.feels_like}°</span>
          </span>
          <span>
      Chance of Rain: <span>{weather.main.humidity}%</span>
          </span>
        </div>
        <div className="date-and-place">
          <h5 className="date"><Moment format={"DD/MM/YYYY"} date={Date.now()}></Moment></h5>
      <div className="place">{weather.name}</div>
        </div>
      </div>
      {/* W-Weather */}{" "}
        </>
        :  <div className="widget w-wethear">
        <a href="#" className="more">
          <svg className="olymp-three-dots-icon">
            <use xlinkHref="#olymp-three-dots-icon" />
          </svg>
        </a>
        <div className="wethear-now inline-items">
          <div className="temperature-sensor">64°</div>
          <div className="max-min-temperature">
            <span>58°</span>
            <span>76°</span>
          </div>
          <svg className="olymp-weather-partly-sunny-icon">
            <use xlinkHref="#olymp-weather-partly-sunny-icon" />
          </svg>
        </div>
        <div className="wethear-now-description">
          <div className="climate">Partly Sunny</div>
          <span>
            Real Feel: <span>67°</span>
          </span>
          <span>
            Chance of Rain: <span>49%</span>
          </span>
        </div>
        <ul className="weekly-forecast">
          <li>
            <div className="day">sun</div>
            <svg className="olymp-weather-sunny-icon">
              <use xlinkHref="#olymp-weather-sunny-icon" />
            </svg>
            <div className="temperature-sensor-day">60°</div>
          </li>
          <li>
            <div className="day">mon</div>
            <svg className="olymp-weather-partly-sunny-icon">
              <use xlinkHref="#olymp-weather-partly-sunny-icon" />
            </svg>
            <div className="temperature-sensor-day">58°</div>
          </li>
          <li>
            <div className="day">tue</div>
            <svg className="olymp-weather-cloudy-icon">
              <use xlinkHref="#olymp-weather-cloudy-icon" />
            </svg>
            <div className="temperature-sensor-day">67°</div>
          </li>
          <li>
            <div className="day">wed</div>
            <svg className="olymp-weather-rain-icon">
              <use xlinkHref="#olymp-weather-rain-icon" />
            </svg>
            <div className="temperature-sensor-day">70°</div>
          </li>
          <li>
            <div className="day">thu</div>
            <svg className="olymp-weather-storm-icon">
              <use xlinkHref="#olymp-weather-storm-icon" />
            </svg>
            <div className="temperature-sensor-day">58°</div>
          </li>
          <li>
            <div className="day">fri</div>
            <svg className="olymp-weather-snow-icon">
              <use xlinkHref="#olymp-weather-snow-icon" />
            </svg>
            <div className="temperature-sensor-day">68°</div>
          </li>
          <li>
            <div className="day">sat</div>
            <svg className="olymp-weather-wind-icon-header">
              <use xlinkHref="#olymp-weather-wind-icon-header" />
            </svg>
            <div className="temperature-sensor-day">65°</div>
          </li>
        </ul>
        <div className="date-and-place">
          <h5 className="date">Saturday, March 26th</h5>
          <div className="place">San Francisco, CA</div>
        </div>
      </div>
      }
     
    </div>
  );
}

export default WeatherSection;