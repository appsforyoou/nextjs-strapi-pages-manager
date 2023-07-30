import populateBlocksObj from '../utils/blocksPopulateObj';
import { IPageData } from '../mainInterfaces';
import getBlocksDataFromDb from "./getBlocksDataFromDb";
import {buildStrapiQuery} from "../utils";

export default function getPageData(slug: string, locale: string):
    Promise<{ data: IPageData | null, slug?: string }> {
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
            'seo.*',
            'seo.meta.*',
            'seo.metaImage.*',
            'page_sections.*',
            'page_sections.blocks.*',
            ...populateBlocksObj()
        ],
        locale
    })

    const apiUrl = `pages?${query}`;

    return getBlocksDataFromDb(slug, locale, apiUrl)
}