import { Forecast } from '../entities';
import { ApiForecast } from '../types';

export const ForecastMapper = {
  apiToEntity: (apiForecast: ApiForecast): Forecast => {
    return Forecast.create({
      endDate: new Date(apiForecast.endTime),
      icon: apiForecast.icon,
      id: apiForecast.number,
      shortForecast: apiForecast.shortForecast,
      startDate: new Date(apiForecast.startTime),
      temperature: apiForecast.temperature,
      temperatureUnit: apiForecast.temperatureUnit,
      windDirection: apiForecast.windDirection,
      windSpeed: apiForecast.windSpeed,
    });
  },
};
