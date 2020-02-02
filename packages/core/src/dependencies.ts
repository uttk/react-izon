import * as babelTypes from '@babel/types';
import {
  Dependencies,
  Dependency,
  UsedComponent,
  ComponentDefined
} from './types';

export class ComponentDependencies {
  private dependencies: Dependencies = {};

  private getDependency(name: string): Dependency {
    const dep = this.dependencies[name];

    if (dep) return dep;

    return {
      name,
      rootPath: '',
      used: []
    };
  }

  public isDefinedNode(
    node: babelTypes.Node | null | void
  ): node is ComponentDefined {
    if (!node) return false;

    return (
      babelTypes.isClassDeclaration(node) ||
      babelTypes.isVariableDeclaration(node) ||
      babelTypes.isFunctionDeclaration(node) ||
      babelTypes.isExportNamedDeclaration(node) ||
      babelTypes.isExportDefaultDeclaration(node)
    );
  }

  public setRootPath(name: string, rootPath: string): void {
    if (!name) return;

    this.dependencies[name] = { ...this.getDependency(name), rootPath };
  }

  public setDefined(name: string, defined: Dependency['defined']): void {
    if (!name) return;

    this.dependencies[name] = { ...this.getDependency(name), defined };
  }

  public addUsedComponent(name: string, used: UsedComponent): void {
    if (!name) return;

    const dep = this.getDependency(name);
    const newUsed = dep.used.concat(used);

    this.dependencies[name] = { ...dep, used: newUsed };
  }

  public getDepedencies(): Dependencies {
    const result: Dependencies = {};

    Object.values(this.dependencies).forEach(dependency => {
      if (dependency.defined) {
        result[dependency.name] = dependency;
      }
    });

    return result;
  }
}
