import open from 'open';
import express from 'express';
import { Dependency, Dependencies } from '@react-izon/core';

const app = express();

export default function startServer(json : Dependencies) {
  app.use(express.static('public'));

  const jsonRoute = express.Router();

  Object.keys(json).forEach((name) => {
    jsonRoute.get(`/${name}`, (req, res) => {
      res.json(json[name]);
    });
  });

  app.use('/json', jsonRoute);

  app.listen(9000, () => {
    console.log('Get starting server!!'); // eslint-disable-line no-console
  });

  open('http://localhost:9000');
}

const dependency = {
  filePath: 'test.jsx', parent: '', defined: {}, jsx: [],
} as Dependency;

startServer({ Hello: dependency });
