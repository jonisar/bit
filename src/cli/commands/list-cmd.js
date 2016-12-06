/** @flow */
import R from 'ramda';
import chalk from 'chalk';
import Command from '../command';
import { list } from '../../api';

export default class List extends Command {
  name = 'list';
  description = 'list all box bits';
  alias = 'ls';
  opts = [
    ['i', 'inline', 'remove inline bit']
  ];
  
  action(args: string[], opts: any): Promise<any> {
    return list(opts);
  }

  report(bitNames: string[]): string {
    if (R.isEmpty(bitNames)) {
      return chalk.red('your external bits directory is empty');  
    }

    return chalk.green(bitNames.join('\n'));
  }

}