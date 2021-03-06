/** @flow */
import R from 'ramda';
import Command from '../../command';
import { importAction } from '../../../api/consumer';
import { immutableUnshift } from '../../../utils';
import { formatBit, paintHeader } from '../../chalk-box';

export default class Import extends Command {
  name = 'import [ids]';
  description = 'import a component';
  alias = 'i';
  opts = [
    ['s', 'save', 'save into bit.json'],
    ['t', 'tester', 'import a tester environment component'],
    ['v', 'verbose', 'show a more verbose output when possible'],
    ['c', 'compiler', 'import a compiler environment component']
  ];
  loader = { autoStart: false, text: 'importing components' };

  action([id, ]: [string, ], { save, tester, compiler, verbose }: any): Promise<any> {
    const loader = this.loader;
    // @TODO - import should support multiple components
    if (tester && compiler) {
      throw new Error('you cant use tester and compiler flags combined');
    }
    
    return importAction({ bitId: id, save, tester, compiler, loader, verbose });
  }

  report(components: any): string {
    if (R.isEmpty(components)) { return 'done'; }
    return immutableUnshift(
      components.map(formatBit),
      paintHeader('imported the following components:')
    ).join('\n');
  }
}
