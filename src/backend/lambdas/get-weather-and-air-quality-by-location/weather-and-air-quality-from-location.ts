import fetch from "node-fetch";
import { getSecretValue } from "./secrets-provider";

type City = {
  name: string;
  country: string;
};

type Coord = {
  lon: number;
  lat: number;
};

type WeatherData = {
  coord: Coord;
  weather: {
    description: string;
  };
  temperatures: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
  };
};

const openWeatherApi = "https://api.openweathermap.org/data/2.5";

const getWeatherForCity = async (
  city: City,
  apiKey: string
): Promise<WeatherData> => {
  const url = `${openWeatherApi}/weather?q=${city.name},${city.country}&units=metrics&appid=${apiKey}`;

  const response = await fetch(url);

  console.log(JSON.stringify(response));

  if (response.status !== 200) {
    throw new Error(
      `Error occured while requesting weather. Response status was ${response.status}`
    );
  }

  const result = (await response.json()) as WeatherData;

  return result;
};

const getAirQualityForCity = async (coord: Coord, apiKey: string) => {
  const url = `${openWeatherApi}/air_pollution?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}`;

  const response = await fetch(url);

  if (response.status !== 200) {
    throw new Error(
      `Error occured while requesting air quality. Response status was ${response.status}`
    );
  }

  return await response.json();
};

const getWeatherAndAirQualityForCity = async (city: City) => {
  const openWeatherApiKey = await getSecretValue(
    process.env.OPEN_WEATHER_APIKEY_SECRET_NAME!
  );

  const weatherData = await getWeatherForCity(city, openWeatherApiKey);
  const airQualityData = await getAirQualityForCity(
    weatherData.coord,
    openWeatherApiKey
  );

  return {
    weatherData,
    airQualityData,
  };
};

export { getWeatherAndAirQualityForCity };
