import parseStrapiUrl from "./utils/parseStrapiUrl";
import buildQsString from "@v2/helpers/buildQsString";
import type { IPageData } from "./types/pages";
import type { StrapiMedia, StrapiResponse } from "./types/strapi";
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

export async function getWebsiteLogo() {
    const query = buildQsString({
        populate: { logo: true }
    })
    const response = await fetch(`${parseStrapiUrl}website-logo?${query}`);
    const { data, error }: StrapiResponse = await response.json();
    if (error) {
        throw new Error(error.message);
    }

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const l = parseStrapiDataToInterface<{ logo: StrapiMedia }>(data);
    return l.logo;
}