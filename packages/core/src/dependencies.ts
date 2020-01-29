import { Dependencies, Dependency, UsedComponent } from './types';

export class ComponentDependencies {
  private dependencies: Dependencies = {};

  private getDependency(name: string): Dependency {
    const dep = this.dependencies[name];

    if (dep) return dep;

    return {
      rootPath: '',
      used: []
    };
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
    return { ...this.dependencies };
  }
}
