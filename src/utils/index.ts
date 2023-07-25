import qs from 'qs';
import parseStrapiUrl from "./parseStrapiUrl";
import { pushToPopulateObj } from "./blocksPopulateObj";
export {
    parseStrapiUrl,
    pushToPopulateObj
}

// This function will get the url of your medias depending on where they are hosted
export function getStrapiMedia(url: string) {
    if (url == null) {
        return null;
    }
    if (url.startsWith("http") || url.startsWith("//")) {
        return url;
    }
    return `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"}${url}`;
}

// handle the redirection to the homepage if the page we are browsinng doesn't exists
export function redirectToHomepage() {
    return {
        redirect: {
        destination: `/`,
        permanent: false,
        },
    };
}

export function buildStrapiQuery(data: { [key: string]: any }) {
    return qs.stringify(data, { encodeValuesOnly: true });
}