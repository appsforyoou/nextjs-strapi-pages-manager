import { ApiDataComponent, ButtonComponent, ParagraphComponent, TitleComponent } from './componentsInterfaces';
import { StrapiMedia } from './mainInterfaces';

interface BlockInterface {
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

type IService = BlockInterface & ApiDataComponent

export {
    IHero,
    IService
}