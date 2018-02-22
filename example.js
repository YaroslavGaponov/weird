const weird = require('./index.js');

const normalJavaScript = `
    for(let i=0; i<10; i++)
        console.log('hello world ', i)
`;

const weirdJavaScript = weird(normalJavaScript);

console.log('----source-----');
console.log(weirdJavaScript.toString());
console.log('----end-----');

console.log('-----run----');
weirdJavaScript();
console.log('----end-----');    