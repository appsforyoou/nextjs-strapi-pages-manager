import { IHero, IService } from './blocksInterfaces';

enum SectionTypes {
    header = 'header',
    footer = 'footer',
    section = 'section',
}

interface MetaComponent {
    name: string;
    content: string;
}

interface SEO {
    metaTitle?: string;
    metaDescription?: string;
    meta?: MetaComponent[];
    preventIndexing?: boolean;
    structuredData?: string;
    metaImage: StrapiMedia;
}

interface PageSection {
    id: number;
    htmlId: string;
    page?: IPageData;
    blocks: (IHero | IService)[];
    sectionType: SectionTypes;
}

//strapi media interface
interface StrapiMedia {
    id: number;
    name: string;
    alternativeText: string;
    caption: string | null;
    width: number;
    height: number;
    formats: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string;
    provider: string;
    provider_metadata: any;
    created_at: string;
    updated_at: string;
}

interface IPageData {
    id: number;
    title: string;
    slug: string;
    seo?: SEO;
    page_sections: PageSection[];
}

export {
    IPageData,
    StrapiMedia
}