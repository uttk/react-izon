import * as babelTypes from '@babel/types'

export interface Dependency {
  file_path: string;
  parent: babelTypes.JSXElement;
  jsx: babelTypes.JSXElement[];
}

export interface Dependencies {
  [componentName: string]: Dependency;
}

export interface DependencyResultCreator {
  getAllResult(): Dependencies;
  getResult(componentName: string): Dependency;
}

export { babelTypes }
