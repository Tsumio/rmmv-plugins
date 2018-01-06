//=============================================================================
// BugFixFreezeOfSomeScenes.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2018 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2018/01/06 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc Fixes the bug of freezing occurring in some scenes.
 * @author Tsumio
 *
 * @param ----Basic Settings----
 * @desc 
 * @default 
 * 
 * 
 * @help Fixes the bug of freezing occurring in some scenes.
 * 
 * ----feature----
 * -> Fixes the bug of freezing occurring in some scenes.
 * -> Corresponds to core script 1.5.1.
 * 
 * ----how to use----
 * Just by installing the plugin.
 * 
 * The scenes that fixed the bug are as follows.
 * -> Item Scene
 * -> Skill Scene
 * -> Equip Scene
 * -> Debug Scene
 * 
 * For details, see the following thread.
 * https://tm.lucky-duet.com/viewtopic.php?f=23&t=5284
 * 
 * ----plugin command----
 * There is no plugin command.
 * 
 * ----change log----
 * 1.0.0 2018/01/06 Release.
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
 * @plugindesc いくつかのシーンで発生する可能性のあるフリーズ現象を修正します。
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * 
 * @help いくつかのシーンで発生する可能性のあるフリーズ現象を修正します。
 * 
 * 【特徴】
 * ・いくつかのシーンで発生する可能性のあるフリーズ現象を修正します。
 * ・コアスクリプト1.5.1に対応しています。
 * 
 * 【使用方法】
 * プラグインを導入するだけで使用できます。
 * 
 * フリーズの対策したシーンは以下の通りです。
 * ・アイテムシーン
 * ・スキルシーン
 * ・装備シーン
 * ・デバッグシーン
 * 
 * 不具合の詳細は以下のスレッドをご覧ください。
 * https://tm.lucky-duet.com/viewtopic.php?f=23&t=5284
 * 
 * 
 * 【プラグインコマンド】
 * このプラグインにプラグインコマンドはありません。
 * 
 * 【更新履歴】
 * 1.0.0 2018/01/06 公開。
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
    var pluginName = 'BugFixFreezeOfSomeScenes';

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

////=============================================================================
//// Bug Fix.
////  Delete update function of some windows.
////=============================================================================
    Window_ItemCategory.prototype.setItemWindow = function(itemWindow) {
        this._itemWindow = itemWindow;
        //this.update(); //delete update.
        if (this._itemWindow) {
            this._itemWindow.setCategory(this.currentSymbol());
        }
    };

    Window_SkillType.prototype.setSkillWindow = function(skillWindow) {
        this._skillWindow = skillWindow;
        //this.update(); //delete update.
        if (this._skillWindow) {
            this._skillWindow.setStypeId(this.currentExt());
        }
    };

    Window_EquipSlot.prototype.setItemWindow = function(itemWindow) {
        this._itemWindow = itemWindow;
        //this.update(); //delete update.
        if (this._itemWindow) {
            this._itemWindow.setSlotId(this.index());
        }
    };

    Window_DebugRange.prototype.setEditWindow = function(editWindow) {
        this._editWindow = editWindow;
        //this.update(); //delete update.
        if (this._editWindow) {
            this._editWindow.setMode(this.mode());
            this._editWindow.setTopId(this.topId());
        }
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
            return 'BugFixFreezeOfSomeScenes';
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
