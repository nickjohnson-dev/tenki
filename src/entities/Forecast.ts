import { TemperatureUnit, WindDirection } from '../types';

export interface ForecastOptions {
  endDate: Date;
  icon: string;
  id: number;
  shortForecast: string;
  startDate: Date;
  temperature: number;
  temperatureUnit: TemperatureUnit;
  windDirection: WindDirection;
  windSpeed: string;
}

export class Forecast {
  public readonly endDate: Date;
  public readonly icon: string;
  public readonly id: number;
  public readonly shortForecast: string;
  public readonly startDate: Date;
  public readonly temperature: number;
  public readonly temperatureUnit: TemperatureUnit;
  public readonly windDirection: WindDirection;
  public readonly windSpeed: string;

  constructor(options: ForecastOptions) {
    this.endDate = options.endDate;
    this.icon = options.icon;
    this.id = options.id;
    this.shortForecast = options.shortForecast;
    this.startDate = options.startDate;
    this.temperature = options.temperature;
    this.temperatureUnit = options.temperatureUnit;
    this.windDirection = options.windDirection;
    this.windSpeed = options.windSpeed;
  }

  public static create(options: ForecastOptions): Forecast {
    return new Forecast(options);
  }
}
