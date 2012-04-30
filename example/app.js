if (!process.env.NODE_ENV)
{
    console.log("Please set 'NODE_ENV'.");
    process.exit();
}

var Derby = require('../lib/derby');
Derby.setup(process.env.NODE_ENV, __dirname + '/settings/', true);

console.log('on app.js');
console.log(Derby.data);

Derby.on('change', function(){
    console.log('Settings changed.');
    console.log(Derby.data);
});

var aModule = require('./module.js');

Derby.extend({
    host : 'example.com'
}, true);