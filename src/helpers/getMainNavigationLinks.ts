import parsedStrapiUrl from '../utils/parseStrapiUrl';
import { buildStrapiQuery } from "../utils";

interface Link {
    id: number;
    href: string;
    target: string | null;
    label: string;
}

export default async function getMainNavigationLinks(locale: string = 'de') {
    const query = buildStrapiQuery({
        locale,
        populate: {
            links: true
        }
    });

    const res = await fetch(parsedStrapiUrl + 'main-navigation' + '?' + query, {
        method: 'GET',
    });

    if (!res.ok) {
        throw new Error(`[Error in getMainNavigationLinks]: ${res.status} ${res.statusText}`)
    }

    const responseData = await res.json();

    if (responseData.error) {
        throw new Error(`[Error in getMainNavigationLinks]: ${responseData.error}`);
    }

    const { data: { attributes: { links } } } = responseData;

    return links as Link[];
}