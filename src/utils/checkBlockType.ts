import {BlockInterface, IFooterLinks, IHero} from "../blocksInterfaces";

export default {
    isFooterLinks: (block: BlockInterface): block is IFooterLinks => {
        return block.__component === 'footer-blocks.links';
    },

    isHero: (block: BlockInterface): block is IHero => {
        return block.__component === 'blocks.hero';
    }
}