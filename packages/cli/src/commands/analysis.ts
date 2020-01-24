import {Command, flags} from '@oclif/command'

export default class Analysis extends Command {
  static args = [
    {
      name: 'ROOT_COMPONENT_FILE',
      required: true,
      description: 'file path of root component',
    },
    {
      name: 'COMPONENT_NAME',
      required: true,
      description: 'component name to be analyzed',
    },
  ]

  static description = 'display component dependencies';

  static usage = 'analysis [FILE] [TARGET-COMPONENT-NAME]'

  static examples = [
    '$ analysis ./index.jsx Button',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {

  }
}

