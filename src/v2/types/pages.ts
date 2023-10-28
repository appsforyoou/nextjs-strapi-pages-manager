import { StrapiMedia } from "./strapi";

export interface IPageData {
    id: number;
    title: string;
    slug: string;
    seo?: SEO.Interface;
    page_sections?: IPageSection[];
}

export interface IPageSection {
    id: number;
    key: string;
    page?: IPageData;
    blocks: unknown[];
}

export interface IBlock {
    id: number;
    __component: string;
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