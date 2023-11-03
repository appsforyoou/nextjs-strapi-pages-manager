import { IBlock } from './pages';

export interface LinkI extends IBlock {
    href: string;
    label: string;
    target?: string;
}

export type ButtonI = IBlock & {
    icon?: string;
    iconOnly?: boolean;
} & ({ link: LinkI } | { link: Omit<LinkI, 'label'> });

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