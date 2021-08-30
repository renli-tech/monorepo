# monorepo

A template for monorepo projects

> The word monorepo is a combination between “mono”, as in the Greek word mónos (in translation, alone) and an abbreviation of the word repository. A simple concept if taken verbatim: one lonely repository. The domain is software engineering so we’re referring to a home for source code, multimedia assets, binary files, and so on. But this definition is just the tip of the iceberg, since a monorepo in practice is so much more.

### 😎 Guide

The monorepo structure is managed with [Lerna](https://lerna.js.org/)

### 🧩 Branches

- [Master](./) - with default configuration
- [With Rollup](https://github.com/renli-tech/monorepo/tree/with-rollup) - with [Rollup](https://rollupjs.org/guide/en/) configuration for bundling files

#### 😋 Features

- [Eslint](https://eslint.org/) - For linting code
- [Typescript](https://www.typescriptlang.org/) - As programming language
- [Husky](https://typicode.github.io/husky/#/) - For running pre-commit hooks
- [Jest](https://jestjs.io/) - For testing
- [Prettier](https://prettier.io/) - For writing neat code
- [Rollup](https://rollupjs.org/guide/en/) - For bundling files
- [Commitlint](https://commitlint.js.org/#/) - For linting commit messages

#### Commands

To start working with a project built with this template

Run this command to bootstrap all the packages and install the dependencies

```sh

yarn bootstrap

```

#### Bundling packages

To bundle all the packages we are using [Rollup](https://rollupjs.org/guide/en/)

Run this command to bundle all the packages for production

```sh

yarn run bundle

```

And run this command to bundle all the packages for development

```sh

yarn run build

```

To build all packages in watch mode

```sh

yarn run watch

```

#### Testing

Run this command to run all test

```sh

yarn run test

```

View the [lerna docs](https://lerna.js.org/) to see other commands

This template is maintained by [Renli](https://github/renli-tech)

Licence [MIT](./LICENSE)
