import {BlockInterface, IFooterLinks} from "../blocksInterfaces";

export default {
    isFooterLinks: (block: BlockInterface): block is IFooterLinks => {
        return block.__component === 'footer-blocks.links';
    }
}