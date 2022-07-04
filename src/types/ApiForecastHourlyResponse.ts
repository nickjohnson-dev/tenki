import { ApiForecast } from './ApiForecast';

export interface ApiForecastsHourlyResponse {
  properties: {
    periods: ApiForecast[];
  };
}

// {
//   '@context': [
//     'https://geojson.org/geojson-ld/geojson-context.jsonld',
//     {
//       '@version': '1.1';
//       wx: 'https://api.weather.gov/ontology#';
//       geo: 'http://www.opengis.net/ont/geosparql#';
//       unit: 'http://codes.wmo.int/common/unit/';
//       '@vocab': 'https://api.weather.gov/ontology#';
//     },
//   ];
//   type: 'Feature';
//   geometry: {
//     type: 'Polygon';
//     coordinates: [
//       [
//         [-86.5331043, 34.5690691],
//         [-86.53481020000001, 34.5466009],
//         [-86.50752920000001, 34.5451938],
//         [-86.50581790000001, 34.5676618],
//         [-86.5331043, 34.5690691],
//       ],
//     ];
//   };
//   properties: {
//     updated: '2022-07-04T11:14:19+00:00';
//     units: 'us';
//     forecastGenerator: 'HourlyForecastGenerator';
//     generatedAt: '2022-07-04T11:54:16+00:00';
//     updateTime: '2022-07-04T11:14:19+00:00';
//     validTimes: '2022-07-04T05:00:00+00:00/P8DT6H';
//     elevation: {
//       unitCode: 'wmoUnit:m';
//       value: 282.8544;
//     };
//     periods: [
//       {
//         number: 1;
//         name: '';
//         startTime: '2022-07-04T06:00:00-05:00';
//         endTime: '2022-07-04T07:00:00-05:00';
//         isDaytime: true;
//         temperature: 73;
//         temperatureUnit: 'F';
//         temperatureTrend: null;
//         windSpeed: '0 mph';
//         windDirection: 'S';
//         icon: 'https://api.weather.gov/icons/land/day/fog?size=small';
//         shortForecast: 'Patchy Fog';
//         detailedForecast: '';
//       },
//     ];
//   };
// }
