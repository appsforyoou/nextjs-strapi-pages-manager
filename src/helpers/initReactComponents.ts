import { JSX } from "react";

interface RComp {
    blockName: string;
    component: (props: any) => JSX.Element;
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
    return ((typeof component === 'object') ? component.component : null);
}