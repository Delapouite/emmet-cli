#!/bin/sh
[ "$(node index.js 'div')" = '<div></div>' ] && echo -n 'ok' || echo -n 'ko'
echo ' div with arg'

[ "$(node index.js 'img')" = '<img src="" alt="">' ] && echo -n 'ok' || echo -n 'ko'
echo ' img with arg'

[ "$(node index.js -x 'img')" = '<img src="" alt="" />' ] && echo -n 'ok' || echo -n 'ko'
echo ' img xhtml with arg'

[ "$(node index.js -p 'div')" = '<div>${1}</div>' ] && echo -n 'ok' || echo -n 'ko'
echo ' div with arg with placeholders'

[ "$(node index.js -p 'img')" = '<img src="${1}" alt="${2}">' ] && echo -n 'ok' || echo -n 'ko'
echo ' img with arg with placeholders'

[ "$(node index.js -p -x 'img')" = '<img src="${1}" alt="${2}" />' ] && echo -n 'ok' || echo -n 'ko'
echo ' img xhtml with arg with placeholders'

[ "$(echo 'div' | node index.js)" = '<div></div>' ] && echo -n 'ok' || echo -n 'ko'
echo ' div from stdin'

[ "$(echo 'div' | node index.js -p)" = '<div>${1}</div>' ] && echo -n 'ok' || echo -n 'ko'
echo ' div from stdin with placeholders'

[ "$(echo 'img' | node index.js -p -x)" = '<img src="${1}" alt="${2}" />' ] && echo -n 'ok' || echo -n 'ko'
echo ' img xhmtl from stdin with placeholders'
