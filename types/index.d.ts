export interface commentsAST {
    type: string;
    value: string;
    commentLine: number;
    loc: {
        start: {
            line: number;
            column: number;
        };
        end: {
            line: number;
            column: number;
        };
    };
}
declare function commentsparser(context: string, type: string): commentsAST[];
export default commentsparser;
