import fetch from "node-fetch";
import { getSecretValue } from "./secrets-provider";

type City = {
  name: string;
  country: string;
};

const openWeatherApi = "http://api.openweathermap.org/data/2.5";

const getWeatherForCity = async (city: City, apiKey: string) => {
  const url = `${openWeatherApi}/weather?q=${city.name},${city.country}&units=metrics&appid=${apiKey}`;

  const response = await fetch(url);
  console.log(url);
  if (!response.ok) {
    throw new Error(
      `Error occured while requesting weather. Response status was ${response.status}`
    );
  }

  const result = await response.json();

  return result;
};

const getAirQualityForCity = async (city: City, apiKey: string) => {
  const url = `${openWeatherApi}/air_pollution?q=${city.name},${city.country}&appid=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Error occured while requesting weather. Response status was ${response.status}`
    );
  }

  return await response.json();
};

const getWeatherAndAirQualityForCity = async (city: City) => {
  const openWeatherApiKey = await getSecretValue(
    process.env.OPEN_WEATHER_APIKEY_SECRET_NAME!
  );

  const [weather, airQuality] = await Promise.all([
    getWeatherForCity(city, openWeatherApiKey),
    getAirQualityForCity(city, openWeatherApiKey),
  ]);

  return {
    weather,
    airQuality,
  };
};

export { getWeatherAndAirQualityForCity };
