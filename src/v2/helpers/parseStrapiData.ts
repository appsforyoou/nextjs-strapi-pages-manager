import forOwn from 'lodash/forOwn';
import has from 'lodash/has';
import isObject from 'lodash/isObject';

function parseDataFromStrapiAttributes(obj: Record<string, any>) {
    forOwn(obj, (value, key) => {
        if (key === 'attributes') {
            const { attributes, ...rest } = obj;
            obj = {
                ...rest,
                ...parseDataFromStrapiAttributes(value)
            }
        } else if (has(value, 'data')) {
            const { data } = value;
            if (data) {
                obj[key] = parseStrapiDataToInterface(data);
            } else if (data === null) {
                obj[key] = null;
            }
        } else if(isObject(value)) {
            obj[key] = parseStrapiDataToInterface(value);
        }
    })
    return obj;
}

export default function parseStrapiDataToInterface<T>(data: Record<string, any> | Record<string, any>[]): T {
    if (Array.isArray(data)) {
        return data.map((obj) => parseDataFromStrapiAttributes(obj)) as any;
    } else {
        return parseDataFromStrapiAttributes(data) as any
    }
}