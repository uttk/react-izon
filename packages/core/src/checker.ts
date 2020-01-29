import * as pathResolver from 'path';
import * as babelTypes from '@babel/types';
import { CheckStatus, DoneCallback } from './types';
import {
  asyncFunc,
  getAST,
  getComponentName,
  getIdentiferName,
  checkFilePath
} from './util';
import { ComponentDependencies } from './dependencies';

interface VisitorElements {
  path: string;
  componentName?: string;
  parentNode?: babelTypes.Node;
}

export class DependencyChecker {
  private readonly file: string = '';
  private readonly rootDir: string = '';

  private dependencies = new ComponentDependencies();
  private progress: { [path: string]: CheckStatus } = {};
  private done: DoneCallback;
  private replaceNameList: { [path: string]: string | undefined } = {};

  constructor(file: string, done: DoneCallback) {
    const result = pathResolver.parse(file);
    this.rootDir = result.dir;
    this.file = file;
    this.done = done;

    if(!result.dir || !result.base){
      throw new Error('Invalid file path : ' + file);
    }
  }

  private isDone(): boolean {
    for (const key in this.progress) {
      if (this.progress[key] !== 'end') return false;
    }

    return true;
  }

  private setComponent(
    name?: string,
    path?: string,
    node?: babelTypes.Node
  ): void {
    if (!name) return;

    if (path) {
      this.dependencies.setRootPath(name, path);
    }

    if (
      babelTypes.isClassDeclaration(node) ||
      babelTypes.isVariableDeclaration(node) ||
      babelTypes.isFunctionDeclaration(node) ||
      babelTypes.isExportNamedDeclaration(node) ||
      babelTypes.isExportDefaultDeclaration(node)
    ) {
      this.dependencies.setDefined(name, node);
    }
  }

  private visitor(
    node: babelTypes.Node | null,
    elements: VisitorElements
  ): void {
    const ele = { ...elements };

    if (node === null) return;

    switch (node.type) {
      case 'ImportDeclaration': {
        node.specifiers.forEach(spec => {
          if (
            spec.type === 'ImportDefaultSpecifier' &&
            checkFilePath(node.source.value)
          ) {
            const path = pathResolver.resolve(this.rootDir, node.source.value);

            if (!this.replaceNameList[path]) {
              this.replaceNameList[path] = spec.local.name;
            }
          }
        });

        this.checkAST(node.source.value);
        break;
      }

      case 'ExportDefaultDeclaration': {
        const name = this.replaceNameList[ele.path];

        if (name) {
          ele.parentNode = node;
          ele.componentName = name.charAt(0).toUpperCase() + name.slice(1);

          this.visitor(node.declaration, ele);
        }

        break;
      }

      case 'ExportNamedDeclaration': {
        ele.parentNode = node;
        this.visitor(node.declaration, ele);
        break;
      }

      case 'VariableDeclaration': {
        const dec = node.declarations[0];

        ele.parentNode = ele.parentNode || node;
        ele.componentName = ele.componentName || getIdentiferName(dec.id);

        this.visitor(dec.init, ele);

        break;
      }

      case 'FunctionDeclaration': {
        ele.parentNode = ele.parentNode || node;
        ele.componentName = ele.componentName || getIdentiferName(node.id);

        this.visitor(node.body, ele);

        break;
      }

      case 'ArrowFunctionExpression': {
        if (ele.componentName && ele.parentNode) {
          this.visitor(node.body, ele);
        }

        break;
      }

      case 'ClassExpression': {
        if (ele.componentName && ele.parentNode) {
          node.body.body.forEach(n => this.visitor(n, ele));
        }

        break;
      }

      case 'ClassDeclaration': {
        if (babelTypes.isClassBody(node.body)) {
          ele.parentNode = ele.parentNode || node;
          ele.componentName = ele.componentName || getIdentiferName(node.id);

          node.body.body.forEach(n => this.visitor(n, ele));
        }

        break;
      }

      case 'ClassProperty': {
        if (getIdentiferName(node.key) === 'render') {
          this.visitor(node.value, ele);
        }

        break;
      }

      case 'ClassMethod': {
        if (getIdentiferName(node.key) === 'render') {
          this.visitor(node.body, ele);
        }

        break;
      }

      case 'BlockStatement': {
        node.body.forEach(statement => {
          if (statement.type === 'ReturnStatement') {
            this.visitor(statement.argument, ele);
          }
        });

        break;
      }

      case 'JSXElement': {
        const usedComponentName = getComponentName(node);

        this.setComponent(ele.componentName, ele.path, ele.parentNode);

        if (usedComponentName) {
          this.dependencies.addUsedComponent(usedComponentName, {
            path: ele.path,
            jsx: node
          });
        }

        node.children.forEach(child => this.visitor(child, { path: ele.path }));

        break;
      }
    }
  }

  private checkAST(file: string): void {
    if (!checkFilePath(file)) return;

    const path = pathResolver.resolve(this.rootDir, file);
    this.progress[path] = 'progress';

    asyncFunc(() => {
      const ast = getAST(path);

      ast.forEach(node => this.visitor(node, { path }));

      if (this.progress[path] === 'progress') {
        this.progress[path] = 'end';
      }

      if (this.isDone()) {
        this.done(this.dependencies.getDepedencies());
      }
    });
  }

  public check(): void {
    this.checkAST(pathResolver.basename(this.file));
  }
}
