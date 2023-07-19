const populate = {
    hero: [
        'page_sections.blocks.buttons.*',
        'page_sections.blocks.buttons.link.*',
        'page_sections.blocks.media.*',
        'page_sections.blocks.title.*',
        'page_sections.blocks.text.*',
    ],
    service: [
        'page_sections.blocks.data.*',
    ]
}

//create a function to combine all the populate arrays into one
const populateBlocksObj = () => {
    const populateBlocksObj = Object.values(populate).reduce((acc: string[], current: string[]) => {
        return [...acc, ...current];
    }, [])

    return populateBlocksObj;
}

export default populateBlocksObj();