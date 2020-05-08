
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
    const expect = [
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
    ];
    assert.deepEqual(comments, expect);
  });
  it('Test go', () => {
    const url = './static/demo.go';
    const extname = path.extname(url);
    const context = fs.readFileSync(path.join(__dirname, url), 'utf-8');
    const comments = parser(context, extname.replace('.', ''));
    const expect = [
      {
        "type": "CommentBlock",
        "value": "\nblock1\n",
        "loc": {
          "start": {
            "line": 7,
            "column": 2
          },
          "end": {
            "line": 9,
            "column": 1
          }
        }
      },
      {
        "type": "CommentLine",
        "value": " line1",
        "loc": {
          "start": {
            "line": 11,
            "column": 4
          },
          "end": {
            "line": 11,
            "column": 10
          }
        }
      }
    ];
    assert.deepEqual(comments, expect);
  });
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