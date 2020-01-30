import * as React from 'react';
import { Dependencies } from '@react-izon/core';
import { SideBar } from '../SideBar';
import styles from './App.module.scss';

export const App = () => {
  const [json, setJSON] = React.useState<Dependencies>({});
  const [error, setError] = React.useState<string>('');

  React.useEffect(() => {
    const onError = () => setError('Can not found Component Dependency');

    fetch('/json')
      .then((res) => res
        .json()
        .then(setJSON)
        .catch(onError))
      .catch(onError);
  }, []);

  return (
    <>
      {error || null}

      <div className={styles.container}>
        <SideBar componentNames={Object.keys(json)} />

        <div className={styles.body}>
          <h1 className={styles.title}>Hello World</h1>
        </div>
      </div>
    </>
  );
};
