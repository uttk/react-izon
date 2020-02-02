import * as React from 'react';
import styles from './ProgressBar.module.scss';

interface TextOption {
  label?: string;
  title?: string;
}

interface ProgressBarProps {
  percent: number;
  delay?: number;
  stroke?: number;
  endTime?: number;
  onText?: (percent: number, end: boolean) => TextOption;
}

const getColor = (percent: number): string => {
  if (percent < 40) return 'green';
  if (percent < 70) return 'yellow';

  return 'red';
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  delay = 300,
  stroke = 2.5,
  endTime = 3000,
  percent,
  onText,
}) => {
  const [isEnd, setEnd] = React.useState(false);
  const [state, setPercent] = React.useState(0);
  const nowPercent = Math.min(percent, state);

  const style: React.CSSProperties = {
    background: getColor(state),
    width: `${nowPercent || 1}%`,
    height: stroke * 10,
  };

  const updatePercent = (start: number) => requestAnimationFrame((timestamp: number) => {
    const progress = timestamp - start;
    const per = (progress / endTime) * 100;

    if (per < percent) {
      setPercent(per);
      updatePercent(start);
    } else {
      setEnd(true);
    }
  });

  React.useEffect(() => {
    setTimeout(() => {
      if (state > 0) {
        setPercent(0);
      }

      requestAnimationFrame(updatePercent);
    }, delay);
  }, [percent, delay]);

  const option = onText(state, isEnd);

  return (
    <div className={styles.progress_bar}>
      <h2 className={styles.title}>
        {isEnd ? option.title || '' : 'Checking now...😪'}
      </h2>

      <div className={styles.bar_container}>
        <div className={styles.bar} style={style} />
        <div
          className={styles.bar_shadow}
          style={{ width: `${100 - state}%` }}
        />
      </div>

      <p className={styles.label}>{option.label || ''}</p>
    </div>
  );
};
