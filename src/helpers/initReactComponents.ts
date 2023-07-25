import { JSX } from "react";

interface RComp {
    blockName: string;
    component: (props: any) => JSX.Element | Promise<JSX.Element>;
}

let components: RComp[] = [];

interface RSection {
    sectionId: string;
    section: (props: { children: JSX.Element }) => JSX.Element | Promise<JSX.Element>;
}

let sections: RSection[] = [];

export const initReactSections = (reactSectionsArray: RSection[]) => {
    sections = reactSectionsArray.map(s => {
        return {
            sectionId: s.sectionId,
            section: s.section
        }
    });
}

export const initReactComponents = (reactComponentsArray: RComp[]) => {
    components = reactComponentsArray.map(c => {
        return {
            blockName: 'blocks.' + c.blockName,
            component: c.component
        }
    });
}

export const getReactSection = (sectionId: string) => {
    const section = sections.find(section => section.sectionId === sectionId);
    return ((typeof section === 'object') ? section.section : null);
}

export const getReactComponent = (blockName: string) => {
    const component = components.find(component => component.blockName === blockName);
    return ((typeof component === 'object') ? component.component : null);
}