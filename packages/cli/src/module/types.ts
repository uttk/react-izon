import * as babelTypes from '@babel/types'


export interface Dependency {
  file_path: string;
  parent: babelTypes.JSXElement;
  jsx: babelTypes.JSXElement[];
}

export interface DependencyStore {
  [component_name: string]: Dependency
}

export interface DependencyResultCreator {
  getAllResult(): DependencyStore;
  getResult(component_name: string): Dependency;
}

export { babelTypes }
