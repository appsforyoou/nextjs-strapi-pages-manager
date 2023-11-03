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
export { LinkI, ButtonI, LinksBoxI, MainNavigation, isIconOnlyBtn, SocialLinks } from './defaultBlocks';
export { IBlock } from './pages';