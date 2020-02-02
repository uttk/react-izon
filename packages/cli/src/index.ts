import cli from "cli-ux";
import * as colors from "colors";
import { SingleBar } from "cli-progress";
import { Command, flags } from "@oclif/command";
import { DependencyChecker } from "react-izon-core";
import { startServer, ServerOptions } from "react-izon-ui";

class ReactIzon extends Command {
  static description = `
  Show React Component dependencies in browser`;

  static usage = "ROOT_COMPONENT_FILE_PATH <options>";

  static examples = [
    "react-izon ./app.jsx",
    "react-izon ./app.jsx -p 5000",
    "react-izon ./app.tsx"
  ];

  static flags = {
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
    open: flags.boolean({ char: "o", default: false }),
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

  private totalTask: number = 1;
  private progress: SingleBar = cli.progress({
    format:
      "Checking Progress |" +
      colors.cyan("{bar}") +
      "| {percentage}% || {value}/{total} || Speed: {speed}",
    barCompleteChar: "\u2588",
    barIncompleteChar: "\u2591",
    hideCursor: true
  });

  private check(path: string, options: ServerOptions) {
    const checker = new DependencyChecker(path, event => {
      switch (event.type) {
        case "start":
          this.progress.start(this.totalTask, 0, { speed: "N/A" });
          break;

        case "check-start":
          this.totalTask += 1;
          this.progress.setTotal(this.totalTask);
          break;

        case "check-end":
          this.progress.increment();
          break;

        case "check-error":
          this.progress.increment();
          this.log(colors.red(event.error.message));
          break;

        case "done":
          this.progress.update(this.totalTask);
          this.progress.stop();
          this.log(colors.green("Cheking Complete !"));

          options.listenCallback = () => {
            this.log(
              `listen to ${colors.bold(`http://localhost:${options.port}`)}`
            );
          };

          startServer(event.dependencies, options);
          break;

        case "error":
          this.error(event.error);
      }
    });

    checker.check();
  }

  async run() {
    const { argv, flags } = this.parse(ReactIzon);
    const path: string = argv[0];
    const options: ServerOptions = {
      isOpen: flags.open,
      port: parseInt(flags.port) || 9000
    };

    this.totalTask = 1;

    this.log(
      colors.gray("Starting React Component Dependencies Checking").underline
    );

    await cli.wait(1000);

    try {
      this.check(path, options);
    } catch (error) {
      this.error(error.message);
    }
  }
}

export = ReactIzon;
