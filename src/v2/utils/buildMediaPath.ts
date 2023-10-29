import parseStrapiUrl from './parseStrapiUrl';

export function buildMediaPath(mediaUrl: string) {
    return parseStrapiUrl.replace('/api/', '') + mediaUrl;
}