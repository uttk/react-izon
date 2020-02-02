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

const tryExt = ['.js', '.ts', '.jsx', '.tsx'];

const tryPaths = tryExt.reduce<string[]>((pre, cur) => {
  return [...pre, cur, `/index${cur}`];
}, []);

export const isComonentFile = (relativePath: string): boolean => {
  if (!/^\.{1,2}\//.test(relativePath)) return false;

  const ext = path.extname(relativePath);

  return ext ? !!tryExt.find(v => v === ext) : true;
};

export const resolvePath = (baseFile: string, rootPath = ''): string => {
  const ext = path.extname(baseFile);

  if (ext && !tryExt.find(v => v === ext)) {
    return '';
  }

  const file = path.resolve(rootPath, baseFile);

  for (const exe of tryPaths) {
    try {
      const readFilePath = /\.(js|ts)x?$/.test(file) ? file : `${file}${exe}`;

      fs.statSync(readFilePath);

      return readFilePath;
    } catch {} // eslint-disable-line no-empty
  }

  return '';
};

export const getAST = (file: string): babelTypes.Statement[] | Error => {
  try {
    const code = fs.readFileSync(file, 'utf8');
    const ast = babelParser.parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript']
    }).program.body;

    return ast;
  } catch {} // eslint-disable-line no-empty

  return new Error('can not read this file : ' + path);
};

export const asyncFunc = (cb: Function): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => {
      cb();
      resolve();
    }, 0);
  });
};
