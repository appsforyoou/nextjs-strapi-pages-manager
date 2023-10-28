import { Metadata } from "next";
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { IPageData, SEO } from "../types/pages";
import buildQsString from "./buildQsString";
import { StrapiResponse } from "../types/strapi";
import parseStrapiUrl from "../utils/parseStrapiUrl";
import parseStrapiDataToInterface from "./parseStrapiData";

async function getPageDataForMetadata(slug: string, locale: string) {
    const query = buildQsString({
        populate: {
            seo: {
                populate: {
                    meta: true,
                    metaImage: true,
                    opengraph: {
                        populate: {
                            images: true
                        }
                    },
                    robots: true
                }
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
    });

    const apiUrl = `pages?${query}`;
    const response = await fetch(parseStrapiUrl + apiUrl, {
        next: { tags: ['pageData', 'metadata'] },
        
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

export async function buildPageMetadata(pageSlug: string, pageLocale: string): Promise<Metadata> {
    const pageData = await getPageDataForMetadata(pageSlug, pageLocale);
    if (!pageData) throw new Error(`No page data found for slug ${pageSlug} and locale ${pageLocale}`);

    const { title, seo } = pageData;

    const description = _get(seo, 'description', '');
    const otherMeta = _get(seo, 'meta', []);
    let opengraph = _get(seo, 'opengraph', {});
    const robots = _get(seo, 'robots', {});
    const category = _get(seo, 'category', '');

    if (!_isEmpty(opengraph)) {
        opengraph = {
            ...opengraph,
            ...((opengraph as SEO.OpenGraph).images && {
                images: (opengraph as SEO.OpenGraph)
                    .images?.map(image => ({
                        url: image.url,
                        width: image.width,
                        height: image.height,
                        alt: image.alternativeText,
                    }))
            })
        }
    }

    return {
        title,
        ...(description && { description: description }),
        ...(otherMeta.length > 0 && { other: otherMeta.reduce((acc, meta) => ({ ...acc, [meta.name]: meta.content }), {}) }),
        ...(opengraph && { openGraph: opengraph }),
        ...(robots && { robots }),
        ...(category && { category }),
    }
}