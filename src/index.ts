import { program } from 'commander';
import { glob } from 'glob';

import type { HandleOptions } from './handle';
import { handle } from './handle';

const logger = console;

interface MainOptions extends HandleOptions {
  components: string;
  replace: boolean;
  typescript: boolean;
}

const main = async (options: MainOptions) => {
  const files = await glob(options.components, {
    ignore: ['**/*.stories.*'],
  });
  logger.log(`Processing ${files.length} files`);
  await Promise.all(files.map((f) => handle(f, options)));
};

program
  .name('react-story-gen')
  .description('Automatically generate stories for your React components')
  .argument('<components>', 'glob pattern for your component fiiles')
  .option('-r, --replace', 'replace existing stories if they exist')
  .option('-t, --typescript', 'generate TS stories even if components are JS');

program.parse(process.argv);
main({
  ...program.opts(),
  components: program.args[0],
})
  .then(() => {
    logger.log('done');
  })
  .catch((err) => {
    logger.error(err);
  });
