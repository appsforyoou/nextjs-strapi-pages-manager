import React from 'react';
import { getReactComponent } from './initReactComponents';
import { PageSection, SectionTypes } from '../mainInterfaces';


function getBlockComponent(block: any) {
    const { __component, ...rest } = block;
    const test = getReactComponent(__component)
    return test;
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