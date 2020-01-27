import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Dependency } from '@react-izon/core';
import styles from './index.scss';


const useComponentDependency = (componentName: string) => {
  const [json, setJSON] = React.useState<Dependency | null>(null);
  const [error, setError] = React.useState<string>('');

  React.useEffect(() => {
    const onError = () => setError('Can not found Component Dependency');

    fetch(`json/${componentName}`)
      .then((res) => res.json().then(setJSON).catch(onError))
      .catch(onError);
  }, []);


  return { result: json, error };
};


const App = () => {
  const { error, result } = useComponentDependency('Hello');

  return (
    <>
      <h1 className={styles.title}>Hello World!</h1>

      <p style={{ color: 'red' }}>{error}</p>

      <h2>JSON Preview</h2>
      <code>{JSON.stringify(result)}</code>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
