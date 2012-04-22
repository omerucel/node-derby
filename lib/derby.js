/**
 * Gerekli modüller yükleniyor.
 */
var util    = require('./util');
var path    = require('path');

/**
 * 22 Nisan 2012 günü TT Arena stadında oynanan Galatasaray - Fenerbahçe maçının anısına :)
 */
var Derby = {
    settingDir : '',
    env : '',
    data : {},
    setup : function(env, settingDir){
        this.env = env;
        if (settingDir.slice(-1) == '/')
            settingDir = settingDir.slice(0, -1);
        this.settingDir = settingDir;

        var _data = {};

        // Öntanımlı ayar dosyası kontrol ediliyor.
        if (path.existsSync(this.settingDir + '/default.js'))
            _data = require(this.settingDir + '/default.js');

        // Ortama göre ayar dosyası kontrol ediliyor.
        if (path.existsSync(this.settingDir + '/' + this.env + '.js'))
            _data = util.extendObject(_data, require(this.settingDir + '/' + this.env));

        this.data = _data;
    }
};

module.exports = Derby;