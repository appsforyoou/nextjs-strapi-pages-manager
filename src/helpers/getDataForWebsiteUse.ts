import getLocalizedParams from './getLocalizedParams';
import getPageData from './getPageData';

export default async function getDataForWebsiteUse(params: any) {
    const { slug, locale } = getLocalizedParams(params);

    try {
        return await getPageData(slug, locale);
    } catch (error: any) {
        console.error(error)
        throw new Error(error);
    }
}