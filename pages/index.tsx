import {
  Box,
  Card,
  Center,
  Loader,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import type { NextPage } from 'next';
import { ChangeEventHandler, useCallback, useEffect } from 'react';
import { useQuery } from 'react-query';

import { useStorageState } from '../src';

const Home: NextPage = () => {
  const [zipCode, setZipCode] = useStorageState('zipCode', '');
  const {
    data: forecasts,
    error,
    isLoading,
  } = useQuery<any, Error>(['forecasts', { zipCode }], async () => {
    const data = await fetch(
      'https://api.weather.gov/gridpoints/HUN/65,34/forecast/hourly',
    ).then((res) => res.json());

    if (!data) {
      throw new Error('Failed to fetch forecasts.');
    }

    return data;
  });

  const handleZipCodeChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const zipCodeRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;

      if (!e.target.value || !zipCodeRegex.test(e.target.value)) return;

      setZipCode(e.target.value);
    },
    [setZipCode],
  );

  useEffect(() => {
    console.log({ forecasts });
  }, [forecasts]);

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
      <Box mt={-320} sx={{ maxWidth: 480, width: '100%' }}>
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
            <TextInput
              onChange={handleZipCodeChange}
              placeholder="Enter a ZIP code"
              size="xl"
            />
            {isLoading && (
              <Center p="lg" pb={0} sx={{ flex: 1 }}>
                <Loader />
              </Center>
            )}
            {!isLoading && error && <div>Error: {error.message}</div>}
          </Card>
        </>
      </Box>
    </Box>
  );
};

export default Home;
