import * as React from 'react';
import { Dependency, Dependencies } from '@react-izon/core';
import styles from './SideBar.module.scss';
import { AppContext } from '../uses';

interface SideBarProps {
  dependencies: Dependencies;
}

export const SideBar: React.FC<SideBarProps> = ({ dependencies }) => {
  const [input, setInput] = React.useState('');
  const [list, setList] = React.useState<Dependency[]>([]);
  const { dispatch } = React.useContext(AppContext);

  React.useEffect(() => {
    const newList = Object.values(dependencies).reduce<Dependency[]>(
      (pre, cur) => (cur && cur.name.includes(input) ? pre.concat(cur) : pre),
      [],
    );

    setList(newList);
  }, [dependencies, input]);

  return (
    <div className={styles.side_bar}>
      <div className={styles.container}>
        <header className={styles.header}>Dashboard</header>
      </div>

      <div className={styles.container}>
        <input
          className={styles.search_input}
          id="sidebar_search_input"
          type="text"
          placeholder="search for comopnents"
          value={input}
          onInput={(e) => setInput(e.currentTarget.value)}
        />
      </div>

      <div className={styles.container}>
        <header className={styles.header}>Comopnents</header>

        <ul className={styles.list}>
          {list.map((dep) => (
            <li
              className={styles.list_item}
              onClick={() => dispatch({ type: 'select-component', payload: dep || null })}
            >
              <p className={styles.list_label}>{dep.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
