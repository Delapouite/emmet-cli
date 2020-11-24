#!/usr/bin/env node

const minimist = require('minimist')
const { expand } = require('@emmetio/expand-abbreviation')
const { html: snippets } = require('@emmetio/snippets')
const field = (index, placeholder) =>
  `\${${index}${placeholder ? ':' + placeholder : ''}}`

const argv = minimist(process.argv.slice(2), { boolean: ['p', 'x'] })

let abbr
if (argv._.length) {
  abbr = argv._[0]
}

let expandArgs = { snippets }
if (argv.p) {
  expandArgs.field = field
}
if (argv.x) {
  expandArgs.profile = {
    selfClosingStyle: 'xhtml'
  }
}

if (abbr) {
  console.log(expand(abbr, expandArgs))
} else {
  const { stdin } = process
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
