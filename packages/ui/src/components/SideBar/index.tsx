import * as React from 'react';
import styles from './SideBar.scss';

interface SideBarProps {
  componentNames: string[];
}

export const SideBar: React.FC<SideBarProps> = ({ componentNames }) => (
  <ul className={styles.side_bar}>
    {componentNames.map((name) => (
      <li className={styles.bar_element}>{name}</li>
    ))}
  </ul>
);
