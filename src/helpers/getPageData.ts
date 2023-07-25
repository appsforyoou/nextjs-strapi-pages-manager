import parsedStrapiUrl from '../utils/parseStrapiUrl';
import delve from 'dlv';
import { parseStrapiBlocksData } from './parseStrapiBlocksData';
import parseDataFromStrapiAttributes from './parseDataFromAttributes';
import { buildStrapiQuery } from '../utils';
import populateBlocksObj from '../utils/blocksPopulateObj';
import { IPageData, PageSection } from '../mainInterfaces';

export default async function getPageData(slug: string, locale: string) {
    const slugToReturn = `/${slug}?lang=${locale}`;
    const query = buildStrapiQuery({
        filters: {
            slug: {
                ...(slug ? {
                    $eq: slug
                } : {
                    $null: true
                })
            },
        },
        populate: [
            '*',
            'page_sections.*',
            'page_sections.blocks.*',
            ...populateBlocksObj()
        ],
        locale
    })

    const apiUrl = `pages?${query}`;

    const res = await fetch(parsedStrapiUrl + apiUrl, {
        method: 'GET',
    });

    if (!res.ok) {
        throw new Error(`[Error in getPageData]: ${res.status} ${res.statusText}`)
    }

    const responseData = await res.json();

    if (responseData.error) {
        throw new Error(`[Error in getPageData]: ${responseData.error}`)
    }

    const { data } = responseData;
    if (data.length === 0) {
        throw new Error(`[Error in getPageData]: No data returned for slug ${slug}`)
    }

    let parsedPageData = parseDataFromStrapiAttributes(delve(data, '0'));

    parsedPageData.page_sections = parsedPageData.page_sections.data.map((section: any) => {
        const parsedSection = parseDataFromStrapiAttributes(section);

        return {
            ...parsedSection,
            blocks: parsedSection.blocks.map(parseStrapiBlocksData)
        }
    }).sort((a: PageSection, b: PageSection) => a.positionIndex - b.positionIndex) 



    return {
        data: parsedPageData as IPageData,
        slug: slugToReturn,
    };
}