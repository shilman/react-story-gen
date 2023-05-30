import * as reactDocgen from 'react-docgen';

/**
 * Parse a component file and return the component export
 * or the empty string if it's a default export. Error if there
 * is no component.
 */
export const parse = (src: string) => {
  const info = reactDocgen.parse(src);
  return info.displayName;
};
