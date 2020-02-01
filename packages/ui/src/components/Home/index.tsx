import * as React from 'react';
import styles from './Home.module.scss';

export const Home: React.FC = () => (
  <div className={styles.home}>
    <h1>
      Welcome to React-izon
      <span role="img" aria-labelledby="🎉">
        🎉
      </span>
    </h1>
  </div>
);
