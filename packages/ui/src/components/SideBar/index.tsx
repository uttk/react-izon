import * as React from 'react';
import styles from './SideBar.module.scss';

interface SideBarProps {
  componentNames: string[];
}

export const SideBar: React.FC<SideBarProps> = ({ componentNames }) => (
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
      />
    </div>

    <div className={styles.container}>
      <header className={styles.header}>Comopnents</header>

      <ul className={styles.list}>
        {componentNames.map((name) => (
          <li className={styles.list_item}>
            <p className={styles.list_label}>{name}</p>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
