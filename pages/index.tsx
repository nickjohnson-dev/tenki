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
import { useRouter } from 'next/router';
import { ChangeEventHandler, useCallback, useEffect, useState } from 'react';

import { Forecast, ForecastList, TemperatureUnit, useForecasts } from '../src';

interface HomeProps {
  forecasts: Forecast[];
}

const Home: NextPage<HomeProps> = (props) => {
  const { forecasts } = props;
  const router = useRouter();
  const { zipCode: zipCodeParam } = router.query;
  const [isInitializing, setIsInitializing] = useState(true);
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>('F');
  const [zipCode, setZipCode] = useState<string | undefined>();
  useForecasts({ initialData: forecasts });

  const handleTemperatureUnitChange = useCallback(() => {
    setTemperatureUnit(temperatureUnit === 'F' ? 'C' : 'F');
  }, [setTemperatureUnit, temperatureUnit]);

  const handleZipCodeChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const zipCodeRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;

      if (!e.target.value || !zipCodeRegex.test(e.target.value)) return;

      setZipCode(e.target.value);

      router.push(
        { pathname: '/', query: { zipCode: e.target.value } },
        undefined,
        { shallow: true },
      );

      localStorage.setItem('zipCode', e.target.value);
    },
    [router, setZipCode],
  );

  useEffect(() => {
    if (router.isReady && !zipCodeParam) {
      const localStorageZipCode = localStorage.getItem('zipCode');

      if (!!localStorageZipCode) {
        setZipCode(JSON.parse(localStorageZipCode));
      }
    } else {
      setZipCode(zipCodeParam as string);

      localStorage.setItem('zipCode', zipCodeParam as string);
    }

    setIsInitializing(false);
  }, [router.isReady, zipCodeParam]);

  return (
    <Box
      p="md"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Box sx={{ maxWidth: 540, width: '100%' }}>
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
              {!isInitializing && (
                <TextInput
                  autoComplete="off"
                  defaultValue={zipCode}
                  onChange={handleZipCodeChange}
                  placeholder="Enter a ZIP code"
                  size="xl"
                  type="number"
                />
              )}
              <Switch
                checked={temperatureUnit === 'C'}
                label={
                  temperatureUnit === 'F'
                    ? 'Temperature Unit: F'
                    : 'Temperature Unit: C'
                }
                onChange={handleTemperatureUnitChange}
              />
              <ForecastList
                temperatureUnit={temperatureUnit}
                zipCode={zipCode}
              />
            </Stack>
          </Card>
        </>
      </Box>
    </Box>
  );
};

export default Home;
