//=============================================================================
// AirshipAltitudeAdjuster.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2020 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2020/11/05 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc Adjust the altitude of the airship
 * @author Tsumio
 *
 * @param ----Basic Settings----
 * @desc 
 * @default 
 * 
 * @param MaxAltitude
 * @desc Switch number to enable window resizing.
 * @type number
 * @default 1
 * 
 * @param AltitudeSpeed
 * @desc Variable number that specifies the size of the window.
 * @type number
 * @default 1
 * 
 * @help Adjust 
 * 
 * ----feature----
 * -> Change max altitude.
 * -> Control altitude speed.
 * 
 * ----how to use----
 * After installing the plugin, sets each plugin parameter.
 * 
 * ----change log---
 * 1.0.0 2020/01/05 Release.
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
 * @plugindesc 飛行船の高度に関する調整をおこなうプラグイン
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * @param 飛行船の最大高度
 * @desc 飛行船の最大高度を設定します。
 * @type number
 * @default 48
 * 
 * @param 飛行船の高度調整速度
 * @desc 飛行船の高度調整速度を設定します。
 * @type number
 * @default 1
 * 
 * @help メッセージウィンドウのサイズを変更するプラグイン
 * 
 * 【特徴】
 * ・飛行船の上昇・下降の速度を変更できます
 * ・飛行船の最大高度を変更できます
 * 
 * 【使用方法】
 * プラグインの導入後、プラグインパラメーターを設定してください。
 * 
 * 【更新履歴】
 * 1.0.0 2020/01/05 公開。
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
    var pluginName = 'AirshipAltitudeAdjuster';


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
    //飛行船の最大高度
    param.maxAltitude = getParamNumber(['MaxAltitude', '飛行船の最大高度']);
    //飛行船の高度調整速度
    param.altitudeSpeed = getParamNumber(['AltitudeSpeed', '飛行船の高度調整速度']);

//////=============================================================================
///// Game_Vehicle
/////  飛行船に関する調整をおこなう
//////=============================================================================

    //飛行船の高度に関するUpdate処理をオーバーライド
    const _Game_Vehicle_updateAirshipAltitude = Game_Vehicle.prototype.updateAirshipAltitude;
    Game_Vehicle.prototype.updateAirshipAltitude = function() {
        //Note:元の処理には副作用があるため、先に高度の値を確保しておく必要がある
        const prevAltitude = this._altitude;

        //競合対策に元の処理を一度呼んでおく
        _Game_Vehicle_updateAirshipAltitude.call(this);

        //実際に更新処理をおこなう
        this.updateHigerAltitude(prevAltitude);
        this.updateLowerAltitude(prevAltitude);
    };

    /**
     * 上昇中のときの高度を設定する
     */
    Game_Vehicle.prototype.updateHigerAltitude = function(prevAltitude) {
        //Note:条件式はコアスクリプトのものそのまま。
        if (this._driving && !this.isHighest()) {
            this._altitude = this._calcNextHigherAltitude(prevAltitude, this.getAltitudeSpeed(), this.maxAltitude());
        }
    };

    /**
     * 下降中のときの高度を設定する
     */
    Game_Vehicle.prototype.updateLowerAltitude = function(prevAltitude) {
        //Note:条件式はコアスクリプトのものそのまま。
        if (!this._driving && !this.isLowest()) {
            this._altitude = this._calcNextLowerAltitude(prevAltitude, this.getAltitudeSpeed(), this.maxAltitude());
        }
    };

    /**
     * プラグインで設定した最高高度を返す。
     * 完全にオーバーライド。
     */
    Game_Vehicle.prototype.maxAltitude = function() {
        return param.maxAltitude;
    };

    /**
     * 上昇・下降の速度を返す
     */
    Game_Vehicle.prototype.getAltitudeSpeed = function() {
        return param.altitudeSpeed;
    };

    /**
     * 上昇する場合の次の高度を返す
     */
    Game_Vehicle.prototype._calcNextHigherAltitude = function(currentAltitude, altitudeSpeed, maxAltitude) {
        return (currentAltitude + altitudeSpeed).clamp(0, maxAltitude);
    };

    /**
     * 下降する場合の次の高度を返す
     */
    Game_Vehicle.prototype._calcNextLowerAltitude = function(currentAltitude, altitudeSpeed, maxAltitude) {
        return (currentAltitude - altitudeSpeed).clamp(0, maxAltitude);
    };


})();
