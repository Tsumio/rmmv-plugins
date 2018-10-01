//=============================================================================
// BattleCommandAdjuster.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2018 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2018/10/02 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc Move the position of the battle command next to the actor.
 * @author Tsumio
 *
 * @param ----Basic Settings----
 * @desc 
 * @default 
 * 
 * @param Correction
 * @type struct<Point>
 * @desc The value to be shifted from the reference value.
 * @default {"x":"-70","y":"0"}
 * 
 * @help Move the position of the battle command next to the actor.
 * Position the battle command next to the actor.
 * 
 * ----feature----
 * -> Change the position of the battle command next to the actor
 * -> Position can be adjusted from plugin parameters
 * 
 * ----how to use----
 * This can be used only by introducing the plugin.
 * Furthermore, you can adjust the position of the battle command by setting the plugin parameter.
 * 
 * 
 * 
 * ----change log---
 * 1.0.0 2018/10/02 Release.
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
 * @plugindesc バトルコマンドの位置をアクターの隣にするプラグイン
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * @param 位置の補正
 * @type struct<Point>
 * @desc 基準値からずらしたい値。
 * @default {"x":"-70","y":"0"}
 * 
 * @help バトルコマンドの位置をアクターの隣にするプラグイン
 * 
 * バトルコマンドの位置をアクターの隣にします。
 * 
 * 【特徴】
 * ・バトルコマンドの位置をアクターの隣に変更します
 * ・プラグインパラメーターから位置を調節可能です
 * 
 * 【使用方法】 
 * プラグインを導入するだけで使用することができます。
 * また、プラグインパラメーターを設定することでバトルコマンドの位置を調節することができます。
 * 
 * 
 * 【更新履歴】
 * 1.0.0 2018/10/02 公開。
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
/*~struct~Point:
 * 
 * @param x
 * @type number
 * @max 10000
 * @min -10000
 * @desc X座標(X coordinate).
 * @default -70
 * 
 * @param y
 * @type number
 * @max 10000
 * @min -10000
 * @desc Y座標(Y coordinate).
 * @default 0
 * 
 */

(function() {
    'use strict';
    var pluginName = 'BattleCommandAdjuster';

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

    //This function is not written by Triacontane.Tsumio wrote this function !
    var convertArrayParam = function(param) {
        if(param !== undefined){
            try {
                const array = JSON.parse(param);
                for(let i = 0; i < array.length; i++) {
                    array[i] = JSON.parse(array[i]);
                }
                return array;
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
    var param = {};
    //Basic Stteings
    param.posCorrection = getParamString(['Correction', '位置の補正']);
////==============================
//// Convert parameters.
////==============================
    param.posCorrection = convertToNumber(convertArrayParam(param.posCorrection));

//////=============================================================================
///// Window_ActorCommand
/////  バトルコマンドの位置をバトラーの位置と同期する(SideViewOnly)
/////==============================================================================
    const _Window_ActorCommand_setup = Window_ActorCommand.prototype.setup;
    Window_ActorCommand.prototype.setup = function(actor) {
        _Window_ActorCommand_setup.apply(this, arguments);

        if(!$gameSystem.isSideView()) {
            return;
        }
        //バトラーの位置からウィンドウサイズを引いておく
        const baseX = actor.homeX - this.width;
        const baseY = actor.homeY - this.height;
        this.position.set(baseX + param.posCorrection.x, baseY + param.posCorrection.y);
    };

//////=============================================================================
///// Sprite_Actor
/////  homeの位置をModelと同期させる
/////==============================================================================
    const _Sprite_Actor_setHome = Sprite_Actor.prototype.setHome;
    Sprite_Actor.prototype.setHome = function(x, y) {
        _Sprite_Actor_setHome.apply(this, arguments);
        
        this._actor.homeX = x;
        this._actor.homeY = y;
    };

})();