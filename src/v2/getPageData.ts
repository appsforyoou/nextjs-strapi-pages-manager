import parseStrapiUrl from "./utils/parseStrapiUrl";
import buildQsString from "@v2/helpers/buildQsString";
import type { IPageData } from "@v2/types/pages";
import type { StrapiResponse } from "@v2/types/strapi";
import parseStrapiDataToInterface from "@v2/helpers/parseStrapiData";

export async function getPageData(slug: string, locale: string) {
    const query = buildQsString({
        populate: 'deep,10',
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
    });

    const apiUrl = `pages?${query}`;
    const response = await fetch(parseStrapiUrl + apiUrl, {
        next: { tags: ['pageData', 'withSections'] },
        
    });

    const { data, error }: StrapiResponse = await response.json();

    if (error) {
        throw new Error(error.message);
    }

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return parseStrapiDataToInterface<IPageData[]>(data)[0];
}