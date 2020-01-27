import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styles from './index.scss';

const JSONPreview = () => {
  const [json, setJSON] = React.useState({});
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    fetch('/dependencies').then((res) => {
      res
        .json()
        .then(setJSON)
        .catch(() => setError('情報の取得に失敗しました'));
    });
  }, []);

  return (
    <div>
      <h2>Json Preview</h2>
      <code>{JSON.stringify(json)}</code>
      <p style={{ color: 'red' }}>{error}</p>
    </div>
  );
};

const App = () => (
  <>
    <h1 className={styles.title}>Hello World!</h1>

    <JSONPreview />
  </>
);

ReactDOM.render(<App />, document.getElementById('app'));
