import { StrapiResponse } from '../types/strapi';
import parseStrapiUrl from './parseStrapiUrl';

export default async function requestData(pathFragment: string, tags?: string[]) {
    const response = await fetch(`${parseStrapiUrl}${pathFragment}`, {
        ...( (tags && tags.length) ? { next: { tags } } : { cache: 'no-store' } )
    });

    const { data, error }: StrapiResponse = await response.json();

    if (error) {
        throw new Error(error.message);
    }

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return data;
}