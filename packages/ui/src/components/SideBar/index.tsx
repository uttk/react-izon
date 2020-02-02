import * as React from 'react';
import styles from './SideBar.module.scss';
import { useSideBar } from './use';

export const SideBar: React.FC = () => {
  const {
    list, input, setInput, dispatch,
  } = useSideBar();

  return (
    <div className={styles.side_bar}>
      <div className={styles.container}>
        <h3 className={styles.header}>Dashboard</h3>
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
        <h3 className={styles.header}>Comopnents</h3>

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
