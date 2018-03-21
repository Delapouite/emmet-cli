#!/usr/bin/env node
const { expand } = require('@emmetio/expand-abbreviation')
const { html: snippets } = require('@emmetio/snippets')
const abbr = process.argv[2] || ''

console.log(expand(abbr, { snippets }))
