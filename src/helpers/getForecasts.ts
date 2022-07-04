import { ForecastMapper } from '../mappers';
import { ApiForecastsHourlyResponse } from '../types';

export interface GetForecastsOptions {
  zipCode?: string;
}

export async function getForecasts({ zipCode }: GetForecastsOptions) {
  if (!zipCode) return [];

  const data: ApiForecastsHourlyResponse = await fetch(
    'https://api.weather.gov/gridpoints/HUN/65,34/forecast/hourly',
  ).then((res) => res.json());

  if (!data) {
    throw new Error('Failed to fetch forecasts.');
  }

  return data.properties.periods.map(ForecastMapper.apiToEntity);
}
