import * as path from 'path';
import * as babelTypes from '@babel/types';
import { EventCallback, CheckStatus, VisitorElements } from './types';
import { ComponentDependencies } from './dependencies';
import {
  getAST,
  asyncFunc,
  resolvePath,
  isComonentFile,
  getComponentName,
  getIdentiferName
} from './util';

export class DependencyChecker {
  private readonly file: string = '';
  private readonly rootPath: string = '';

  private dependencies = new ComponentDependencies();
  private checkStatus: { [path: string]: CheckStatus } = {};
  private eventCallback: EventCallback;
  private replaceNameList: { [path: string]: string | undefined } = {};

  constructor(file: string, callback: EventCallback) {
    const resolved = resolvePath(file);
    this.file = file;
    this.rootPath = resolved || file;
    this.eventCallback = callback;

    if (!resolved) {
      this.checkStatus[this.rootPath] = 'error';
    }
  }

  private onCheckError(baseFile: string, file: string, error: Error): void {
    this.checkStatus[file] = 'error';
    this.eventCallback({ type: 'check-error', error, path: baseFile, file });
  }

  private isDone(): boolean {
    for (const key in this.checkStatus) {
      const status = this.checkStatus[key];

      if (status === 'progress') {
        return false;
      }
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

    if (this.dependencies.isDefinedNode(node)) {
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
        if (!isComonentFile(node.source.value)) return;

        node.specifiers.forEach(spec => {
          if (spec.type === 'ImportDefaultSpecifier') {
            const file = resolvePath(node.source.value, ele.root);

            if (!this.replaceNameList[file] && file) {
              this.replaceNameList[file] = spec.local.name;
            }
          }
        });

        this.checkAST(node.source.value, ele.root);
        break;
      }

      case 'ExportDefaultDeclaration': {
        const name = this.replaceNameList[ele.file];

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

        this.setComponent(ele.componentName, ele.root, ele.parentNode);

        if (usedComponentName && ele.componentName) {
          this.dependencies.addUsedComponent(usedComponentName, {
            parentName: ele.componentName,
            path: ele.file,
            jsx: node
          });
        }

        node.children.forEach(child => this.visitor(child, ele));

        break;
      }

      case 'JSXFragment': {
        this.setComponent(ele.componentName, ele.root, ele.parentNode);

        node.children.forEach(child => this.visitor(child, ele));

        break;
      }
    }
  }

  private checkAST(baseFile: string, rootPath?: string): void {
    const file = resolvePath(baseFile, rootPath);

    if (!file) return;

    this.checkStatus[file] = 'progress';
    this.eventCallback({ type: 'check-start', path: baseFile, file });

    asyncFunc(() => {
      const result = getAST(file);

      if (result instanceof Error) {
        this.onCheckError(baseFile, file, result);
      } else {
        const elements = { root: path.dirname(file), file };

        result.forEach(node => this.visitor(node, elements));

        if (this.checkStatus[file] === 'progress') {
          this.checkStatus[file] = 'end';
          this.eventCallback({ type: 'check-end', path: baseFile, file });
        }
      }

      if (this.isDone()) {
        const dependencies = this.dependencies.getDepedencies();
        this.eventCallback({ type: 'done', dependencies });
      }
    });
  }

  public getCheckStatus(): { [path: string]: CheckStatus } {
    return { ...this.checkStatus };
  }

  public check(): void {
    const status = this.checkStatus[this.rootPath];

    switch (status) {
      case 'error':
        this.onCheckError(
          this.file,
          this.rootPath,
          new Error('Invalid file path : ' + this.rootPath)
        );
        break;

      case 'progress':
        this.eventCallback({
          type: 'error',
          error: new Error('Already running')
        });
        break;

      default:
        this.eventCallback({ type: 'start' });
        this.checkAST(this.rootPath);
        break;
    }
  }
}
