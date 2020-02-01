import * as React from 'react';
import { Dependencies } from '@react-izon/core';

export const useDependencies = () => {
  const [dependencies, setJSON] = React.useState<Dependencies>({});
  const [error, setError] = React.useState<string>('');

  React.useEffect(() => {
    const onError = () => setError('Can not found Component Dependency');

    fetch('/dependencies')
      .then((res) => res
        .json()
        .then(setJSON)
        .catch(onError))
      .catch(onError);
  }, []);

  return {
    dependencies,
    error,
  };
};
