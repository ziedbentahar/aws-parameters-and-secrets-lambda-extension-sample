import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { getWeatherAndAirQualityForCity } from "./weather-and-air-quality-from-location";

export const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  const cityName = event.queryStringParameters?.["city"];
  const country = event?.queryStringParameters?.["country"];

  if (cityName && country) {
    const result = await getWeatherAndAirQualityForCity({
      name: cityName,
      country,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        ...result,
      }),
    };
  }

  return {
    statusCode: 400,
    body: "Missing country or city parameters",
  };
};
