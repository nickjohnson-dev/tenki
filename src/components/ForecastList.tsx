import { Box, Center, Loader } from '@mantine/core';
import { FC, HTMLAttributes, useMemo } from 'react';

import { useForecasts } from '../hooks';
import { TemperatureUnit } from '../types';
import { ForecastListItem } from './ForecastListItem';

type ForecastListViewState =
  | 'empty'
  | 'error'
  | 'initial'
  | 'results'
  | 'loading';

export interface ForecastListProps extends HTMLAttributes<HTMLElement> {
  temperatureUnit: TemperatureUnit;
  zipCode?: string;
}

export const ForecastList: FC<ForecastListProps> = (props) => {
  const { temperatureUnit, zipCode } = props;
  const { data: forecasts = [], error, status } = useForecasts({ zipCode });

  const viewState = useMemo<ForecastListViewState>(() => {
    if (!zipCode) return 'initial';
    if (status === 'loading') return 'loading';
    if (!!error) return 'error';
    if (forecasts.length < 1) return 'empty';
    return 'results';
  }, [error, forecasts.length, status, zipCode]);

  return (
    <Box sx={{ maxHeight: 600, minHeight: 0, overflowY: 'auto' }}>
      {viewState === 'empty' && <div>No forecasts found</div>}
      {viewState === 'error' && <div>Error: {error?.message}</div>}
      {viewState === 'initial' && null}
      {viewState === 'loading' && (
        <Center p="lg" pb={0} sx={{ flex: 1 }}>
          <Loader />
        </Center>
      )}
      {viewState === 'results' && (
        <Box
          pr="lg"
          sx={(theme) => ({
            '& > * + *': {
              marginTop: theme.spacing.lg,
            },
          })}
        >
          {forecasts.map((forecast) => (
            <ForecastListItem
              key={forecast.id}
              forecast={forecast}
              temperatureUnit={temperatureUnit}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
