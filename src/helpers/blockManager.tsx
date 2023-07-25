import React from 'react';
import {getReactComponent, getReactSection} from './initReactComponents';
import { PageSection } from '../mainInterfaces';
import { Suspense } from 'react';

function getBlockComponent(
    { __component, ...rest }: { __component: string } & { [key: string]: any },
    index: number) {
    const Block = getReactComponent(__component);

    return Block ?
        <Suspense fallback={<p>Loading...</p>}>
            {/* @ts-expect-error Server Component */}
            <Block key={`index-${index}`} {...rest} />
        </Suspense> : null
}

function BlockManager({ blocks }: any) {
    return <>{blocks.map(getBlockComponent)}</>;
}

function getSection(section: PageSection) {
    const { htmlId, blocks } = section;

    const SectionComponent = getReactSection(htmlId);
    return SectionComponent ? (
        <>
            {/* @ts-expect-error Server Component */}
            <SectionComponent>
                <BlockManager blocks={blocks} />
            </SectionComponent>
        </>
    ) : null
}

function SectionManager({ sections }: any) {
    return <>{sections.map(getSection)}</>;
}

export default SectionManager;