//=============================================================================
// ChangeBattleWindowRows.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.1 2017/09/12 高さのみの同期機能を追加。
// 1.0.0 2017/09/12 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc This plugin change the rows of the battle scene.
 * @author Tsumio
 *
 * @param ----Background Settings----
 * @desc 
 * @default 
 * 
 * @param WindowRows
 * @type number
 * @max 10
 * @desc This is a setting sets rows of the battle window.
 * @default 5
 * 
 * @param SynchronizeRows
 * @type boolean
 * @desc Synchronize the number of rows of the window at battle.
 * @default false
 * 
 * @param SynchronizeHeight
 * @type boolean
 * @desc Synchronize the height of the window at battle.(not synchronize rows)
 * @default false
 * 
 * @help This plugin change the rows of the battle scene.
 * 
 * ----feature----
 * -> Change the rows in the left window during battle.
 * -> If you want, you can synchronize the rows in the left window with the rows in the right window.
 * 
 * ----how to use----
 * You can use this plugin after setting some plugin parameters.
 * The Rows of the window changes only on the left side, but when window synchronization is on, the rows in the right side window is also changed.
 * 
* If you don't want to synchronize the rows and you want to synchronize the height of the window, turn on "SynchronizeHeightt".
 * At this time, if "SynchronizeRows" is ON, synchronization of the rows takes precedence.
 * When you want to synchronize only the height, make sure to turn off "SynchronizeRows".
 * 
 * ----plugin command----
 * There is no plugin command.
 * 
 * ----change log---
 * 1.0.1 2017/09/12 Added height only synchronization.
 * 1.0.0 2017/09/12 Release.
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
 * @plugindesc 戦闘時におけるウィンドウの行数を変更します。
 * @author ツミオ
 *
 * @param ----基本設定----
 * @desc 
 * @default 
 * 
 * @param ウィンドウの行数
 * @type number
 * @max 10
 * @desc 戦闘時におけるウィンドウの行数を設定します。
 * @default 5
 * 
 * @param 行数を同期させる
 * @type boolean
 * @desc 戦闘時におけるウィンドウの行数を同期させます。
 * @default false
 * 
 * @param 高さだけ同期させる
 * @type boolean
 * @desc 戦闘時におけるウィンドウの高さのみを同期させます（行数は同期させない）。
 * @default false
 * 
 * @help 戦闘時におけるウィンドウの行数を変更します。
 * 
 * 【特徴】
 * ・戦闘時における、左側ウィンドウの行数を変更します。
 * ・必要があれば、左側ウィンドウの行数と右側ウィンドウの行数を同期させることもできます。
 * 
 * 【使用方法】
 * プラグインの導入後、プラグインパラメーターを設定することによって使用できます。
 * 
 * ウィンドウの行数は左側のみを変更させますが、ウィンドウの同期をONにした場合、右側のウィンドウの行数も変更します。
 * 
 * 行数を同期させたくない場合でかつ、ウィンドウの高さは合わせたい場合は「高さだけ同期させる」をONにしてください。
 * このとき、「行数を同期させる」がONになっていた場合は、行数の同期が優先されます。
 * 高さだけを同期させたい場合は、かならず「行数を同期させる」をOFFにしてください。
 * 
 * 【プラグインコマンド】
 * このプラグインにプラグインコマンドはありません。
 *
 *
 * 【更新履歴】
 * 1.0.1 2017/09/12 高さのみの同期機能を追加。
 * 1.0.0 2017/09/12 公開。
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
    var pluginName = 'ChangeBattleWindowRows';

////=============================================================================
//// NTMO
////  Declare NTMO namespace.
////=============================================================================
    var NTMO = NTMO || {};
    NTMO.CBWR = function(){
    };

    NTMO.CBWR.isBattleScene = function() {
        if(SceneManager._scene.constructor === Scene_Battle){
            return true;
        }

        return false;
    };

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

////=============================================================================
//// Get and set pluguin parameters.
////=============================================================================
    var param                          = {};
    //Basic parameter.
    param.rowsWindow      = getParamNumber(['WindowRows',             'ウィンドウの行数']);
    param.isSync          = getParamString(['SynchronizeRows',        '行数を同期させる']);
    param.isHeightSync    = getParamString(['SynchronizeHeight',      '高さだけ同期させる']);

////==============================
//// Convert parameters.
////==============================
    param.isSync          = convertParam(param.isSync);
    param.isHeightSync    = convertParam(param.isHeightSync);

//////=============================================================================
///// Left commands.
/////  Change visible rows.
/////==============================================================================
    Window_PartyCommand.prototype.numVisibleRows = function() {
        return param.rowsWindow;
    };

    Window_ActorCommand.prototype.numVisibleRows = function() {
        return param.rowsWindow;
    };

//////=============================================================================
///// Right or else commands.
/////  Change visible rows.
/////==============================================================================
    var _Window_BattleStatus_numVisibleRows = Window_BattleStatus.prototype.numVisibleRows;
    Window_BattleStatus.prototype.numVisibleRows = function() {
        if(param.isSync){
            return param.rowsWindow;
        }else{
            return _Window_BattleStatus_numVisibleRows.call(this);
        }
    };

    var _Window_BattleStatus_maxPageRows = Window_BattleStatus.prototype.maxPageRows;
    Window_BattleStatus.prototype.maxPageRows = function() {
        if(param.isSync){
            return _Window_BattleStatus_maxPageRows.call(this);
        }else if(param.isHeightSync){
            return this.numVisibleRows();
        }

        return _Window_BattleStatus_maxPageRows.call(this);
    };


    var _Window_BattleActor_numVisibleRows = Window_BattleActor.prototype.numVisibleRows;
    Window_BattleActor.prototype.numVisibleRows = function() {
        if(param.isSync){
            return param.rowsWindow;
        }else{
            return _Window_BattleActor_numVisibleRows.call(this);
        }
    };

    var _Window_BattleActor_maxPageRows = Window_BattleActor.prototype.maxPageRows;
    Window_BattleActor.prototype.maxPageRows = function() {
        if(param.isSync){
            return _Window_BattleActor_maxPageRows.call(this);
        }else if(param.isHeightSync){
            return this.numVisibleRows();
        }

        return _Window_BattleActor_maxPageRows.call(this);
    };

    var _Window_BattleEnemy_numVisibleRows = Window_BattleEnemy.prototype.numVisibleRows;
    Window_BattleEnemy.prototype.numVisibleRows = function() {
        if(param.isSync){
            return param.rowsWindow;
        }else{
            return _Window_BattleEnemy_numVisibleRows.call(this);
        }
    };

    var _Window_BattleEnemy_maxPageRows = Window_BattleEnemy.prototype.maxPageRows;
    Window_BattleEnemy.prototype.maxPageRows = function() {
        if(param.isSync){
            return _Window_BattleEnemy_maxPageRows.call(this);
        }else if(param.isHeightSync){
            return this.numVisibleRows();
        }

        return _Window_BattleEnemy_maxPageRows.call(this);
    };

//////=============================================================================
///// Scene_Battle
/////  Change only the height, the rows is not changed.
/////==============================================================================
    var _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _Scene_Battle_createAllWindows.call(this);

        if(param.isSync){
            ;//When rows sync is on, remaining sequence is skipped.
        }else if(param.isHeightSync){
            this.syncWindowHeight();
        }
    };

    Scene_Battle.prototype.syncWindowHeight = function() {
        var base_height = this._partyCommandWindow.windowHeight();
        var base_y      = this._partyCommandWindow.y;

        //Set position y.
        this._statusWindow.y  = base_y;
        this._actorWindow.y   = base_y;
        this._enemyWindow.y   = base_y;
        //Change height.
        this._statusWindow.height  = base_height;
        this._actorWindow.height   = base_height;
        this._enemyWindow.height   = base_height;
    };

})();