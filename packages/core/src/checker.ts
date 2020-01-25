// import * as fs from 'fs'
// import * as path from 'path'
// import * as babelParser from '@babel/parser'
import { babelTypes } from './types'
import { ComponentDependency } from './component-dependency'
// import { getComponentName } from './util'

export class DependenceChecker {
  private readonly root_path: string = ''

  private readonly try_exe = ['js', 'ts', 'jsx', 'tsx']

  private component_dependency = new ComponentDependency();

  // constructor(file_path: string) {
  //   this.root_path = file_path
  //   // this.root_path = file_path.split(/\//).slice(0,-1).filter(v => !/.+\.(ts|js)x?/.test(v)).join('/')
  // }

  private getAST(path: string): babelTypes.Statement[] {
    if (/^[\w@]+/.test(path)) {
      return []
    }

    // for (const exe of this.try_exe) {
    //   let file_path = path

    //   try {
    //     if (!/\.(js|ts)x?$/.test(path)) file_path = `${path}.${exe}`

    //     const code = fs.readFileSync(file_path, 'utf8')

    //     return babelParser.parse(code, {
    //       sourceType: 'module',
    //       plugins: ['jsx', 'typescript'],
    //     }).program.body
    //   } catch  {
    //   }
    // }

    throw new Error('can not read file')
  }

  // private update(jsx: babelTypes.JSXElement) {
  //   const name = getComponentName(jsx)

  //   // if (name) {
  //   //   this.component_dependency.setDependency(name, jsx)
  //   // }

  //   this.visitor(jsx.children)
  // }

  // private visitor(ast: babelTypes.Node[]) {
  //   ast.forEach(node => {
  //     switch (node.type) {
  //       case 'ImportDeclaration': {
  //         const _path = path.resolve(this.root_path, node.source.value)
  //         const statement = this.getAST(_path)

  //         this.visitor(statement)
  //         break
  //       }

  //       case 'ExportNamedDeclaration': {
  //         this.visitor([node.declaration])
  //         break
  //       }

  //       case 'VariableDeclaration': {
  //         const init = node.declarations[0].init

  //         if (init && init.type === 'ArrowFunctionExpression') {
  //           this.visitor([init.body])
  //         }
  //         break
  //       }

  //       case 'JSXElement':
  //         this.update(node)
  //         break
  //     }
  //   })
  // }

  // public check() {
  //   const ast = this.getAST(this.root_path)

  //   this.visitor(ast)
  // }
}

