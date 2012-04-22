if (!process.env.NODE_ENV)
{
    console.log("Please set 'NODE_ENV'.");
    process.exit();
}

var Derby = require('../lib/derby');
Derby.setup(process.env.NODE_ENV, __dirname + '/settings/');

console.log('on app.js');
console.log(Derby.data);

var aModule = require('./module.js');