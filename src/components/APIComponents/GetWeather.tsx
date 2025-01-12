import React, { useEffect, useState } from 'react';
import { API_ROOT_URL } from '../../consts/ApiUrl';
import { axiosPrivate } from '../../common/axiosPrivate';
import { TravelPlanDetail } from '../../interfaces/TravelPlanDetail';
import { start } from 'repl';
import WeatherIcon from './WeatherIcon';

export const fetchWeatherData = async (latitude: number, longitude: number, start_date: string, end_date: string) => {
  const params = {
    latitude,
    longitude,
    start_date,
    end_date,
    daily: "weather_code,temperature_2m_max,temperature_2m_min,rain_sum,snowfall_sum",
    temperature_unit: 'fahrenheit',
    precipitation_unit: "inch"
  };

  const url = "https://archive-api.open-meteo.com/v1/archive";

  try {
    const response = await axiosPrivate.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

type GetWeatherProps = {
  travelPlan: TravelPlanDetail;
};

const GetWeather = ({ travelPlan }: GetWeatherProps) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

 
  const fetchLocationDetails = async () => {  
        setCity(travelPlan.post.locations[0].city);
        setCountry(travelPlan.post.locations[0].country);

        const currentStartDate = new Date(travelPlan.post.locations[0].startDate)
        const lastYearStartDate = new Date(travelPlan.post.locations[0].startDate);
        if(currentStartDate.getFullYear() > 2024){
          lastYearStartDate.setFullYear(2024);
          const appendedStartDate = lastYearStartDate.toISOString().split("T")[0];
          setStartDate(appendedStartDate);
        } else
          setStartDate(currentStartDate.toISOString().split("T")[0]);

        const currentEndDate = new Date(travelPlan.post.locations[0].endDate);
        const lastYearEndDate = new Date(travelPlan.post.locations[0].endDate);
        if(currentEndDate.getFullYear() > 2024){
          lastYearEndDate.setFullYear(2024);
          const appendedEndDate = lastYearEndDate.toISOString().split("T")[0]
          setEndDate(appendedEndDate);
        } else
          setEndDate(currentEndDate.toISOString().split("T")[0]);
      
  };
  useEffect(() => {
    fetchLocationDetails();
  }, [travelPlan.id]);

  useEffect(() => {
    if (city && country && startDate && endDate) {
      const fetchWeather = async () => {
        try {
          const coordinates = await getLocationCoordinates(city, country);
          if (coordinates) {
            const { latitude, longitude } = coordinates;

            const weatherResponse = await fetchWeatherData(latitude, longitude, startDate, endDate);
            if (weatherResponse) {
              const daily = weatherResponse.daily;

              const totalMaxTemp = daily.temperature_2m_max.reduce((sum: any, temp: any) => sum + temp, 0);
              const averageMax = totalMaxTemp/daily.temperature_2m_max.length;

              const totalMinTemp = daily.temperature_2m_min.reduce((sum: any, temp: any) => sum + temp, 0);
              const averageMin = totalMinTemp/daily.temperature_2m_min.length;
              
              const totalRainfall = daily.rain_sum.reduce((sum: any, temp: any) => sum + temp, 0);
              const averageRain = totalRainfall/daily.rain_sum.length;
              const totalSnowfall = daily.snowfall_sum.reduce((sum: any, temp: any) => sum + temp, 0);
              const averageSnow = totalSnowfall/daily.snowfall_sum.length;

              const weather = {
                weatherCode: daily.weather_code,
                averageMax: averageMax.toFixed(0),
                averageMin: averageMin.toFixed(0),
                rain: averageRain,
                snowfall: averageSnow
              };
              setWeatherData(weather);
            } else {
              setError("Failed to fetch weather data.");
            }
          } else {
            setError("Unable to fetch location coordinates.");
          }
        } catch (err) {
          setError("Error fetching weather data.");
          console.error(err);
        }
      };

      fetchWeather();
    }
  }, [city, country]);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weatherData ? (
        <div>
          <WeatherIcon rainfall={weatherData.rain} snowfall={weatherData.snowfall} />
          <p>
            <b>{weatherData.averageMax}°F / {weatherData.averageMin}°F</b>
          </p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

const getLocationCoordinates = async (city: string, country: string) => {
    const geocodingUrl = "https://geocoding-api.open-meteo.com/v1/search";
  
    try {
      const locationQuery = `${city},${country}`;
      const encodedLocationQuery = encodeURIComponent(locationQuery);  
      const url = `${geocodingUrl}?name=${encodedLocationQuery}&count=1&language=en&format=json`;  
     
      const response = await fetch(url);
      const data = await response.json();          
      if (data.results && data.results.length > 0) {
        const location = data.results[0];
        return {
          latitude: location.latitude,
          longitude: location.longitude,
        };
      } else {
        console.error("No location found for the given city and country.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching location coordinates:", error);
      return null;
    }
  };  

export default GetWeather;
