import * as React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { AppContext, getUsedTimes } from '../util';
import { useDefinedSourceCode } from '../util/useSourceCode';
import styles from './Dashboard.module.scss';
import { DependencyDoughnut } from '../DependencyDoughnut';
import { ProgressBar } from '../ProgressBar';

export const Dashboard: React.FC = () => {
  const { store } = React.useContext(AppContext);
  const { selectedDependency } = store;
  const { code, error } = useDefinedSourceCode(selectedDependency);
  const times = getUsedTimes(selectedDependency);
  const kinds = Object.keys(store.dependencies).length;
  const percent = Math.min(100, Math.round((times / kinds) * 100));

  return (
    <div className={styles.dashboard}>
      <div>
        <span className={styles.label}>Component Name</span>
        <h1 className={styles.title}>{selectedDependency.name}</h1>
      </div>

      <div className={styles.flex_container}>
        <div style={{ width: '100%' }}>
          <span className={styles.label}>Dependency Graph</span>
          <ProgressBar percent={percent} onText={(v) => `${v}%`} />
        </div>
      </div>

      <div className={styles.flex_container}>
        <div className={styles.container}>
          <span className={styles.label}>Defined Source Code</span>

          {error ? (
            <p>{error}</p>
          ) : (
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
          )}
        </div>

        <div className={styles.container}>
          <span className={styles.label}>Comonents Used Times</span>

          <div className={styles.graph}>
            <DependencyDoughnut key={`${selectedDependency.name}-graph`} />
          </div>
        </div>
      </div>
    </div>
  );
};
