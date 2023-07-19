export function parseStrapiBlocksData(obj: any) {
    const { data, ...rest } = obj;

    return {
        ...rest,
        ...data
    }
}