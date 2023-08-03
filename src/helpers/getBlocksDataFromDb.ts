import parsedStrapiUrl from '../utils/parseStrapiUrl';
import delve from 'dlv';
import { parseStrapiBlocksData } from './parseStrapiBlocksData';
import parseDataFromStrapiAttributes from './parseDataFromAttributes';
import { IPageData, PageSection } from '../mainInterfaces';

export default async function getBlocksDataFromDb(
    slug: string | undefined,
    locale: string,
    apiUrl: string,
) {
    const slugToReturn = `/${slug}?lang=${locale}`;

    const res = await fetch(parsedStrapiUrl + apiUrl, {
        method: 'GET',
        next: {
            tags: [`page:${slug}`]
        }
    });

    if (!res.ok) {
        if (res.status === 404) {
            return {
                data: null
            }
        }
        throw new Error(`[Error in getBlocksData]: ${res.status} ${res.statusText}`)
    }

    const responseData = await res.json();

    if (responseData.error) {
        throw new Error(`[Error in getBlocksData]: ${responseData.error}`)
    }

    const { data } = responseData;
    if (data.length === 0) {
        throw new Error(`[Error in getPageData]: No data returned for slug ${slug}`)
    }

    let parsedPageData = Array.isArray(data) ? parseDataFromStrapiAttributes(delve(data, '0')) : parseDataFromStrapiAttributes(data);

    if (parsedPageData.page_sections) {
        parsedPageData.page_sections = parsedPageData.page_sections.data.map((section: any) => {
            const parsedSection = parseDataFromStrapiAttributes(section);

            return {
                ...parsedSection,
                blocks: parsedSection.blocks.map(parseStrapiBlocksData)
            }
        }).sort((a: PageSection, b: PageSection) => a.positionIndex - b.positionIndex)
    }

    return {
        data: parsedPageData as IPageData,
        slug: slugToReturn,
    };
}