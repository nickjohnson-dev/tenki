import {
  Box,
  Card,
  Stack,
  Switch,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import type { NextPage } from 'next';
import { ChangeEventHandler, useCallback } from 'react';

import {
  Forecast,
  ForecastList,
  getForecasts,
  TemperatureUnit,
  useForecasts,
  useStorageState,
} from '../src';

interface HomeProps {
  forecasts: Forecast[];
}

const Home: NextPage<HomeProps> = (props) => {
  const { forecasts } = props;
  const [temperatureUnit, setTemperatureUnit] =
    useStorageState<TemperatureUnit>('temperatureUnit', 'F');
  const [zipCode, setZipCode] = useStorageState('zipCode', '');
  useForecasts({ initialData: forecasts });

  const handleTemperatureUnitChange = useCallback(() => {
    setTemperatureUnit(temperatureUnit === 'F' ? 'C' : 'F');
  }, [setTemperatureUnit, temperatureUnit]);

  const handleZipCodeChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const zipCodeRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;

      if (!e.target.value || !zipCodeRegex.test(e.target.value)) return;

      setZipCode(e.target.value);
    },
    [setZipCode],
  );

  return (
    <Box
      p="md"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Box mt={-320} sx={{ maxWidth: 540, width: '100%' }}>
        <>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              height: 320,
              justifyContent: 'center',
            }}
          >
            <Stack>
              <Title order={1}>
                <Text
                  gradient={{ from: 'tomato', to: 'indigo', deg: 45 }}
                  sx={{ fontSize: 'inherit' }}
                  variant="gradient"
                >
                  Tenki | 天気
                </Text>
              </Title>
              <Title align="center" order={4}>
                US Hourly Forecasts
              </Title>
            </Stack>
          </Box>
          <Card
            p="lg"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
            }}
          >
            <Stack spacing="lg">
              <TextInput
                autoComplete="off"
                defaultValue={zipCode}
                onChange={handleZipCodeChange}
                placeholder="Enter a ZIP code"
                size="xl"
                type="number"
              />
              <Switch
                checked={temperatureUnit === 'C'}
                label={
                  temperatureUnit === 'F'
                    ? 'Temperature Unit: F'
                    : 'Temperature Unit: C'
                }
                onChange={handleTemperatureUnitChange}
              />
              {
                <ForecastList
                  temperatureUnit={temperatureUnit}
                  zipCode={zipCode}
                />
              }
            </Stack>
          </Card>
        </>
      </Box>
    </Box>
  );
};

export async function getStaticProps() {
  const forecasts = await getForecasts({});
  return { props: { forecasts } };
}

export default Home;
