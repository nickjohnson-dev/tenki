import { TemperatureUnit } from './TemperatureUnit';
import { WindDirection } from './WindDirection';

export interface ApiForecast {
  endTime: string;
  icon: string;
  number: number;
  shortForecast: string;
  startTime: string;
  temperature: number;
  temperatureUnit: TemperatureUnit;
  windDirection: WindDirection;
  windSpeed: string;
}
