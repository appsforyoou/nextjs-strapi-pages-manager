interface ComponentInterface {
    id: number;
}

interface TitleComponent extends ComponentInterface {
    text: string;
    type: number;
}

interface ParagraphComponent extends ComponentInterface {
    text: string;
    justify: boolean;
}

interface LinkComponent extends ComponentInterface {
    href: string;
    label: string;
    target: string;
}

interface ButtonComponent extends ComponentInterface {
    link: LinkComponent;
}

interface ApiDataComponent extends ComponentInterface {
    path: string;
    defaultResultsPerPage: number;
}

export {
    TitleComponent,
    ParagraphComponent,
    LinkComponent,
    ButtonComponent,
    ApiDataComponent
}