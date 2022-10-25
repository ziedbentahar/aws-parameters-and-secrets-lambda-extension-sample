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

export { City, Coord, WeatherData };
