import * as babelTypes from '@babel/types';

export interface UsedComponent {
  parentName: string;
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
  name: string;
  rootPath: string;
  defined?: ComponentDefined;
  used: UsedComponent[];
}

export interface Dependencies {
  [componentName: string]: Dependency;
}

export interface DependencyResultCreator {
  getAllResult(): Dependencies;
  getResult(componentName: string): Dependency;
}

export type CheckStatus = 'progress' | 'end' | 'error';

export type CheckerEvent =
  | {
      type: 'start';
    }
  | {
      type: 'check-start';
      path: string;
      file: string;
    }
  | {
      type: 'check-end';
      path: string;
      file: string;
    }
  | {
      type: 'check-error';
      error: Error;
      path: string;
      file: string;
    }
  | {
      type: 'error';
      error: Error;
    }
  | {
      type: 'done';
      dependencies: Dependencies;
    };

export type EventCallback = (event: CheckerEvent) => void;

export interface VisitorElements {
  root: string;
  file: string;
  componentName?: string;
  parentNode?: babelTypes.Node;
}

