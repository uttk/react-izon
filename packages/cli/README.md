react-izon
==========

Dependency analysis tool of React Component

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/react-izon.svg)](https://npmjs.org/package/react-izon)
[![Downloads/week](https://img.shields.io/npm/dw/react-izon.svg)](https://npmjs.org/package/react-izon)
[![License](https://img.shields.io/npm/l/react-izon.svg)](https://github.com/uttk/react-izon/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g react-izon
$ react-izon COMMAND
running command...
$ react-izon (-v|--version|version)
react-izon/0.0.0 darwin-x64 node-v12.0.0
$ react-izon --help [COMMAND]
USAGE
  $ react-izon COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`react-izon hello [FILE]`](#react-izon-hello-file)
* [`react-izon help [COMMAND]`](#react-izon-help-command)

## `react-izon hello [FILE]`

describe the command here

```
USAGE
  $ react-izon hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ react-izon hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/uttk/react-izon/blob/v0.0.0/src/commands/hello.ts)_

## `react-izon help [COMMAND]`

display help for react-izon

```
USAGE
  $ react-izon help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_
<!-- commandsstop -->
