import {DependencyElement, DependencyResultCreator, DependencyResult, babelTypes} from '../types'

export class ComponentDependency {
  private total_times = 0;

  private store: { [key: string]: DependencyElement | void } = {}

  private getStore = (component_name: string): DependencyElement => {
    const result = this.store[component_name]

    return result ? result : {name: component_name, times: 0, elements: []}
  }

  private getResult = (component_name: string): DependencyResult => {
    const dependency = this.getStore(component_name)

    return {
      name: component_name,
      dependence: (dependency.times / this.total_times),
      jsx: dependency.elements,
    }
  }

  public setDependency = (component_name: string, jsx: babelTypes.JSXElement) => {
    const dependency = this.getStore(component_name)

    this.store[component_name] = {
      ...dependency,
      elements: dependency.elements.concat(jsx),
      times: dependency.times + 1,
    }

    this.total_times += 1
  }

  public getResultCreator(): DependencyResultCreator {
    return {
      getResult: this.getResult,
    }
  }
}

