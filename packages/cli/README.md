# react-izon

A cli tool that analyzes the dependency of React Component

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/react-izon.svg)](https://npmjs.org/package/react-izon)
[![Downloads/week](https://img.shields.io/npm/dw/react-izon.svg)](https://npmjs.org/package/react-izon)
[![License](https://img.shields.io/npm/l/react-izon.svg)](https://github.com/uttk/react-izon/blob/master/package.json)

* [Usage](#usage)
* [Options](#options)
* [License](#license)

# Usage

```sh-session
$> npm install -g react-izon

$> react-izon [ANALYZE_FILE_PATH] [OPTONS...]

...

listen to http://localhost:9000
```

Use with `npx`

```sh-session
$> npx react-izon [ANALYZE_FILE_PATH] [OPTONS...]

...

listen to http://localhost:9000
```


- `ANALYZE_FILE_PATH` : File path of React Root Component to be analyzed

# Options

- `-v --version` : show `react-izon` version
- `-h --help` : show help
- `-o --open` : open browser automatically
- `-p --port` : setting `localhost` port.


# License

[MIT](LICENSE "LICENSE")
