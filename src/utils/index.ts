import qs from 'qs';
import parseStrapiUrl from "./parseStrapiUrl";
import { pushToPopulateObj } from "./blocksPopulateObj";
import checkBlockType from "./checkBlockType";

export {
    parseStrapiUrl,
    pushToPopulateObj,
    checkBlockType
}

// This function will get the url of your medias depending on where they are hosted
export function getStrapiMedia(url: string) {
    if (url == null) {
        return null;
    }

    return `${process.env.NEXT_PUBLIC_STRAPI_HOST || "http://localhost:1337"}${url}`;
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

export function parseCustomPopulateObjToArray(populateObj: { [key: string]: Array<string> }) {
    return Object.values(populateObj).reduce((acc: string[], current: string[]) => {
        return [...acc, ...current];
    }, [])
}

export function buildStrapiQuery(data: { [key: string]: any }) {
    return qs.stringify(data, { encodeValuesOnly: true });
}