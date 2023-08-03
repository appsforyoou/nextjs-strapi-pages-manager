import parsedStrapiUrl from '../utils/parseStrapiUrl';

export async function getLegalNotice() {
    const res = await fetch(parsedStrapiUrl + 'legal-notice', {
        method: 'GET',
    })

    const data = await res.json();

    return data.attributes.body;
}

export async function getPrivacyNotice() {
    const res = await fetch(parsedStrapiUrl + 'privacy-notice', {
        method: 'GET',
    })

    const data = await res.json();

    return data.attributes.body;
}