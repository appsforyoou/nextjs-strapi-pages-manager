import { JSX } from "react";

interface RComp {
    blockName: string;
    component: (props: any) => JSX.Element | Promise<JSX.Element>;
    theme?: number;
}

interface RSection {
    sectionId: string;
    section: (props: { children: JSX.Element }) => JSX.Element | Promise<JSX.Element>;
    components: RComp[];
}

let sections: RSection[] = [];

export const initReactSections = (reactSectionsArray: RSection[]) => {
    sections = reactSectionsArray.map(s => {
        return {
            sectionId: s.sectionId,
            section: s.section,
            components: s.components
        }
    });
}

export const getReactSection = (sectionId: string) => {
    const section = sections.find(section => section.sectionId === sectionId);
    return ((typeof section === 'object') ? section.section : null);
}

export const getReactComponent = (blockName: string, sectionId: string, theme?: number) => {
    const component = sections.find(s => s.sectionId === sectionId)?.components
        .find(c => {
            const bName = 'blocks.' + c.blockName;

            if (theme && c.theme) {
                return bName === blockName && c.theme === theme;
            }

            return bName === blockName;
        });

    console.log('blockName: ', blockName, 'sectionId: ', sectionId, 'theme: ', theme, 'component: ', component);
    return ((typeof component === 'object') ? component.component : null);
}