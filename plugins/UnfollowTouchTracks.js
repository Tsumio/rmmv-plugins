//=============================================================================
// UnfollowTouchTracks.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2017/12/14 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc This plugin hides tracks representing the destination.
 * @author Tsumio
 *
 * @param ----Basic Settings----
 * @desc 
 * @default 
 * 
 * @param SwitchId
 * @type switch
 * @desc Set a switch ID that controls whether or not to display the destination when touched.
 * @default 10
 * 
 * @help This plugin hides tracks representing the destination.
 * 
 * ----feature----
 * -> Hide the tracks representing the destination displayed when you touch the screen on the map.
 * -> Manageable with the switch.
 * 
 * ----how to use----
 * After introducing this plugin, please set the switch number from the plugin parameters.
 * If the switch is ON, the tracks representing the destination will not be displayed.
 * When the switch is OFF, the tracks will be displayed.
 * 
 * ----plugin command----
 * There is no plugin command.
 * 
 * ----change log---
 * 1.0.0 2017/12/14 Release.
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
 * @plugindesc タッチ後の目的地を表す軌跡を非表示にするプラグインです。
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * @param スイッチ番号
 * @type switch
 * @desc タッチした際に目的地を表示させるかどうかをコントロールするスイッチ番号です。
 * @default 10
 * 
 * @help タッチ後の目的地を表す軌跡を非表示にするプラグインです。
 * 
 * 【特徴】
 * ・マップ上で画面をタッチした際に表示される、目的地を表す軌跡を非表示にします。
 * ・スイッチで管理可能です。
 * 
 * 【使用方法】
 * プラグイン導入後、プラグインパラメーターからスイッチ番号を設定してください。
 * 設定したスイッチ番号をONにすると、目的地を表す軌跡が表示されなくなります。
 * OFFにすると再び軌跡は表示されるようになります。
 * 
 * 【プラグインコマンド】
 * プラグインコマンドはありません。
 * 
 * 【更新履歴】
 * 1.0.0 2017/12/14 公開。
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
    var pluginName = 'UnfollowTouchTracks';

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
    param.switchId         = getParamNumber(['SwitchId', 'スイッチ番号']);

////==============================
//// Convert parameters.
////==============================
    //None

////==============================
//// Convert to Number.
////==============================
    //None


////=============================================================================
//// Sprite_Destination
////  Modify visible.
////=============================================================================
    const _Sprite_Destination_update    = Sprite_Destination.prototype.update;
    Sprite_Destination.prototype.update = function() {
        if($gameSwitches.value(param.switchId)) {
            //Invisible this sprite and exit the function.
            this._frameCount = 0;
            this.visible = false;
            return;
        }

        _Sprite_Destination_update.call(this);
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
            return 'UnfollowTouchTracks';
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
