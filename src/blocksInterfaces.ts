import {
    ApiDataComponent,
    ButtonComponent,
    LinkComponent,
    ParagraphComponent, TestimonialComponent,
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
    media: StrapiMedia[];
    buttons: ButtonComponent[];
    theme: number;
}

interface IFooterLinks extends BlockInterface {
    linksSections: {
        title: string;
        links: LinkComponent[];
    }[]
}

interface IService extends BlockInterface {
    title: TitleComponent[];
    data: ApiDataComponent;
}

interface ITestimonials extends BlockInterface {
    title: TitleComponent;
    text: ParagraphComponent;
    testimonials: TestimonialComponent[];
}

export {
    IHero,
    IService,
    IFooterLinks,
    ITestimonials
}