import { Command, flags } from "@oclif/command";
import { DependencyChecker } from "@react-izon/core";
import { startServer, ServerOptions } from "@react-izon/ui";

class ReactIzon extends Command {
  static description = `
  Show React Component dependencies in browser`;

  static usage = "ROOT_COMPONENT_FILE_PATH <options>";

  static examples = [
    "react-izon ./app.jsx",
    "react-izon ./app.jsx -p 5000",
    "react-izon ./app.tsx"
  ]

  static flags = {
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
    open: flags.boolean({ char: "o", default: true }),
    port: flags.string({ char: "p", default: "9000" })
  };

  static args = [
    {
      name: "ROOT_COMPONENT_FILE_PATH",
      required: true,
      description:
        "File path of the root component of React Components to be analyzed"
    }
  ];

  private check(path: string, options: ServerOptions) {
    const checker = new DependencyChecker(path, depenencies => {
      startServer(depenencies, options);
    });

    checker.check();
  }

  async run() {
    const { argv, flags } = this.parse(ReactIzon);
    const path: string = argv[0];
    const options: ServerOptions = {
      isOpen: flags.open,
      port: parseInt(flags.port) || 9000,
      listenCallback: () => {
        this.log(`listen to http://localhost:${options.port}`);
      }
    };

    try {
      this.check(path, options);
    } catch (error) {
      this.error(error.message);
    }
  }
}

export = ReactIzon;
