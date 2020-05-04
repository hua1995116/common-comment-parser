# common-comment-parser

A universal comment parser (supports more than 30 languages)

<p align="center">
    <a href="https://travis-ci.org/hua1995116/common-comment-parser"><img src="https://travis-ci.org/hua1995116/common-comment-parser.svg?branch=master" /></a>
    <a href="https://codecov.io/gh/hua1995116/common-comment-parser"><img src="https://codecov.io/gh/hua1995116/common-comment-parser/branch/master/graph/badge.svg" /></a>
    <a href="https://npmcharts.com/compare/common-comment-parser?minimal=true" rel="nofollow"><img src="https://img.shields.io/npm/dm/common-comment-parser.svg" style="max-width:100%;"></a>
    <a href="https://www.npmjs.com/package/common-comment-parser" rel="nofollow"><img src="https://img.shields.io/npm/v/common-comment-parser.svg" style="max-width:100%;"></a>
    <a href="https://www.npmjs.com/package/common-comment-parser" rel="nofollow"><img src="https://img.shields.io/npm/l/common-comment-parser.svg?style=flat" style="max-width:100%;"></a>
</p>

# Usage

```bash
npm install common-comment-parser
```

```javascript
import parser from 'common-comment-parser';

const context = `
// hello common-comment-parser

/*
hello common-comment-parser
*/

/* hello common-comment-parser */
console.log('hello');
`

const ext = 'js';

console.log(parser(context, ext));
// [{ "type": "CommentLine", "value": " hello common-comment-parser", "commentLine": 1, "loc": { "start": { "line": 0, "column": 0 }, "end": { "line": 0, "column": 28 } } }, { "type": "CommentBlock", "value": "\n\nhello common-comment-parser\n\n", "commentLine": 1, "loc": { "start": { "line": 7, "column": 0 }, "end": { "line": 8, "column": 0 } } }, { "type": "CommentBlock", "value": " hello common-comment-parser ", "commentLine": 1, "loc": { "start": { "line": 12, "column": 0 }, "end": { "line": 12, "column": 29 } } }]
```

**parser(context, ext)**

- context: What needs to be parsed

- ext: File extension

# AST

```javascript
commentsAST {
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
```

# License

MIT

Copyright (c) 2019 蓝色的秋风