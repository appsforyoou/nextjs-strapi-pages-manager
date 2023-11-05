
export interface AppUser {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    role: {
        id: number;
        name: string;
        description: string;
        type: string;
    };
    created_by: unknown;
    updated_by: unknown;
    darkMode: boolean;
}

export type searchParamsI = Record<string, string>;

export interface StrapiMedia {
    id: number;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: unknown;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: unknown;
    provider: string;
    provider_metadata: unknown;
    created_by: unknown;
    updated_by: unknown;
}

interface StrapiPagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

interface StrapiMeta {
    pagination?: StrapiPagination;
    availableLocales?: string[];
}

interface StrapiError {
    status: string;
    name: string;
    message: string;
    details: unknown;
}

export interface PrintData {
    zplData: string;
}

export interface StrapiResponse<D = any> {
    data: D;
    meta: StrapiMeta;
    error?: StrapiError;
}

export interface WebsiteSetting {
    maintenanceMode?: {
        enabled: boolean;
        accessSecret: string;
    }
}