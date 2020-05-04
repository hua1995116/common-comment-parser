# common-comment-parser

A general comment parser.

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

# License

MIT

Copyright (c) 2019 蓝色的秋风