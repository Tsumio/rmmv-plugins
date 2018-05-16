//=============================================================================
// MemoryCheatingBlocker.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2018 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2018/05/16 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc Prevent memory tampering cheat.
 * @author Tsumio
 *
 * @param ----Basic Settings----
 * @desc 
 * @default 
 * 
 * @param WarningEvent
 * @type number
 * @desc Common event number to be executed when cheating act is detected.
 * @default 1
 * 
 * 
 * @help Prevent memory tampering cheat.
 * 
 * ----feature----
 * -> Only can work in the local environment.
 * -> Detects memory tampering with "variables of RPG Maker"
 * -> Detects memory tampering with gold
 * 
 * ----how to use----
 * This plugin only can work in the local environment.
 * After installing the plugin, please set the plugin parameters.
 * This plugin will not work with stored data created before installing this plugin. Please try with a new game.
 * 
 * 
 * ----memory tampering with "variables of RPG Maker"----
 * Detects memory tampering with "variables of RPG Maker"(it is relatively easy to search values, not values of variables themselves are hidden).
 * If this plugin detects fraud, tries to restore it to its original value.
 * Also, the specified common event is executed.
 * 
 * ----memory tampering with gold----
 * Detects memory tampering with gold (values themselves are concealed, and retrieval of values is relatively difficult).
 * If this plugin detects fraud, force gold to 0.
 * Also, the specified common event is executed.
 * 
 * ----other cheatings----
 * In this plugin, for example, countermeasures against falsification against actor's HP and offensive power are not done.
 * The reason is that the possibility of conflict with other plugins is very high.
 * 
 * ----plugin command----
 * There is no plugin command.
 * 
 *
 * ----change log---
 * 1.0.0 2018/05/16 Release.
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
 * @plugindesc メモリ改竄チートを予防するプラグイン
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * @param 不正警告イベント
 * @type number
 * @desc 不正行為が発覚したときに実行するコモンイベントの番号
 * @default 1
 * 
 * @help メモリ改竄チートを予防するプラグイン
 * 
 * 【特徴】
 * ・ローカル環境でのみ動きます
 * ・「ツクールの変数」に対するメモリ改竄を検知します
 * ・ゴールドに対するメモリ改竄を検知します
 * 
 * 【使用方法】
 * このプラグインはローカル環境専用です（アツマールなどでは動かない）。
 * プラグインの導入後、プラグインパラメーターを設定してください。
 * また、このプラグインを導入する前に作成したセーブデータでは動きません。必ず新規ゲームで試してください。
 * 
 *
 * 【「ツクールの変数」のメモリ改竄】
 * ツクール本体から設定できる変数に対するメモリ改竄を検知します（変数の値そのものを隠蔽しているわけではなく、値の検索は比較的容易）。
 * 不正行為を検知した場合、元の値に復元しようと試みます。
 * また、指定されたコモンベントが実行されます。
 * 
 * 【ゴールドに対するメモリ改竄】
 * 所持金に対するメモリ改竄を検知します（値そのものを隠蔽しており、値の検索は比較的困難）。
 * 不正行為を検知した場合、ゴールドを強制的に0にします。
 * また、指定されたコモンイベントが実行されます。
 * 
 * 【その他の不正行為】
 * 当プラグインでは、例えばアクターのHPや攻撃力に対する改竄の対策はおこなっていません。
 * 理由は、他のプラグインと競合する可能性が非常に高くなるためです。
 * 
 * 【プラグインコマンド】
 * プラグインコマンドはありません。
 * 
 * 
 * 【更新履歴】
 * 1.0.0 2018/05/16 公開。
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
    var pluginName = 'MemoryCheatingBlocker';


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
    param.warningEventNum         = getParamNumber(['WarningEvent', '不正警告イベント']);

////==============================
//// Convert parameters.
////==============================


////==============================
//// Convert to Number.
////==============================
    //None


////=============================================================================
//// Game_Variables
////  
////=============================================================================

    Game_Variables.prototype.value = function(variableId) {
        //値が存在しない場合は0を返す
        if(!this.hasValue(variableId)) {
            Debug.log('値が存在していないので0を返す');
            return 0;
        }
        //改竄されていれば改竄前のデータに復元する
        if(this.isFalsified(variableId)) {
            global.gc();
            this.restoreValue(variableId);
            this.onDetectedCheating();
        }

        //値を返す
        switch(this.getValueType(variableId)) {
            case 'number' :
                return Number(this._data[variableId].value) || 0;
            case 'string' :
                return this._data[variableId].value || 0;
            case 'object' :
                return JSON.parse(this._data[variableId].value) || 0;
            default : 
                return this._data[variableId].value || 0;
        }
    };

    Game_Variables.prototype.setValue = function(variableId, value) {
        if (variableId > 0 && variableId < $dataSystem.variables.length) {
            //不正行為の確認
            if(this.isFalsified(variableId)) {
                global.gc();
                this.restoreValue(variableId);
                this.onDetectedCheating();
            }
            //値の代入処理
            if (typeof(value) === 'number') {
                value = Math.floor(value);
            }
            const compress = LZString.compressToUint8Array(String(value));
            this._data[variableId] = { value:value, origin:compress, type:typeof(value) };
            Debug.log(this._data[variableId]);
            this.onChange();
        }
    };

    Game_Variables.prototype.hasValue = function(variableId) {
        return this._data[variableId];
    };

    //データが改竄されていればtrueを返す
    Game_Variables.prototype.isFalsified = function(variableId) {
        //値がまだ存在しないなら即リターン
        if(!this._data[variableId]) {
            return false;
        }
        //実際のチェック処理
        const compress = LZString.compressToUint8Array(String(this._data[variableId].value));
        if(this.isArraySame(this._data[variableId].origin, compress)) {
            if(this.getValueType(variableId) === 'number') {
                //数値型のみ特別な処理が必要。なぜなら、変数の値ではなく数値そのものを改竄される可能性があるから
                //ここは厳密な型比較では×。なぜなら、改竄によって型が一致しない可能性があるため。また、一致するかどうかを気にする必要もない。
                if(String(Number(this._data[variableId].value)) != this._data[variableId].value) {
                    //値が一致しないということは、不正があったということ
                    this.reportFalsified(variableId);
                    return true;
                }
            }
            Debug.log(`変数番号${variableId}は元の値と一致しました`);
            return false;
        }else {
            this.reportFalsified(variableId);
            return true;
        }
    };

    //不正な値を元に戻す
    //NOTE:型が一致しない値に改変されていたら、エラーで落ちるかも。きちんとテストしたい。
    Game_Variables.prototype.makeValidValue = function(variableId) {
            let validValue = String(LZString.decompressFromUint8Array(this._data[variableId].origin));
            if (this.getValueType(variableId) === 'number') {
                return String(validValue);
            } else if(this.getValueType(variableId) === 'string') {
                return validValue;
            } else if(this.getValueType(variableId) === 'object') {
                return JSON.stringify(validValue);
            }

            return validValue;
    };

    //不正行為を発見した際に実行するイベント
    Game_Variables.prototype.onDetectedCheating = function() {
        global.gc();
        $gameTemp.reserveCommonEvent(param.warningEventNum);
    };

    //変数の値を正しい値に戻す
    Game_Variables.prototype.restoreValue = function(variableId) {
        const validValue = this.makeValidValue(variableId);
        this._data[variableId].value  = validValue;
        this._data[variableId].origin = LZString.compressToUint8Array(validValue);
    };

    //型を取得
    Game_Variables.prototype.getValueType = function(variableId) {
        return this._data[variableId].type;
    };

    //配列が同一かどうかをチェック（byte配列の一致を取るだけ）
    Game_Variables.prototype.isArraySame = function(a, b) {
        if(a.length !== b.length) {
            return false;
        }
        const size = a.length;
        for(let i = 0; i < size; ++i) {
            if(a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    };

    //不正の結果を報告する
    Game_Variables.prototype.reportFalsified = function(variableId) {
        Debug.warn(`変数番号${variableId}は値が改竄されています`);
        const validValue = this.makeValidValue(variableId);
        Debug.warn(`元の値は${JSON.stringify(validValue)}で、改竄後の値は${this._data[variableId].value}`);
    };

////=============================================================================
//// ObscuredNumber
////  セキュアな値の管理を実装する
////=============================================================================
     class ObscuredNumber {
        /**
         * @param {Number} value
         */
        constructor(value) {
            this.initialize.apply(this, arguments);
        }

        initialize(value) {
            //Initialize
            this._seed   = this._createSeed();
            this._value  = this._mask(value);
            this._hash   = this._createHash();
        }

        //マスクを解除した値を返す
        get value() {
            this.checkHash();//不正行為をここで検知する
            return this._mask(this._value);
        }

        //マスクされた値を代入する
        set value(value) {
            this._value = this._mask(value);
            this._hash  = this._createHash();
        }

        //マスクされた値を返す
        get maskedValue() {
            return this._value;
        }

        get seed() {
            return this._seed;
        }

        //ハッシュをチェックし、不正行為があれば値を0にする
        checkHash() {
            if(this._hash !== this._createHash()) {
                const zeroValue = 0;
                Debug.warn(`不正行為を検知しました。値を${zeroValue}に変更します`);
                this.value = zeroValue;
                this._onDetectedCheating();
            }
        }
        
        //ユーザーが認識できない値にマスクする（あるいはマスクを解除する）
        _mask(value) {
            return value ^ this.seed;
        }

        _createSeed() {
            return Math.randomInt(999999) << 32;
        }

        _createHash() {
            const crypto   = require('crypto');
            const hashCode = crypto.createHash('sha512')
                            .update(String(this._value))
                            .digest('hex');
            Debug.log(hashCode);
            return hashCode;
        }

        //不正行為を発見したならば、警告イベントを発生させる
        _onDetectedCheating() {
            global.gc();
            $gameTemp.reserveCommonEvent(param.warningEventNum);
        }
     }
    window[ObscuredNumber.name] = ObscuredNumber;

////=============================================================================
//// Game_Party
////  
////=============================================================================
    const _Game_Party_initialize = Game_Party.prototype.initialize;
    Game_Party.prototype.initialize = function() {
        _Game_Party_initialize.call(this);
        this._gold = new ObscuredNumber(0);
    };

    Game_Party.prototype.gold = function() {
        Debug.log(`マスクした値${this._gold.maskedValue}`);
        Debug.log(`もとの値${this._gold.value}`);
        return this._gold.value;
    };

    Game_Party.prototype.gainGold = function(amount) {
        this._gold.value = (this._gold.value + amount).clamp(0, this.maxGold());
    };

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
            return 'MemoryCheatingBlocker';
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
