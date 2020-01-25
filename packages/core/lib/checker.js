"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const babelParser = require("@babel/parser");
const component_dependency_1 = require("./component-dependency");
const util_1 = require("./util");
class DependenceChecker {
    constructor(file_path) {
        this.root_path = '';
        this.try_exe = ['js', 'ts', 'jsx', 'tsx'];
        this.component_dependency = new component_dependency_1.ComponentDependency();
        this.root_path = file_path;
        // this.root_path = file_path.split(/\//).slice(0,-1).filter(v => !/.+\.(ts|js)x?/.test(v)).join('/')
    }
    getAST(path) {
        if (/^[\w@]+/.test(path)) {
            return [];
        }
        for (const exe of this.try_exe) {
            let file_path = path;
            try {
                if (!/\.(js|ts)x?$/.test(path))
                    file_path = `${path}.${exe}`;
                const code = fs.readFileSync(file_path, 'utf8');
                return babelParser.parse(code, {
                    sourceType: 'module',
                    plugins: ['jsx', 'typescript'],
                }).program.body;
            }
            catch (_a) {
            }
        }
        throw new Error('can not read file');
    }
    update(jsx) {
        const name = util_1.getComponentName(jsx);
        // if (name) {
        //   this.component_dependency.setDependency(name, jsx)
        // }
        this.visitor(jsx.children);
    }
    visitor(ast) {
        ast.forEach(node => {
            switch (node.type) {
                case 'ImportDeclaration': {
                    const _path = path.resolve(this.root_path, node.source.value);
                    const statement = this.getAST(_path);
                    this.visitor(statement);
                    break;
                }
                case 'ExportNamedDeclaration': {
                    this.visitor([node.declaration]);
                    break;
                }
                case 'VariableDeclaration': {
                    const init = node.declarations[0].init;
                    if (init && init.type === 'ArrowFunctionExpression') {
                        this.visitor([init.body]);
                    }
                    break;
                }
                case 'JSXElement':
                    this.update(node);
                    break;
            }
        });
    }
    check() {
        const ast = this.getAST(this.root_path);
        this.visitor(ast);
    }
}
exports.DependenceChecker = DependenceChecker;
