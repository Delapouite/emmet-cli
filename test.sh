[ $(node index.js 'div') = '<div></div>' ] && echo -n 'ok' || echo -n 'ko'
echo ' with arg'

[ $(node index.js -p 'div') = '<div>${1}</div>' ] && echo -n 'ok' || echo -n 'ko'
echo ' with arg with placeholders'

[ $(echo 'div' | node index.js) = '<div></div>' ] && echo -n 'ok' || echo -n 'ko'
echo ' from stdin'

[ $(echo 'div' | node index.js -p) = '<div>${1}</div>' ] && echo -n 'ok' || echo -n 'ko'
echo ' from stdin with placeholders'
