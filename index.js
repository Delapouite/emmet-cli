#!/usr/bin/env node

const minimist = require("minimist");
const { expand } = require("@emmetio/expand-abbreviation");
const { html, css } = require("@emmetio/snippets");
const field = (index, placeholder) => `\${${index}${placeholder ? ":" + placeholder : ""}}`;

// Parse command line arguments with short and long options
const argv = minimist(process.argv.slice(2), {
  boolean: ["css", "help", "jsx", "placeholder", "xhtml"],
  alias: { c: "css", h: "help", j: "jsx", p: "placeholder", x: "xhtml" },
});

// Display help message and exit if '--help' flag is present
if (argv.help) {
  console.log(`
Usage: emmet-cli [options] [abbreviation]

Options:
  -c,--css             Expand abbreviation with CSS syntax.
  -j,--jsx             Expand abbreviation with JSX syntax.
  -p,--placeholder     Add placeholder for fields.
  -x,--xhtml           Use XHTML self-closing style.
  -h,--help            Show this help message.`);
  process.exit();
}

// prepare config object
let config = (argv.css)
  ? { syntax: "css", snippets: css }
  : { syntax: "html", snippets: html };

function updateConfig(newOptions) {
  config = {
    ...config,
    ...newOptions,
  };
}

// Expand abbreviation with JSX syntax
if (argv.jsx) {
  updateConfig({ options: { jsx: true } });
}

// Add placeholder for fields
if (argv.placeholder) {
  updateConfig({ field: field });
}

// Use XHTML self-closing style
if (argv.xhtml) {
  updateConfig({ profile: { selfClosingStyle: "xhtml" } });
}

// Function to handle expansion and output
function expandAndOutput(abbr) {
  try {
    console.log(expand(abbr, config));
  } catch (e) {
    console.error("Error expanding abbreviation:\n", e);
    process.exit(1);
  }
}

// Function to read from stdin or command line arg
function readInput(callback) {
  if (argv._.length) {
    // Argument given directly, process it
    callback(argv._.join(" "));
  } else {
    // No argument, try reading from stdin
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", chunk => data += chunk);
    process.stdin.on("end", () => data ? callback(data.trim()) : process.exit());
  }
}

// Read input and expand abbreviation
readInput(expandAndOutput);
