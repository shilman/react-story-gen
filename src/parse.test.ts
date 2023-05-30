import { describe, it, expect } from 'vitest';
import { dedent } from 'ts-dedent';
import { parse } from './parse';

describe('parse', () => {
  it('named export', () => {
    expect(parse(`export const Foo = () => <div />`)).toMatchInlineSnapshot('"Foo"');
  });
  it('default export', () => {
    expect(parse(`export default () => <div />`)).toMatchInlineSnapshot('undefined');
  });
  it('no export', () => {
    expect(() => parse(`const Foo = () => <div />`)).toThrowErrorMatchingInlineSnapshot(
      '"No suitable component definition found."'
    );
  });
  it('no component', () => {
    expect(() => parse(`const Foo = () => <div />`)).toThrowErrorMatchingInlineSnapshot(
      '"No suitable component definition found."'
    );
  });
  it('multiple exports', () => {
    expect(() =>
      parse(dedent`
        export const Foo = () => <div />
        export const Bar = () => <div />
      `)
    ).toThrowErrorMatchingInlineSnapshot('"Multiple exported component definitions found."');
  });
});
