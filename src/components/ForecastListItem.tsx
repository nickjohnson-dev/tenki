import { Box, Card, Image, Space, Stack, Text } from '@mantine/core';
import format from 'date-fns/format';
import { FC, HTMLAttributes, useMemo } from 'react';

import { Forecast } from '../entities';
import { TemperatureUnit } from '../types';

export interface ForecastListItemProps extends HTMLAttributes<HTMLElement> {
  forecast: Forecast;
  temperatureUnit: TemperatureUnit;
}

export const ForecastListItem: FC<ForecastListItemProps> = (props) => {
  const { forecast, temperatureUnit, ...rest } = props;

  const temperatureText = useMemo(
    () =>
      temperatureUnit === 'F'
        ? `${forecast.temperature}°F`
        : `${fahrenheitToCelcius(forecast.temperature)}°C`,
    [forecast, temperatureUnit],
  );

  return (
    <Card
      sx={(theme) => ({
        backgroundColor: theme.colors.dark[4],
        display: 'flex',
      })}
      {...rest}
    >
      <Stack spacing="sm">
        <Box>
          <Text size="md">{format(forecast.startDate, 'MMM d | hh aa')}</Text>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Image
            alt={forecast.shortForecast}
            height={40}
            radius="md"
            src={forecast.icon}
            sx={{ alignSelf: 'center' }}
            title={forecast.shortForecast}
            width={40}
          />
          <Space w="md" />
          <Box sx={{ flex: '1 1 auto' }}>
            <Text size="md">
              {temperatureText} - {forecast.shortForecast}
            </Text>
            <Text size="sm">
              Wind: {forecast.windSpeed} {forecast.windDirection}
            </Text>
          </Box>
        </Box>
      </Stack>
    </Card>
  );
};

function fahrenheitToCelcius(fahrenheit: number): number {
  return Math.round(((fahrenheit - 32) * 5) / 9);
}
