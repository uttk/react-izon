import * as fs from 'fs';
import * as path from 'path';
import * as babelTypes from '@babel/types';
import * as babelParser from '@babel/parser';

export const getComponentName = (jsx: babelTypes.JSXElement): string | '' => {
  const identifier = jsx.openingElement.name;

  if (identifier.type === 'JSXIdentifier' && /^[A-Z]+/.test(identifier.name)) {
    return identifier.name;
  }

  return '';
};

export const getIdentiferName = (
  statement?: babelTypes.Node | null
): string | '' => {
  if (babelTypes.isIdentifier(statement)) {
    return statement.name;
  }

  return '';
};

export const checkFilePath = (filePath: string): boolean => {
  if (filePath) {
    const { dir, ext } = path.parse(filePath);
    return Boolean(dir || ext);
  }

  return false;
};

const tryExe = ['.js', '.ts', '.jsx', '.tsx'];

export const getAST = (path: string): babelTypes.Statement[] => {
  for (const exe of tryExe) {
    try {
      const readFilePath = /\.(js|ts)x?$/.test(path) ? path : `${path}${exe}`;
      const code = fs.readFileSync(readFilePath, 'utf8');
      const ast = babelParser.parse(code, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript']
      }).program.body;

      return ast;
    } catch {} // eslint-disable-line no-empty
  }

  console.error('can not read this file : ' + path);

  return [];
};

export const asyncFunc = (cb: Function): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => {
      cb();
      resolve();
    }, 0);
  });
};
