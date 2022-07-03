import { Center } from '@mantine/core';
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
    <Center sx={{ minHeight: '100vh' }}>
      {isValidating && <div>Loading...</div>}
      {!isValidating && error && <div>Error: {error.message}</div>}
      {!isValidating && !error && <div>Test</div>}
    </Center>
  );
};

export default Home;
