//=============================================================================
// EscapeRatioAnalyzer.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2017/12/30 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc Display the escape ratio during battle.
 * @author Tsumio
 *
 * @param ----Basic Settings----
 * @desc 
 * @default 
 * 
 * @param SwitchNumber
 * @type switch
 * @desc Set switch number whether to display the escape ratio.
 * @default 1
 * 
 * @help Display the escape ratio during battle.
 * 
 * ----feature----
 * -> Display the escape ratio during battle.
 * -> Display / non-display management with the switch.
 * -> If don't set to can escape, the escape ratio is not displayed.
 * 
 * ----how to use----
 * After introducing this plugin, please set the plugin parameters.
 * By referring to the specified switch, you can manage display / non-display of escape ratio.
 * 
 * ----plugin command----
 * There is no plugin command.
 * 
 * ----change log---
 * 1.0.0 2017/12/30 Release.
 * 
 * ----remarks----
 * I shall not be responsible for any loss, damages and troubles from using this plugin.
 * 
 * ----Terms of Use----
 * This plugin is free for both commercial and non-commercial use.
 * You may edit the source code to suit your needs,
 * so long as you don't claim the source code belongs to you.
 * 
 */
/*:ja
 * @plugindesc 戦闘中の逃走成功率を表示します。
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * @param スイッチ番号
 * @type switch
 * @desc 逃走成功率を表示するかどうかを設定するためのスイッチ番号を指定します。
 * @default 1
 * 
 * 
 * @help 戦闘中の逃走成功率を表示します。
 * 
 * 【特徴】
 * ・戦闘中の逃走成功率を表示します。
 * ・スイッチで表示・非表示の管理が可能です。
 * ・逃走可でないときは逃走成功率を表示しません。
 * 
 * 【使用方法】
 * プラグインの導入後、プラグインパラメーターを設定してください。
 * 指定のスイッチを参照することにより、逃走成功率の表示・非表示を管理できます。
 * 
 * 【プラグインコマンド】
 * プラグインコマンドはありません。
 * 
 * 
 * 【更新履歴】
 * 1.0.0 2017/12/30 公開。
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
    var pluginName = 'EscapeRatioAnalyzer';

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
    param.escapeRatioSwitchNum  = getParamNumber(['SwitchNumber', 'スイッチ番号']);

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
////  Add function for get escape ratio.
////=============================================================================
    BattleManager.getEscapeRatioPercentage = function() {
        return Math.floor(this._escapeRatio.clamp(0, 1) * 100);
    };

////=============================================================================
//// Scene_Battle
////  Display escape ratio window.
////=============================================================================
    const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _Scene_Battle_createAllWindows.call(this);
        this.createEscapeRatioWindow();
    };

    Scene_Battle.prototype.createEscapeRatioWindow = function() {
        const x      = 0;
        const y      = this._partyCommandWindow.y;
        this._escapeRatioWindow = new EscapeRatioWindow(x, y);
        this.addWindow(this._escapeRatioWindow);
    };

    const _Scene_Battle_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
    Scene_Battle.prototype.startPartyCommandSelection = function() {
        _Scene_Battle_startPartyCommandSelection.call(this);
        if(this.canDisplayEscapeRatio()){
            this._escapeRatioWindow.open();
        }
    };
    
    const _Scene_Battle_commandFight = Scene_Battle.prototype.commandFight;
    Scene_Battle.prototype.commandFight = function() {
        _Scene_Battle_commandFight.call(this);
        this._escapeRatioWindow.close();
    };

    Scene_Battle.prototype.canDisplayEscapeRatio = function() {
        return $gameSwitches.value(param.escapeRatioSwitchNum) && BattleManager.canEscape();
    };

////=============================================================================
//// EscapeRatioWindow
////  Show escape ratio.
////=============================================================================
    class EscapeRatioWindow extends Window_Base {
        constructor(x, y) {
            super(x, y);
        }

        initialize(x, y) {
            const width  = Graphics.boxWidth / 2;
            const height = this.fittingHeight(1);
            super.initialize(x, y - height, width, height);

            this.close();
        }

        get escapeRatio() {
            return BattleManager.getEscapeRatioPercentage();
        }

        refresh() {
            this.contents.clear();
            this.drawEscapeRatio();
        }

        open() {
            super.open();
            this.refresh();
        }

        drawEscapeRatio() {
            const text = $gameSystem.isJapanese() ? `逃走成功率${this.escapeRatio}%` : `Escape Ratio:${this.escapeRatio}%`;
            this.drawTextEx(text, 0, 0);
        }
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
            return 'EscapeRatioAnalyzer';
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