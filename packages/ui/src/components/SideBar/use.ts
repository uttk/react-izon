import * as React from 'react';
import { Dependency } from '@react-izon/core';
import { AppContext } from '../util';

export const useSideBar = () => {
  const { store: { dependencies }, dispatch } = React.useContext(AppContext);
  const [input, setInput] = React.useState('');
  const [list, setList] = React.useState<Dependency[]>([]);

  React.useEffect(() => {
    const newList = Object.values(dependencies).reduce<Dependency[]>(
      (pre, cur) => (cur && cur.name.includes(input) ? pre.concat(cur) : pre),
      [],
    );

    setList(newList);
  }, [dependencies, input]);

  return {
    list,
    input,
    setInput,
    dispatch,
  };
};
