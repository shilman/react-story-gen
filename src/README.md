# React Story Gen

A script to automatically generate minimal story files for your components using CSF3.

Given a glob (remember to add quotes), it will go over all the matching component
files and generate a corresponding `.stories.[tj]sx` file if:

1. The file contains a React compnoent export
2. The story file doesn't already exist

## Usage

```
$ pnpm start --help

Usage: react-story-gen [options] <components>

Automatically generate stories for your React components

Arguments:
  components        glob pattern for your component fiiles

Options:
  -r, --replace     replace existing stories if they exist
  -t, --typescript  generate TS stories even if components are JS
  -h, --help        display help for command
```

## Examples

Process all the files in the test directory:

```sh
pnpm start "test/**/*.tsx"
```

## TODO

- [ ] Package to run as executable
- [ ] Respect required props for components
- [ ] Auto-generated representative