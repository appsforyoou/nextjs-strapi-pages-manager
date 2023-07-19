export default function parseDataFromStrapiAttributes(obj: { [key: string]: any }) {
    const { attributes, ...rest } = obj;
    return {
        ...rest,
        ...attributes,
    }
}