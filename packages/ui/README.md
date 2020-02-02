# @react-izon/ui

Display graph in browser based on data analyzed by `@react-izon/core`

## Install

Install with [npm](https://www.npmjs.com/)

```bash
$> npm install @react-izon/ui
```

Install with [yarn](https://classic.yarnpkg.com/)

```bash
$> yarn add @react-izon/ui
```

## Usage

```javascript
import { DependencyChecker } from "@react-izon/core"
import { startServer } from "@react-izon/ui"

const checker = new DependencyChecker( analyze_file_path, event => {

  if(event.type === "done"){
    startServer(event.dependencies, options)
  }

})

checker.check()
```

# License

[MIT](LICENSE "LICENSE")
