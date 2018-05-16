//=============================================================================
// TsumioErrorChecker.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2018 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.1.1 2018/05/14 致命的な不具合の修正。
// 1.1.0 2018/05/14 暗号化の機能をつけた。
// 1.0.1 2018/05/13 プラグインを途中から導入しても動くようにした。
// 1.0.0 2018/05/13 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc Attempting to restore storage data if it is spoiled.
 * @author Tsumio
 *
 * @param ----Basic Settings----
 * @desc 
 * @default 
 * 
 * @param Encrypt 
 * @type boolean
 * @desc Whether storage data is encrypted or not. When encrypted, the storage data capacity increases.
 * @default false
 * 
 * @param DecryptKey
 * @type string
 * @desc Key for decrypting storage data.
 * @default abcdefg123456
 * 
 * @help Attempting to restore storage data if it is spoiled.
 * 
 * ----feature----
 * -> Generate backup file in local environment
 * -> If the storage data is spoiled, it automatically reads the backup file
 * -> Does not work with Atsumaru etc.
 * -> Can encrypt storage data.
 * 
 * ----how to use----
 * Just installing the plugin.
 * 
 * ----plugin command----
 * There is no plugin command.
 * 
 * ----function----
 * This plugin only can work in the local environment.
 * When storage data is saved, a dup file is generated as a backup file.
 * When storage data is read, if the original data is spoiled, this dup file will be read.
 * If the dup file is also broken, the beep sounds normally and data will not be read.
 *
 * If storage data exists before installing this plugin, and if you check the encryption flag, you can not read old data.
 *
 * ----change log---
 * 1.1.1 2018/05/14 Fix a fatal bug.
 * 1.1.0 2018/05/14 Add encryption function.
 * 1.0.1 2018/05/13 Run the plugin if introducing from the middle.
 * 1.0.0 2018/05/13 Release.
 * 
 * ----remarks----
 * I shall not be responsible for any loss, damages and troubles from using this plugin.
 * 
 * --Terms of Use--
 * This plugin is free for both commercial and non-commercial use.
 * You may edit the source code to suit your needs,
 * so long as you don't claim the source code belongs to you.
 * 
 */
/*:ja
 * @plugindesc セーブデータが壊れていた場合に復元を試みるプラグイン
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * @param 暗号化
 * @type boolean
 * @desc セーブデータを暗号化するかどうか
 * @default false
 * 
 * @param 復号化キー
 * @type string
 * @desc セーブデータを復号化するためのキー
 * @default abcdefg123456
 * 
 * @help セーブデータが壊れていた場合に復元を試みるプラグイン
 * 
 * 【特徴】
 * ・ローカル環境でバックアップファイルを生成します
 * ・データが破損していた場合は自動でバックアップファイルを読み取ります
 * ・アツマール等では動きません
 * ・セーブデータを暗号化する機能があります
 * 
 * 【使用方法】
 * プラグインの導入するだけで完了です。
 * 
 * 【機能】
 * このプラグインはローカル環境専用です（アツマールなどでは動かない）。
 * セーブデータ保存時にバックアップファイルとしてdupファイルを生成します。
 * セーブデータ読み込み時、元データが壊れていた場合はこのdupファイルを読み込みます。
 * dupファイルも壊れていた場合は通常通りビープー音が鳴ってデータを読み込みません。
 *
 * このプラグインを導入する前にセーブデータが存在している場合、暗号化フラグにチェックを入れるとそのデータは読み込めなくなります。
 * 
 * 【プラグインコマンド】
 * プラグインコマンドはありません。
 * 
 * 
 * 【更新履歴】
 * 1.1.1 2018/05/14 致命的な不具合の修正。
 * 1.1.0 2018/05/14 暗号化の機能をつけた。
 * 1.0.1 2018/05/13 プラグインを途中から導入しても動くようにした。
 * 1.0.0 2018/05/13 公開。
 * 
 * 【備考】
 * 当プラグインを利用したことによるいかなる損害に対しても、制作者は一切の責任を負わないこととします。
 * 
 * 【利用規約】
 * ソースコードの著作権者が自分であると主張しない限り、
 * 作者に無断で改変、再配布が可能です。
 * 利用形態（商用、18禁利用等）についても制限はありません。
 * 自由に使用してください。
 * 
 */

(function() {
    'use strict';
    var pluginName = 'TsumioErrorChecker';


////=============================================================================
//// Local function
////  These functions checks & formats pluguin's command parameters.
////  I borrowed these functions from Triacontane.Thanks!
////=============================================================================
    var getParamString = function(paramNames) {
        if (!Array.isArray(paramNames)) paramNames = [paramNames];
        for (var i = 0; i < paramNames.length; i++) {
            var name = PluginManager.parameters(pluginName)[paramNames[i]];
            if (name) return name;
        }

        return '';
    };

    var getParamNumber = function(paramNames, min, max) {
        var value = getParamString(paramNames);
        if (arguments.length < 2) min = -Infinity;
        if (arguments.length < 3) max = Infinity;
        return (parseInt(value) || 0).clamp(min, max);
    };

    //This function is not written by Triacontane.Tsumio wrote this function !
    var convertParam = function(param) {
        if(param !== undefined){
            try {
                return JSON.parse(param);
            }catch(e){
                console.group();
                console.error('%cParameter is invalid ! You should check the following parameter !','background-color: #5174FF');
                console.error('Parameter:' + eval(param));
                console.error('Error message :' + e);
                console.groupEnd();
            }
        }
    };

    /**
     * Convert to number.Receive converted JSON object.
     * @param {Object} obj
     * 
     */
    //This function is not written by Triacontane.Tsumio wrote this function !
    var convertToNumber = function(obj) {
        for(var prop in obj) {
            obj[prop] = Number(obj[prop]);
        }
        return obj;
    }

////=============================================================================
//// Get and set pluguin parameters.
////=============================================================================
    var param                          = {};
    //Basic Stteings
    param.shouldEncrypt         = getParamString(['Encrypt', '暗号化']);
    param.decryptKey            = getParamString(['DecryptKey',    '復号化キー']);

////==============================
//// Convert parameters.
////==============================
    param.shouldEncrypt = convertParam(param.shouldEncrypt);

////==============================
//// Convert to Number.
////==============================
    //None

////=============================================================================
//// DataManager
////  保存時にハッシュ値を付け加える
////=============================================================================
    const _DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        //ハッシュのための準備
        $gameSystem.hash = '';
        //元のデータを呼び出し
        var result = _DataManager_makeSaveContents.call(this);
        //ハッシュを取得する
        result.system.hash = this.makeHashCode(result);
        return result;
    };

    //Node.jsのcryptoクラスを利用してハッシュコードを生成する
    DataManager.makeHashCode = function(obj) {
        const crypto   = require('crypto');
        const hashCode = crypto.createHash('sha512')
                        .update(JsonEx.stringify(obj))
                        .digest('hex');
        return hashCode;
    }

    DataManager.loadGameForDupFile = function(savefileId) {
        var globalInfo = this.loadGlobalInfo();
        var json = StorageManager.loadDupFile(savefileId);
        
        this.createGameObjects();
        this.extractSaveContents(JsonEx.parse(json));
        this._lastAccessedId = savefileId;
    };

////=============================================================================
//// Storagemanager
////  保存時にバックアップ用のデータを生成する
////=============================================================================
    const _StorageManager_saveToLocalFile = StorageManager.saveToLocalFile;
    StorageManager.saveToLocalFile = function(savefileId, json) {
        if(param.shouldEncrypt && savefileId > 0) {
            this.createEncryptedFile(savefileId, json, this.localFilePath(savefileId));
        }else {
            _StorageManager_saveToLocalFile.apply(this, arguments);
        }
    };
    
    //暗号化されたファイルを生成する
    StorageManager.createEncryptedFile = function(savefileId, json, fileName) {
        //元の処理
        var data = LZString.compressToBase64(json);
        var fs = require('fs');
        var dirPath = this.localFileDirectoryPath();
        var filePath = fileName;

        const cryptedJson = StorageManager.encrypte(data);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
        fs.writeFileSync(filePath, cryptedJson);
    };

    //暗号化の処理
    StorageManager.encrypte = function(planeText) {
        //暗号化の処理
        var crypto      = require("crypto");
        var cipher      = crypto.createCipher('aes128' , param.decryptKey);
        var cryptedJson = cipher.update(planeText, 'utf8', 'hex');
        cryptedJson    += cipher.final('hex');
        Debug.log('暗号化');
        Debug.log(cryptedJson);
        return cryptedJson;
    };

    //復号化の処理
    StorageManager.decrypte = function(encryptedText) {
        var crypto   = require("crypto");
        var decipher = crypto.createDecipher('aes128', param.decryptKey);
        var decJson  = decipher.update(encryptedText, 'hex', 'utf8');
        decJson     += decipher.final('utf8');
        Debug.log('復号化');
        Debug.log(decJson);
        return decJson;
    };

    //バックアップデータのための保存処理を追加
    const _StorageManager_save = StorageManager.save;
    StorageManager.save = function(savefileId, json) {
        _StorageManager_save.apply(this, arguments);
        if (this.isLocalMode()) {
            if(param.shouldEncrypt) {
                this.createEncryptedFile(savefileId, json, this.localFilePath(savefileId) + '.dup');
            }else {
                this.createDupFileToLocal(savefileId, json);
            }
        }
    };

    //ロード時にハッシュをチェックする処理を追加
    const _StorageManager_load = StorageManager.load;
    StorageManager.load = function(savefileId) {
        try {
            if (this.isLocalMode() && savefileId > 0) {
                //最初に元のJSONファイルを取得
                let json = this.loadOriginalFromLocalFile(savefileId);
                //必要があれば復号化
                if(param.shouldEncrypt) {
                    json = StorageManager.decrypte(json);
                }
                //復号化したものを解凍
                json = LZString.decompressFromBase64(json);
                //解凍してパース
                const data = JsonEx.parse(json);

                //データが正しいかどうかをチェック
                if(this.validHash(data)) {
                    //ハッシュが一致しているのでそのまま返す
                    Debug.log('ハッシュが一致したのでそのまま返す');
                    return json;
                }else {
                    Debug.log('ハッシュが一致しなかったのでdupファイルをロード' + savefileId);
                    return StorageManager.loadDupFile(savefileId);
                }
            }
        }catch(e) {
            Debug.log('ロード中にエラーがあったため強制的にdupファイルをロード');
            return StorageManager.loadDupFile(savefileId);
        }
        return _StorageManager_load.apply(this, arguments);
    };

    //バックアップデータを複製する
    StorageManager.createDupFileToLocal = function(savefileId, json) {
        var data = LZString.compressToBase64(json);
        var fs = require('fs');
        var dirPath = this.localFileDirectoryPath();
        var filePath = this.localFilePath(savefileId) + ".dup";
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
        fs.writeFileSync(filePath, data);
    };

    //ハッシュをチェックする
    StorageManager.validHash = function(data) {
        if(!data.system) {
            //これは通常のセーブデータではない
            Debug.log('通常のセーブデータでないためfalse');
            return false;
        }
        try {
            //ハッシュを生成
            const originHash  = data.system.hash;
            data.system.hash  = '';
            const currentHash = DataManager.makeHashCode(data);

            //ハッシュがそもそも存在しない場合、途中からプラグインを入れた可能性がある
            if(!originHash) {
                //ハッシュが一致したということにして返す
                Debug.log('ハッシュがそもそも存在しないので、一致したということにする（途中からプラグインを入れた？）');
                return true;
            }

            //単に保存されているハッシュの文字列を比べているだけなので、セキュリティどうこうでは使えない！
            //あくまでも復元のための簡易チェック
            //厳密にやりたいならもう少し凝ったプログラムが必要
            if(originHash === currentHash) {
                Debug.log('ハッシュが一致');
                return true;
            }else {
                Debug.log('ハッシュが不一致');
                return false;
            }
        }catch(e) {
            //ファイルがそもそも壊れていて読み込めないのでfalse
            Debug.log('ファイルが壊れている');
            return false;
        }
    };

    //DUPファイルを読み込み復元する
    StorageManager.loadDupFile = function(savefileId) {
        var data = null;
        var fs = require('fs');
        var filePath = this.localFilePath(savefileId) + ".dup";
        if (fs.existsSync(filePath)) {
            data = fs.readFileSync(filePath, { encoding: 'utf8' });
        }
        Debug.log(filePath);
        if(param.shouldEncrypt) {
            data = StorageManager.decrypte(data);
        }

        if (this.isLocalMode() && savefileId > 0) {
            //復号化したものを解凍
            data = LZString.decompressFromBase64(data);
            //解凍してパース
            const origin = JsonEx.parse(data);

            if(!this.validHash(origin)) {
                Debug.log('dupファイルも改造されています');
                throw new Error();
            }

            return data;
        }

        return LZString.decompressFromBase64(data);
    };

    //解凍済みのファイルを返さないようにする
    StorageManager.loadOriginalFromLocalFile = function(savefileId) {
        var data = null;
        var fs = require('fs');
        var filePath = this.localFilePath(savefileId);
        if (fs.existsSync(filePath)) {
            data = fs.readFileSync(filePath, { encoding: 'utf8' });
        }

        return data;
    }

////=============================================================================
//// Debug
////  This static class is for simple debugging.I/O.
////=============================================================================
    class Debug {
        /**
         * Instead of constructor.
         * At debugging, this method should be executed on loaded.
         */
        static on() {
            this._debugMode = true;
            this._stack     = [];
            console.warn(`${this.FILENAME} : Debug mode turned ON.`);
        }

        /**
         * Instead of constructor.
         * At release, this method should be executed on loaded.
         */
        static off() {
            this._debugMode = false;
            this._stack     = [];
            console.warn(`${this.FILENAME} : Debug mode turned OFF.`);
        }

        static get FILENAME(){
            return 'TsumioErrorChecker';
        }

        static get isDebugMode() {
            return this._debugMode;
        }

        static outputStack() {
            if(!this.isDebugMode){
                return;
            }

            if(this._stack.length > 0){
                this._stack.forEach(function(element) {
                    console.log(element);
                }, this);
                return `Stack length is ${this._stack.length}.`;
            }
            return 'Stack length is 0.';
        }

        static clearStack() {
            if(!this.isDebugMode){
                return;
            }

            this._stack = [];
        }

        static push(arg) {
            if(!this.isDebugMode){
                return;
            }

            this._stack.push(arg);
        }

        /**
         * Private method.
         * @param {Function} func
         * @param {Array} args
         */
        static _output(func, args) {
            if(!this.isDebugMode){
                return;
            }

            args = Array.prototype.slice.call(args);//ES6: Array.from(args);
            for(var arg of args) {
                console[func](arg);
                this.push(args);
            }
        }

        static log(args) {
            this._output('log', arguments);
        }

        static dir(args) {
            this._output('dir', arguments);
        }

        static info(args) {
            this._output('info', arguments);
        }

        static warn(args) {
            this._output('warn', arguments);
        }

        static error(args) {
            this._output('error', arguments);
        }

        static assert(test, message, optionalParam) {
            if(!this.isDebugMode){
                return;
            }

            console.assert(test, message, optionalParam);
        }

        static modify() {
            this._debugMode = !this._debugMode;
            var status      = this._debugMode ? 'ON' : 'OFF';
            console.warn(`Debug mode turned ${status}.`);
        }
    }

    //Debug.on();
    Debug.off();

})();
