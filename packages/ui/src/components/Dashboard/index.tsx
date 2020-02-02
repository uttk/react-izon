import * as React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useDashboard } from './use';
import { ProgressBar } from '../ProgressBar';
import { DependencyDoughnut } from '../DependencyDoughnut';
import styles from './Dashboard.module.scss';

export const Dashboard: React.FC = () => {
  const {
    code, percent, onText, selectedDependency,
  } = useDashboard();

  return (
    <div className={styles.dashboard}>
      <div>
        <span className={styles.label}>Component Name</span>
        <h1 className={styles.title}>{selectedDependency.name}</h1>
      </div>

      <div className={styles.flex_container}>
        <div style={{ width: '100%' }}>
          <span className={styles.label}>Dependency Graph</span>
          <ProgressBar key={`${selectedDependency.name}-graph`} percent={percent} onText={onText} />
        </div>
      </div>

      <div className={styles.flex_container}>
        <div className={styles.container}>
          <span className={styles.label}>Defined Source Code</span>

          <SyntaxHighlighter
            language="tsx"
            style={atomDark}
            customStyle={{
              position: 'relative',
              maxHeight: 500,
              maxWidth: 850,
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>

        <div className={styles.container}>
          <span className={styles.label}>Comonents Used Times</span>

          <div className={styles.graph}>
            <DependencyDoughnut key={`${selectedDependency.name}-doughnut`} />
          </div>
        </div>
      </div>
    </div>
  );
};
