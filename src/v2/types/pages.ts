import { StrapiMedia } from "./strapi";

export interface IPageData {
    id: number;
    title: string;
    slug: string;
    seo?: SEO.Interface;
    page_sections?: PageSection[];
}

export interface PageSection {
    id: number;
    htmlId: string;
    page?: IPageData;
    blocks: unknown[];
    positionIndex: number;
}

export namespace SEO {
    export interface Interface {
        description: string;
        meta?: Meta[];
        structuredData?: string;
        opengraph?: OpenGraph;
        robots?: Robots;
        category?: string;
    }

    export interface OpenGraph {
        title: string;
        description: string;
        type?: string;
        url: string;
        siteName?: string;
        images?: StrapiMedia[];
        locale?: string;
    }

    export interface Robots {
        index?: boolean;
        follow?: boolean;
        nocache?: boolean;
    }

    export interface Meta {
        name: string;
        content: string;
    }
}