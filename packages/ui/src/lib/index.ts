import open from 'open';
import express from 'express';
import { Dependencies } from '@react-izon/core';

const app = express();

interface ReactIzonUIOptions {
  port?: number;
  isOpen?: boolean;
}

export default function startServer(json : Dependencies, options: ReactIzonUIOptions = {}) {
  const { port = 9000, isOpen = true } = options;

  app.use(express.static('public'));

  app.get('json', (req, res) => {
    res.json(json);
  });

  app.listen(port, () => {
    console.log('Get starting server!!');
  });

  if (isOpen) {
    open(`http://localhost:${port}`);
  }
}
