import * as React from 'react';
import { AppContext, getUsedTimes } from '../util';
import { useDefinedSourceCode } from '../util/useSourceCode';

export const useDashboard = () => {
  const { store } = React.useContext(AppContext);
  const { selectedDependency } = store;
  const { code, error } = useDefinedSourceCode(selectedDependency);
  const times = getUsedTimes(selectedDependency);
  const kinds = Object.keys(store.dependencies).length - 1;
  const percent = Math.min(100, Math.round((times / kinds) * 100));
  const onText = (per: number, end: boolean) => {
    let title = '';

    if (per === 0 && end) title = "Looks like a component that hasn't been used yet. Let's use😎";
    else if (per < 40) title = 'A healthy component😆';
    else if (per < 70) title = 'This component is suspected of addiction🤢';
    else title = 'This component is addicting💀 Review now👩‍⚕️';

    return { title, label: `${Math.round(per)}%` };
  };

  return {
    code,
    error,
    percent,
    selectedDependency,
    onText,
  };
};
