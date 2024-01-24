import { ApiDataComponent, ParagraphComponent, TestimonialComponent, TitleComponent } from '@/componentsInterfaces';
import { IBlock } from './pages';
import { StrapiMedia } from './strapi';

export interface LinkI extends IBlock {
    href: string;
    label: string;
    target?: string;
}

type IconButtonI = IBlock & {
    icon: string;
    iconOnly: true;
    link: Omit<LinkI, 'label'>;
}

type IconAndLabelButtonI = IBlock & {
    icon: string;
    iconOnly: false;
    link: LinkI
}

export type ButtonI = IconButtonI | IconAndLabelButtonI;

export function isIconOnlyBtn(btn: ButtonI): btn is ButtonI & { iconOnly: true } {
    return btn.iconOnly === true;
}

export interface LinksBoxI extends IBlock {
    links: LinkI[];
    title?: string;
}

export interface MainNavigation {
    links?: LinkI[];
}

export interface SocialLinks {
    links?: ButtonI[];
}

export interface IHero extends IBlock {
    title: TitleComponent;
    text: ParagraphComponent;
    media: StrapiMedia[];
    buttons: ButtonI[];
    theme: number;
}

export interface IService extends IBlock {
    title: TitleComponent[];
    data: ApiDataComponent;
}

export interface ITestimonials extends IBlock {
    title: TitleComponent;
    text: ParagraphComponent;
    testimonials: TestimonialComponent[];
}