import getBlocksDataFromDb from "./getBlocksDataFromDb";
import {buildStrapiQuery, parseCustomPopulateObjToArray} from "../utils";
import {IFooterData} from "../mainInterfaces";

const populate = {
    hero: [
        'blocks.buttons.link',
        'blocks.media',
        'blocks.title',
        'blocks.text'
    ],
    linksSections: [
        'blocks.linksSections.links',
    ]
}

export default function getFooterData(locale: string) {
    const query = buildStrapiQuery({
        populate: parseCustomPopulateObjToArray(populate),
        locale
    })

    const apiUrl = `footer?${query}`;

    return getBlocksDataFromDb('', locale, apiUrl) as unknown as Promise <{ data: IFooterData }>;
}