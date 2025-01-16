import React from "react";

const weatherIcons: Record<string, string> = {
  clear: "☀️",
  partlyCloudy: "⛅",
  rainy: "🌧️",
  snowy: "❄️",
 
};

const WeatherIcon = ({rainfall, snowfall} : {rainfall: number; snowfall: number}) => {
 const RAIN_THRESHOLD = 0.25;
 const SNOW_THRESHOLD = 0.25;
 let icon = "☀️";

 if(snowfall > SNOW_THRESHOLD){
    icon = "❄️";
 } else if (rainfall > RAIN_THRESHOLD){
    icon = "🌧️";
 } else if (rainfall > 0.1){
   icon = "⛅";
 }

 return (
    <span role="img" aria-label={snowfall > 0 ? 'Snow' : 'Rain'}>
    {icon}
  </span>
  );
};

export default WeatherIcon;