import { useQuery } from 'react-query';

import { Forecast } from '../entities';
import { getForecasts } from '../helpers';

export interface UseForecastsOptions {
  initialData?: Forecast[];
  zipCode?: string;
}

export function useForecasts({ initialData, zipCode }: UseForecastsOptions) {
  return useQuery<Forecast[], Error>(
    ['forecasts', { zipCode }],
    () => getForecasts({ zipCode }),
    { enabled: !!zipCode, initialData },
  );
}
