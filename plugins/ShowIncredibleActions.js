//=============================================================================
// ShowIncredibleActions.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.7 2017/07/28 行動回数1回のとき、ウィンドウの表示非表示を設定できるように変更。
// 1.0.6 2017/07/27 ウィンドウの幅とオフセットを設定できるように変更。
// 1.0.5 2017/07/26 キャンセル時の挙動を調整。
// 1.0.4 2017/07/26 フロントビューに対応。
// 1.0.3 2017/07/25 行動時に表示をなくすように変更。
// 1.0.2 2017/07/24 PT人数によってはエラーが出る不具合を修正。
// 1.0.1 2017/07/24 プラグインパラメーターを追加。表示方式を選べるように変更。
// 1.0.0 2017/07/23 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc This is a plugin that displays the number of actions when battle scene.
 * @author Tsumio
 *
 * @param ----SideViewSettings----
 * @desc 
 * @default 
 * 
 * @param DisplayType
 * @type string
 * @desc This is a setting sets displaying type.You can set 'Number' or 'Exclamation'
 * @default Number
 * 
 * @param StringColor
 * @type string
 * @desc This is a setting sets the number(or exclamation) color.You can use two type.The thing is 'string' type and 'CSS format' type.
 * @default #FFF
 * 
 * @param OffSetX
 * @type number
 * @min -1000
 * @max 1000
 * @desc This is a setting sets the offset of X position.
 * @default 60
 * 
 * @param OffSetY
 * @type number
 * @min -1000
 * @max 1000
 * @desc This is a setting sets the offset of Y position.
 * @default -20
 * 
 * @param ----FrontViewSettings----
 * @desc 
 * @default 
 * 
 * @param AdvanceString
 * @type string
 * @desc Specify a character string that announces the number of actions.
 * @default Number of actions :
 * 
 * @param ShowName
 * @type boolean
 * @desc Whether to display the name before the 'AdvanceString'.
 * @default true
 * 
 * @param HideWindow
 * @type boolean
 * @desc Whether to hide the window when the number of actions is 1.
 * @default false
 *
 * @param WindowWidth
 * @type number
 * @max 2000
 * @desc This is a setting sets the width of the window for displaying the number of actions.
 * @default 400
 *  
 * @param OffSetX_FV
 * @type number
 * @min -1000
 * @max 1000
 * @desc This is a setting sets the offset of Window X position.
 * @default 0
 * 
 * @param OffSetY_FV
 * @type number
 * @min -1000
 * @max 1000
 * @desc This is a setting sets the offset of Window Y position.
 * @default 0
 * 
 * @help 
 * If there is a character that can act more than once when battle scene, the number of times that the action can be taken is displayed.
 * 
 * ----how to use----
 * You can use this plugin just by adding.
 * 
 * If you use side view ,you can choose the display type from "Number" or "Exclamation".
 * If you use front view , only "Number" can be used.
 * 
 * The reference coordinates of the window in front view are the coordinates of the command window.
 * 
 * ----plugin command----
 * There is no plugin command.
 *
 * --Terms of Use--
 * This plugin is free for both commercial and non-commercial use.
 * You don't have to make sure to credit.
 * Furthermore, you may edit the source code to suit your needs,
 * so long as you don't claim the source code belongs to you.
 * 
 */
/*:ja
 * @plugindesc 戦闘時に行動可能回数を表示するプラグインです。
 * @author ツミオ
 *
 * 
 * @param ----サイドビューの設定----
 * @desc 
 * @default 
 * 
 * @param 表示方式
 * @type string
 * @desc 表示方式を設定します。（「数字」か「エクスクラメーション」を設定できます）
 * @default 数字
 * 
 * @param 文字色
 * @type string
 * @desc 文字色の色を設定します。直接文字を指定することもできますが、CSS形式でより細かい指定もできます。
 * @default #FFF
 * 
 * @param X座標のオフセット
 * @type number
 * @min -1000
 * @max 1000
 * @desc X座標のオフセットを設定します。
 * @default 60
 * 
 * @param Y座標のオフセット
 * @type number
 * @min -1000
 * @max 1000
 * @desc Y座標のオフセットを設定します。
 * @default -20
 * 
 * @param ----フロントビューの設定----
 * @desc 
 * @default
 * 
 * @param アナウンス文字
 * @type string
 * @desc 行動回数をアナウンスする文字列を指定します。
 * @default の行動回数：
 * 
 * @param 名前の表示
 * @type boolean
 * @desc アナウンス文字の前に名前を表示するかどうか。
 * @default true
 * 
 * @param ウィンドウの非表示
 * @type boolean
 * @desc 行動回数1回のとき、ウィンドウを非表示にするかどうか。
 * @default false
 * 
 * @param ウィンドウの幅
 * @type number
 * @max 2000
 * @desc 行動回数を表示するウィンドウの幅を設定します。
 * @default 400
 * 
 * @param X座標のオフセットFV
 * @type number
 * @min -1000
 * @max 1000
 * @desc ウィンドウのX座標のオフセットを設定します。
 * @default 0
 * 
 * @param Y座標のオフセットFV
 * @type number
 * @min -1000
 * @max 1000
 * @desc ウィンドウのY座標のオフセットを設定します。
 * @default 0
 * 
 * @help 戦闘時、複数回行動可能なキャラクターがいた場合、その行動可能回数を表示します。
 * 
 * 【使用方法】
 * プラグインを導入するだけで使用できます。
 * 
 * サイドビューの場合、表示方式は「数字」か「エクスクラメーション」の2種類から選ぶことができます。
 * フロントビューは数字のみに対応しています。
 * 
 * フロントビュー時のウィンドウの基準座標は、コマンドウィンドウの座標になっています。
 * 
 * 【プラグインコマンド】
 * このプラグインにプラグインコマンドはありません。
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
    var pluginName = 'ShowIncredibleActions';

    //Declare NTMO namespace.
    var NTMO = NTMO || {};

    //=============================================================================
    // Local function
    //  These functions checks & formats pluguin's command parameters.
    //  I borrowed these functions from Triacontane.Thanks!
    //=============================================================================
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

    //=============================================================================
    // Get and set pluguin parameters.
    //=============================================================================
    var param             = {};
    //Side view
    param.offsetX         = getParamNumber(['OffSetX',            'X座標のオフセット']);
    param.offsetY         = getParamNumber(['OffSetY',            'Y座標のオフセット']);
    param.displayType     = getParamString(['DisplayType',        '表示方式']);
    param.textColor       = getParamString(['StringColor',        '文字色']);
    //Front view
    param.advanceString   = getParamString(['AdvanceString',        'アナウンス文字']);
    param.isShowName      = getParamString(['ShowName',             '名前の表示']);
    param.offsetX_FV      = getParamNumber(['OffSetX_FV',           'X座標のオフセットFV']);
    param.offsetY_FV      = getParamNumber(['OffSetY_FV',           'Y座標のオフセットFV']);
    param.windowWidth     = getParamNumber(['WindowWidth',          'ウィンドウの幅']);
    param.hideWindow      = getParamString(['HideWindow',           'ウィンドウの非表示']);
    //Convert
    param.isShowName      = JSON.parse(param.isShowName);
    param.hideWindow      = JSON.parse(param.hideWindow);
    
    //=============================================================================
    // Scene_Battle
    //  Override Scene_Battle for displayng number of actions.
    //=============================================================================
    var _Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
    Scene_Battle.prototype.createDisplayObjects = function() {
        _Scene_Battle_createDisplayObjects.call(this);

        this.createNumberOfActions();
    };

    var _Scene_Battle_refreshStatus      = Scene_Battle.prototype.refreshStatus;
    Scene_Battle.prototype.refreshStatus = function() {
        _Scene_Battle_refreshStatus.call(this);
        this.refreshShowingIncredibleActions();
    };

    var _Scene_Battle_createAllWindows      = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _Scene_Battle_createAllWindows.call(this);
        this.createNumActionsWindow();
    };

    Scene_Battle.prototype.createNumActionsWindow = function() {
        if(!$gameSystem.isSideView()){
            var height  = 70;
            var y       = this._partyCommandWindow.y - height;
            this._window_numActions = new Window_NumActions(0 + param.offsetX_FV, y + param.offsetY_FV,
                    param.windowWidth,height);
            this.addWindow(this._window_numActions);
        }
    };

    var _Scene_Battle_endCommandSelection      = Scene_Battle.prototype.endCommandSelection;
    Scene_Battle.prototype.endCommandSelection = function() {
        _Scene_Battle_endCommandSelection.call(this);
        this.sprite_numberOfActions.bitmap.clear();
        if(!$gameSystem.isSideView()){
            this._window_numActions.hide();
        }
    };

    Scene_Battle.prototype.refreshShowingIncredibleActions = function() {
        switch(param.displayType){
            case '数字'   :
            case 'Number' :
                this.refreshNumberOfActions();
                break;
            case 'エクスクラメーション':
            case 'Exclamation'       :
                this.refreshExclamationOfActions();
                break;
            default :
                this.refreshNumberOfActions();
                break;
        }
    };

    Scene_Battle.prototype.refreshExclamationOfActions = function() {
        this.sprite_numberOfActions.bitmap.clear();
        if($gameSystem.isSideView()){
            var p_len   = this._spriteset._actorSprites.length;
            var p_obj   = this._spriteset._actorSprites;
            var offset  = -40;
            for(var i = 0; i < p_len; i++){
                if(p_obj[i]._actor === undefined){//This code is necessary to avoid an error.
                    continue;
                }
                if(p_obj[i]._actor.numActions() >= 2){
                    this.sprite_numberOfActions.bitmap.drawText('!',
                    p_obj[i].x + offset + param.offsetX,
                    p_obj[i].y + offset + param.offsetY,
                    this.sprite_numberOfActions.width, 32, "left");
                }
            }
        }
    };

    Scene_Battle.prototype.refreshNumberOfActions = function() {
        this.sprite_numberOfActions.bitmap.clear();
        if($gameSystem.isSideView()){
            var p_len   = this._spriteset._actorSprites.length;
            var p_obj   = this._spriteset._actorSprites;
            var offset  = -40;
            for(var i = 0; i < p_len; i++){
                if(p_obj[i]._actor === undefined){//This code is necessary to avoid an error.
                    continue;
                }
                if(p_obj[i]._actor.numActions() >= 2){
                    this.sprite_numberOfActions.bitmap.drawText(p_obj[i]._actor.numActions(),
                    p_obj[i].x + offset + param.offsetX,
                    p_obj[i].y + offset + param.offsetY,
                    this.sprite_numberOfActions.width, 32, "left");
                }
            }
        }
    };

    Scene_Battle.prototype.createNumberOfActions = function() {
        this.sprite_numberOfActions                  = new Sprite();
        this.sprite_numberOfActions.bitmap           = new Bitmap(Graphics.width, Graphics.height);
        this.sprite_numberOfActions.bitmap.textColor = param.textColor;
        this.addChild(this.sprite_numberOfActions);
    };

    var _Scene_Battle_startActorCommandSelection      = Scene_Battle.prototype.startActorCommandSelection;
    Scene_Battle.prototype.startActorCommandSelection = function() {
        _Scene_Battle_startActorCommandSelection.call(this);
        if(!$gameSystem.isSideView()){
            this._window_numActions.show();
            this._window_numActions.drawNumAction(BattleManager.actor()._name,
                BattleManager.actor().numActions());
        }
    };

    var _Scene_Battle_startPartyCommandSelection      = Scene_Battle.prototype.startPartyCommandSelection;
    Scene_Battle.prototype.startPartyCommandSelection = function() {
        _Scene_Battle_startPartyCommandSelection.call(this);
        if(!$gameSystem.isSideView()){
            this._window_numActions.hide();
        }
    };

    //=============================================================================
    // Window_NumActions
    //  Original Window class for Scene_Battle.
    //=============================================================================
    function Window_NumActions() {
        this.initialize.apply(this, arguments);
    }

    Window_NumActions.prototype = Object.create(Window_Base.prototype);
    Window_NumActions.prototype.constructor = Window_NumActions;

    Window_NumActions.prototype.initialize = function(x, y, width, height) {
        Window_Base.prototype.initialize.apply(this,arguments);
        this.hide();
        this.drawNumAction();
    };

    Window_NumActions.prototype.drawNumAction = function(name,numActions) {
        if(name === undefined){
            this.contents.clear();
            return;
        }
        if(numActions === undefined){
            this.contents.clear();
            return;
        }
        if(param.hideWindow && numActions <= 1){
            this.contents.clear();
            this.hide();
            return;
        }
        if(!param.isShowName){
            name = '';
        }

        this.show();
        this.contents.clear();
        this.drawTextEx(name + param.advanceString + numActions,0,0);
    };

})();