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

const sourceObj = {
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

const pathMap = {
    quoted: 'level1.- quoted key -',
    id: 'level1.level2.id',
    test: 'level1.level2.level3.test',
    arr_0: 'level1.level2.level3.level4.arr[0]',
    arr_1_0: 'level1.level2.level3.level4.arr[1][0]',
    test2: 'level1.level2.level3.level4.arr[1][1].test',
    almeria: 'level1.level2.level3.level4.level5.almeria'
};

// optional
const defaultValue = 'not-found';

const extractedKeys = extractData(sourceObj, pathMap, defaultValue);

if (extractedKeys.id && extractedKeys.test) {
    // do something
}
```

## Parameters

### `sourceObject`

Type: `Object`<br />

The source object to extract data from.

### `pathMap`

Type: `Object`<br />

An object mapping property names to their paths in the source object.

### `defaultValue`

Type: `String|undefined`

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
