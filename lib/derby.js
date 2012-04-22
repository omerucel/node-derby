/**
 * Gerekli modüller yükleniyor.
 */
var $       = require("jQuery");
var path    = require('path');

/**
 * 22 Nisan 2012 günü TT Arena stadında oynanan Galatasaray - Fenerbahçe maçının anısına :)
 */
var Derby = {
    settingDir : '',
    env : '',
    data : {},
    setup : function(env, settingDir){
        Derby.env = env;
        if (settingDir.slice(-1) == '/')
            settingDir = settingDir.slice(0, -1);
        Derby.settingDir = settingDir;

        var _data = {};

        // Öntanımlı ayar dosyası kontrol ediliyor.
        if (path.existsSync(Derby.settingDir + '/default.js'))
            _data = require(Derby.settingDir + '/default.js');

        // Ortama göre ayar dosyası kontrol ediliyor.
        if (path.existsSync(Derby.settingDir + '/' + Derby.env + '.js'))
            $.extend(true, _data, require(Derby.settingDir + '/' + Derby.env));

        Derby.data = _data;
    }
};

module.exports = Derby;