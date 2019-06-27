//=============================================================================
// CharacterScaleChanger.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2019 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.1.0 2019/06/27 Scaleの変更にシンボル名を指定できるようにした。
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
 * If you want to change scale only for events that have a specific memo tag specified
 * it is necessary to set up the memo field.
 * The specification method of this memo field is as follows.
 * <scale:distinguishedName>
 * 
 * For example, if you want to distinguish by "MiniCharacter", write as follows in the event memo field.
 * <scale:MiniCharacter>
 * 
 * It is possible to specify the same for multiple events.
 * If multiple events are specified, multiple events are affected by scale change at the same time.
 * 
 * ----scripts----
 * -> Change of all character size
 * $gameSystem.changeCharacterScale(ScaleX, ScaleY);
 * Ex: Increase both horizontal and vertical 1.5 times
 * $gameSystem.changeCharacterScale(1.5, 1.5);
 * 
 * -> Get currently all scaleX
 * $gameSystem.getCharacterScaleX();
 * 
 * -> Get currently all scaleY
 * $gameSystem.getCharacterScaleY();
 * 
 * -> Change the scale only for events where a specific memo tag is specified
 * $gameSystem.changeCharacterScale(ScaleX, ScaleY, 'Symbol');
 * Example: Scale of the event group for which the "miniCharacter" is specified in the memo filed.
 * $gameSystem.changeCharacterScale(0.5, 0.5, 'miniCharacter');
 * 
 * ----symbol----
 * In the script $gameSystem.changeCharacterScale(scaleX, scaleY, 'symbol')
 * If you do not specify a Symbol Name, "all" is implicitly specified.
 * Furthermore, to specify characters other than events, specify the following symbol names.
 * 
 * -> Player character: player
 * -> Follower: follower
 * -> Vehicle: vehicle
 * 
 * Also, do not use "null" and "all" for symbol name.
 * 
 * ----priority----
 * The priority of scale change is
 * 1.Scale specified by individual symbol name
 * 2.Implicitly specified all (no symbol name specified)
 * 
 * ----change log---
 * 1.1.0 2019/06/27 It became possible to specify a symbol name in the change of Scale.
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
 * また、特定のメモタグが指定されているイベントだけScaleを変更したい場合
 * メモ欄の設定が必要になります。
 * このメモ欄の指定方法は以下の通りです。
 * <scale:区別名>
 * 
 * 例えば「ミニキャラ」で区別したい場合、イベントのメモ欄に以下のように記述します。
 * <scale:ミニキャラ>
 * 
 * この区別名は複数のイベントに同じものを指定することが可能です。
 * 複数のイベントに指定した場合、複数のイベントが同時にScale変更の影響を受けます。
 * 
 * 【スクリプト】
 * ・キャラクターサイズの一括変更
 * $gameSystem.changeCharacterScale(横のScale, 縦のScale);
 * 例：横も縦も一括して1.5倍にする
 * $gameSystem.changeCharacterScale(1.5, 1.5);
 * 
 * ・現在設定している一括変更分の横のScaleの取得
 * $gameSystem.getCharacterScaleX();
 * 
 * ・現在設定している縦の一括変更分のScaleの取得
 * $gameSystem.getCharacterScaleY();
 * 
 * ・特定のメモタグが指定されているイベントだけScaleを変更
 * $gameSystem.changeCharacterScale(横のScale, 縦のScale, '区別名');
 * 例：メモ欄でミニキャラが指定されたイベント郡のScaleを縦も横も0.5倍する
 * $gameSystem.changeCharacterScale(0.5, 0.5, 'ミニキャラ');
 * 
 * 【区別名】
 * $gameSystem.changeCharacterScale(横のScale, 縦のScale, '区別名')のスクリプトにおいて
 * 区別名の指定を省略した場合は暗黙的に「all」が指定されたことになります。
 * また、イベント以外のキャラクターを指定するには以下の区別名を指定します。
 * 
 * ・プレイヤーキャラクター：player
 * ・フォロワー：follower
 * ・乗り物：vehicle
 * 
 * また、区別名には「null」と「all」を使用しないでください。
 * 
 * 【優先順位】
 * Scale変更の優先順位は
 * 1．個別の区別名で指定したサイズ
 * 2．暗黙的に指定されたall（区別名の指定なし）
 * の順になります。
 * 
 * 【更新履歴】
 * 1.1.0 2019/06/27 Scaleの変更にシンボル名を指定できるようにした。
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
        this._characterScaleDict = {};
    };

    //本当は変更してほしくない。イミュータブルにしたいが……。
    Game_System.prototype.characterScaleDict = function() {
        if(!this._characterScaleDict) {
            this._characterScaleDict = {};
        }
        return this._characterScaleDict;
    };

    //スケールの値の保存と適用を同時におこなう
    Game_System.prototype.changeCharacterScale = function(scaleX = 1, scaleY = 1, symbol = Game_Scale.ALL_SYMBOL) {
        this._setCharacterScale(scaleX, scaleY, symbol);
        this._applyCharacterScale(symbol);
    };

    //XのScaleを取得する
    Game_System.prototype.getCharacterScaleX = function(symbol = Game_Scale.ALL_SYMBOL) {
        const target = this.characterScaleDict()[symbol];
        return target ? target.x : 1;
    };

    //YのScaleを取得する
    Game_System.prototype.getCharacterScaleY = function(symbol = Game_Scale.ALL_SYMBOL) {
        const target = this.characterScaleDict()[symbol];
        return target ? target.y : 1;
    };

    //Scaleの変更を適用する
    Game_System.prototype._applyCharacterScale = function(symbol = Game_Scale.ALL_SYMBOL) {
        if(SceneManager._scene._spriteset) {
            const scaleX = this.getCharacterScaleX(symbol);
            const scaleY = this.getCharacterScaleY(symbol);
            SceneManager._scene._spriteset.setCharacterScale(scaleX, scaleY, symbol);
        }
    };

    //Scaleの変更をModelに保存する
    Game_System.prototype._setCharacterScale = function(scaleX = 1, scaleY = 1, symbol = Game_Scale.ALL_SYMBOL) {
        const target = this.characterScaleDict()[symbol];
        if(!target) {
            this.characterScaleDict()[symbol] = new Game_Scale(scaleX, scaleY, symbol);
        }
        this.characterScaleDict()[symbol].set(scaleX, scaleY);
    };

////=============================================================================
//// Game_Character
////  Scaleの設定のためのメモ欄取得機能を基底クラスに追加する
////=============================================================================

    //各子クラスでオーバーライドすることを想定
    Game_Character.prototype.scaleMeta = function() {
        return 'null';
    };

////=============================================================================
//// Game_Event
////  Scaleの設定のためのメモ欄取得機能を追加
////=============================================================================
    Game_Event.prototype.scaleMeta = function() {
        return this.event().meta[Game_Scale.META_NAME] || 'null';
    };

////=============================================================================
//// Game_Player
////  Scaleの設定のためのメモ欄取得機能を追加
////=============================================================================

    Game_Player.prototype.scaleMeta = function() {
        return 'player';
    };

////=============================================================================
//// Game_Follower
////  Scaleの設定のためのメモ欄取得機能を追加
////=============================================================================
    Game_Follower.prototype.scaleMeta = function() {
        return 'follower';
    };

////=============================================================================
//// GameVehicle
////  Scaleの設定のためのメモ欄取得機能を追加
////=============================================================================
    Game_Vehicle.prototype.scaleMeta = function() {
        return 'vehicle';
    };

////=============================================================================
//// Spriteset_Map
////  キャラクター郡のサイズを変更する
////=============================================================================

    //現在のScaleを適用する
    const _Spriteset_Map_createCharacters = Spriteset_Map.prototype.createCharacters;
    Spriteset_Map.prototype.createCharacters = function() {
        _Spriteset_Map_createCharacters.call(this);
        //最初にAllSymbolのスケールを変更
        this._changeOnlyAllSymbolSprite();
        //その後、AllSymbol以外の別のシンボルを全て変更
        this._changeAllCharacterScaleExceptAllSymbol();
    };

    //Scaleの変更をSpriteに直接セットする
    Spriteset_Map.prototype.setCharacterScale = function(scaleX, scaleY, symbol) {
        if(symbol === Game_Scale.ALL_SYMBOL) {
            this._applyCharacterScale(this._characterSprites, scaleX, scaleY);
        }else {
            const targetSpriteList = this._characterSprites.filter(sprite => sprite && sprite._character.scaleMeta() === symbol);
            this._applyCharacterScale(targetSpriteList, scaleX, scaleY);
        }
    };

    Spriteset_Map.prototype._applyCharacterScale = function(targetSpriteList, scaleX, scaleY) {
        targetSpriteList.forEach(sprite => sprite && sprite.scale.set(scaleX, scaleY));
    };

    //Game_Scale.ALL_SYMBOLのみを変更する
    Spriteset_Map.prototype._changeOnlyAllSymbolSprite = function() {
        const scaleX = $gameSystem.getCharacterScaleX();
        const scaleY = $gameSystem.getCharacterScaleY();
        this.setCharacterScale(scaleX, scaleY, Game_Scale.ALL_SYMBOL);
    };

    //Game_Scale.ALL_SYMBOL以外のシンボルを全て変更適用する
    Spriteset_Map.prototype._changeAllCharacterScaleExceptAllSymbol = function() {
        const allKeyList = Object.getOwnPropertyNames($gameSystem.characterScaleDict());
        const keyList    = allKeyList.filter(key => key !== Game_Scale.ALL_SYMBOL);
        keyList.forEach(key => {
            const scaleMoedl = $gameSystem.characterScaleDict()[key];
            const scaleX     = scaleMoedl.x;
            const scaleY     = scaleMoedl.y;
            this.setCharacterScale(scaleX, scaleY, key);
        });
    };

////=============================================================================
//// Game_Scale
////  倍率を保持するオブジェクト
////=============================================================================

    class Game_Scale {
        constructor(scaleX = 1, scaleY = 1, symbol = Game_Scale.ALL_SYMBOL) {
            this._x = scaleX;
            this._y = scaleY;
            this._symbol = symbol;
        }

        /**
         * 「全ての要素」を表すシンボル名
         */
        static get ALL_SYMBOL() {
            return 'all';
        }

        /**
         * イベントのメモ欄で使用するメタタグ名
         */
        static get META_NAME() {
            return 'scale';
        }

        get x() {
            return this._x;
        }

        get y() {
            return this._y;
        }

        get symbol() {
            return this._symbol;
        }

        /**
         * Scaleを設定する。
         * @param {Number} x 
         * @param {Number} y 
         */
        set(x = 1, y = 1) {
            this._x = x;
            this._y = y;
        }
    }
    window[Game_Scale.name] = Game_Scale;

})();