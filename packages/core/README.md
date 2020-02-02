# react-izon-core

Analyze Dependency of React Component with AST obtained from [@babel/parser](https://www.npmjs.com/package/@babel/parser)

## Install

Install with [npm](https://www.npmjs.com/)

```bash
$> npm install react-izon-core
```

Install with [yarn](https://classic.yarnpkg.com/)

```bash
$> yarn add react-izon-core
```

## Usage

```javascript
import { DependencyChecker } from "react-izon-core"

const checker = new DependencyChecker( analyze_file_path, event => {

  if(event.type === "done"){
    const { dependencies } = event;

    // something
  }

})

checker.check()
```

# License

[MIT](LICENSE "LICENSE")
