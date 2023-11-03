import { IBlock } from './pages';

export interface LinkI extends IBlock {
    href: string;
    label: string;
    target?: string;
}

export interface ButtonI extends IBlock {
    link: LinkI;
}

export interface LinksBoxI extends IBlock {
    links: LinkI[];
    title?: string;
}