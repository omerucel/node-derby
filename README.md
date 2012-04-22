# About

Projenizi farklı ortamlarda farklı ayarlarla kullanmanızı sağlar.

# Installation

<code>
npm install node-derby
</code>

# Usage

Ayarları bir klasör içerisinde toplamalısınız. Bu klasör içerisinde ortam adı ile eş js dosyaları bulunmalı.
Ayrıca genel ayarlar içinde default.js isminde bir dosya oluşturabilirsiniz. Ortam ayarları öntanımlı ayarları her zaman
ezer.

settings/default.js
<code>
var Settings = {
    db : {
        host : 'localhost',
        dbname : 'test'
    }
};

module.exports = Settings;
</code>

settings/production.js
<code>
var Settings = {
    logfile : '/var/production.log',
    db : {
        username : 'production',
        password : '123456'
    }
};

module.exports = Settings;
</code>

settings/stage.js
<code>
var Settings = {
    logfile : '/var/stage.log',
    db : {
        username : 'stage',
        password : '123'
    }
};

module.exports = Settings;
</code>

app.js
<code>
if (!process.env.NODE_ENV)
{
    console.log("Please set 'NODE_ENV'.");
    process.exit();
}

var Derby = require('derby');
Derby.setup(process.env.NODE_ENV, __dirname + '/settings/');

console.log(Derby.data);
</code>