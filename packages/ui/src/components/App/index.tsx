import * as React from 'react';
import { Home } from '../Home';
import { SideBar } from '../SideBar';
import { useDependencies } from '../uses/useDependencies';
import { useApp, AppContext } from '../uses';
import styles from './App.module.scss';
import { Dashbaord } from '../Dashboard';

export const App = () => {
  const { store, dispatch } = useApp();
  const { dependencies, error } = useDependencies();

  return (
    <AppContext.Provider value={{ store, dispatch }}>
      {error || null}

      <div className={styles.container}>
        <SideBar dependencies={dependencies} />

        <div className={styles.body}>
          {
            store.selectedDependency
              ? (<Dashbaord />)
              : (<Home />)
          }


        </div>
      </div>
    </AppContext.Provider>
  );
};
