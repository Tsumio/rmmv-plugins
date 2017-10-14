//=============================================================================
// SkipSatoshi.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2017/10/14 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc Not display specific actors in the battle, nor in the menu scene.
 * @author Tsumio
 *
 * @param ----Basic Settings----
 * @desc 
 * @default 
 * 
 * @param AlternativeActor
 * @type variable
 * @desc This is a setting sets a variable to save the alternate actor's number.
 * @default 50
 * 
 * @param MaxFollowers
 * @type number
 * @desc This is a setting sets a max number of followers.
 * @default 3
 * 
 * 
 * 
 * @help Not display specific actors in the battle, nor in the menu scene.
 * 
 * ----feature----
 * -> Not display specific actors in the battle, nor in the menu scene.
 * -> In other words, convert a player into Satoshi.
 * 
 * ----how to use----
 * You can use this plugin after setting some plugin parameters.
 * 
 * By using the plugin command "setSatoshi TargetActorNumber", the character operated by the player is changed (it is recommended to be execute at the start of the game).
 * Here, the character operated by the player is called "Satoshi".
 * 
 * Satoshi does not participate in battle.
 * Also it is not displayed on the status scene.
 * Satoshi only operates by the player.
 * But if you use the plugin command "setSatoshi TargetActorNumber", add the target actor to PT.
 * In other words, Satoshi can also participate in battle.
 * However, at this time, Satoshi will be displayed on the follower as well.
 * 
 * If you don't want to use Satoshi temporarily, execute "refreshSatoshi" from the plugin command.
 * If you previously saved the alternate actor's number in a variable, that actor becomes a player.
 * If nothing is saved in the variable, the player becomes transparent.
 * 
 * When making a follower (when walking a party in a row), I make this plugin on the premise that not cancel Satoshi.
 * If you want to cancel Satoshi in the middle of a game, please give up party walking or consider another plugin.
 * 
 * ----plugin command----
 * Plugin commands are distinguish uppercase and lowercase.
 * And separate each word with a space.
 * Please make sure.
 * 
 * "setSatoshi TargetActorNumber"" : Convert the target actor into Satoshi.
 * "refreshSatoshi" : Cancel the Satoshi and display the alternate actor as a player.
 * 
 * 
 * ----change log---
 * 1.0.0 2017/10/14 Release.
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
 * @plugindesc 特定のキャラクターを戦闘に参加させず、メニュー画面にも表示させません。
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * @param 代替アクター
 * @type variable
 * @desc 代替アクターの番号を保存する変数を設定します。
 * @default 50
 * 
 * @param フォロワーの最大数
 * @type number
 * @desc フォロワーの最大数を設定します。
 * @default 3
 * 
 * 
 * @help 特定のキャラクターを戦闘に参加させず、メニュー画面にも表示させません。
 * 
 * 【特徴】
 * ・特定のキャラクターを戦闘に参加させず、メニュー画面にも表示させません。
 * ・つまりプレイヤーをサトシ化します。
 * 
 * 【使用方法】
 * プラグインの導入後、プラグインパラメーターを設定することによって使用できます。
 * 
 * プラグインコマンド「setSatoshi 対象アクター番号」を用いることにより、プレイヤーの操作するキャラクターが変更されます（ゲーム開始時に実行することを推奨）。
 * ここではプレイヤーが操作するキャラクターのことを「サトシ」と呼びます。
 * 
 * サトシは戦闘に参加しません。
 * また、ステータス画面にも表示されません。
 * サトシはプレイヤーが操作するだけですが、プラグインコマンド「setSatoshi 対象アクター番号」で指定した対象アクターをPTに加えた場合、サトシも戦闘に参加することができます。
 * ただしこのとき、フォロワーにもサトシが表示されてしまいます。
 * 
 * 一時的にサトシ化を解除したい場合、プラグインコマンドから「refreshSatoshi」を実行してください。
 * あらかじめ代替アクターの番号を変数に保存しておいた場合、そのアクターがプレイヤーになります。
 * 変数に何も保存されていなかった場合、プレイヤーは透明になります。
 * 
 * フォロワーを表示する場合（パーティの隊列歩行をする場合）、サトシ化の解除をしないことを前提に作っています。
 * ゲームの途中でサトシ化を解除をしたい場合、パーティの隊列歩行を諦めるか、別のプラグインを検討してください。
 * 
 * 【プラグインコマンド】
 * 全てのプラグインコマンドは大文字と小文字を区別します。
 * 各単語の間は半角スペースで区切ります（全角では認識しません）。
 * 間違わないように気をつけてください。
 * 
 * 「setSatoshi 対象アクター番号」 : 対象アクターをサトシ化します。
 * 「refreshSatoshi」：サトシ化を解除し、プレイヤーとして代替アクターを表示します。
 * 
 * 【更新履歴】
 * 1.0.0 2017/10/14 公開。
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
    var pluginName = 'SkipSatoshi';
    
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


////=============================================================================
//// Get and set pluguin parameters.
////=============================================================================
    var param = {};
    //Basic Stteings
    param.maxFollowers = getParamString(['MaxFollowers', 'フォロワーの最大数']);
    param.altActor     = getParamNumber(['AlternativeActor', '代替アクター']);

//-----------------------------------------------------------------------------
// Settings for plugin command.
//-----------------------------------------------------------------------------
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'setSatoshi') {
            $gameSystem.setSatoshi(args[0]);
            $gamePlayer.refresh();
            $gameMap.requestRefresh();
        }else if(command === 'refreshSatoshi') {
            $gameSystem.setSatoshi(0);
            $gamePlayer.refresh();
            $gameMap.requestRefresh();
        }
    };

////=============================================================================
//// Game_System
////  Override for Satoshi !
////=============================================================================
    var _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this._satoshi = null;
    };

    Game_System.prototype.getSatoshi = function() {
        return this._satoshi;
    };

    Game_System.prototype.setSatoshi = function(num) {
        if(num > 0){
            this._satoshi = Number(num);
        }else{
            this._satoshi = null;
        }
    };

////=============================================================================
//// Game_Party
////  Override for Satoshi !
////=============================================================================

    Game_Party.prototype.leader = function() {
        var satoshi  = this.tryToGetSatoshi();
        var altActor = $gameActors.actor($gameVariables.value(param.altActor));
        return (satoshi) ? satoshi : altActor;
    };

    Game_Party.prototype.tryToGetSatoshi = function() {
        var id    = $gameSystem.getSatoshi();
        var actor = $gameActors.actor(id);
        return actor;
    };

    var _Game_Followers_initialize = Game_Followers.prototype.initialize;
    Game_Followers.prototype.initialize = function() {
        _Game_Followers_initialize.call(this);
        //Re initialize.
        this._data = [];
        for (var i = 0; i < param.maxFollowers; i++) {
            this._data.push(new Game_Follower(i));
        }
    };

    Game_Follower.prototype.actor = function() {
        return $gameParty.members()[this._memberIndex];
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
            return 'SkipSatoshi';
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
