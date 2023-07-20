import { ReactNode } from 'react';

interface RComp {
    blockName: string;
    component: ReactNode;
}

let components: RComp[] = [];

export const initReactComponents = (reactComponentsArray: RComp[]) => {
    components = reactComponentsArray.map(c => {
        return {
            blockName: 'blocks.' + c.blockName,
            component: c.component
        }
    });
}

export const getReactComponent = (blockName: string) => {
    const component = components.find(component => component.blockName === blockName);
    return component ? component.component : null;
}