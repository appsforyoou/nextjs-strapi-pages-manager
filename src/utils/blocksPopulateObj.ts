import {parseCustomPopulateObjToArray} from "./index";

let populate: { [key: string]: Array<string> } = {
    hero: [
        'page_sections.blocks.buttons.*',
        'page_sections.blocks.buttons.link.*',
        'page_sections.blocks.media.*',
        'page_sections.blocks.title.*',
        'page_sections.blocks.text.*'
    ],
    service: [
        'page_sections.blocks.data.*',
    ]
}

export const pushToPopulateObj = (blockName: string, populateArray: string[]) => {
    if (populate[blockName]) {
        populate[blockName] = [...populate[blockName], ...populateArray];
    } else {
        populate[blockName] = populateArray;
    }
}

const populateBlocksObj = () => {
    return parseCustomPopulateObjToArray(populate);
}

export default populateBlocksObj;