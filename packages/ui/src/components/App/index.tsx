import * as React from 'react';
import { Home } from '../Home';
import { useApp } from './use';
import { SideBar } from '../SideBar';
import { Dashboard } from '../Dashboard';
import { AppContext } from '../util';
import styles from './App.module.scss';

export const App = () => {
  const { store, dispatch } = useApp();

  return (
    <AppContext.Provider value={{ store, dispatch }}>
      <div className={styles.container}>
        <SideBar />

        <div className={styles.body}>
          {store.selectedDependency ? <Dashboard /> : <Home />}
        </div>
      </div>
    </AppContext.Provider>
  );
};
