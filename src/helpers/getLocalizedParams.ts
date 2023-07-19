import delve from 'dlv';

export default function getLocalizedParams(params: any) {
    return {
        slug: delve(params, 'slug', '') as string,
        locale: delve(params, 'lang', 'de') as string,
    }
}