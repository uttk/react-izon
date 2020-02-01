import * as path from 'path';
import * as open from 'open';
import * as express from 'express';
import * as prettier from 'prettier';
import generator from '@babel/generator';
import { Dependency, Dependencies } from '@react-izon/core';

const app = express();

export interface ServerOptions {
  port?: number;
  isOpen?: boolean;
  listenCallback?: (...args: any[]) => void;
}

interface SourceCodeCacheType {
  [componentName: string]: string | void;
}

const SourceCodeCache: SourceCodeCacheType = {};

const getSourceCode = (
  key: string,
  ast: Dependency['defined'] | Dependency['used'][number],
) => {
  const cache = SourceCodeCache[key];

  if (cache) return cache;

  const { code: rawCode } = generator(ast);
  const code = prettier.format(rawCode, { parser: 'typescript' });

  SourceCodeCache[key] = code;

  return code;
};

const getDefinedSourceCode = (dependency: Dependency): string => {
  return getSourceCode(`${dependency.name}:defined`, dependency.defined);
};

const getUsedSourceCode = (dependency: Dependency): string[] => {
  return dependency.used.map((ast, i) => {
    return getSourceCode(`${dependency.name}:used:${i}`, ast);
  });
};

export function startServer(
  dependencies: Dependencies,
  options: ServerOptions,
) {
  const { port = 9000, isOpen = true } = options;

  app.use(express.static(path.resolve(__dirname, './public')));

  app.get('/dependencies', (req, res) => {
    res.json(dependencies);
  });

  app.get('/defined/:name', (req, res) => {
    const { name } = req.params;
    const dependency = dependencies[name];

    if (name && dependency) {
      res.json({
        code: getDefinedSourceCode(dependency),
      });
    }
  });

  app.get('/used/:name', (req, res) => {
    const { name } = req.params;
    const dependency = dependencies[name];

    if (name && dependency) {
      res.json(getUsedSourceCode(dependency));
    }
  });

  app.listen(port, options.listenCallback);

  if (isOpen) {
    open(`http://localhost:${port}`);
  }
}

export default startServer;
