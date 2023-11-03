interface NextFetchRequestConfig {
    revalidate?: number | false
    tags?: string[]
}

declare global {
    interface RequestInit {
        next?: NextFetchRequestConfig | undefined
    }
}

export { StrapiMedia, AppUser } from './strapi';
export { LinkI, ButtonI, LinksBoxI } from './defaultBlocks';
export { IBlock } from './pages';