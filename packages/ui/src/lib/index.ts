import * as path from 'path';
import * as open from 'open';
import * as express from 'express';
import { Dependencies } from '@react-izon/core';

const app = express();

export interface ServerOptions {
  port?: number;
  isOpen?: boolean;
  listenCallback?: (...args: any[]) => void;
}

export function startServer(json: Dependencies, options: ServerOptions) {
  const { port = 9000, isOpen = true } = options;

  app.use(express.static(path.resolve(__dirname, './public')));

  app.get('json', (req, res) => {
    res.json(json);
  });

  app.listen(port, options.listenCallback);

  if (isOpen) {
    open(`http://localhost:${port}`);
  }
}

export default startServer;
