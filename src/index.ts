import typeList from './type';

export interface commentsAST {
  type: string;
  value: string;
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
enum TokenType {
  LINE = 'CommentLine',
  BLOCK = 'CommentBlock',
  EOF = '',
}

function genAst(type: string, value: string, startline: number, startCol: number, endLine: number, endCol: number): commentsAST {
  return {
    type,
    value,
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
  let index = 0;
  let fileLine = 1;
  let fileCol = 1;
  let blockStartline = 1;
  let blockStartCol = 1;
  let tempComments = '';
  let newline = true;
  const { lineComment, blockComment = [] } = commentsRules;
  const blockStart = blockComment[0];
  const blockEnd = blockComment[1];

  function step(number: number) {
    index += number;
    fileCol += number;
  }

  function lineup() {
    fileLine++;
    fileCol = 0;
    newline = true;
  }

  while (index < context.length) {
    if (context.charAt(index) === ' ' || context.charAt(index) === '\r' || context.charAt(index) === '\t') {
      step(1);
      continue;
    } else if (lineComment && context.substr(index, lineComment.length) === lineComment) {
      // 跳过匹配到的 line start
      step(lineComment.length);
      const startCol = fileCol;
      while (index < context.length && context.charAt(index) !== '\n') {
        // 换行了说明这一行注释结束了
        tempComments += context.charAt(index);
        step(1);
      }
      // 执行到这边说明要么结束了、要么匹配到了换行符
      commentsAST.push(genAst(TokenType.LINE, tempComments, fileLine, startCol, fileLine, fileCol));
      // 重置临时变量
      tempComments = '';
      lineup()
      step(1);
    } else if (blockStart && context.substr(index, blockStart.length) === blockStart) {
      // 如果是在开头则是块，跳过匹配到的 block start
      step(blockStart.length);
      // 初始化，块的开始位置
      blockStartline = fileLine;
      blockStartCol = fileCol;
      while (index < context.length && context.substr(index, blockEnd.length) !== blockEnd) {
        tempComments += context.charAt(index);
        if (context.charAt(index) === '\n') {
          // 块内换行
          lineup()
        }
        step(1);
      }

      if (index < context.length) {
        // 没有遍历完说明块有结束符，则去存储
        commentsAST.push(genAst(TokenType.BLOCK, tempComments, blockStartline, blockStartCol, fileLine, fileCol));
        tempComments = '';
        // 跳过当前的结束符
        step(blockEnd.length);
      }
    } else if (context.charAt(index) === '`') {
      // 跳过开头的`
      step(1);
      while (index < context.length && context.charAt(index) !== '`') {
        // 转义 \` 跳过
        if (context.charAt(index) === '\\') {
          step(1);
        }
        step(1);
      }
      // 跳过结束的`
      step(1);
    }  else if (context.charAt(index) === '\'') {
      step(1);
      while (index < context.length && context.charAt(index) !== '\'') {
        // 转义 \' 跳过
        if (context.charAt(index) === '\\') {
          step(1);
        }
        step(1);
      }
      step(1);
    }  else if (context.charAt(index) === '"') {
      step(1);
      while (index < context.length && context.charAt(index) !== '"') {
        // 转义 \' 跳过
        if (context.charAt(index) === '\\') {
          step(1);
        }
        step(1);
      }
      step(1);
    } else if (context.charAt(index) === '\n') {
      step(1);
      lineup()
    } else {
      if (newline) {
        newline = false;
      }
      step(1);
    }
  }
  return commentsAST;
}

export default commentsparser;