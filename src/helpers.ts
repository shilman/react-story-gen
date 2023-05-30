import path from 'path';

export const componentFileBase = (componentFile: string) =>
  path.basename(componentFile).split('.')[0];
