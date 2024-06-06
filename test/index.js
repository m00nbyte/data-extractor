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

const pathMap = {
    quoted: 'level1.- quoted key -',
    id: 'level1.level2.id',
    test: 'level1.level2.level3.test',
    arr_0: 'level1.level2.level3.level4.arr[0]',
    arr_1_0: 'level1.level2.level3.level4.arr[1][0]',
    test2: 'level1.level2.level3.level4.arr[1][1].test',
    almeria: 'level1.level2.level3.level4.level5.almeria'
};

describe('test', () => {
    const defaultValue = 'not-found';

    const extractedKeys = extractData(sourceObject, pathMap, defaultValue);

    it('should extract data', () => {
        assert.strictEqual(extractedKeys.quoted === 'yes', true);
        assert.strictEqual(extractedKeys.id === 'bc04be50', true);
        assert.strictEqual(extractedKeys.test === 'something', true);
        assert.strictEqual(extractedKeys.arr_0 === 'hello', true);
        assert.strictEqual(extractedKeys.arr_1_0 === 123, true);
        assert.strictEqual(extractedKeys.test2 === true, true);
    });

    it('should return default value', () => {
        assert.strictEqual(extractedKeys.almeria === defaultValue, true);
    });
});
