import getDataForWebsiteUse from './getDataForWebsiteUse';
import { initReactSections } from './initReactComponents';
import SectionManager from './blockManager';
import getMainNavigationLinks from './getMainNavigationLinks';
import type { Link } from "./getMainNavigationLinks";
import getFooterData from "./getFooterData";

import { getLegalNotice, getPrivacyNotice } from "./getNotices";

export type { Link };

export {
    getDataForWebsiteUse,
    initReactSections,
    SectionManager,
    getMainNavigationLinks,
    getFooterData,
    getLegalNotice,
    getPrivacyNotice
};