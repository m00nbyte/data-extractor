# data-extractor

[![npm version](https://img.shields.io/npm/v/@m00nbyte/data-extractor.svg)](https://www.npmjs.org/package/@m00nbyte/data-extractor) [![npm downloads](https://img.shields.io/npm/dm/@m00nbyte/data-extractor)](https://www.npmjs.org/package/@m00nbyte/data-extractor)

---

## Description

Effortlessly extract multiple keys from deeply nested structures within an object, resulting in a reduced, flattened output.

## Installation

```bash
npm install -D @m00nbyte/data-extractor
yarn add -D @m00nbyte/data-extractor
```

## Usage

```js
import extractData from '@m00nbyte/data-extractor';

const sourceObject = {
    level1: {
        '- quoted key -': 'yes',
        level2: {
            id: 'bc04be50',
            level3: {
                test: 'something',
                level4: {
                    arr: ['hello', [123, { test: true }]]
                }
            }
        }
    }
};

const keysToExtract = [
    'level1.- quoted key -',
    'level1.level2.id',
    'level1.level2.level3.test',
    'level1.level2.level3.level4.arr[0]',
    'level1.level2.level3.level4.arr[1][0]',
    'level1.level2.level3.level4.arr[1][1].test',
    'level1.level2.level3.level4.level5.almeria'
];

// optional
const defaultValue = 'not-found';

const extractedKeys = extractData(sourceObject, keysToExtract, defaultValue);
console.log(extractedKeys);

if (extractedKeys.id && extractedKeys.test) {
    // do something
}
```

## Parameters

### `sourceObject`

Type: `Object`
Default: `{}`<br />

An object from which a list of keys should be extracted.

### `keysToExtract`

Type: `Array[...String]`
Default: `[]`<br />

An array of strings representing the paths to the keys that should be extracted from the source object.

### `defaultValue`

Type: `Boolean|String|Number|Object|Array|null|undefined`
Default: `undefined`<br />

An optional default value to return if a key does not exist in the source object.

## Contribution

Feel free to submit issues or pull requests.

## Like my work?

This project needs a :star: from you.
Don't forget to leave a star.

<a href="https://www.buymeacoffee.com/m00nbyte" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" width="217" height="60">
</a>

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
