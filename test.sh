#!/bin/sh
[ "$(node index.js 'div')" = '<div></div>' ] && echo -n 'ok' || echo -n 'ko'
echo ' div from arg'

[ "$(node index.js 'img')" = '<img src="" alt="">' ] && echo -n 'ok' || echo -n 'ko'
echo ' img from arg'

[ "$(node index.js -x 'img')" = '<img src="" alt="" />' ] && echo -n 'ok' || echo -n 'ko'
echo ' img xhtml from arg'

[ "$(node index.js -p 'div')" = '<div>${1}</div>' ] && echo -n 'ok' || echo -n 'ko'
echo ' div with placeholders from arg'

[ "$(node index.js -p 'img')" = '<img src="${1}" alt="${2}">' ] && echo -n 'ok' || echo -n 'ko'
echo ' img with placeholders from arg'

[ "$(node index.js -p -x 'img')" = '<img src="${1}" alt="${2}" />' ] && echo -n 'ok' || echo -n 'ko'
echo ' img xhtml with placeholders from arg'

[ "$(echo 'div' | node index.js)" = '<div></div>' ] && echo -n 'ok' || echo -n 'ko'
echo ' div from stdin'

[ "$(echo 'div' | node index.js -p)" = '<div>${1}</div>' ] && echo -n 'ok' || echo -n 'ko'
echo ' div with placeholders from stdin'

[ "$(echo 'img' | node index.js -p -x)" = '<img src="${1}" alt="${2}" />' ] && echo -n 'ok' || echo -n 'ko'
echo ' img xhmtl with placeholders from stdin'

[ "$(node index.js --css 'm10')" = 'margin: 10px;' ] && echo -n 'ok' || echo -n 'ko'
echo ' css margin from arg'

[ "$(echo 'm10' | node index.js --css)" = 'margin: 10px;' ] && echo -n 'ok' || echo -n 'ko'
echo ' css margin from stdin'

[ "$(node index.js --css 'p10+m20' | tr -d '\n')" = "padding: 10px;margin: 20px;" ] && echo -n 'ok' || echo -n 'ko'
echo ' css padding and margin from arg'

[ "$(echo 'p10+m20' | node index.js --css | tr -d '\n')" = "padding: 10px;margin: 20px;" ] && echo -n 'ok' || echo -n 'ko'
echo ' css padding and margin from stdin'

[ "$(node index.js --jsx '.class')" = '<div className="class"></div>' ] && echo -n 'ok' || echo -n 'ko'
echo ' jsx div from arg'

[ "$(echo '.class' | node index.js --jsx)" = '<div className="class"></div>' ] && echo -n 'ok' || echo -n 'ko'
echo ' jsx div from stdin'

[ "$(node index.js --jsx --xhtml 'input.class')" = '<input type="text" className="class" />' ] && echo -n 'ok' || echo -n 'ko'
echo ' jsx input with xhtml from arg'

[ "$(node index.js --jsx --placeholder '.class')" = '<div className="class">${1}</div>' ] && echo -n 'ok' || echo -n 'ko'
echo ' jsx div with placeholders from arg'
