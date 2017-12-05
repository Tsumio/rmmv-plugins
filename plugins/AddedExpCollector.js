//=============================================================================
// AddedExpCollector.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2017/12/05 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc Store the total experience value obtained so far in the specified variable.
 * @author Tsumio
 *
 * @param ----Basic Settings----
 * @desc 
 * @default 
 * 
 * @param VariableNumberTotal
 * @type variable
 * @desc Set variable number for saving experience value.
 * @default 1
 * 
 * @param VariableNumberEach
 * @type variable
 * @desc Set the variable number to save the experience value obtained in one battle. It will be reset every battle.
 * @default 2
 * 
 * @help Store the total experience value obtained so far in the specified variable.
 * 
 * ----feature----
 * -> Store the total experience value obtained so far in the specified variable.
 * 
 * ----how to use----
 * After introducing this plugin, please set the plugin parameters.
 * By referring to the specified variable, can obtain the total experience value gained so far.
 * 
 * ----plugin command----
 * There is no plugin command.
 * 
 * 
 * ----change log---
 * 1.0.0 2017/12/05 Release.
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
 * @plugindesc これまで得た合計経験値を変数に保存します。
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * @param 合計の経験値保存用の変数番号
 * @type variable
 * @desc 合計の経験値を保存するための変数番号を設定します。戦闘ごとにはリセットされません。
 * @default 1
 * 
 * @param 個別の経験値保存用の変数番号
 * @type variable
 * @desc 一回の戦闘で得た経験値を保存するための変数番号を設定します。戦闘ごとにリセットされます。
 * @default 2
 * 
 * @help これまで得た合計経験値を変数に保存します。
 * 
 * 【特徴】
 * ・これまで得た合計経験値を指定の変数に格納します。
 * 
 * 【使用方法】
 * プラグインの導入後、プラグインパラメーターを設定してください。
 * 指定の変数を参照することにより、これまでに得た合計経験値・前回の戦闘の経験値を取得することができます。
 * 
 * 【プラグインコマンド】
 * プラグインコマンドはありません。
 * 
 * 
 * 【更新履歴】
 * 1.0.0 2017/12/05 公開。
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
    var pluginName = 'AddedExpCollector';


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
    param.expTotalVariableNum  = getParamNumber(['VariableNumberTotal', '合計の経験値保存用の変数番号']);
    param.expEachVariableNum   = getParamNumber(['VariableNumberEach',  '個別の経験値保存用の変数番号']);

////==============================
//// Convert parameters.
////==============================
    //None

////==============================
//// Convert to Number.
////==============================
    //None

////=============================================================================
//// BattleManager
////  Add function for saving the total of experience values.
////=============================================================================
    const _BattleManager_makeRewards = BattleManager.makeRewards;
    BattleManager.makeRewards = function() {
        _BattleManager_makeRewards.call(this);
        //Total exp.
        const prevExp     = $gameVariables.value(param.expTotalVariableNum);
        const newTotalExp = prevExp + $gameTroop.expTotal();
        $gameVariables.setValue(param.expTotalVariableNum, newTotalExp);
        //Current exp.
        $gameVariables.setValue(param.expEachVariableNum, $gameTroop.expTotal());
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
            return 'AddedExpCollector';
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
