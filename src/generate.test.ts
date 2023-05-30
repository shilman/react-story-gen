import { describe, it, expect } from 'vitest';
import { generateTs, generateJs } from './generate';

describe('generateTs', () => {
  it('named export', () => {
    expect(generateTs('Foo', 'Foo.js')).toMatchInlineSnapshot(`
      "import type { Meta, StoryObj } from '@storybook/react';
      import { Foo } from './Foo';

      const meta = {
        component: Foo,
      } satisfies Meta<typeof Foo>;
      export default meta;

      type Story = StoryObj<typeof meta>;

      export const Default: Story = {};"
    `);
  });
  it('default export', () => {
    expect(generateTs('', 'Foo.js')).toMatchInlineSnapshot(`
      "import type { Meta, StoryObj } from '@storybook/react';
      import Foo from './Foo';

      const meta = {
        component: Foo,
      } satisfies Meta<typeof Foo>;
      export default meta;

      type Story = StoryObj<typeof meta>;

      export const Default: Story = {};"
    `);
  });
});

describe('generateJs', () => {
  it('named export', () => {
    expect(generateJs('Foo', 'Foo.js')).toMatchInlineSnapshot(`
      "import { Foo } from './Foo';

      export default {
        component: Foo,
      };

      export const Default = {};"
    `);
  });
  it('default export', () => {
    expect(generateJs('', 'Foo.js')).toMatchInlineSnapshot(`
      "import Foo from './Foo';

      export default {
        component: Foo,
      };

      export const Default = {};"
    `);
  });
});
