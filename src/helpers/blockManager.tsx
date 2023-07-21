import React from 'react';
import { getReactComponent } from './initReactComponents';
import { PageSection, SectionTypes } from '../mainInterfaces';
import { Suspense } from 'react';

function getBlockComponent(
    { __component, ...rest }: { __component: string } & { [key: string]: any },
    index: number) {
    const Block = getReactComponent(__component);

    return Block ?
        <Suspense fallback={<p>Loading...</p>}>
            <Block key={`index-${index}`} {...rest} />
        </Suspense> : null
}

function BlockManager({ blocks }: any) {
    return <>{blocks.map(getBlockComponent)}</>;
}

function getSection(section: PageSection) {
    const { htmlId, blocks, sectionType } = section;
    return (
        <>
            {sectionType === SectionTypes.section ? (
                <section id={htmlId}>
                    <BlockManager blocks={blocks} />
                </section>
            ) : sectionType === SectionTypes.header ? (
                <header id={htmlId}>
                    <BlockManager blocks={blocks} />
                </header>
            ) : sectionType === SectionTypes.footer ? (
                <footer id={htmlId}>
                    <BlockManager blocks={blocks} />
                </footer>
            ) : (
                <div id={htmlId}>
                    <BlockManager blocks={blocks} />
                </div>
            )}
        </>
    )
}

function SectionManager({ sections }: any) {
    return <>{sections.map(getSection)}</>;
}

export default SectionManager;