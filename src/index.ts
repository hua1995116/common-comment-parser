import typeList from './type';

export interface commentsAST {
  type: string;
  value: string;
  commentLine: number;
  loc: {
    start: {
      line: number,
      column: number
    },
    end: {
      line: number,
      column: number
    }
  }
}

function rmEndTag(value: string, blockEnd: string) {
  const location = value.lastIndexOf(blockEnd);
  return value.slice(0, location);
}

function genAst(type: string, value: string, line: number, startline: number, startCol: number, endLine: number, endCol: number): commentsAST {
  return {
    type,
    value,
    commentLine: line,
    loc: {
      start: {
        line: startline,
        column: startCol
      },
      end: {
        line: endLine,
        column: endCol
      }
    }
  }
}

function commentsparser(context: string, type: string) {
  const commentsRules = typeList[type];
  if (!commentsRules) {
    return [];
  }
  const commentsAST: commentsAST[] = [];
  let tempblock = '';
  let isBlock = false;
  let blockStartline = 0;
  const { lineComment, blockComment = [] } = commentsRules;
  const blockStart = blockComment[0];
  const blockEnd = blockComment[1];

  const lineList = context.split(/(\n|\r)/);
  for (let i = 0; i < lineList.length; i++) {
    const lineContext = lineList[i].trim();

    if (isBlock) {
      // end of block
      if (lineContext.endsWith(blockEnd)) {
        const value = rmEndTag(lineContext, blockEnd);
        commentsAST.push(genAst('CommentBlock', tempblock + value, i - blockStartline, blockStartline, 0, i, value.length));
        isBlock = false;
        blockStartline = 0;
        tempblock = '';
      } else {
        tempblock += (lineContext + '\n');
        blockStartline = i;
      }
      continue;
    }
    // only has line rules
    if (lineComment && lineContext.startsWith(lineComment)) {
      const value = lineContext.replace(lineComment, '');
      commentsAST.push(genAst('CommentLine', value, 1, i, 0, i, value.length));
      continue;
    }
    // only has block rules
    if (blockComment.length && lineContext.startsWith(blockStart)) {
      const blockValue = lineContext.replace(blockStart, '');
      if (lineContext.endsWith(blockEnd)) {
        // start and end in a line
        const value = rmEndTag(blockValue, blockEnd);
        commentsAST.push(genAst('CommentBlock', value, 1, i, 0, i, value.length));
      } else {
        // start width block
        isBlock = true;
        blockStartline = i;
        tempblock += (blockValue + '\n');
      }
    }
  }
  return commentsAST;
}

export default commentsparser;