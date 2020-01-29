import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Dependencies } from '@react-izon/core';
import { SideBar } from './SideBar';
import styles from './index.scss';


const App = () => {
  const [json, setJSON] = React.useState<Dependencies | null>(null);
  const [error, setError] = React.useState<string>('');

  React.useEffect(() => {
    const onError = () => setError('Can not found Component Dependency');

    fetch('/json')
      .then((res) => res.json().then(setJSON).catch(onError))
      .catch(onError);
  }, []);

  return (
    <>
      { error ? (<p className={styles.error_message}>{ error }</p>) : null}

      <SideBar componentNames={Object.keys(json)} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
