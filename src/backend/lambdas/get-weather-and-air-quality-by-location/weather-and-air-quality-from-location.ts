import fetch from "node-fetch";
import { getSecretValue } from "./secrets-provider";

type City = {
  name: string;
  country: string;
};

const SECRET_NAME = "open-weather-api-key-secret";

const openWeatherApi = "http://api.openweathermap.org/data/2.5";

const getWeatherForCity = async (city: City, apiKey: string) => {
  const url = `${openWeatherApi}/weather?q=${city.name},${city.country}&units=metrics&appid=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
  }

  return {};
};

const getAirQualityForCity = async (city: City, apiKey: string) => {
  const url = `${openWeatherApi}/air_pollution?q=${city.name},${city.country}&appid=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
  }

  return {};
};

const getWeatherAndAirQualityForCity = async (city: City) => {
  const openWeatherApiKey = await getSecretValue(SECRET_NAME);

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
