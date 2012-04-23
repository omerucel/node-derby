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
``` javascript
var Settings = {
    db : {
        host : 'localhost',
        dbname : 'test'
    }
};

module.exports = Settings;
```

settings/production.js
``` javascript
var Settings = {
    logfile : '/var/production.log',
    db : {
        username : 'production',
        password : '123456'
    }
};

module.exports = Settings;
```

settings/stage.js
``` javascript
var Settings = {
    logfile : '/var/stage.log',
    db : {
        username : 'stage',
        password : '123'
    }
};

module.exports = Settings;
```

app.js
``` javascript
if (!process.env.NODE_ENV)
{
    console.log("Please set 'NODE_ENV'.");
    process.exit();
}

var Derby = require('node-derby');
Derby.setup(process.env.NODE_ENV, __dirname + '/settings/');

console.log(Derby.data);
```

Modül ayar klasörünü istenmesi halinde dinleyebilir ve herhangi bir değişiklikte ayarları güncelleyebilir. Bu işlem için
setup metoduna üçüncü parametre ile true değeri gönderilmelidir.

``` javascript
Derby.setup(process.env.NODE_ENV, __dirname + '/settings/', true);

Derby.on('change', function(){
    console.log('Settings changed');
    console.log(Derby.data);
});
```