import * as React from 'react';
import { Dependencies } from '@react-izon/core';
import { reducer, Store } from '../uses';

export const useApp = () => {
  const [store, dispatch] = React.useReducer(reducer, Store);

  React.useEffect(() => {
    const onError = () => dispatch({
      type: 'set-error',
      payload: 'Can not found Component Dependency',
    });
    const onJson = (json: Dependencies) => dispatch({ type: 'set-dependencies', payload: json });

    fetch('/dependencies')
      .then((res) => res
        .json()
        .then(onJson)
        .catch(onError))
      .catch(onError);
  }, []);

  return { store, dispatch };
};
