/**
 * Effortlessly extract multiple keys from deeply nested structures within an object, resulting in a reduced, flattened output.
 *
 * @param {object} sourceObj - The source object to extract data from.
 * @param {Record<string, string>} pathMap - An object mapping property names to their paths in the source object.
 * @param {string | undefined} [defaultValue=undefined] - An optional default value to return if a key does not exist in the source object.
 * @returns {Record<string, unknown>} - An object containing the extracted data.
 * @throws Will throw an error if the obj is not an object or if the paths are empty.
 */
const extractData = (
    sourceObj: object,
    pathMap: Record<string, string>,
    defaultValue: string | undefined = undefined
): Record<string, unknown> => {
    // Check if source object is a non-null object and not an array
    if (typeof sourceObj !== 'object' || Object.keys(sourceObj).length === 0 || Array.isArray(sourceObj)) {
        throw new Error('Source object must be a non-null object.');
    }

    // Check if paths is non-empty
    if (typeof pathMap !== 'object' || Object.keys(pathMap).length === 0 || Array.isArray(pathMap)) {
        throw new Error('Path map object must be non-empty.');
    }

    // Check if default value is a string if provided
    if (typeof defaultValue !== 'undefined' && typeof defaultValue !== 'string') {
        throw new Error('Default value must be a string.');
    }

    // Process the source object
    return Object.fromEntries(
        Object.entries(pathMap).map(([mappedKey, sourcePath]) => {
            let current: unknown = sourceObj;

            // Split the path into keys and filter out empty keys
            const keys = sourcePath.split(/\.|\[|\]\./).filter((key) => key);

            // Traverse the object using the keys
            for (let key of keys) {
                if (typeof current !== 'object' || current === null) {
                    current = undefined;
                    break;
                }

                current = key.includes(']')
                    ? Array.isArray(current)
                        ? current[parseInt(key.replace(']', ''), 10)]
                        : undefined
                    : (current as Record<string, unknown>)[key];

                // Break if current becomes undefined
                if (current === undefined) break;
            }

            return [mappedKey, current || defaultValue];
        })
    );
};

export default extractData;
