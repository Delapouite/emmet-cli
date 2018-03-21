# emmet-cli

[emmet](https://emmet.io/) command line interface.

## Usage

```
$ emmet abbr
```

Example:

```
$ emmet '#foo>span.bar*3'
```

outputs on `stdout`:

```
<div id="foo">
  <span class="bar"></span>
  <span class="bar"></span>
  <span class="bar"></span>
</div>

```

## Install

```
$ npm i -g emmet-cli
```

## About

**emmet** is a great plugin available in many modern code editors.
It aims mainly at working with HTML easier.

It's written in JavaScript so there's no easy way run it without `node.js`.

This module is currently a dead simple (like 5 lines of code) way to use the compiler
as a CLI. It uses a few modules from [@emmet-io](https://www.npmjs.com/~emmetio) which
is an effort for emmet 2.x to decouple all its internal bits.

My main usage currently is with [kakoune](http://kakoune.org)'s `!` command, which
blindly insert the output of `emmet` into the current buffer.

In the future, I'll try to improve this scenario further by combining with cool stuff
like [phantom selectons](https://github.com/occivink/kakoune-phantom-selection).

According to its README, the [HTML matcher](https://www.npmjs.com/package/@emmetio/html-matcher)
would be a nice way to grab coordinates that may be turned into [text-objects](https://github.com/Delapouite/kakoune-text-objects),
but the `findPair` function is nowhere to be found (yet).

## License

ISC
