import React from 'react';
import {getReactComponent, getReactSection} from './initReactComponents';
import { PageSection } from '../mainInterfaces';
import { Suspense } from 'react';

function getBlockComponent(
    { __component, theme, ...rest }: { __component: string, theme?: number } & { [key: string]: any },
    index: number,
    sectionId: string
) {
    const Block = getReactComponent(__component, sectionId, theme);

    return Block ?
        <Suspense fallback={<p>Loading...</p>}>
            {/* @ts-expect-error Server Component */}
            <Block key={`index-${index}`} {...rest} />
        </Suspense> : null
}

function BlockManager({ blocks, sectionId }: any) {
    return <>{blocks.map((b: any, index: number) => getBlockComponent(b, index, sectionId))}</>;
}

function getSection(section: PageSection) {
    const { htmlId, blocks } = section;

    const SectionComponent = getReactSection(htmlId);
    return SectionComponent ? (
        <>
            {/* @ts-expect-error Server Component */}
            <SectionComponent>
                <BlockManager blocks={blocks} sectionId={htmlId} />
            </SectionComponent>
        </>
    ) : null
}

function SectionManager({ sections }: any) {
    return <>{sections.map(getSection)}</>;
}

export default SectionManager;