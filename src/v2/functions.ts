import parseStrapiUrl from "./utils/parseStrapiUrl";
import buildQsString from "@v2/helpers/buildQsString";
import type { Article, IPageData, IPrivacyNotice } from "./types/pages";
import { WebsiteSetting, type StrapiMedia, type StrapiResponse } from "./types/strapi";
import parseStrapiDataToInterface from "@v2/helpers/parseStrapiData";
import { MainNavigation, SocialLinks } from './types';
import _merge from 'lodash/merge';
import requestData from './utils/requestData';

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
    return parseStrapiDataToInterface<IPageData[]>(await requestData(apiUrl, ['pageData', 'withSections']))[0];
}

export async function getWebsiteLogo() {
    const query = buildQsString({
        populate: { logo: true }
    })

    const { logo } = parseStrapiDataToInterface<{ logo: StrapiMedia }>(await requestData(`website-logo?${query}`, ['websiteLogo']));
    return logo
}

export async function getWebsiteMainNav(lang: string) {
    const query = buildQsString({
        populate: { links: true },
        locale: lang
    })
    return parseStrapiDataToInterface<MainNavigation>(await requestData(`main-navigation?${query}`, ['mainNavigation']));
}

export async function getSocialLinks(lang: string) {
    const query = buildQsString({
        populate: 'deep,3',
        locale: lang
    })
    return parseStrapiDataToInterface<SocialLinks>(await requestData(`social-link?${query}`, ['socialLink']));
}

export async function getArticle(id: number, lang: string) {
    const query = buildQsString({
        populate: { seo: true, cover: true },
        locale: lang
    })
    return parseStrapiDataToInterface<Article>(await requestData(`articles/${id}?${query}`, ['webArticles', `webArticle-${id.toString()}`]));
}

export async function getArticles({
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

    return parseStrapiDataToInterface<Article[]>(await requestData(`articles?${query}`, ['webArticles']));
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

export async function getPrivacyNotice(lang: string) {
    const query = buildQsString({ locale: lang });
    return parseStrapiDataToInterface<IPrivacyNotice>(await requestData(`privacy-notice?${query}`, ['privacyNotice']));
}

export async function getLegalNotice(lang: string) {
    const query = buildQsString({ locale: lang });
    return parseStrapiDataToInterface<IPrivacyNotice>(await requestData(`legal-notice?${query}`, ['legalNotice']));
}