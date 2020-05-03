
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
    const expect = [{ "type": "CommentLine", "value": " hello common-comment-parser", "commentLine": 1, "loc": { "start": { "line": 0, "column": 0 }, "end": { "line": 0, "column": 28 } } }, { "type": "CommentBlock", "value": "\n\nhello common-comment-parser\n\n", "commentLine": 1, "loc": { "start": { "line": 7, "column": 0 }, "end": { "line": 8, "column": 0 } } }, { "type": "CommentBlock", "value": " hello common-comment-parser ", "commentLine": 1, "loc": { "start": { "line": 12, "column": 0 }, "end": { "line": 12, "column": 29 } } }];
    assert.deepEqual(comments, expect);
  });
});

describe('Test support language', () => {
  it('Test any', () => {
    const url = './static/demo.any';
    const extname = path.extname(url);
    const context = fs.readFileSync(path.join(__dirname, url), 'utf-8');
    const comments = parser(context, extname.replace('.', ''));
    assert.deepEqual(comments, []);
  })
})