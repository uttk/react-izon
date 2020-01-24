import {Command, flags} from '@oclif/command'

export default class Hello extends Command {
  static args = [
    {name: 'ROOT_COMPONENT_FILE'},
    {name: 'COMPONENT_NAME'},
  ]

  static description = 'describe the command here'

  static examples = [
    `$ react-izon hello
hello world from ./src/hello.ts!
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  async run() {
    const {args, flags} = this.parse(Hello)

    const name = flags.name || 'world'
    this.log(`hello ${name} from ./src/commands/hello.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
