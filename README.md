# eslint-config-nicjansma

Nic Jansma's shareable [ESLint](https://eslint.org/) config.

Works with ESLint 4 and later, including ESLint 9+ flat config.

## Install

```sh
npm install --save-dev eslint eslint-config-nicjansma
```

## Usage

### ESLint 9+ (flat config)

In `eslint.config.js`:

```js
module.exports = [
    require("eslint-config-nicjansma/flat")
];
```

Or, in an ES module config (`eslint.config.mjs`, or `"type": "module"`):

```js
import nicjansma from "eslint-config-nicjansma/flat";

export default [
    nicjansma
];
```

This also works on ESLint 8.57+ if you're using flat config.

Flat config treats `.js` files as ES modules by default. If you're linting
plain browser scripts, set the source type after the shared config:

```js
module.exports = [
    require("eslint-config-nicjansma/flat"),
    {
        languageOptions: {
            sourceType: "script"
        }
    }
];
```

### ESLint < 9 (`.eslintrc`)

In `.eslintrc.json`:

```json
{
    "extends": "nicjansma"
}
```

This also works on ESLint 9 with `ESLINT_USE_FLAT_CONFIG=false`.

## Notes

* Both configs extend `eslint:recommended`. The flat config builds the
  recommended rule set from your installed ESLint, so you don't need to install
  `@eslint/js`.
* Rules your installed ESLint doesn't have are skipped. For example,
  `valid-jsdoc` was removed in ESLint 9, so it's only applied on older versions.
  For JSDoc checks on ESLint 9+, add
  [`eslint-plugin-jsdoc`](https://github.com/gajus/eslint-plugin-jsdoc).

## License

MIT
