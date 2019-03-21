#!/usr/bin/env node

const { argv, stdin } = process
const { expand } = require('@emmetio/expand-abbreviation')
const { html: snippets } = require('@emmetio/snippets')
const field = (index, placeholder) =>
  `\${${index}${placeholder ? ':' + placeholder : ''}}`

let expandArgs
let abbr

switch(argv[2]) {
  case '-p':
    expandArgs = { snippets, field }
    if (argv[3]) {
      abbr = argv[3]
    }
    break

  default:
    expandArgs = { snippets }
    abbr = argv[2]
}

if (abbr) {
  console.log(expand(abbr, expandArgs))
} else {
  abbr = ''
  stdin.setEncoding('utf8')
  stdin.on('readable', () => {
    let chunk
    while ((chunk = stdin.read())) {
      abbr += chunk
    }
  })
  stdin.on('end', () => console.log(expand(abbr, expandArgs)))
}
