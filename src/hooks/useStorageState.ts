import { Dispatch, useEffect, useState } from 'react';

export function useStorageState<TState = unknown>(
  key: string,
  initialState: TState,
): [TState, Dispatch<TState>] {
  const [state, setState] = useState(() => {
    if (typeof window === 'undefined') {
      return initialState;
    }

    const storageValue = localStorage.getItem(key);

    if (storageValue) {
      return JSON.parse(storageValue);
    }

    return initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storageValue = localStorage.getItem(key);

    if (storageValue) {
      setState(JSON.parse(storageValue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [state, setState];
}
