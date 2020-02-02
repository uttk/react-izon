import * as React from 'react';
import styles from './ProgressBar.module.scss';

interface ProgressBarProps {
  percent: number;
  delay?: number;
  stroke?: number;
  endTime?: number;
  onText?: (percent: number) => string;
}

const getColor = (percent: number): string => {
  if (percent < 35) return 'green';
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
  const [state, setPercent] = React.useState(0);
  const nowPercent = Math.min(percent, state);

  const style: React.CSSProperties = {
    background: getColor(state),
    width: `${nowPercent || 1}%`,
    height: stroke * 10,
  };

  const updatePercent = (timestamp: number, start?: number) => {
    if (!start) {
      requestAnimationFrame((t) => updatePercent(t, timestamp));
    } else {
      const progress = timestamp - start;
      const per = (progress / endTime) * 100;

      if (per < percent) {
        setPercent(per);

        if (progress < endTime) {
          requestAnimationFrame((t) => updatePercent(t, start));
        }
      }
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      if (state > 0) {
        setPercent(0);
      }

      requestAnimationFrame(updatePercent);
    }, delay);
  }, [percent, delay]);

  return (
    <div className={styles.progress_bar}>
      <div className={styles.bar_container}>
        <div className={styles.bar} style={style} />
        <div className={styles.bar_shadow} />
      </div>

      <p>
        {onText ? onText(Math.round(nowPercent)) : `${Math.round(nowPercent)}`}
      </p>
    </div>
  );
};
