import parseStrapiUrl from "./utils/parseStrapiUrl";
import buildQsString from "@v2/helpers/buildQsString";
import type { Article, IPageData } from "./types/pages";
import { WebsiteSetting, type StrapiMedia, type StrapiResponse } from "./types/strapi";
import parseStrapiDataToInterface from "@v2/helpers/parseStrapiData";
import { MainNavigation, SocialLinks } from './types';
import _merge from 'lodash/merge';

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
    const response = await fetch(`${parseStrapiUrl}website-logo?${query}`, {
        next: { tags: ['websiteLogo'] },
    });
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

export async function getWebsiteMainNav() {
    const query = buildQsString({
        populate: { links: true }
    })
    const response = await fetch(`${parseStrapiUrl}main-navigation?${query}`, {
        next: { tags: ['mainNavigation'] },
    });
    const { data, error }: StrapiResponse = await response.json();
    if (error) {
        throw new Error(error.message);
    }

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return parseStrapiDataToInterface<MainNavigation>(data);
}

export async function getSocialLinks() {
    const query = buildQsString({
        populate: 'deep,3'
    })
    const response = await fetch(`${parseStrapiUrl}social-link?${query}`, {
        next: { tags: ['socialLink'] },
    });
    const { data, error }: StrapiResponse = await response.json();
    if (error) {
        throw new Error(error.message);
    }

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return parseStrapiDataToInterface<SocialLinks>(data);
}

export async function getArticle(id: number) {
    const query = buildQsString({
        populate: { seo: true, cover: true }
    })
    const response = await fetch(`${parseStrapiUrl}articles/${id}?${query}`, {
        next: { tags: ['webArticles', `webArticle-${id.toString()}`] },
    });
    const { data, error }: StrapiResponse = await response.json();
    if (error) {
        throw new Error(error.message);
    }

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return parseStrapiDataToInterface<Article>(data);
}

export async function getArticles<DATAType>({
    perPage = 10, page = 1,
    withCount = false,
    extraQuery
}: { perPage?: number, page?: number, withCount?: boolean, extraQuery?: Record<string, any> }) {
    const localQuery = {
        populate: {
            cover: true,
        },
        pagination: {
            page,
            pageSize: perPage,
            withCount
        }
    };

    let query = buildQsString(
        _merge(localQuery, extraQuery)
    );

    const response = await fetch(`${parseStrapiUrl}articles?${query}`, {
        next: { tags: ['webArticles'] },
    });

    const { data, error }: StrapiResponse = await response.json();

    if (error) {
        throw new Error(error.message);
    }

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return parseStrapiDataToInterface<DATAType[]>(data);
}

export async function getWebsiteSettings() {
    const query = buildQsString({ populate: 'deep,10' });
    const res = await fetch(`${parseStrapiUrl}website-setting?${query}`, {
        headers: {
            'Authorization': `Bearer ${process.env.STRAPI_TOKEN}`
        }
    });

    const { data, error }: StrapiResponse = await res.json();

    if (error) {
        throw new Error(error.message);
    }

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    return parseStrapiDataToInterface<WebsiteSetting>(data);
}

export async function isWebsiteInMaintenance(secretFromCookie: string) {
    const { maintenanceMode } = await getWebsiteSettings();
    if (typeof maintenanceMode === 'undefined') {
        throw new Error('Maintenance mode is not defined');
    }

    const { enabled, accessSecret } = maintenanceMode;

    return {
        isMaintenance: enabled,
        hasAccess: secretFromCookie === accessSecret
    };
}