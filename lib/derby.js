/**
 * 22 Nisan 2012 günü TT Arena stadında oynanan Galatasaray - Fenerbahçe maçının anısına :)
 */

/**
 * Gerekli modüller yükleniyor.
 */
var derbyUtil   = require('./util');
var util        = require('util');
var path        = require('path');
var fs          = require('fs');
var events      = require('events');

var Derby = function(){
    this.settingDir = '';
    this.env = '';
    this.data = {};

    events.EventEmitter.call(this);
};
util.inherits(Derby, events.EventEmitter);

Derby.prototype.setup = function(env, settingDir, watchDir){
    events.EventEmitter.call(this);

    var self = this;
    this.env = env;
    if (settingDir.slice(-1) == '/')
        settingDir = settingDir.slice(0, -1);
    this.settingDir = settingDir;

    // Ayarlar yükleniyor.
    this.loadSettings(function(){});

    if (!(watchDir == undefined || !watchDir))
    {
        // Ayar dizini değişiklikler için dinleniyor.
        fs.watch(this.settingDir, function(event, filename){
            self.loadSettings(function(){
                self.emit('change');
            });
        });
    }
};

Derby.prototype.loadSettings = function(callback){
    var _data = {};

    // Öntanımlı ayar dosyası kontrol ediliyor.
    if (path.existsSync(this.settingDir + '/default.js'))
    {
        delete require.cache[this.settingDir + '/default.js'];
        _data = require(this.settingDir + '/default.js');
    }

    // Ortama göre ayar dosyası kontrol ediliyor.
    if (path.existsSync(this.settingDir + '/' + this.env + '.js'))
    {
        delete require.cache[this.settingDir + '/' + this.env + '.js'];
        _data = derbyUtil.extendObject(_data, require(this.settingDir + '/' + this.env));
    }

    this.data = _data;

    callback();
};

module.exports = new Derby();