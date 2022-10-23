import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { getWeatherAndAirQualityForCity } from "./weather-and-air-quality-from-location";

export const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  const result = await getWeatherAndAirQualityForCity({
    name: "Paris",
    country: "FR",
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      ...result,
    }),
  };
};
