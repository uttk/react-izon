import * as React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { AppContext } from '../uses';
import { useDefinedSourceCode } from '../uses/useSourceCode';
import styles from './Dashboard.module.scss';

export const Dashbaord: React.FC = () => {
  const { store } = React.useContext(AppContext);
  const { selectedDependency } = store;
  const { code, error } = useDefinedSourceCode(selectedDependency);

  return (
    <div className={styles.dashbaord}>
      <header className={styles.header}>
        <div className={styles.link}>{selectedDependency.rootPath}</div>
        <h1>{selectedDependency.name}</h1>
      </header>

      <div>

        <h2>依存度</h2>


      </div>


      <div className={styles.defined}>
        <h3>Defined Source Code</h3>

        {error ? (
          <p>{error}</p>
        ) : (
          <SyntaxHighlighter language="typescript" style={atomDark}>
            {code}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  );
};
