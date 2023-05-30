import { describe, it, expect } from 'vitest';
import { storyFile } from './handle';

describe.only('storyFile', () => {
  it.each([
    ['foo.js', { typescript: false }, 'foo.stories.jsx'],
    ['foo.js', { typescript: true }, 'foo.stories.tsx'],
    ['foo.ts', { typescript: false }, 'foo.stories.tsx'],
    ['foo.component.ts', { typescript: false }, 'foo.stories.tsx'],
  ])(`%s %o => %s`, (componentFile, options, expected) => {
    expect(storyFile(componentFile, options)).toEqual(expected);
  });
});
