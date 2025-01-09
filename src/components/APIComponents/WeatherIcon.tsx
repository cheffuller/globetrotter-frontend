import React from "react";

const weatherIcons: Record<string, string> = {
  clear: "☀️",
  partlyCloudy: "⛅",
  rainy: "🌧️",
  snowy: "❄️",
 
};

const WeatherIcon = ({rainfall, snowfall} : {rainfall: number; snowfall: number}) => {
 const RAIN_THRESHOLD = 1;
 const SNOW_THRESHOLD = 1;
 let icon = "☀️";

 if(snowfall > SNOW_THRESHOLD){
    icon = "❄️";
 } else if (rainfall > RAIN_THRESHOLD){
    icon = "🌧️";
 }

 return (
    <span role="img" aria-label={snowfall > 0 ? 'Snow' : 'Rain'}>
    {icon}
  </span>
  );
};

export default WeatherIcon;