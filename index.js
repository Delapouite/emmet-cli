#!/usr/bin/env node

const { argv, stdin } = process
const { expand } = require('@emmetio/expand-abbreviation')
const { html: snippets } = require('@emmetio/snippets')
const field = (index, placeholder) =>
  `\${${index}${placeholder ? ':' + placeholder : ''}}`

let expand_args = { snippets }
let abbr = ''
if (argv[2]) {
  if (argv[2] === '-p') {
    expand_args = { snippets, field }
    if (argv[3]) {
      abbr = argv[3]
    }
  }
}
if (abbr !== '') {
  console.log(expand(abbr, expand_args))
} else {
  stdin.setEncoding('utf8')

  stdin.on('readable', () => {
    let chunk
    while ((chunk = stdin.read())) {
      abbr += chunk
    }
  })

  stdin.on('end', () => console.log(expand(abbr, expand_args)))
}
