import * as React from 'react';
import { Dependency } from 'react-izon-core';


export const useDefinedSourceCode = (dependency: Dependency) => {
  const [code, setCode] = React.useState('');
  const [error, setError] = React.useState<string>('');

  React.useEffect(() => {
    const onError = () => setError('Can not found Component Defined Source Code');

    fetch(`/defined/${dependency.name}`)
      .then((res) => res
        .json()
        .then((json: { code: string }) => setCode(json.code))
        .catch(onError))
      .catch(onError);
  }, [dependency.name]);

  React.useEffect(() => {
    if (error) setError('');
  }, [dependency.name]);

  return {
    code,
    error,
  };
};
