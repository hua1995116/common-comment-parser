export interface TypeList {
  [key: string]: {
    lineComment?: string;
    blockComment?: string[];
  }
}

const languageList: TypeList = {
  bat: { lineComment: '::' },
  clj: { lineComment: ';' },
  coffee: { lineComment: '#', blockComment: ['###', '###'] },
  cpp: { lineComment: '//', blockComment: ['/*', '*/'] },
  css: { blockComment: ['/*', '*/'] },
  fs: { lineComment: '//', blockComment: ['(*', '*)'] },
  go: { lineComment: '//', blockComment: ['/*', '*/'] },
  groovy: { lineComment: '//', blockComment: ['/*', '*/'] },
  handlebars: { blockComment: ['{{!--', '--}}'] },
  hbs: { blockComment: ['{{!--', '--}}'] },
  hlsl: { lineComment: '//', blockComment: ['/*', '*/'] },
  html: { blockComment: ['<!--', '-->'] },
  ini: { lineComment: ';' },
  java: { lineComment: '//', blockComment: ['/*', '*/'] },
  jsp: { lineComment: '//', blockComment: ['/*', '*/'] },
  js: { lineComment: "//", blockComment: ['/*', '*/'] },
  json: { lineComment: '//', blockComment: ['/*', '*/'] },
  less: { blockComment: ['/*', '*/'], lineComment: '//' },
  lua: { lineComment: '--', blockComment: ['--[[', ']]'] },
  m: { lineComment: '//', blockComment: ['/*', '*/'] },
  mm: { lineComment: '//', blockComment: ['/*', '*/'] },
  perl: { lineComment: '#' },
  pl: { lineComment: '#' },
  ps1: { lineComment: '#', blockComment: ['<#', '#>'] },
  pug: { lineComment: '//-' },
  py: { lineComment: '#', blockComment: ['"""', '"""'] },
  r: { lineComment: '#' },
  cshtml: { blockComment: ['<!--', '-->'] },
  rb: { lineComment: '#', blockComment: ['=begin', '=end'] },
  rs: { lineComment: '//', blockComment: ['/*', '*/'] },
  scss: { blockComment: ['/*', '*/'], lineComment: '//' },
  sass: { blockComment: ['/*', '*/'], lineComment: '//' },
  shader: { lineComment: '//', blockComment: ['/*', '*/'] },
  sh: { lineComment: '#' },
  swift: { lineComment: '//', blockComment: ['/*', '*/'] },
  ts: { lineComment: '//', blockComment: ['/*', '*/'] },
  vb: { lineComment: '\'' },
  yaml: { lineComment: '#' }
}

export default languageList;