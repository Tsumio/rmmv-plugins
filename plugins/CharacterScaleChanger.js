//=============================================================================
// CharacterScaleChanger.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2019 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2019/06/26 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc Change the Character scale at once.
 * @author Tsumio
 *
 * @param ----Basic Settings----
 * @desc 
 * @default 
 * 
 * @help Change the Character scale at once.
 * 
 * ----feature----
 * -> Change the character scale at once
 * -> You can get the Scale that has changed
 * 
 * ----how to use----
 * After introducing this plugin, use the script command.
 * 
 * ----scripts----
 * -> Change of character size
 * $gameSystem.changeCharacterScale(ScaleX, ScaleY);
 * Ex: Increase both horizontal and vertical 1.5 times
 * $gameSystem.changeCharacterScale(1.5, 1.5);
 * 
 * -> Get currently scaleX
 * $gameSystem.getCharacterScaleX();
 * 
 * -> Get currently scaleY
 * $gameSystem.getCharacterScaleY();
 * 
 * ----change log---
 * 1.0.0 2019/06/26 Release.
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
 * @plugindesc キャラクターのScaleを一括で変更します。
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 *
 * 
 * @help キャラクターのScaleを一括で変更します。
 * 
 * 【特徴】
 * ・キャラクターのScaleを一括で変更します
 * ・変更したScaleを取得できます
 * 
 * 【使用方法】
 * プラグインの導入後、スクリプトコマンドから使用します。
 * 
 * 【スクリプト】
 * ・キャラクターサイズの変更
 * $gameSystem.changeCharacterScale(横のScale, 縦のScale);
 * 例：横も縦も1.5倍にする
 * $gameSystem.changeCharacterScale(1.5, 1.5);
 * 
 * ・現在設定している横のScaleの取得
 * $gameSystem.getCharacterScaleX();
 * 
 * ・現在設定している縦のScaleの取得
 * $gameSystem.getCharacterScaleY();
 * 
 * 【更新履歴】
 * 1.0.0 2019/06/26 公開。
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
    var pluginName = 'CharacterScaleChanger';

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

////=============================================================================
//// Game_System
////  スケールのサイズを保存する
////=============================================================================

    //初期化時にScaleを保存するオブジェクトを作成
    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this._characterScale = {x:1, y:1};
    };

    //スケールの値の保存と適用を同時におこなう
    Game_System.prototype.changeCharacterScale = function(scaleX = 1, scaleY = 1) {
        this._setCharacterScale(scaleX, scaleY);
        this._applyCharacterScale();
    };

    //XのScaleを取得する
    Game_System.prototype.getCharacterScaleX = function() {
        return this._characterScale ? this._characterScale.x : 1;
    };

    //YのScaleを取得する
    Game_System.prototype.getCharacterScaleY = function() {
        return this._characterScale ? this._characterScale.y : 1;
    };

    //Scaleの変更を適用する
    Game_System.prototype._applyCharacterScale = function() {
        if(SceneManager._scene._spriteset) {
            SceneManager._scene._spriteset.setCharacterScale(this.getCharacterScaleX(), this.getCharacterScaleY());
        }
    };

    //Scaleの変更をModelに保存する
    Game_System.prototype._setCharacterScale = function(scaleX = 1, scaleY = 1) {
        this._characterScale.x = scaleX;
        this._characterScale.y = scaleY;
    };

////=============================================================================
//// Spriteset_Map
////  キャラクター郡のサイズを変更する
////=============================================================================

    //現在のScaleを適用する
    const _Spriteset_Map_createCharacters = Spriteset_Map.prototype.createCharacters;
    Spriteset_Map.prototype.createCharacters = function() {
        _Spriteset_Map_createCharacters.call(this);
        const scaleX = $gameSystem.getCharacterScaleX();
        const scaleY = $gameSystem.getCharacterScaleY();
        this.setCharacterScale(scaleX, scaleY);
    };

    //Scaleの変更をSpriteに直接セットする
    Spriteset_Map.prototype.setCharacterScale = function(scaleX, scaleY) {
        this._characterSprites.forEach(sprite => sprite && sprite.scale.set(scaleX, scaleY));
    };

})();