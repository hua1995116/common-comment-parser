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

const context = `// line1

const cc = 111;
/*
block1
*/
console.log(222);

console.log(11); /* block2 */ const c = 111; /* block3 */ console.log(111); // line2


const aaa = 111; // line3

const ddd = `//ddd//ddd//dddd`;
const eee = '//eee//eee//eee';
const fff = "//ddd//ddd//dddd";

const dd = `\`ddddd//dddd`;
const ee = '\'ddddd//dddd';
const ff = "\"ddddd//dddd";
`

const ext = 'js';

console.log(parser(context, ext));
// [
    {
        "type": "CommentLine",
        "value": " line1",
        "loc": {
            "start": {
                "line": 1,
                "column": 3
            },
            "end": {
                "line": 1,
                "column": 9
            }
        }
    },
    {
        "type": "CommentBlock",
        "value": "\nblock1\n",
        "loc": {
            "start": {
                "line": 4,
                "column": 2
            },
            "end": {
                "line": 6,
                "column": 1
            }
        }
    },
    {
        "type": "CommentBlock",
        "value": " block2 ",
        "loc": {
            "start": {
                "line": 9,
                "column": 19
            },
            "end": {
                "line": 9,
                "column": 27
            }
        }
    },
    {
        "type": "CommentBlock",
        "value": " block3 ",
        "loc": {
            "start": {
                "line": 9,
                "column": 47
            },
            "end": {
                "line": 9,
                "column": 55
            }
        }
    },
    {
        "type": "CommentLine",
        "value": " line2",
        "loc": {
            "start": {
                "line": 9,
                "column": 78
            },
            "end": {
                "line": 9,
                "column": 84
            }
        }
    },
    {
        "type": "CommentLine",
        "value": " line3",
        "loc": {
            "start": {
                "line": 12,
                "column": 19
            },
            "end": {
                "line": 12,
                "column": 25
            }
        }
    }
]
```

**parser(context, ext)**

- context: What needs to be parsed

- ext: File extension

# AST

```javascript
commentsAST {
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
```

# License

MIT

Copyright (c) 2019 蓝色的秋风