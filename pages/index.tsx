import { Box, Card, Text, Title } from '@mantine/core';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import useSWR from 'swr';

const Home: NextPage = () => {
  const {
    data: forecasts,
    error,
    isValidating,
  } = useSWR('forecasts', async () => {
    const data = await fetch(
      'https://api.weather.gov/gridpoints/HUN/65,34/forecast/hourly',
    ).then((res) => res.json());

    if (!data) {
      throw new Error('Failed to fetch forecasts.');
    }

    return data;
  });

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
        minHeight: '100vh',
      }}
    >
      {isValidating && <div>Loading...</div>}
      {!isValidating && error && <div>Error: {error.message}</div>}
      {!isValidating && !error && (
        <Box sx={{ maxWidth: 640, width: '100%' }}>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              height: 320,
              justifyContent: 'center',
            }}
          >
            <Title order={1}>
              <Text
                gradient={{ from: 'tomato', to: 'indigo', deg: 45 }}
                sx={{ fontSize: 'inherit' }}
                variant="gradient"
              >
                Tenki | 天気
              </Text>
            </Title>
          </Box>
          <Card sx={{ width: '100%' }}>Test</Card>
        </Box>
      )}
    </Box>
  );
};

export default Home;
