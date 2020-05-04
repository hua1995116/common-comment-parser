
import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import parser from '../src/index';


describe('Test support language', () => {
  it('Test javascript', () => {
    const url = './static/demo.js';
    const extname = path.extname(url);
    const context = fs.readFileSync(path.join(__dirname, url), 'utf-8');
    const comments = parser(context, extname.replace('.', ''));
    const expect = [{ "type": "CommentLine", "value": " hello common-comment-parser", "commentLine": 1, "loc": { "start": { "line": 1, "column": 0 }, "end": { "line": 1, "column": 28 } } }, { "type": "CommentBlock", "value": "\nhello common-comment-parser\n", "commentLine": 3, "loc": { "start": { "line": 3, "column": 0 }, "end": { "line": 5, "column": 0 } } }, { "type": "CommentBlock", "value": " hello common-comment-parser ", "commentLine": 1, "loc": { "start": { "line": 7, "column": 0 }, "end": { "line": 7, "column": 29 } } }];
    assert.deepEqual(comments, expect);
  });
  // it('Test go', () => {
  //   const url = './static/demo.go';
  //   const extname = path.extname(url);
  //   const context = fs.readFileSync(path.join(__dirname, url), 'utf-8');
  //   const comments = parser(context, extname.replace('.', ''));
  //   const expect = [{ "type": "CommentBlock", "value": "\n\nmain hello\n\n", "commentLine": 4, "loc": { "start": { "line": 12, "column": 0 }, "end": { "line": 16, "column": 0 } } }, { "type": "CommentLine", "value": " main", "commentLine": 1, "loc": { "start": { "line": 20, "column": 0 }, "end": { "line": 20, "column": 5 } } }];
  //   console.log(JSON.stringify(comments));
  //   assert.deepEqual(comments, expect);
  // });
});

describe("Test don't support language", () => {
  it('Test any', () => {
    const url = './static/demo.any';
    const extname = path.extname(url);
    const context = fs.readFileSync(path.join(__dirname, url), 'utf-8');
    const comments = parser(context, extname.replace('.', ''));
    assert.deepEqual(comments, []);
  })
})