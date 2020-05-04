export interface TypeList {
    [key: string]: {
        lineComment?: string;
        blockComment?: string[];
    };
}
declare const languageList: TypeList;
export default languageList;
