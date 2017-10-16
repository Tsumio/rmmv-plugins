//=============================================================================
// YieldReturnConversation.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 0.8.0 2017/10/16 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc Supports suspension and resumption of events.
 * @author Tsumio
 *
 * @param ----Basic Settings----
 * @desc 
 * @default 
 * 
 * @help Supports suspension and resumption of events.
 * 
 * ----feature----
 * -> Suspend the event and resume from where you suspend.
 * -> It is no longer necessary to use variables or conditional branches just to implement repeated conversations.
 * -> You are released from the troublesome management of the number of times spoken to.
 * 
 * 
 * ----how to use----
 * You can use this plugin after introducing.
 * 
 * By using the plugin command "yield return", the event is suspended on the spot.
 * Running the suspended event again resumes from where it suspended.
 * Events executed up to the end are executed from the beginning like normally events.
 * "yield return" can not be used for common events.
 * 
 * 
 * ----plugin command----
 * Plugin commands are distinguish uppercase and lowercase.
 * And separate each word with a space.
 * Please make sure.
 * 
 * "yield return" : Suspend the event.
 * 
 * 
 * ----change log---
 * 0.8.0 2017/10/16 Release.
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
 * @plugindesc イベントの中断と再開をサポートします。
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * 
 * 
 * @help イベントの中断と再開をサポートします。
 * 
 * 【特徴】
 * ・イベントを中断し、中断した箇所から再開できます。
 * ・繰り返される会話を実装するためだけに、変数や条件分岐を駆使する必要はもうありません。
 * ・話しかけられた回数を管理する煩わしさから解き放たれます。
 * 
 * 【使用方法】
 * プラグイン導入後、すぐに使えます。
 * 
 * プラグインコマンド「yield return」を用いることにより、イベントはその場で中断されます。
 * 中断したイベントをもう一度実行すると、中断された箇所から再開されます。
 * 最後まで実行されたイベントは、通常のイベントと同じく次回イベント実行時には頭から実行されます。
 * なお「yield return」はコモンイベントには使えません。
 * 
 * 【プラグインコマンド】
 * 全てのプラグインコマンドは大文字と小文字を区別します。
 * 各単語の間は半角スペースで区切ります（全角では認識しません）。
 * 間違わないように気をつけてください。
 * 
 * 「yield return」 : イベントを中断します。
 * 
 * 【更新履歴】
 * 0.8.0 2017/10/16 公開。
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

function Game_Conversation() {
    this.initialize.apply(this, arguments);
};

(function() {
    'use strict';
    var pluginName = 'YieldReturnConversation';
    
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

    var _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents      = function(contents) {
        _DataManager_extractSaveContents.apply(this, arguments);
        $gameSystem.onLoad();
    };

//////=============================================================================
///// Game_System
/////  Add a game system called Game_Conversation.
/////==============================================================================
    var _Game_System_initialize      = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this._conversation = new Game_Conversation();
    };

    Game_System.prototype.conversation = function() {
        return this._conversation;
    };

    var _Game_System_onLoad      = Game_System.prototype.onLoad;
    Game_System.prototype.onLoad = function() {
        if (_Game_System_onLoad) _Game_System_onLoad.apply(this, arguments);
        if (!this.conversation()) this._conversation = new Game_Conversation();
        this._conversation.onLoad();
    };


////=============================================================================
//// Get and set pluguin parameters.
////=============================================================================
    var param = {};

////=============================================================================
//// Settings for plugin command.
////=============================================================================
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'yield') {
            switch(args[0]){
                case 'return':
                    var page = $gameMap.event(this._eventId)._pageIndex;
                    $gameSystem.conversation().createConversation(this._mapId, this._eventId, this._index, page);
                    this.terminate();
                    break;
            }
        }
    };


////=============================================================================
//// Game_Interpreter
////  Add yield return function.
////=============================================================================
    var _Game_Interpreter_setup = Game_Interpreter.prototype.setup;
    Game_Interpreter.prototype.setup = function(list, eventId) {
        _Game_Interpreter_setup.call(this, list, eventId);
        //Get and set event index.
        var index = $gameSystem.conversation().getIndex(this._mapId, this._eventId);
        this._index = (index>0) ? index+1 : 0;
    };

    var _Game_Interpreter_executeCommand = Game_Interpreter.prototype.executeCommand;
    Game_Interpreter.prototype.executeCommand = function() {
        var command = this.currentCommand();
        if(command){
            if(command.code === 0){//When event is end, clear conversation data.
                $gameSystem.conversation().clearConversation(this._mapId, this._eventId);
            }
        }
        _Game_Interpreter_executeCommand.call(this);
    };

////=============================================================================
//// Game_Interpreter
////  Add yield return function.
////=============================================================================
    var _Game_Event_refresh = Game_Event.prototype.refresh;
    Game_Event.prototype.refresh = function() {
        var newPageIndex = this._erased ? -1 : this.findProperPageIndex();

        var isSamePage     = this._pageIndex === newPageIndex;
        var isPageMinusTwo = this._pageIndex === -2;
        var eventPage      = $gameSystem.conversation().getPage(this._mapId, this._eventId);
        if (!isSamePage && !isPageMinusTwo) {
            //Clear the conversation data when the page of the event changes.
            $gameSystem.conversation().clearConversation(this._mapId, this._eventId);
        }else if(eventPage !== null && eventPage !== newPageIndex) {
            $gameSystem.conversation().clearConversation(this._mapId, this._eventId);
        }

        _Game_Event_refresh.call(this);
    };

////=============================================================================
//// ConversationStore
////  Store conversation.For "yield return" command.
////=============================================================================
    Game_Conversation.prototype             = Object.create(Game_Conversation.prototype);
    Game_Conversation.prototype.constructor = Game_Conversation;

    Game_Conversation.prototype.initialize = function() {
        this.converData = [];
    };

    Game_Conversation.prototype.onLoad = function() {
        //When system is loaded, execute any function if necessary.
    };

    Game_Conversation.prototype.getIndex = function(mapId, eventId) {
        if(this.hasConversation(mapId, eventId)){
            return this.converData[mapId][eventId].index;
        }else{
            return 0;
        }
    };

    Game_Conversation.prototype.getPage = function(mapId, eventId) {
        if(this.hasConversation(mapId, eventId)){
            return this.converData[mapId][eventId].page;
        }else{
            return null;
        }
    };

    /**
     * Create conversation data.
     * 
     * @param {number} mapId
     * @param {number} eventId
     * @param {number} eveIndex
     * @param {number} evePage
     *
     */
    Game_Conversation.prototype.createConversation = function(mapId, eventId, eveIndex, evePage) {
        if(this.hasConversation(mapId, eventId)){
            this.converData[mapId][eventId].index = eveIndex;
            this.converData[mapId][eventId].page  = evePage;
        }else{
            if(!Array.isArray(this.converData[mapId])){
                this.converData[mapId] = [];
            }
            this.converData[mapId][eventId] = {'index':eveIndex, 'page':evePage};
        }
    };

    Game_Conversation.prototype.clearConversation = function(mapId, eventId) {
        if(this.hasConversation(mapId, eventId)){
            this.converData[mapId][eventId].index = 0;
        }
    };

    Game_Conversation.prototype.hasConversation = function(mapId, eventId) {
        if(this.converData[mapId]){
            if(this.converData[mapId][eventId]){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
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
            return 'YieldReturnConversation';
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
