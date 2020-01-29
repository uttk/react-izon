import * as babelTypes from '@babel/types';

export interface UsedComponent {
  path: string;
  jsx: babelTypes.JSXElement;
}

export type ComponentDefined =
  | babelTypes.ClassDeclaration
  | babelTypes.VariableDeclaration
  | babelTypes.FunctionDeclaration
  | babelTypes.ExportNamedDeclaration
  | babelTypes.ExportDefaultDeclaration;

export interface Dependency {
  rootPath: string;
  defined?: ComponentDefined;
  used: UsedComponent[];
}

export interface Dependencies {
  [componentName: string]: Dependency | void;
}

export interface DependencyResultCreator {
  getAllResult(): Dependencies;
  getResult(componentName: string): Dependency;
}

export type CheckStatus = 'progress' | 'end' | 'error';

export type DoneCallback = (dependencies: Dependencies) => void;
