/**
 * Extracts multiple keys from any depth within an object and returns them in a flattened structure.
 *
 * @param {Record<string, any>} obj - The source object from which keys will be extracted.
 * @param {string[]} arr - An array of keys to be extracted from the source object.
 * @param {*} [def=undefined] - The default value to return if a key is not found in the source object.
 * @returns {Record<string, any>} - An object containing the extracted keys with their corresponding values.
 */
const extractData = (obj: Record<string, any> = {}, arr: string[] = [], def: any = undefined): Record<string, any> => {
    // Check if obj is empty or not an object
    if (typeof obj !== 'object' || Object.keys(obj).length === 0) {
        throw new Error('Invalid source object. Please provide a non-empty object.');
    }

    // Check if arr is not an array or empty
    if (!Array.isArray(arr) || arr.length === 0) {
        throw new Error('Invalid array of key. Please provide a non-empty array.');
    }

    // Remove duplicate entries
    const set = [...new Set(arr)];

    // Process unique keys
    const res: Record<string, any> = set.reduce((keys: Record<string, any>, path) => {
        // Split levels, supporting array indexes
        const levels = path.split(/[\.\[\]\'\"]/).filter((p) => p);

        // Strip path and select the last level
        let key = levels.slice(-1)?.[0] as string;

        // If the key is an index, get the parent key
        key = levels.filter((item) => isNaN(parseInt(item, 10)))?.slice(-1)?.[0] || key;

        // If the key already exists, append an index
        if (Object.keys(keys).includes(key)) key += Object.keys(keys).length;

        // Extract the value corresponding to the key
        keys[key] = levels.reduce((o, l) => (o && o[l]) || def, obj);

        // Merge with keys
        return keys;
    }, {});

    // Return the result
    return res;
};

export default extractData;
