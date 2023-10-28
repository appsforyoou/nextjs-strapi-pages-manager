interface NextFetchRequestConfig {
    revalidate?: number | false
    tags?: string[]
}

declare global {
    interface RequestInit {
        next?: NextFetchRequestConfig | undefined
    }
}

export * as StrapiTypes from './strapi';
export * as PagesTypes from './pages';