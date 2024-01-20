import React from 'react';
import { getPageData } from '../functions';
import { IPageData } from '../types/pages';

type Props = {
    getSection: (id: string) => React.ComponentType<{ children: React.ReactNode }> | null,
    getComponent: (sectionId: string, componentId: string) => React.ComponentType | null,
    pageSlug: string,
    lang: string
}

type RType = {
    mappedSections: React.ReactNode[],
    pageData: IPageData
}

export default async function mapSections({ getComponent, getSection, lang, pageSlug }: Props): Promise<RType> {
    const pageData = await getPageData(pageSlug, lang);
    const dbSections = pageData?.page_sections;
    if (!dbSections) throw new Error(`No sections found for ${pageSlug} in ${lang}`);

    const sectionsByPositionIndex: { index: number, jsx: React.ReactNode }[] = []

    for (const sectionData of dbSections) {
        const Section = getSection(sectionData.key);
        if (!Section) throw new Error(`Section component not found for ${sectionData.key}`);

        const sectionBlocks = sectionData.blocks.map(block => {
            const Component = getComponent(sectionData.key, block.__component);
            if (!Component) throw new Error(`Component not found for ${block.__component}`);
            return <Component key={block.id} {...block} />
        })

        sectionsByPositionIndex.push({
            index: sectionData.positionIndex,
            jsx: <Section {...sectionData} key={sectionData.key}>{sectionBlocks}</Section>
        })
    }

    return {
        mappedSections: sectionsByPositionIndex.sort((a, b) => a.index - b.index).map(section => section.jsx),
        pageData
    }
}