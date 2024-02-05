import requestData from '../utils/requestData';
import buildQsString from './buildQsString';
import parseStrapiDataToInterface from './parseStrapiData';
import _get from 'lodash/get';

export default async function getPageJSONLd({ slug, locale }: { slug: string, locale: string }) {
    const query = buildQsString({
        populate: {
            seo: {
                fields: ['structuredData']
            }
        },
        filters: {
            slug: {
                ...(slug ? {
                    $eq: slug
                } : {
                    $null: true
                })
            }
        },
        locale
    })

    const data = parseStrapiDataToInterface<{ structuredData: string }>(await requestData('pages?' + query))
    return _get(data, '0.seo.structuredData', undefined)
}