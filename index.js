#!/usr/bin/env node

const { argv, stdin } = process
const { expand } = require('@emmetio/expand-abbreviation')
const { html: snippets } = require('@emmetio/snippets')
const field = (index, placeholder) => `\${${index}${placeholder ? ':' + placeholder : ''}}`;

let abbr = ''
if (argv[2]) {
  abbr = argv[2]
  console.log(expand(abbr, { snippets, field }))
} else {
  stdin.setEncoding('utf8')

  stdin.on('readable', () => {
    let chunk
    while ((chunk = stdin.read())) {
      abbr += chunk
    }
  })

  stdin.on('end', () => console.log(expand(abbr, { snippets, field })))
}
