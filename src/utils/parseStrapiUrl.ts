const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

//check if path has /api/ at the end, if it doesn't, add it, also if it has /api, add / after it
function parseStrapiUrl(path: string) {
    if (path.endsWith('/api/')) {
        return path;
    }
    if (path.endsWith('/api')) {
        return path + '/';
    }
    return path + '/api/';
}

export default parseStrapiUrl(strapiUrl);