import fs from 'fs/promises';
import { join, dirname } from 'path';
// import { format } from 'prettier';
import { componentFileBase } from './helpers';
import { parse } from './parse';
import { generateJs, generateTs } from './generate';

export interface HandleOptions {
  replace?: boolean;
  typescript?: boolean;
}

const logger = console;

const isTs = (componentFile: string) => componentFile.match(/\.tsx?$/);

export const storyFile = (componentFile: string, options: HandleOptions) => {
  const suffix = options.typescript || isTs(componentFile) ? 'tsx' : 'jsx';
  return join(dirname(componentFile), `${componentFileBase(componentFile)}.stories.${suffix}`);
};

export const handle = async (componentFile: string, options: HandleOptions) => {
  try {
    const src = await fs.readFile(componentFile, 'utf8');
    const componentName = parse(src);
    const outputFile = storyFile(componentFile, options);

    // if we're not replacing, test to make sure the output file doesn't already exist
    if (!options.replace) {
      let exists = false;
      try {
        await fs.access(outputFile);
        exists = true;
      } catch (err) {
        // no
      }
      if (exists) throw new Error(`${outputFile} already exists`);
    }

    const generateFn = isTs(outputFile) ? generateTs : generateJs;
    const output = generateFn(componentName, componentFile);
    const formatted = output; // format(output);

    logger.log('✅', componentFile, '=>', outputFile);
    await fs.writeFile(outputFile, formatted);
  } catch (err) {
    logger.error('❌', componentFile, `=> ${err}`);
  }
};
