import parsedStrapiUrl from '../utils/parseStrapiUrl';
import {buildStrapiQuery} from "../utils";

export async function getLegalNotice(lang: string) {
    const query = buildStrapiQuery({
        locale: lang,
    })
    const res = await fetch(parsedStrapiUrl + 'legal-notice?' + query, {
        method: 'GET',
    })

    if (!res.ok) {
        throw new Error('Could not fetch legal notice: ' + res.status);
    }

    const { data } = await res.json();

    return data?.attributes?.body;
}

export async function getPrivacyNotice(lang: string) {
    const query = buildStrapiQuery({
        locale: lang,
    })
    const res = await fetch(parsedStrapiUrl + 'privacy-notice?' + query, {
        method: 'GET',
    })

    if (!res.ok) {
        throw new Error('Could not fetch privacy notice: ' + res.status);
    }

    const { data } = await res.json();

    return data?.attributes?.body;
}