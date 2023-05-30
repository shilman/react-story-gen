import path from 'path';
import { dedent } from 'ts-dedent';
import { componentFileBase } from './helpers';

const getRef = (componentName: string, componentFile: string) => {
  const componentBase = componentFileBase(componentFile);
  const fileName = path.basename(componentFile).split('.').slice(0, -1).join('.');
  return componentName
    ? [componentName, `{ ${componentName} }`, fileName]
    : [componentBase, componentBase, fileName];
};

export const generateTs = (componentName: string, componentFile: string) => {
  const [componentRef, componentImport, fileName] = getRef(componentName, componentFile);

  return dedent`
    import type { Meta, StoryObj } from '@storybook/react';
    import ${componentImport} from './${fileName}';

    const meta = {
      component: ${componentRef},
    } satisfies Meta<typeof ${componentRef}>;
    export default meta;

    type Story = StoryObj<typeof meta>;

    export const Default: Story = {};
  `;
};

export const generateJs = (componentName: string, componentFile: string) => {
  const [componentRef, componentImport, fileName] = getRef(componentName, componentFile);

  return dedent`
    import ${componentImport} from './${fileName}';

    export default {
      component: ${componentRef},
    };

    export const Default = {};
  `;
};
