const assert = require('assert');

const extractData = require('../dist/cjs/index.min.js');

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

describe('test', () => {
    const defaultValue = 'not-found';

    const extractedKeys = extractData(sourceObject, keysToExtract, defaultValue);

    it('should extract data', () => {
        assert.strictEqual(extractedKeys['- quoted key -'] === 'yes', true);
        assert.strictEqual(extractedKeys.id === 'bc04be50', true);
        assert.strictEqual(extractedKeys.test === 'something', true);
        assert.strictEqual(extractedKeys.arr === 'hello', true);
    });

    it('should extract data with index appended', () => {
        // if a key with the same name already exists in the output,
        // the index of the key in the source object is appended
        assert.strictEqual(extractedKeys.arr4 === 123, true);
        assert.strictEqual(extractedKeys.test5 === true, true);
    });

    it('should return default value', () => {
        assert.strictEqual(extractedKeys.almeria === defaultValue, true);
    });
});
