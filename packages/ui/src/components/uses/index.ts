import * as React from 'react';
import { Dependency, Dependencies } from '@react-izon/core';

export type Action =
  | { type: 'set-error'; payload: string }
  | { type: 'set-dependencies'; payload: Dependencies }
  | { type: 'select-component'; payload: Dependency | null };

export interface StoreType {
  dependencies: Dependencies;
  selectedDependency: Dependency | null;
}

const defaultDispatch = (() => {}) as React.Dispatch<Action>;

export const Store: StoreType = {
  dependencies: {},
  selectedDependency: null,
};

export const reducer = (store: StoreType, action: Action): StoreType => {
  switch (action.type) {
    case 'set-dependencies': {
      return { ...store, dependencies: action.payload };
    }

    case 'select-component': {
      return { ...store, selectedDependency: action.payload };
    }

    default:
      return store;
  }
};

export const AppContext = React.createContext({
  store: Store,
  dispatch: defaultDispatch,
});
