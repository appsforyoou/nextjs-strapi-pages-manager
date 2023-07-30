import {
    ApiDataComponent,
    ButtonComponent,
    LinkComponent,
    ParagraphComponent,
    TitleComponent
} from './componentsInterfaces';
import { StrapiMedia } from './mainInterfaces';

export interface BlockInterface {
    id: number;
    __component: string;
}

interface IHero extends BlockInterface {
    title: TitleComponent;
    text: ParagraphComponent;
    media: {
        data: StrapiMedia[];
    };
    buttons: ButtonComponent[];
    theme: number;
}

interface IFooterLinks extends BlockInterface {
    linksSections: {
        title: string;
        links: LinkComponent[];
    }[]
}

type IService = BlockInterface & ApiDataComponent

export {
    IHero,
    IService,
    IFooterLinks
}