//=============================================================================
// TsumioActions.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2018 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.2 2018/01/28 弾数の表示機能を追加。
// 1.0.1 2018/01/27 説明を加筆。
// 1.0.0 2018/01/25 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc Implement special actions.
 * @author Tsumio
 *
 * @param ----Basic Settings----
 * @desc 
 * @default 
 * 
 * @param BoomerangSettings
 * @type struct<Boomerang>
 * @desc Settings of the boomerang.
 * 
 * @param HookShotSettings
 * @type struct<HookShot>
 * @desc Settings of the hook shot.
 * 
 * @param ArrowSettings
 * @type struct<Arrow>
 * @desc Settings of the arrow.
 * 
 * @param MagicFireSettings
 * @type struct<MagicFire>
 * @desc Settings of the magic fire.
 * 
 * @param BombSettings
 * @type struct<Bomb>
 * @desc Settings of the bomb.
 * 
 * @help Implement special actions.
 * 
 * ----feature----
 * -> Implement special actions.
 * -> Each action can start any event.
 * -> Each action can be switched freely.
 * 
 * ----how to use----
 * After installing the plugin, sets each plugin parameter.
 * Turning on the switch, player can fire each action.
 * 
 * Changes actions with the Q/W key.
 * And each action is executed by ok key.
 * 
 * ----common:about image----
 * The image is loaded from the img/characters folder.
 * The image is one set in the following order.
 * 01,02,03
 * 04,05,06
 * 07,08,09
 * 10,11,12
 * In the material bundled with RMMV, this image is arranged in eight rows, the upper left is index 0 and the lower right is index 7.
 * 
 * The image displayed in the action item window is 02.
 * 
 * ----common:about starting events----
 * Each action can start any event.
 * For example, if you want to start an event with a arrow, write <arrow> in the memo field of the event.
 * When a arrow action hits the event, the event starts.
 * 
 * Developer can also activate an event after turning on any self switch.
 * For example, if you want to activate an event with a arrow after turning on self switch A, write <arrow:A> in the memo field of the event.
 * When the arrow action hits the event, the event starts after self switch A turns on.
 * <arrow:B> corresponds to self switch B, and <arrow:C> corresponds to self switch C. 
 * Same as self switch D.
 * 
 * However, self switch D is special.
 * If self switch D is ON, the event will not start with each action.
 * But the <arrow:D> tag is valid.
 * 
 * For example, player hit a arrow action on an event with the tag <arrow:D> set.
 * This event is fired after turning self switch D on.
 * Furthermore, since the self switch D is ON, the event will not start with each action after that.
 * 
 * Event will not be started, if as follows.
 * -> Action did not hit
 * -> Tag is not written in the memo field
 * -> Self switch D is ON
 * 
 * ----boomerang----
 * Memo filed: <boomerang>
 * Image: Import 1 to 3(foot stepping animation)
 * Diagonal shooting: Always available
 * Remarks: Go through all objects. Can set the number of simultaneous firing possible.
 * 
 * ----hook shot----
 * Memo filed: <hook>
 * Image: 01->hook part, 04->chain part, 07->hand part
 * Diagonal shooting: Limited possible. When it is enabled, it is demanded to make the image other than 01 transparent
 * Remarks:
 *  -> Can not activate event
 *  -> Used when the player moves from object A to object B
 *  -> The action can be fired even by hitting the designated region
 *  -> When diagonal mode is enabled, images of 04 and 07 are not drawn correctly
 * 
 * ----arrow----
 * Memo filed: <arrow>
 * Image: Import 1
 * Diagonal shooting:Not available
 * Remarks:Manage the number of remaining arrows by variable
 * 
 * ----magic fire----
 * Memo filed:<magicFIre>
 * Image: Import 1 to 3(foot stepping animation)
 * Diagonal shooting:Not available
 * Remarks:Use MP at the action
 * 
 * ----bomb----
 * Memo filed:<bomb>
 * Import 1 to 3(foot stepping animation)
 * Diagonal shooting:Not available
 * Throwing action: Pick up and throw the placed bomb.
 * Remarks:
 *  -> Starts event with blast
 *  -> Blast animation can be set
 *  -> Manage the number of remaining bomb by variable
 *  -> Thrown bomb can be able to go through any object
 *  -> There is no limit on the number of simultaneous placing
 *  -> At one time, player can throw only one bomb
 * 
 * ----plugin command----
 * There is no plugin command.
 * 
 * 
 * ----change log---
 * 1.0.2 2018/01/28 Add a function that display a remaining bomb, arrow.
 * 1.0.1 2018/01/27 Add a description.
 * 1.0.0 2018/01/25 Release.
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
 * @plugindesc 特殊なアクションを実装します。
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * @param ブーメランの設定
 * @type struct<Boomerang>
 * @desc ブーメランの設定。
 * 
 * @param フックショットの設定
 * @type struct<HookShot>
 * @desc フックショットの設定。
 * 
 * @param 矢の設定
 * @type struct<Arrow>
 * @desc 矢の設定。
 * 
 * @param ファイアの設定
 * @type struct<MagicFire>
 * @desc ファイアの設定。
 * 
 * @param バクダンの設定
 * @type struct<Bomb>
 * @desc バクダンの設定。
 * 
 * @help 特殊なアクションを実装します。
 * 
 * 【特徴】
 * ・特殊なアクションを実装します。
 * ・各アクションによって、任意のイベントを起動することができます。
 * ・各アクションは自由に切り替えることができます。
 * 
 * 【使用方法】
 * プラグインの導入後、プラグインパラメーターを設定してください。
 * スイッチをONにすると各アクションが有効になります。
 * 
 * アクションの切り替えはQ/Wキーでおこないます。
 * また、各アクションは決定キーによって実行されます。
 * 
 * 【共通：画像について】
 * 画像ファイルはimg/charactersフォルダから読み込みます。
 * 
 * 画像は以下の順で1セットになります。
 * 01,02,03
 * 04,05,06
 * 07,08,09
 * 10,11,12
 * ツクールMVに同梱されている素材ではこの画像が8つ並んでおり、左上がindex0で右下がindex7となります。
 * 
 * アクションアイテムウィンドウに表示される画像は02番です。
 * 
 * 【共通：イベントの起動について】
 * 各アクションによって任意のイベントを起動できます。
 * 例えば弓矢によってイベントを起動したい場合、イベントのメモ欄に<arrow>と書きます。
 * 弓矢アクションが当該イベントにヒットすると、イベントが起動します。
 * 
 * 任意のセルフスイッチをONにしてからイベントを起動することもできます。
 * 例えばセルフスイッチAをONにしたあと、弓矢によってイベントを起動したい場合、イベントのメモ欄に<arrow:A>と書きます。
 * 弓矢アクションが当該イベントにヒットすると、セルフスイッチAがONになったあとイベントが起動します。
 * <arrow:B>はセルフスイッチBに相当し、<arrow:C>はセルスイッチCに相当します。セルフスイッチDも同様です。
 * 
 * ただしセルフスイッチDの扱いは特殊です。
 * セルフスイッチDがONになっていると、当該イベントは各アクションで起動しません。
 * しかし<arrow:D>というタグ自体は有効です。
 * 
 * 例えば<arrow:D>というタグを設定したイベントに弓矢アクションをヒットさせたとします。
 * このイベントはセルフスイッチDをONにしたあとでイベントを起動します。
 * また、セルフスイッチDがONになっているため、当該イベントはそれ以降、各アクションで起動しなくなります。
 * 
 * イベントが起動できない場合は以下の通りです。
 * ・アクションがヒットしなかった場合
 * ・メモ欄にタグが書かれていない場合
 * ・セルフスイッチDがONになっている場合
 * 
 * 【ブーメラン】
 * メモ欄：<boomerang>
 * 画像：1番から3番を読み込み(足踏みアニメ）
 * 斜め撃ち：常時可能
 * 備考：あらゆるオブジェクトをすり抜ける。同時発射可能数の設定可能
 * 
 * 【フックショット】
 * メモ欄:<hook>
 * 画像：01番がフック部分、04番がチェーン部分、07番が手元部分
 * 斜め撃ち：限定的に可能。有効にする場合、01番以外の画像を透明にすること推奨
 * 備考：
 *  ・イベントの起動不可
 *  ・物体Aから物体Bへプレイヤーが移動するときに使用する
 *  ・指定リージョンに当たることによってもアクションの発火が可能
 *  ・斜め打ちを有効にした場合、04番や07番の画像は正常に描画されない
 * 
 * 【矢】
 * メモ欄：<arrow>
 * 画像：01番から読み込み
 * 斜め撃ち：不可
 * 備考：変数によって残りの矢の数を管理
 * 
 * 【ファイア】
 * メモ欄：<magicFire>
 * 画像：01番から03番を読み込み(足踏みアニメ）
 * 斜め撃ち：不可
 * 備考：アクション時、MPを使用する
 * 
 * 【バクダン】
 * メモ欄：<bomb>
 * 画像：01番から03番を読み込み(足踏みアニメ）
 * 斜め撃ち：不可
 * 投げアクション：設置したバクダンを拾い上げ、投げることが可能
 * 備考：
 *  ・爆風でイベントを起動
 *  ・爆風アニメーションの設定可能
 *  ・変数によって残りのバクダン数を管理
 *  ・投げアクション時はあらゆるオブジェクトをすり抜ける
 *  ・同時設置数に制限なし
 *  ・一度に投げられるバクダンは一つまで
 * 
 * 【プラグインコマンド】
 * プラグインコマンドはありません。
 * 
 * 
 * 【更新履歴】
 * 1.0.2 2018/01/28 弾数の表示機能を追加。
 * 1.0.1 2018/01/27 説明を加筆。
 * 1.0.0 2017/01/25 公開。
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
/*~struct~Boomerang:
 * 
 * @param switchID
 * @type switch
 * @desc ブーメランを有効にするためのスイッチ番号(Switch ID for activating boomerang).
 * @default 1
 * 
 * @param fileName
 * @type file
 * @desc ファイル名。(File name)
 * @require 1
 * @dir img/characters
 * 
 * @param index
 * @type number
 * @max 255
 * @desc 画像のインデックス(Index of image).
 * @default 0
 * 
 * @param limit
 * @type number
 * @max 1000
 * @desc 同時に飛ばせる最大数(Maximum number that can be fired at the same time).
 * @default 4
 * 
 * @param speed
 * @type number
 * @max 255
 * @decimals 2
 * @desc 速度。(Speed).
 * @default 0.2
 * 
 * @param leap
 * @type number
 * @max 255
 * @desc 飛距離。(Leap).
 * @default 5
 * 
 */
/*~struct~HookShot:
 * 
 * @param switchID
 * @type switch
 * @desc フックショットを有効にするためのスイッチ番号(Switch ID for activating hook shot).
 * @default 2
 * 
 * @param useDiagonal
 * @type boolean
 * @desc 斜め撃ちを有効にするかどうか(Boolean value for activating diagonal shot).
 * @default false
 * 
 * @param fileName
 * @type file
 * @desc ファイル名。(File name)
 * @require 1
 * @dir img/characters
 * 
 * @param index
 * @type number
 * @max 255
 * @desc 画像のインデックス(Index of image).
 * @default 0
 * 
 * @param region
 * @type number[]
 * @max 999
 * @desc フックショットが有効なリージョンID(Region ID for activating hook shot).
 * 
 * @param passRegion
 * @type number[]
 * @max 999
 * @desc フックショットが通行可能なリージョンID(Region ID for passing hook shot).
 * 
 * @param speed
 * @type number
 * @max 255
 * @decimals 2
 * @desc 速度。(Speed).
 * @default 0.2
 * 
 * @param leap
 * @type number
 * @max 255
 * @desc 飛距離。(Leap).
 * @default 5
 * 
 */
/*~struct~Arrow:
 * 
 * @param switchID
 * @type switch
 * @desc 矢を有効にするためのスイッチ番号(Switch ID for activating arrow).
 * @default 3
 * 
 * @param variableID
 * @type variable
 * @desc 矢の数を管理する変数番号(Variable ID to manage the number of arrows).
 * @default 1
 * 
 * @param fileName
 * @type file
 * @desc ファイル名。(File name)
 * @require 1
 * @dir img/characters
 * 
 * @param index
 * @type number
 * @max 255
 * @desc 画像のインデックス(Index of image).
 * @default 0
 * 
 * @param region
 * @type number[]
 * @max 999
 * @desc 矢が貫通可能なリージョンID(Region ID where arrow can penetrate).
 * 
 * @param max
 * @type number
 * @max 10000
 * @desc 保持できる最大数(Maximum number that can be held).
 * @default 99
 * 
 * @param speed
 * @type number
 * @max 255
 * @decimals 2
 * @desc 速度。(Speed).
 * @default 0.3
 * 
 */
/*~struct~MagicFire:
 * 
 * @param switchID
 * @type switch
 * @desc ファイアを有効にするためのスイッチ番号(Switch ID for activating magic fire).
 * @default 4
 * 
 * @param mpCost
 * @type number
 * @desc ファイアを使用する際に消費するMP(MP cost that using magic fire).
 * @default 10
 * 
 * @param fileName
 * @type file
 * @desc ファイル名。(File name)
 * @require 1
 * @dir img/characters
 * 
 * @param index
 * @type number
 * @max 255
 * @desc 画像のインデックス(Index of image).
 * @default 0
 * 
 * @param region
 * @type number[]
 * @max 999
 * @desc ファイアが貫通可能なリージョンID(Region ID where fire can penetrate).
 * 
 * @param speed
 * @type number
 * @max 255
 * @decimals 2
 * @desc 速度。(Speed).
 * @default 0.2
 * 
 */
/*~struct~Bomb:
 * 
 * @param switchID
 * @type switch
 * @desc バクダンを有効にするためのスイッチ番号(Switch ID for activating bomb).
 * @default 5
 * 
 * @param variableID
 * @type variable
 * @desc バクダンの数を管理する変数番号(Variable ID to manage the number of bombs).
 * @default 2
 * 
 * @param fileName
 * @type file
 * @desc ファイル名。(File name)
 * @require 1
 * @dir img/characters
 * 
 * @param index
 * @type number
 * @max 255
 * @desc 画像のインデックス(Index of image).
 * @default 0
 * 
 * @param animation
 * @type animation
 * @require 1
 * @desc 爆発時のアニメーション(Explosion animation).
 * 
 * @param max
 * @type number
 * @max 10000
 * @desc 保持できる最大数(Maximum number that can be held).
 * @default 99
 * 
 * @param speed
 * @type number
 * @max 255
 * @decimals 2
 * @desc 速度。(Speed).
 * @default 0.2
 * 
 * @param leap
 * @type number
 * @max 255
 * @desc 飛距離。(Leap).
 * @default 4
 * 
 */

(function() {
    'use strict';
    var pluginName = 'TsumioActions';


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
    //Basic Stteings
    param.boomerangSettings        = getParamString(['BoomerangSettings', 'ブーメランの設定']);
    param.hookShotSettings         = getParamString(['HookShotSettings', 'フックショットの設定']);
    param.arrowSettings            = getParamString(['ArrowSettings', '矢の設定']);
    param.magicFireSettings        = getParamString(['MagicFireSettings', 'ファイアの設定']);
    param.bombSettings             = getParamString(['BombSettings', 'バクダンの設定']);

////==============================
//// Convert parameters.
////==============================
    param.boomerangSettings        = convertParam(param.boomerangSettings);
    param.hookShotSettings         = convertParam(param.hookShotSettings);
    param.arrowSettings            = convertParam(param.arrowSettings);
    param.magicFireSettings        = convertParam(param.magicFireSettings);
    param.bombSettings             = convertParam(param.bombSettings);

////==============================
//// Convert to Number.
////==============================
    //None

////=============================================================================
//// Actions_Manager
////  Manage actions.
////=============================================================================
    class Actions_Manager {

        static fireAction() {
            if(this.currentAction.name === this.empty.name) {
                return;
            }

            const actionName = `fire${this.currentAction.name}`;
            try {
                $gamePlayer[`${actionName}Action`]();
                this.refreshActionItemWindow();
            }catch(e) {
                console.warn('Error!');
                Debug.log(e);
            }
        }

        static setActionItemWindow(window) {
            this._actionItemWindow = window;
        }

        static refreshActionItemWindow() {
            this._actionItemWindow.refreshActionItem();
        }

        static get empty() {
            return {name:'empty',     obj:null};
        }

        static get currentAction() {
            if(!this._currentAction) {
                this._currentAction = this.empty;
            }
            return this._currentAction;
        }

        static set currentAction(actionName) {
            this._currentAction = actionName || this.empty;
        }

        static get currentIndex() {
            if(!this._currentIndex) {
                this._currentIndex = 0;
            }
            return this._currentIndex;
        }

        static isActionValid() {
            if(this.currentAction.name === this.empty.name) {
                return true;
            }
            return $gameSwitches.value(Number(this.currentAction.obj.switchID));
        }

        static setNextAction() {
            this._currentIndex = (this.currentIndex + 1) % this.actions.length;
            this.currentAction = this.actions[this.currentIndex];
            if(!this.isActionValid()) {
                this.setNextAction();
            }
            this.refreshActionItemWindow();
            Debug.log(`アクション名：${this.currentAction.name} Index：${this.currentIndex}`);
        }

        static setPrevAction() {
            this._currentIndex  = (this.currentIndex + (this.actions.length-1)) % this.actions.length;
            this.currentAction = this.actions[this.currentIndex];
            if(!this.isActionValid()) {
                this.setPrevAction();
            }
            this.refreshActionItemWindow();
            Debug.log(`アクション名：${this.currentAction.name} Index：${this.currentIndex}`);
        }

        static get actions() {
            if(!this._actions) {
                this._actions = 
                [
                    {name:'empty',     obj:this.empty,              hasLimit:false},
                    {name:'Boomerang', obj:param.boomerangSettings, hasLimit:false},
                    {name:'Arrow',     obj:param.arrowSettings,     hasLimit:true},
                    {name:'HookShot',  obj:param.hookShotSettings,  hasLimit:false},
                    {name:'MagicFire', obj:param.magicFireSettings, hasLimit:false},
                    {name:'Bomb',      obj:param.bombSettings,      hasLimit:true},
                ];
            }
            return this._actions;
        }
    }


////=============================================================================
//// Bullet_Manager
////  Manage bullets.
////=============================================================================
    class Bullet_Manager {
        static createBullet(type) {
            const tempSprite = new Sprite_Character(type);
            const map        = { sprite : tempSprite, gameObject: type };
            this.bulletList.push(map);
            SceneManager._scene._spriteset._tilemap.addChild(tempSprite);

            this.count++;
        }

        static canCreateBullet() {
            const settings = param.boomerangSettings;
            return $gameSwitches.value(Number(settings.switchID)) && this.bulletList.length < Number(settings.limit);
        }

        /**
         * @return {Array}
         */
        static get bulletList() {
            if(!this._bulletList) {
                this._bulletList = [];
            }
            return this._bulletList;
        }

        static clear() {
            this._bulletList = [];
        }

        static hasBullet() {
            return this.bulletList.length > 0;
        }

        static update() {
            if(!this.hasBullet()) {
                return;
            }

            let isReturned = false;
            //Update bullet position etc.
            this.bulletList.forEach(function(bullet) {
                bullet.gameObject.update();
                if(bullet.gameObject.isReturned()) {
                    //Clear sprite.
                    SceneManager._scene._spriteset._tilemap.removeChild(bullet.sprite);
                    isReturned = true;
                }
            });
            //Create new bullet list, if necessary.
            if(isReturned) {
                this._bulletList = this.bulletList.filter(function(bullet) {
                    return !bullet.gameObject.isReturned();
                });
            }
        }
    }

////=============================================================================
//// HookShot_Manager
////  Manage hook action.
////=============================================================================
    class HookShot_Manager {
        static createHookShot(type) {
            const tempSprite = new Sprite_Character(type);
            const map        = { sprite : tempSprite, gameObject: type };
            this._hookShot   = map;
            SceneManager._scene._spriteset._tilemap.addChild(tempSprite);
            this._currentlyInjection = true;

            //Set rotate
            this._hookShot.sprite.anchor.x = this._hookShot.gameObject.rotateAngle.x;
            this._hookShot.sprite.anchor.y = this._hookShot.gameObject.rotateAngle.y;
            this._hookShot.sprite.rotation = this._hookShot.gameObject.rotateAngle.angle;
        }

        static canCreateHookShot() {
            const settings = param.hookShotSettings;
            return !this.currentlyInjection && $gameSwitches.value(Number(settings.switchID));
        }

        static get currentlyInjection() {
            return this._currentlyInjection;
        }

        static get hookShot() {
            return this._hookShot;
        }

        static clear() {
            this._hookShot = null;
            this._currentlyInjection = false;
        }

        static update() {
            if(!this.currentlyInjection || !this.hookShot) {
                return;
            }

            let isReturned = false;
            //Update hook shot position etc.
            this.hookShot.gameObject.update();
            if(this.hookShot.gameObject.isReturned() || this.hookShot.gameObject.isHookActionEnd) {
                //Clear sprite.
                SceneManager._scene._spriteset._tilemap.removeChild(this.hookShot.sprite);
                this.hookShot.gameObject.disposeChildren();
                isReturned = true;
            }

            //Assign a null, if necessary.
            if(isReturned) {
                this.clear();
            }
        }
    }

////=============================================================================
//// Arrow_Manager
////  Manage arrow action.
////=============================================================================
    class Arrow_Manager {
        static createArrow(type) {
            const tempSprite = new Sprite_Character(type);
            const map        = { sprite : tempSprite, gameObject: type };
            this.arrowList.push(map);
            SceneManager._scene._spriteset._tilemap.addChild(tempSprite);

            //Set rotate
            map.sprite.anchor.x = map.gameObject.rotateAngle.x;
            map.sprite.anchor.y = map.gameObject.rotateAngle.y;
            map.sprite.rotation = map.gameObject.rotateAngle.angle;

            //Decrease arrow.
            this.refreshArrowNumber();
            this.decreaseArrow();
        }

        static canCreateArrow() {
            const settings = param.arrowSettings;
            return $gameSwitches.value(Number(settings.switchID)) && this.getRemainingArrows() > 0;
        }

        static decreaseArrow() {
            const id      = Number(param.arrowSettings.variableID);
            const max     = Number(param.arrowSettings.max);
            const current = $gameVariables.value(id);
            const newNum  = current - 1;
            //Set new number.
            $gameVariables._data[id] = newNum.clamp(0, max);
        }

        static refreshArrowNumber() {
            const id      = Number(param.arrowSettings.variableID);
            const max = Number(param.arrowSettings.max);
            $gameVariables._data[id] = $gameVariables._data[id].clamp(0, max);
        }

        /**
         * @return {Number}
         */
        static getRemainingArrows() {
            const settings = param.arrowSettings;
            return $gameVariables.value(Number(settings.variableID));
        }

        /**
         * @return {Array}
         */
        static get arrowList() {
            if(!this._arrowList) {
                this._arrowList = [];
            }
            return this._arrowList;
        }

        static clear() {
            this._arrowList = [];
        }

        static isArrowListEmpty() {
            return this.arrowList.length === 0;
        }

        static update() {
            if(this.isArrowListEmpty()) {
                return;
            }

            let shouldVanish = false;
            //Update arrow position etc.
            this.arrowList.forEach(function(arrow) {
                arrow.gameObject.update();
                //Process to erase if you jumped out of the screen or hit the object.
                if(!arrow.gameObject.isNearTheScreen() || arrow.gameObject.shouldVanish){
                    //Clear sprite.
                    shouldVanish = true;
                    SceneManager._scene._spriteset._tilemap.removeChild(arrow.sprite);
                }
            });

            //Create new arro list, if necessary.
            if(shouldVanish) {
                this._arrowList = this.arrowList.filter(function(arrow) {
                    return arrow.gameObject.isNearTheScreen() && !arrow.gameObject.shouldVanish;
                });
            }
        }
    }

////=============================================================================
//// MagicFire_Manager
////  Manage magic fire action.
////=============================================================================
    class MagicFire_Manager {
        static createMagicFire(type) {
            const tempSprite = new Sprite_Character(type);
            const map        = { sprite : tempSprite, gameObject: type };
            this.magicFireList.push(map);
            SceneManager._scene._spriteset._tilemap.addChild(tempSprite);

            //Set rotate
            map.sprite.anchor.x = map.gameObject.rotateAngle.x;
            map.sprite.anchor.y = map.gameObject.rotateAngle.y;
            map.sprite.rotation = map.gameObject.rotateAngle.angle;

            //Consume MP
            this.consumeMp();
        }

        static canCreateMagicFire() {
            const settings = param.magicFireSettings;
            return $gameSwitches.value(Number(settings.switchID)) && this.hasEnoughMp();
        }

        static hasEnoughMp() {
            const settings = param.magicFireSettings;
            return $gameParty.members()[0].mp >= Number(settings.mpCost);
        }

        static consumeMp() {
            const settings = param.magicFireSettings;
            const cost     = -(Number(settings.mpCost));
            $gameParty.members()[0].gainMp(cost);
        }

        /**
         * @return {Array}
         */
        static get magicFireList() {
            if(!this._magicFireList) {
                this._magicFireList = [];
            }
            return this._magicFireList;
        }

        static clear() {
            this._magicFireList = [];
        }

        static isMagicFireListEmpty() {
            return this.magicFireList.length === 0;
        }

        static update() {
            if(this.isMagicFireListEmpty()) {
                return;
            }

            let shouldVanish = false;
            //Update fire position etc.
            this.magicFireList.forEach(function(fire) {
                fire.gameObject.update();
                //Process to erase if you jumped out of the screen or hit the object.
                if(!fire.gameObject.isNearTheScreen() || fire.gameObject.shouldVanish){
                    //Clear sprite.
                    shouldVanish = true;
                    SceneManager._scene._spriteset._tilemap.removeChild(fire.sprite);
                }
            });

            //Create new arro list, if necessary.
            if(shouldVanish) {
                this._magicFireList = this.magicFireList.filter(function(fire) {
                    return fire.gameObject.isNearTheScreen() && !fire.gameObject.shouldVanish;
                });
            }
        }
    }

////=============================================================================
//// Bomb_Manager
////  Manage bomb action.
////=============================================================================
    class Bomb_Manager {
        static createBomb(type) {
            const tempSprite = new Sprite_Bomb(type);
            const map        = { sprite : tempSprite, gameObject: type };
            this.bombList.push(map);
            SceneManager._scene._spriteset._tilemap.addChild(tempSprite);

            //Decrease bomb.
            this.refreshBombNumber();
            this.decreaseBomb();
        }

        static canCreateBomb() {
            const settings = param.bombSettings;
            return $gameSwitches.value(Number(settings.switchID)) && this.getRemainingBombs() > 0;
        }

        static decreaseBomb() {
            const id      = Number(param.bombSettings.variableID);
            const max     = Number(param.bombSettings.max);
            const current = $gameVariables.value(id);
            const newNum  = current - 1;
            //Set new number.
            $gameVariables._data[id] = newNum.clamp(0, max);
        }

        static refreshBombNumber() {
            const id  = Number(param.bombSettings.variableID);
            const max = Number(param.bombSettings.max);
            $gameVariables._data[id] = $gameVariables._data[id].clamp(0, max);
        }

        /**
         * @return {Number}
         */
        static getRemainingBombs() {
            const settings = param.bombSettings;
            return $gameVariables.value(Number(settings.variableID));
        }

        /**
         * @return {Array}
         */
        static get bombList() {
            if(!this._bombList) {
                this._bombList = [];
            }
            return this._bombList;
        }

        static get holdingBom() {
            return this._holdingBom;
        }

        static clear() {
            this._bombList = [];
            this._holdingBom = null;
        }

        static isBombListEmpty() {
            return this.bombList.length === 0;
        }

        static bomsXY(x, y) {
            this._holdingBom = this.bombList.filter(function(bomb) {
                return Math.round(bomb.gameObject.x) === x && Math.round(bomb.gameObject.y) === y;
            });
            return this.holdingBom;
        }

        static onPickUpAction() {
            Debug.log('バクダンの持ち上げ開始');
            this.holdingBom[0].gameObject.isPickedUp = true;
        }

        static onThrowAction() {
            Debug.log('バクダンの投擲開始');
            this.holdingBom[0].gameObject.throw();
            this.holdingBom[0] = null;
        }

        static tryDeleteHoldingBom(bomb) {
            if(this.holdingBom && this.holdingBom[0] === bomb) {
                this.holdingBom[0] = null;
            }
        }

        static update() {
            if(this.isBombListEmpty()) {
                return;
            }

            let shouldVanish = false;
            //Update bomb position etc.
            this.bombList.forEach(function(bomb) {
                bomb.gameObject.update();
                //Process to erase if you jumped out of the screen or hit the object.
                if(!bomb.gameObject.isNearTheScreen() || bomb.gameObject.isExplosionAnimeEnd()){
                    //Clear sprite.
                    this.tryDeleteHoldingBom(bomb);
                    shouldVanish = true;
                    SceneManager._scene._spriteset._tilemap.removeChild(bomb.sprite);
                }
            }, this);

            //Create new bomb list, if necessary.
            if(shouldVanish) {
                this._bombList = this.bombList.filter(function(bomb) {
                    return bomb.gameObject.isNearTheScreen() && !bomb.gameObject.isExplosionAnimeEnd();
                });
            }
        }
    }


////=============================================================================
//// Scene_Map
////  Add update function.And action item window.
////=============================================================================
    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        Bullet_Manager.update();
        HookShot_Manager.update();
        Arrow_Manager.update();
        MagicFire_Manager.update();
        Bomb_Manager.update();
    };

    const _Scene_Map_initialize = Scene_Map.prototype.initialize;
    Scene_Map.prototype.initialize = function() {
        _Scene_Map_initialize.call(this);
        Bullet_Manager.clear();
        HookShot_Manager.clear();
        Arrow_Manager.clear();
        MagicFire_Manager.clear();
        Bomb_Manager.clear();
    };

    const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        this.createActionItemWindow();
        _Scene_Map_createAllWindows.call(this);
    };

    Scene_Map.prototype.createActionItemWindow = function() {
        this._actionItemWindow = new Window_ActionItem();
        this.addChild(this._actionItemWindow);
        Actions_Manager.setActionItemWindow(this._actionItemWindow);
        this._actionItemWindow.refreshActionItem();
    };

////=============================================================================
//// Window_ActionItem
////  Show current action item.
////=============================================================================
    class Window_ActionItem extends Window_Base {
        initialize() {
            const width  = 85;
            const height = 85;
            const x      = 20;
            const y      = 20;
            super.initialize(x, y, width, height);
        }

        refreshActionItem() {
            this.contents.clear();
            const action = Actions_Manager.currentAction;
            if(action.name === Actions_Manager.empty.name) {
                return;
            }

            const x = 24;
            const y = 48;
            this.drawActionItem(action, action.obj.fileName, Number(action.obj.index), x, y);
            Debug.log(`${action.obj.fileName}, ${Number(action.obj.index)}`);
        }

        drawActionItem(action, characterName, characterIndex, x, y) {
            var bitmap = ImageManager.loadCharacter(characterName);
            bitmap.addLoadListener(function() {
                var big = ImageManager.isBigCharacter(characterName);
                var pw = bitmap.width / (big ? 3 : 12);
                var ph = bitmap.height / (big ? 4 : 8);
                var n = characterIndex;
                var sx = (n % 4 * 3 + 1) * pw;
                var sy = (Math.floor(n / 4) * 4) * ph;
                this.contents.blt(bitmap, sx, sy, pw, ph, x - pw / 2, y - ph);

                //Draw Remaining count.
                //Why there ? Because, addLoadListener ! For waiting.
                this.drawRemainingCount(action);
            }.bind(this));
        }

        drawRemainingCount(action) {
            if(action.hasLimit) {
                const remaining = $gameVariables.value(Number(action.obj.variableID));
                Debug.log(`${action.name}の残り弾数${remaining}`);
                this.makeFontSmaller();
                this.drawText(remaining, 0, 23, 30);//23 is a magic number, but this is the best size.
                this.resetFontSettings();
            }
        }
    }


////=============================================================================
//// Game_Player
////  Add actions function.
////=============================================================================
    Game_Player.prototype.fireBoomerangAction = function() {
        if (Bullet_Manager.canCreateBullet()) {
            Bullet_Manager.createBullet(new Game_Boomerang(this.x, this.y, this.direction()));
        }
    };

    Game_Player.prototype.fireHookShotAction = function() {
        if (HookShot_Manager.canCreateHookShot()) {
            HookShot_Manager.createHookShot(new Game_HookShot(this.x, this.y, this.direction()));
        }
    };

    Game_Player.prototype.fireArrowAction = function() {
        if (Arrow_Manager.canCreateArrow()) {
            Arrow_Manager.createArrow(new Game_Arrow(this.x, this.y, this.direction()));
        }
    };

    Game_Player.prototype.fireMagicFireAction = function() {
        if (MagicFire_Manager.canCreateMagicFire()) {
            MagicFire_Manager.createMagicFire(new Game_MagicFire(this.x, this.y, this.direction()));
        }
    };

    Game_Player.prototype.fireBombAction = function() {
        if(Bomb_Manager.holdingBom && Bomb_Manager.holdingBom[0]){
            Bomb_Manager.onThrowAction();
        }else if(this.isOnBomb()) {
            Bomb_Manager.onPickUpAction();
        } else {
            if (Bomb_Manager.canCreateBomb()) {
                Bomb_Manager.createBomb(new Game_Bomb(this.x, this.y, this.direction()));
            }
        }
    };

    Game_Player.prototype.isOnBomb = function() {
        const boms = Bomb_Manager.bomsXY(Math.round(this.x), Math.round(this.y));
        return boms.length > 0;
    };

    Game_Player.prototype.updateActions = function() {
        if(Input.isTriggered('ok')) {
            Actions_Manager.fireAction();
        }

        if(Input.isTriggered('pagedown')) {
            Actions_Manager.setNextAction();
        }else if(Input.isTriggered('pageup')){
            Actions_Manager.setPrevAction();
        }
    };

    const _Game_Player_update = Game_Player.prototype.update;
    Game_Player.prototype.update = function(sceneActive) {
        _Game_Player_update.call(this, sceneActive);
        if (sceneActive && this.canMove()) {
            this.updateActions();
        }
    };

    const _Game_Player_canMove = Game_Player.prototype.canMove;
    Game_Player.prototype.canMove = function(sceneActive) {
        const result = _Game_Player_canMove.call(this, sceneActive);
        if(!result) {
            return result;
        }

        if(HookShot_Manager.currentlyInjection) {
            return false;
        }

        return true;
    };

////=============================================================================
//// Game_ActionsBase
////  Base action object.
////=============================================================================
    class Game_ActionsBase extends Game_CharacterBase {
        constructor(x, y, dir) {
            super();

            this.initializeOriginal(x, y, dir);
            this.initializeImage();
            this.initializeBasicSettings();
            this.initializeRegionList();
        }

        initializeOriginal(x, y, dir) {
            const params      = null;//Must be override.
            const correctDir = this.convertDirection(Input.dir8||dir);
            this._angle       = this.convertAngle(Input.dir8||dir);
            this._speed       = 0;//Must be override.
            this._leap        = 0;//Must be override.
            this._range       = 1;//Collider size. Should be override.
            this._canReturn   = false;
            this._regionList   = null;
            this._originalPos = { x:x, y:y };
            this._noteTag     = 'action';//Should be override.
            this._selfId      = 'D';
            this._collidingEvents = new Set();
            this._rotateAngle = null;//Must be override, if use.
            this._startDir    = correctDir;
            this.locate(x+correctDir.x, y+correctDir.y);
        }

        initializeBasicSettings() {
            this.setMoveFrequency(5);
            this.setMoveSpeed(6);
            this.setStepAnime(true);
        }


        /**
         * Must be override.
         */
        initializeImage() {
            /*Sample*/
            /*
            const params   = param.boomerangSettings;
            const fileName = params.fileName;
            const index    = params.index;
            this.setImage(fileName, index);*/
        }

        /**
         * Must be override if use.
         */
        initializeRegionList() {
            /*Sample*/
            /*
            this._regionList = convertParam(param.arrowSettings.region);
            this._regionList = this.regionList.map(function(value, index) {
                return Number(value);
            });*/
        }

        

        get angle() {
            return this._angle;
        }

        get speed() {
            return this._speed;
        }

        get originalPos() {
            return this._originalPos;
        }

        get leap() {
            return this._leap;
        }

        get range() {
            return this._range;
        }

        get canReturn() {
            return this._canReturn;
        }

        set canReturn(value) {
            this._canReturn = value;
        }

        get noteTag() {
            return this._noteTag;
        }

        get selfSwitchId() {
            return this._selfId;
        }

        /**
         * @return {Set}
         */
        get collidingEvents() {
            return this._collidingEvents;
        }

        /**
         * @return {Array}
         */
        get regionList() {
            return this._regionList;
        }

        get rotateAngle() {
            return this._rotateAngle;
        }

        get startDir() {
            return this._startDir;
        }

        convertAngle(dir) {
            switch(dir) {
                case 8 ://up
                    return Math.PI/2;
                case 9 ://right up
                    return Math.PI/4;
                case 7 ://left up
                    return 3/4*Math.PI;
                case 2 ://down
                    return 3/2*Math.PI;
                case 3 ://right down
                    return 7/4*Math.PI;
                case 1 ://left down
                    return 4/3*Math.PI;
                case 6 ://right
                    return 0*Math.PI;
                case 4 ://left
                    return Math.PI;
                default :
                    return Math.PI/2;
            }
        }

        convertDirection(dir) {
            switch(dir) {
                case 8 ://up
                    return { x:0, y:-1 };
                case 9 ://right up
                    return { x:1, y:-1 };
                case 7 ://left up
                    return { x:-1, y:-1 };
                case 2 ://down
                    return { x:0, y:1 };
                case 3 ://right down
                    return { x:1, y:1 };
                case 1 ://left down
                    return { x:-1, y:1};
                case 6 ://right
                    return { x:1, y:0 };
                case 4 ://left
                    return { x:-1, y:0 };
                default :
                    return { x:0, y:0 };
            }
        }

        
        getRotateAngle(dir) {
            switch(dir) {
                case 8 ://up
                    return { angle:0, x:0.5, y:1};
                case 9 ://right up
                    return { angle:Math.PI/6, x:0.5, y:1};
                case 7 ://left up
                    return { angle:5/3*Math.PI, x:0.5, y:1};
                case 2 ://down
                    return { angle:Math.PI, x:0.5, y:0};
                case 3 ://right down
                    return { angle:5/6*Math.PI, x:0.5, y:1};
                case 1 ://left down
                    return { angle:4/3*Math.PI, x:0, y:0};
                case 6 ://right
                    return { angle:Math.PI/2, x:1, y:0.2};
                case 4 ://left
                    return { angle:3/2*Math.PI, x:0, y:0.2};
            }
        }

        regionId() {
            return $gameMap.regionId(Math.round(this.x), Math.round(this.y));
        }

        setPosition(x, y) {
            this._x = x;
            this._y = y;
            this._realX = x;
            this._realY = y;
        }

        isFullyExtended(x, y) {
            const diagonal = Math.abs(this.originalPos.x - x)*(2/3) + Math.abs(this.originalPos.y - y)*(2/3) > this.leap;
            return Math.abs(this.originalPos.x - x) > this.leap || Math.abs(this.originalPos.y - y) > this.leap || diagonal;
        }

        isReturned() {
            return this.canReturn &&
             Math.round(this.x) === Math.round($gamePlayer.x) && Math.round(this.y) === Math.round($gamePlayer.y);
        }

        calcAngleToPlayer(x, y) {
            let r = Math.atan2($gamePlayer.y - y, x - $gamePlayer.x);
            if(r < 0) {
                r = r + 2 * Math.PI;
            }
            return Math.floor((r * 360 / (2 * Math.PI))) * Math.PI / 180;
        }

        onCollisionEnter() {
            $gameMap.events().forEach(function(event) {
                if(this.isEventAlreadyCollide(event)) {
                    return;
                }
                if(!event.isNearTheScreen()) {
                    return;
                }
                var dX = event._realX-this._realX;
                var dY = event._realY-this._realY;
                if(dX*dX + dY*dY < this.range*this.range){
                    this.fireCollisionEnterEvent(event);
                }
            }, this);
        }

        onReturn() {
            this.collidingEvents.clear();
        }

        isEventAlreadyCollide(event) {
            return this.collidingEvents.has(event);
        }

        trySelfSwitchOn(event) {
            let meta  = event.event().meta[this.noteTag];
            if(typeof(meta) === 'string') {
                const key = [event._mapId, event._eventId, meta.toUpperCase()];
                $gameSelfSwitches.setValue(key, true);
                event.refresh();
                Debug.log(`セルフスイッチ${meta.toUpperCase()}ON`);
            }
        }

        fireCollisionEnterEvent(event) {
            this.collidingEvents.add(event);
            if(this.canEventStart(event)) {
                this.trySelfSwitchOn(event);
                event.start();
                Debug.log("イベント発火");
            }
        }

        /**
         * @param {Game_Event} event
         */
        canEventStart(event) {
            const key = [event._mapId, event._eventId, this.selfSwitchId];
            return event.event().meta[this.noteTag] && !$gameSelfSwitches.value(key);
        }

        update() {
            super.update();
            if($gameMap.isEventRunning()) {
                return;
            }
            this.updatePosition();
            this.onCollisionEnter();
        }

        updatePosition() {
            //Get new positon.
            const x = (this._realX+Math.cos(this.angle)*this.speed);
            const y = (this._realY-Math.sin(this.angle)*this.speed);
            //Can return ?
            if(!this.canReturn && this.isFullyExtended(x, y)) {
                this.canReturn = true;
                this.onReturn();
            }

            //Set new position.
            if(this.canReturn) {
                this._angle   = this.calcAngleToPlayer(this.x, this.y);
                const returnX = (this._realX+Math.cos(this.angle)*(-this.speed));
                const returnY = (this._realY-Math.sin(this.angle)*(-this.speed));
                this.setPosition(returnX, returnY);
            } else {
                this.setPosition(x, y);
            }
        }
    }

////=============================================================================
//// Game_Bomb
////  Bomb action object.
////=============================================================================
    class Game_Bomb extends Game_ActionsBase {
        constructor(x, y, dir) {
            super(x, y, dir);
        }

        initializeOriginal(x, y, dir) {
            super.initializeOriginal(x, y, dir);
            const params       = param.bombSettings;
            this._speed        = Number(params.speed);;
            this._leap         = Number(params.leap);
            this._range        = 2.4;
            this._noteTag      = 'bomb';//Should be override.

            this._explodeAnimation   = params.animation;
            this._explosionCount     = 0;
            this._isExploded         = false;
            this._explosionMaxCount  = 180;//180 is about 3 sec.
            this._tone               = [0, 0, 0, 0];
            this._isPickedUp         = false;
            this._isThrowing         = false;
            this.locate(x, y);
        }

        initializeImage() {
            const params = param.bombSettings;
            this.setImage(params.fileName, Number(params.index));
        }

        initializeBasicSettings() {
            super.initializeBasicSettings();
            this.setMoveFrequency(2);
            this.setMoveSpeed(2);
            this.setPattern(0);
        }

        get explodeAnimation() {
            return this._explodeAnimation;
        }

        get explosionCount() {
            return this._explosionCount;
        }

        set explosionCount(value) {
            this._explosionCount = value;
        }

        get isExploded() {
            return this._isExploded;
        }

        get explosionMaxCount() {
            return this._explosionMaxCount;
        }

        get tone() {
            return this._tone;
        }

        get isPickedUp() {
            return this._isPickedUp;
        }

        set isPickedUp(value) {
            this._isPickedUp = value;
        }

        get isThrowing() {
            return this._isThrowing;
        }

        /**
         * Override for throwing action.
         */
        screenZ() {
            return 100;
        }

        resetPattern() {
            ;//There is no action.
        }

        throw() {
            this.isPickedUp  = false;
            this._isThrowing = true;
            this._angle      = this.convertAngle($gamePlayer.direction());
            this.originalPos.x = $gamePlayer.x;
            this.originalPos.y = $gamePlayer.y;
        }

        shouldBombExplode() {
            return this.explosionCount > this.explosionMaxCount && !this.isExploded;
        }

        isExplosionAnimeEnd() {
            return this.isExploded && !this.isAnimationPlaying();
        }

        onCollisionEnter() {
            //There is no function.Bomb should not be trigger.Only Explosion is trigger.
            ;
        }

        onBombHitPreventingObject() {
            //跳ね返り処理
        }

        /**
         * Check the surrounding events and fire collision enter event.
         */
        onCollideWithExplosion() {
            $gameMap.events().forEach(function(event) {
                if(this.isEventAlreadyCollide(event)) {
                    return;
                }
                if(!event.isNearTheScreen()) {
                    return;
                }
                var dX = event._realX-this._realX;
                var dY = event._realY-this._realY;
                if(dX*dX + dY*dY < this.range*this.range){
                    this.fireCollisionEnterEvent(event);
                }
            }, this);
        }

        startExplosion() {
            this.requestAnimation(this.explodeAnimation);
            this.onCollideWithExplosion();
        }

        onBombExplode() {
            this._isExploded = true;
            this._opacity = 0;
            this.startExplosion();
            Debug.log('バクダン爆発');
        }

        onEndFalling() {
            this._isThrowing = false;
            Debug.log('バクダン投げアクション終了');
        }

        update() {
            super.update();
            this.updateCheckingCanPass();
            this.updateExplosionCountUp();
            this.updateFlashingAnimation();
            this.updatePickUp();
        }

        updatePosition() {
            if(!this.isThrowing) {
                return;
            }

            //Get new positon.
            const x = (this._realX+Math.cos(this.angle)*this.speed);
            const y = (this._realY-Math.sin(this.angle)*this.speed);

            //Is fully extended ?
            if(this.isFullyExtended(x, y)) {
                this.onEndFalling();
            }

            //Set new position.
            this.setPosition(x, y);
        }

        updatePickUp() {
            if(!this.isPickedUp) {
                return;
            }
            //Track player.
            this.setPosition($gamePlayer._realX, $gamePlayer._realY - 0.7);
        }

        updateFlashingAnimation() {
            if(this.isExploded) {
                return;
            }

            if(this.explosionCount < this.explosionMaxCount/2) {
                ;//No function.
            } else if(this.explosionCount < this.explosionMaxCount*4/5) {
                this._tone[0] += Math.abs(256/((this.explosionMaxCount/2)-(this.explosionMaxCount*4/5)));
            } else {
                this._opacity = (1 + Math.sin(this.explosionCount / 1)) * 180;
            }
        }

        updateExplosionCountUp() {
            if($gameMessage.isBusy()) {
                return;
            }

            this.explosionCount++;
            if(this.shouldBombExplode()) {
                this.onBombExplode();
            }
        }

        updateCheckingCanPass() {
            if(this.canPass(Math.round(this.x), Math.round(this.y), this.startDir)) {
                Debug.log('ボム：通行可能');
            }else {
                Debug.log('ボム：通行不可');
                this.onBombHitPreventingObject();
            }
        }
    }

////=============================================================================
//// Game_Arrow
////  Arrow object.
////=============================================================================
    class Game_Arrow extends Game_ActionsBase {
        constructor(x, y, dir) {
            super(x, y, dir);
        }

        initializeOriginal(x, y, dir) {
            super.initializeOriginal(x, y, dir);
            const params       = param.arrowSettings;
            const correctDir   = this.convertDirection(dir);
            this._angle        = this.convertAngle(dir);
            this._speed        = Number(params.speed);
            this._leap         = 9999;//This means, not return.
            this._noteTag      = 'arrow';//Should be override.
            this._rotateAngle  = this.getRotateAngle(dir);
            this._startDir     = correctDir;
            this._shouldVanish = false;
            this.locate(x+correctDir.x, y+correctDir.y);
        }

        initializeImage() {
            const params = param.arrowSettings;
            this.setImage(params.fileName, Number(params.index));
        }

        initializeBasicSettings() {
            super.initializeBasicSettings();
            this.setStepAnime(false);
            this.setPattern(0);
        }

        get shouldVanish() {
            return this._shouldVanish;
        }

        resetPattern() {
            ;//There is no action.
        }

        initializeRegionList() {
            this._regionList = convertParam(param.arrowSettings.region);
            this._regionList = this.regionList.map(function(value, index) {
                return Number(value);
            });
        }

        canPass(x, y, d) {
            const isHitRegion = this.regionList.some(function(regionId) {
                return this.regionId() === regionId;
            }, this);

            if(isHitRegion) {//Can pass
                return true;
            }

            return super.canPass(x, y, d);
        }

        onArrowHitPreventingObject() {
            this._shouldVanish = true;
        }

        update() {
            super.update();
            this.updateCheckingCanPass();
        }

        updateCheckingCanPass() {
            if(this.canPass(Math.round(this.x), Math.round(this.y), this.startDir)) {
                Debug.log('矢/火：通行可能');
            }else {
                Debug.log('矢/火：通行不可');
                this.onArrowHitPreventingObject();
            }
        }
    }

////=============================================================================
//// Game_MagicFire
////  Magic fire object.
////=============================================================================
    class Game_MagicFire extends Game_Arrow {

        initializeOriginal(x, y, dir) {
            super.initializeOriginal(x, y, dir);
            const params       = param.magicFireSettings;
            this._speed        = Number(params.speed);
            this._noteTag      = 'magicFire';//Should be override.
        }

        initializeImage() {
            const params = param.magicFireSettings;
            this.setImage(params.fileName, Number(params.index));
        }
        
        initializeRegionList() {
            this._regionList = convertParam(param.magicFireSettings.region);
            this._regionList = this.regionList.map(function(value, index) {
                return Number(value);
            });
        }
    }

////=============================================================================
//// Game_HookShot
////  HookShot object.
////=============================================================================
    class Game_HookShot extends Game_ActionsBase {
        constructor(x, y, dir) {
            super(x, y, dir);
        }

        initializeOriginal(x, y, dir) {
            super.initializeOriginal(x, y, dir);
            const params       = param.hookShotSettings;
            this._speed        = Number(params.speed);
            this._leap         = Number(params.leap);
            this._noteTag      = 'hook';//Should be override.
            this._range        = 0.3;
            this._jumpSpeed    = this.speed*1.5;
            this._isHookActionStarted = false;
            this._isHookActionEnd     = false;
            this._oldPosition  = { x:x, y:y };
            this._playerOldPos = { x:$gamePlayer.x, y:$gamePlayer.y };
            this.initializePassRegionList();

            if(convertParam(params.useDiagonal)) {
                this._dest        = { x:-1, y:-1, dir:Input.dir8||dir };
                this._hookDir     = this.convertDirection(Input.dir8||dir);
                this._rotateAngle = this.getRotateAngle(Input.dir8||dir);
            }else {
                const correctDir = this.convertDirection(dir);
                this._angle       = this.convertAngle(dir);
                this.locate(x+correctDir.x, y+correctDir.y);
                this._dest        = { x:-1, y:-1, dir:dir };
                this._hookDir     = this.convertDirection(dir);
                this._rotateAngle = this.getRotateAngle(dir);
            }
            
            this.createChildren();
        }

        initializeImage() {
            const params = param.hookShotSettings;
            this.setImage(params.fileName, Number(params.index));
        }

        initializeBasicSettings() {
            super.initializeBasicSettings();
            this.setStepAnime(false);
            this.setPattern(0);
        }

        createChildren() {
            this.createChildrenContainer();
            this.createHandle();
            this._chains = [];
        }

        disposeChildren() {
            SceneManager._scene._spriteset._tilemap.removeChild(this._handle.sprite);

            SceneManager._scene._spriteset._tilemap.removeChild(this.childrenContainer);
        }

        createChildrenContainer() {
            this._childrenContainer = new Sprite(new Bitmap());
            SceneManager._scene._spriteset._tilemap.addChild(this._childrenContainer);
        }

        createHandle() {
            const params = param.hookShotSettings;
            this._handle = { sprite:null, gameObject:null };
            this._handle.gameObject  = new Game_HookShotChild(this.x, this.y, 6);
            this._handle.sprite  = new Sprite_Character(this._handle.gameObject);
            SceneManager._scene._spriteset._tilemap.addChild(this._handle.sprite);

            //Set rotate
            this._handle.sprite.anchor.x = this.rotateAngle.x;
            this._handle.sprite.anchor.y = this.rotateAngle.y;
            this._handle.sprite.rotation = this.rotateAngle.angle;
        }

        generateChain(x, y) {
            if(!this.canChainGenerated(x, y)) {
                return;
            }
            const chain = { sprite:null, gameObject:null };
            chain.gameObject = new Game_HookShotChild(x-this._hookDir.x, y-this._hookDir.y, 4);
            chain.sprite     = new Sprite_Character(chain.gameObject);
            
            this.childrenContainer.addChild(chain.sprite);
            this.chains.push(chain);

            //Set rotate
            chain.sprite.anchor.x = this.rotateAngle.x;
            chain.sprite.anchor.y = this.rotateAngle.y;
            chain.sprite.rotation = this.rotateAngle.angle;
        }

        resetPattern() {
            ;//There is no action.
        }

        initializeRegionList() {
            this._regionList = convertParam(param.hookShotSettings.region);
            this._regionList = this.regionList.map(function(value, index) {
                return Number(value);
            });
        }

        initializePassRegionList() {
            this._passRegionList = convertParam(param.hookShotSettings.passRegion);
            this._passRegionList = this.passRegionList.map(function(value, index) {
                return Number(value);
            });
        }

        get jumpSpeed() {
            return this._jumpSpeed;
        }

        get isHookActionStarted() {
            return this._isHookActionStarted;
        }

        get dest() {
            return this._dest;
        }

        get isHookActionEnd() {
            return this._isHookActionEnd;
        }

        get chains() {
            return this._chains;
        }

        get oldPosition() {
            return this._oldPosition;
        }

        get childrenContainer() {
            return this._childrenContainer;
        }

        get playerOldPosition() {
            return this._playerOldPos;
        }

        get passRegionList() {
            return this._passRegionList;
        }

        startHookAction() {
            this._speed = 0;
            this._isHookActionStarted = true;

            const playerDir = this.convertDirection(this.dest.dir);
            this.dest.x = Math.round(this.x - playerDir.x);
            this.dest.y = Math.round(this.y - playerDir.y);

            //Delete handle for animation.
            SceneManager._scene._spriteset._tilemap.removeChild(this._handle.sprite);
            Debug.log('フックアクション開始');
        }

        endHookAction() {
            $gamePlayer.setPosition(this.dest.x, this.dest.y);
            this._isHookActionEnd = true;
            Debug.log('フックアクション終了');
        }

        fireCollisionEnterRegion() {
            this.startHookAction();
        }

        fireCollisionEnterEvent(event) {
            this.collidingEvents.add(event);
            if(this.canEventStart(event)) {
                this.startHookAction();
            }
        }

        onCollisionEnter() {
            super.onCollisionEnter();
            this.regionList.forEach(function(regionId) {
                if(this.regionId() === regionId && !this.isHookActionStarted) {
                    this.fireCollisionEnterRegion();
                }
            }, this);
        }

        calcAngleToHook() {
            let r = Math.atan2(this.y - $gamePlayer.y, $gamePlayer.x - this.x);
            if(r < 0) {
                r = r + 2 * Math.PI;
            }
            return Math.floor((r * 360 / (2 * Math.PI))) * Math.PI / 180;
        }

        isArrivedAtDistination() {
            return Math.round($gamePlayer.x) === this.dest.x && Math.round($gamePlayer.y) === this.dest.y;
        }

        isHookPositionChanged() {
            const differenceX = Math.abs(Math.round(this.x) - this.oldPosition.x);
            const differenceY = Math.abs(Math.round(this.y) - this.oldPosition.y);
            return differenceX > 0 || differenceY > 0;
        }

        canChainGenerated(x, y) {
            const differenceX = Math.abs(Math.round(this.originalPos.x+this._hookDir.x) - x);
            const differenceY = Math.abs(Math.round(this.originalPos.y+this._hookDir.y) - y);
            return (differenceX > 1 || differenceY > 1); 
        }

        isPlayerPositionChanged() {
            const differenceX = Math.abs(Math.round($gamePlayer.x) - this.playerOldPosition.x);
            const differenceY = Math.abs(Math.round($gamePlayer.y) - this.playerOldPosition.y);
            return differenceX > 1 || differenceY > 1;
        }

        onHookHitPreventingObject() {
            Debug.log("通行不可物体にヒット");
            this.canReturn = true;
            this.onReturn();
        }

        canPass(x, y, d) {
            //Flying with hook shots
            const isHitRegion = this.regionList.some(function(regionId) {
                return this.regionId() === regionId;
            }, this);
            if(isHitRegion) {//Can pass
                return true;
            }

            //Can pass through.
            const isHitCanPassRegion = this.passRegionList.some(function(regionId) {
                return this.regionId() === regionId;
            }, this);
            if(isHitCanPassRegion) {
                return true;
            }

            return super.canPass(x, y, d);
        }

        update() {
            super.update();
            this.updateHookAction();
            this.updateGenerater();
            this.updateCheckingCanPass();
        }

        updateCheckingCanPass() {
            if(this.canPass(Math.round(this.x), Math.round(this.y), this.startDir)) {
                //Can pass.
            }else {
                //Can not pass.
                this.onHookHitPreventingObject();
            }
        }

        updateGenerater() {
            if(!this.isHookPositionChanged()) {
                return;
            }

            //Set new position and old position.
            const newX = Math.round(this.x);
            const newY = Math.round(this.y);
            this.oldPosition.x = newX;
            this.oldPosition.y = newY;

            if(this.canReturn) {
                if(this.chains.length > 0){
                    const chain = this.chains.pop();
                    this.childrenContainer.removeChild(chain.sprite);
                }
            } else {
                this.generateChain(newX, newY);
            }
        }

        updateHookAction() {
            if(!this.isHookActionStarted) {
                return;
            }
            if(this.isArrivedAtDistination()) {
                this.endHookAction();
                return;
            }

            const angle   = this.calcAngleToHook();
            const hookX   = ($gamePlayer._realX+Math.cos(angle)*(-this.jumpSpeed));
            const hookY   = ($gamePlayer._realY-Math.sin(angle)*(-this.jumpSpeed));
            $gamePlayer.setPosition(hookX, hookY);

            if(this.isPlayerPositionChanged()) {
                this.playerOldPosition.x = hookX;
                this.playerOldPosition.y = hookY;
                if(this.chains.length > 0){
                    const chain = this.chains.shift();
                    this.childrenContainer.removeChild(chain.sprite);
                }
            }
        }
    }

////=============================================================================
//// Game_HookShotChild
////  Hook shot child object.
////=============================================================================
    class Game_HookShotChild extends Game_CharacterBase {
        constructor(x, y, dir) {
            super();

            this.initializeOriginal(x, y, dir);
        }

        initializeOriginal(x, y, dir) {
            const params = param.hookShotSettings;
            this.setImage(params.fileName, Number(params.index));
            this.setStepAnime(false);
            this.setPattern(0);
            this.setDirection(dir);
            this.locate(x, y);
        }

        pattern() {
            return 0;
        }

        resetPattern() {
            ;//There is no action.
        }
    }

////=============================================================================
//// Game_Boomerang
////  Boomerang object.
////=============================================================================
    class Game_Boomerang extends Game_ActionsBase {
        constructor(x, y, dir) {
            super(x, y, dir);
        }

        initializeOriginal(x, y, dir) {
            super.initializeOriginal(x, y, dir);
            const params      = param.boomerangSettings;
            this._speed       = Number(params.speed);
            this._leap        = Number(params.leap);
            this._noteTag     = 'boomerang';
        }

        initializeImage() {
            const params = param.boomerangSettings;
            this.setImage(params.fileName, Number(params.index));
        }
    }

////=============================================================================
//// Sprite_Bomb
////  Bomb sprite for tone.
////=============================================================================
    class Sprite_Bomb extends Sprite_Character {
        
        update() {
            super.update();
            this.updateTone();
        }

        updateTone() {
            this.setColorTone(this._character.tone);
        }
    }

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
            return 'TsumioActions';
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
