import * as React from 'react';
import { Dependency } from '@react-izon/core';

export type Action = { type: 'select-component'; payload: Dependency | null };

export interface StoreType {
  selectedDependency: Dependency | null;
}

export const Store: StoreType = {
  selectedDependency: null,
};

const defaultDispatch = (() => {}) as React.Dispatch<Action>;

export const AppContext = React.createContext({
  store: Store,
  dispatch: defaultDispatch,
});

const reducer = (store: StoreType, action: Action): StoreType => {
  switch (action.type) {
    case 'select-component': {
      return { selectedDependency: action.payload };
    }

    default:
      return store;
  }
};

export const useApp = () => {
  const [store, dispatch] = React.useReducer(reducer, Store);

  return { dispatch, store };
};
