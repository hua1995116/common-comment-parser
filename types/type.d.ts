interface commentsType {
    lineComment: string;
    blockComment: string[];
}
interface TypeList {
    [key: string]: {
        comments: commentsType;
    };
}
declare const languageList: TypeList;
export default languageList;
