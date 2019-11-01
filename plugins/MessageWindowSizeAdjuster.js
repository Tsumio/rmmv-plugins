//=============================================================================
// MessageWindowSizeAdjuster.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2019 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2019/11/01 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc Changes the size of the message window
 * @author Tsumio
 *
 * @param ----Basic Settings----
 * @desc 
 * @default 
 * 
 * @param SwitchId
 * @desc Switch number to enable window resizing.
 * @type number
 * @default 1
 * 
 * @param SizeVariableId
 * @desc Variable number that specifies the size of the window.
 * @type number
 * @default 1
 * 
 * @help Changes the size of the message window
 * 
 * ----feature----
 * -> Change the size of the message window.
 * -> Control the size using switches and variables.
 * 
 * ----how to use----
 * After installing the plugin, sets each plugin parameter.
 * You can adjust the size of the message window by turning on the specified switch and
 * adjusting the value of the specified variable.
 * 
 * ----change log---
 * 1.0.0 2019/11/01 Release.
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
 * @plugindesc メッセージウィンドウのサイズを変更するプラグイン
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * @param スイッチ番号
 * @desc ウィンドウのサイズ変更を有効にするスイッチ番号
 * @type number
 * @default 1
 * 
 * @param サイズ指定用変数番号
 * @desc ウィンドウのサイズを指定する変数番号
 * @type number
 * @default 1
 * 
 * @help メッセージウィンドウのサイズを変更するプラグイン
 * 
 * 【特徴】
 * ・メッセージウィンドウのサイズを変更できます
 * ・スイッチや変数を用いてサイズをコントロールできます
 * 
 * 【使用方法】
 * プラグインの導入後、プラグインパラメーターを設定してください。
 * 指定したスイッチをONにし、指定した変数の値を調整することで
 * メッセージウィンドウのサイズを調整できます。
 * 
 * 【更新履歴】
 * 1.0.0 2019/11/01 公開。
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
    var pluginName = 'MessageWindowSizeAdjuster';


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
    var param                          = {};
    //スイッチ番号
    param.switchId = getParamNumber(['SwitchId', 'スイッチ番号']);
    //サイズ指定用変数番号
    param.sizeVariableId = getParamNumber(['SizeVariableId', 'サイズ指定用変数番号']);

//////=============================================================================
///// Window_Message
/////  特定のスイッチがONのとき、サイズを変更する
//////=============================================================================

    //位置のupdateでサイズも調整する
    const _Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
    Window_Message.prototype.updatePlacement = function() {
        _Window_Message_updatePlacement.call(this);
        if(this.shouldAdjustWindow()) {
            this.width = this.adjustedWindowWidth();
            console.log(this.adjustedWindowWidth());
        }else {
            this.width = this.windowWidth();
        }
    };

    //ウィンドウを調整するべきかどうか
    Window_Message.prototype.shouldAdjustWindow = function() {
        return $gameSwitches.value(param.switchId);
    };

    //変更後の幅
    Window_Message.prototype.adjustedWindowWidth = function() {
        return $gameVariables.value(param.sizeVariableId);
    };


})();
