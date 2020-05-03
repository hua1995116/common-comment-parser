export interface commentsType {
  lineComment: string;
  blockComment: string[];
}

export interface TypeList {
  [key: string]: {
    comments: commentsType
  }
}

const languageList: TypeList = {
  "js": {
    "comments": {
      "lineComment": "//",
      "blockComment": [ "/*", "*/" ]
    },
  }
}

export default languageList;