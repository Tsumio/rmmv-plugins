//=============================================================================
// UnReloadMap.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2019 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2019/06/06 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc Disables map reloading only on setting maps.
 * @author Tsumio
 *
 * @param ----Basic Settings----
 * @desc 
 * @default 
 * 
 * @param UnReloadMapIDList
 * @type number[]
 * @desc Set map ID for disabling map reloading.
 * @default []
 * 
 * @help Disables map reloading only on setting maps.
 * 
 * ----feature----
 * -> Change the behavior when loading a map from the load scene
 * -> Enable the function only with the setting map ID
 * 
 * ----how to use----
 * After introducing this plugin, set the plugin parameters.
 * 
 * ----details----
 * When the data of the map ID setting in the plugin parameter is read from the load screen
 * Does not reload the map even if there is a change in the editor.
 * It is mainly intended to be used to maintain the location information of the events.
 *
 * The above functions only work when loading saved data from the load scene.
 * If you load the map using "Move to Place", the event will be properly reset as usual.
 * 
 * ----change log---
 * 1.0.0 2019/06/06 Release.
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
 * @plugindesc マップのリロードを特定マップでのみ無効化します。
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * @param リロードを無効化するマップIDのリスト
 * @type number[]
 * @desc マップのリロードを無効化するマップIDを任意数だけ指定してください。
 * @default []
 *
 * 
 * @help マップのリロードを特定マップでのみ無効化します。
 * 
 * 【特徴】
 * ・コンテニュー画面からマップをロードしたときの挙動を変更
 * ・指定したマップIDでのみ機能を有効化
 * 
 * 【使用方法】
 * プラグインの導入後、プラグインパラメーターを設定してください。
 * 
 * 【機能詳細】
 * プラグインパラメータで指定したマップIDのデータをロード画面から読み込んだとき
 * エディタ上で変更があってもマップのリロードをおこないません。 
 * 主にイベントの位置情報を保つために使用することを想定しています。
 * 
 * 上記の機能はロード画面からセーブデータを読み込んだときのみ働きます。
 * すなわち「場所移動」を使ってマップを読み込んだ場合は、通常通りイベントは適切に再設置されます。
 * 
 * 【更新履歴】
 * 1.0.0 2019/06/06 公開。
 * 
 * 【備考】
 * 当プラグインを利用したことによるいかなる損害に対しても、制作者は一切の責任を負わないこととします。
 * 
 * 【利用規約】
 * ソースコードの著作権者が自分であると主張しない限り、
 * 作者に無断で改変、再配布が可能です。
 * 利用形態（商用、18禁利用等）についても制限はありません。
 * 自由に使用してください。
 */

(function() {
    'use strict';
    var pluginName = 'UnReloadMap';

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
    var param                          = {};
    //リロードを無効化するマップIDのリスト
    param.unReloadMapIdList = getParamString(['UnReloadMapIDList', 'リロードを無効化するマップIDのリスト']);
    param.unReloadMapIdList = convertParam(param.unReloadMapIdList);
    param.unReloadMapIdList = convertToNumber(param.unReloadMapIdList);

////=============================================================================
//// Scene_Load
////  リロードするかしないかをコントロール
////=============================================================================

    const _Scene_Load_reloadMapIfUpdated = Scene_Load.prototype.reloadMapIfUpdated;
    Scene_Load.prototype.reloadMapIfUpdated = function() {
        const shouldReloadMap = !param.unReloadMapIdList.some(x => x === $gameMap.mapId());
        if(shouldReloadMap) {
            _Scene_Load_reloadMapIfUpdated.call(this);
        }
    };

})();