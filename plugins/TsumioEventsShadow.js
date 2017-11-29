//=============================================================================
// TsumioEventsShadow.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.2 2017/11/29 ヘルプの加筆。
// 1.0.1 2017/11/25 オートセーブ機能の追加。
// 1.0.0 2017/11/23 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc This plugin displays shadow.
 * @author Tsumio
 *
 * @param ----Basic Settings----
 * @desc 
 * @default 
 * 
 * @param ShadowPosition
 * @type select
 * @option Right
 * @value Right
 * @option Left
 * @value Left
 * @desc Set the position of the shadow.
 * @default Left
 * 
 * @param ShadowColor
 * @type struct<ShadowColor>
 * @desc Set the color of the shadow.
 * @default {"red":"-150","green":"-150","blue":"-150","gray":"255"}
 * 
 * @param ShowShadowOnDefault
 * @type boolean
 * @desc Show the shadow of all the events.
 * @default false
 * 
 * @help This plugin displays shadow.
 * 
 * ----feature----
 * -> Display shadows in the event.
 * -> You can set position, color, angle.
 * -> The shadow display/non-display can be switched at an arbitrary timing.
 * 
 * ----how to use----
 * You can use this plugin after setting some plugin parameters.
 * You can also operate shadows from plugin commands.
 * 
 * Write "<onShadow>" in the memo field of the event where you want to apply shadows.
 * 
 * ----plugin command----
 * All plugin commands start with "TES".
 * Plugin commands are distinguish uppercase and lowercase.
 * And separate each word with a space.
 * Please make sure.
 * 
 * "TES on eventId" : Show shadow of the specified event.
 * "TES off eventId" : Hide shadow of the specified event.
 * "TES setColor eventId red green blue gray" : Change the color of the specified event. See also [color numbers].
 * "TES setPos eventId anchorX anchorY" : Change the position of the specified event. Also see [anchor].
 * "TES rotate eventId angle" : Change the angle of the specified event. Also see [angle].
 * "TES save" : Save the current shadow setting. See also [save and release].
 * "TES dispose" : Dispose the current shadow setting. See also [save and release].
 * "TES autoSave true/false" : Valid/Invalid automatic saving function.See also [automatic saving function].
 * 
 * If you set "this" to [eventId], the event number of the event that executed the plugin command is substituted.
 * 
 * ----color numbers----
 * The default shadow colors are as follows.
 * 
 * Red: -150
 * Green: -150
 * Blue: -150
 * Gray: 255
 * 
 * Please use it as a reference.
 * 
 * ----anchor----
 * The anchor indicates the relative position from the reference point.
 * The anchor of the normal event is set to X: 0.5 Y: 1.0.
 * And the shadow anchor of the event is set to X: 0.6 Y: 1.0 (in the case of setting on the left).
 * 
 * The anchor is usually specified between -1.0 and 1.0.
 * Even larger or smaller values are acceptable.
 * 
 * ----angle----
 * Angle is specified in radians.
 * Only plugin command "rotate", built-in objects such as Math can be used.
 * For example, you can use Math.PI if you want to specify the PI.
 * Reference URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
 * 
 * ----save and release----
 * After changing the shadow with the plugin command, if you return to the map scene after opening the menu screen, the shadow setting will return to the initial value.
 * To avoid this phenomenon, execute the plugin command "TES save" at an arbitrary timing.
 * Executing the plugin command "TES save" saves the current shadow settings.
 * You can also dispose the current shadow setting by executing the plugin command "TES dispose".
 * 
 * The saved shadow setting is automatically disposed when the event command "move location" is selected.
 * The shadow setting is not saved in the save data.
 * Please execute shadows again by using automatic execution of events etc. if necessary.
 * 
 * ----automatic saving function----
 * When automatic saving function is enabled from the plugin command ("TES autoSave true"), the function equivalent to "TES save" is executed at the timing of each command execution.
 * However, "TES save" is not executed at the timing when automatic saving function is enabled.
 * Also, "TES dispose" is not executed at the timing of invalidation ("TES autoSave false").
 * 
 * It is recommended that you disable autosave if you change the shadow setting frequently (more than a few times per second) since processing may take time.
 * Also, Validity/Invalidity of auto save is stored in the saved data of the main unit.
 * 
 * ----change log----
 * 1.0.2 2017/11/29 Revision the help.
 * 1.0.1 2017/11/25 Add automatic saving function.
 * 1.0.0 2017/11/23 Release.
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
 * @plugindesc 立体的な影を表示するプラグインです。
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * @param 影の位置
 * @type select
 * @option 右側
 * @value Right
 * @option 左側
 * @value Left
 * @desc 影の位置を指定します。
 * @default Left
 * 
 * @param 影の色
 * @type struct<ShadowColor>
 * @desc 影の色を設定します。
 * @default {"red":"-150","green":"-150","blue":"-150","gray":"255"}
 * 
 * @param 影のデフォルト表示
 * @type boolean
 * @desc 全てのイベントに対し、影をデフォルトで表示するかどうかを設定します。
 * @default false
 * 
 * @help 立体的な影を表示するプラグインです。
 * 
 * 【特徴】
 * ・イベントに立体的な影を表示させます。
 * ・位置・色・角度の指定ができます。
 * ・影の表示/非表示は任意のタイミングで切り替えられます。
 * 
 * 【使用方法】
 * プラグインの導入後、プラグインパラメーターを設定することによって使用できます。
 * また、プラグインコマンドから影の操作が可能です。
 * 
 * 影を適用したいイベントのメモ欄に「<onShadow>」を記述してください。
 * 
 * 【プラグインコマンド】
 * 全てのプラグインコマンドは「TES」から始まります。
 * また、説明上では視認性のためにカギカッコを使用していますが、実際にプラグインコマンドに入力する際には
 * カギカッコの入力は不要です。
 * 
 * 全てのプラグインコマンドは大文字と小文字を区別します。
 * 各単語の間は半角スペースで区切ります（全角では認識しません）。
 * 間違わないように気をつけてください。
 * 
 * 「TES on イベント番号」 : 指定されたイベントの影を表示します。
 * 「TES off イベント番号」 : 指定されたイベントの影を非表示にします。
 * 「TES setColor イベント番号 赤 緑 青 灰」 : 指定されたイベントの色を変更します。【色の数値】も参照してください。
 * 「TES setPos イベント番号 アンカーX アンカーY」 : 指定されたイベントの位置を変更します。【アンカー】も参照してください。
 * 「TES rotate イベント番号 角度」 : 指定されたイベントの角度を変更します。【角度】も参照してください。
 * 「TES save」 : 現在の影の設定を保存します。【セーブと解放】も参照してください。
 * 「TES dispose」 : 現在の影の設定を破棄します。 【セーブと解放】も参照してください。
 * 「TES autoSave true/false」 : オートセーブの有効/無効を設定します。【オートセーブ】も参照してください。
 * 
 * なお、イベント番号に「this」を指定した場合、プラグインコマンドを実行したイベントのイベント番号が代入されます。
 * 
 * 【色の数値】
 * 色はデフォルトで
 * 赤：-150
 * 緑：-150
 * 青：-150
 * 灰：255
 * が指定されています。
 * 参考にしてください。
 * 
 * 【アンカー】
 * アンカーは基準点からの相対的な位置を示します。
 * 通常のイベントのアンカーはX:0.5 Y:1.0に設定されており、イベントの影のアンカーはX:0.6 Y:1.0に設定されます（左側設定の場合）。
 * 
 * アンカーは通常-1.0から1.0の間で指定します。
 * これより大きい、または小さな値でも問題ありません。
 * 
 * 【角度】
 * 角度はラジアンで指定します。
 * プラグインコマンドrotateのみ、Mathなどのビルトインオブジェクトが使用できます。
 * 例えば円周率を指定したい場合、Math.PIが利用できます。
 * 参考URL: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math
 * 
 * 【セーブと解放】
 * プラグインコマンドで影を変更したあと、メニュー画面を開いてマップ画面に戻ると影の設定が初期値に戻ってしまいます。
 * この現象を避けるために、任意のタイミングでプラグインコマンド「TES save」を実行してください。
 * プラグインコマンド「TES save」を実行すると、現在の影の設定が保存されます。
 * また、プラグインコマンド「TES dispose」を実行することにより、現在の影の設定を破棄できます。
 * 
 * 保存された影の設定は、イベントコマンドの「場所移動」時に自動で破棄されます。
 * 影の設定はセーブデータにも保存されません。
 * 必要があればイベントの自動実行などを用いて影の再設定をするようにしてください。
 * 
 * 【オートセーブ】
 * プラグインコマンドからオートセーブを有効にした場合（「TES autoSave true」）、各コマンドを実行したタイミングで「TES save」と同等の機能が実行されます。
 * ただしオートセーブを有効にしたタイミングで「TES save」が実行されるわけではありません。
 * また、無効化（「TES autoSave false」)したタイミングで「TES dispose」が実行されるわけでもありません。
 * 
 * 頻繁（1秒間に数回以上）に影の設定を変更する場合、処理が重くなる可能性があるのでオートセーブは無効化することを推奨します。
 * また、オートセーブの有効/無効は本体のセーブデータに記憶されます。
 * 
 * 【更新履歴】
 * 1.0.2 2017/11/29 ヘルプの加筆。
 * 1.0.1 2017/11/25 オートセーブ機能の追加。
 * 1.0.0 2017/11/23 公開。
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
/*~struct~ShadowColor:
 * 
 * @param red
 * @type number
 * @min -255
 * @max 255
 * @desc 赤色の色調.(The color tone of the red).
 * 
 * @param green
 * @type number
 * @min -255
 * @max 255
 * @desc 緑色の色調.(The color tone of the green).
 * 
 * @param blue
 * @type number
 * @min -255
 * @max 255
 * @desc 青色の色調.(The color tone of the blue).
 * 
 * @param gray
 * @type number
 * @min -255
 * @max 255
 * @desc 灰色の色調.(The color tone of the gray).
 * 
 * 
 */

(function() {
    'use strict';
    var pluginName = 'TsumioEventsShadow';

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
    param.shadowPosition         = getParamString(['ShadowPosition', '影の位置']);
    param.shadowColor            = getParamString(['ShadowColor',    '影の色']);
    param.showShadowOnDefault    = getParamString(['ShowShadowOnDefault',    '影のデフォルト表示']);

////=============================================================================
//// Convert parameters.
////=============================================================================
    param.shadowColor          = convertParam(param.shadowColor);
    param.showShadowOnDefault  = convertParam(param.showShadowOnDefault);

////=============================================================================
//// Convert to Number.
////=============================================================================
    param.shadowColor    = convertToNumber(param.shadowColor);


////=============================================================================
//// Settings for plugin command.
////=============================================================================

    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'TES') {
            const eventId = this.convertEventIdTES(args[1]);
            switch (args[0]) {
                case 'on':
                    ShadowManager.showShadow(eventId);
                    ShadowManager.fireAutoSave();
                    break;
                case 'off':
                    ShadowManager.hideShadow(eventId);
                    ShadowManager.fireAutoSave();
                    break;
                case 'setColor':
                    ShadowManager.setShadowColor(eventId, Number(args[2]), Number(args[3]), 
                                        Number(args[4]), Number(args[5]));
                    ShadowManager.fireAutoSave();
                    break;
                case 'setPos':
                    ShadowManager.setShadowPosition(eventId, Number.parseFloat(args[2]), Number.parseFloat(args[3]));
                    ShadowManager.fireAutoSave();
                    break;
                case 'rotate':
                    ShadowManager.rotateShadow(eventId, args[2]);
                    ShadowManager.fireAutoSave();
                    break;
                case 'save':
                    ShadowManager.saveShadow();
                    break;
                case 'dispose':
                    ShadowManager.disposeShadow();
                    break;
                case 'autoSave' :
                    ShadowManager.setAutoSave(convertParam(args[1]));
            }
        }
    };

    Game_Interpreter.prototype.convertEventIdTES = function (eventId) {
        if(eventId === 'this'){
            return this.character(0).eventId();
        }else {
            return Number(eventId);
        }
    };

////=============================================================================
//// Scene_Map
////  Create an alias name to access the shadow sprite.
////=============================================================================
    const _Scene_Map_Scene_Map = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_Scene_Map.call(this);

        //Set shadow sprites to ShadowManager.
        ShadowManager.setShadowSprites(this._spriteset.shadowSprites);
    };

////=============================================================================
//// Spriteset_Map
////  Override for showing shadows.
////=============================================================================
    const _Spriteset_Map_createCharacters = Spriteset_Map.prototype.createCharacters;
    Spriteset_Map.prototype.createCharacters = function() {
        if(ShadowManager.hasSavingData()){
            this.shadowSprites = new ShadowsFactory(SceneManager._scene, this, ShadowManager.getSavingData());
        }else{
            this.shadowSprites = new ShadowsFactory(SceneManager._scene, this);
        }
        _Spriteset_Map_createCharacters.call(this);
    };

////=============================================================================
//// Game_Player
////  When transfer player, dispose shadows.
////=============================================================================
    const _Game_Player_performTransfer = Game_Player.prototype.performTransfer;
    Game_Player.prototype.performTransfer = function() {
        if (this.isTransferring()) {
            ShadowManager.disposeShadow();
        }

        _Game_Player_performTransfer.call(this);
    };

////=============================================================================
//// ShadowManager
////  Manager for shadow sprite.
////=============================================================================
    class ShadowManager {
        constructor() {
            
        }

        static setShadowSprites(sprites) {
            this.sprites = sprites;
        }

        /**
         * @return {Sprite_Character}
         */
        static getShadowSprite(eventId) {
            for(let event of this.getAllShadowSprite()) {
                if(event.character().eventId() === eventId) {
                    return event;
                } 
            }
            return null;
        }

        /**
         * @return {Array}
         */
        static getAllShadowSprite() {
            return this.sprites.eventSprites;
        }

        static showShadow(eventId) {
            const event = this.getShadowSprite(eventId);
            if(event) {
                event.show();
            }
        }

        static hideShadow(eventId) {
            const event = this.getShadowSprite(eventId);
            if(event) {
                event.hide();
            }
        }

        /**
         * @param {number} eventId
         * @param {number} red
         * @param {number} green
         * @param {number} blue
         * @param {number} gray
         */
        static setShadowColor(eventId, red, green, blue, gray) {
            const event = this.getShadowSprite(eventId);
            if(event) {
                const shadowColor = [red, green, blue, gray];
                event.setColorTone(shadowColor);
            }
        }

        /**
         * @param {number} eventId
         * @param {number} anchorX
         * @param {number} anchorY
         * Best anchor is between -1.0 and 1.0.Default anchor : x->0.5, y->1.
         */
        static setShadowPosition(eventId, anchorX, anchorY) {
            const event = this.getShadowSprite(eventId);
            if(event) {
                event.anchor.x = anchorX;
                event.anchor.y = anchorY;
            }
        }

        static rotateShadow(eventId, radian) {
            const event = this.getShadowSprite(eventId);
            if(event) {
                event.rotation = eval(radian);
            }
        }

        static saveShadow() {
            if(this.isMapScene()) {
                this._isSaving      = true;
                this._savingShadows = this.sprites.eventSprites.concat();
            }else {
                console.warn('Error! This scene is not MAP.');
            }
        }

        static getSavingData() {
            if(this.hasSavingData()){
                return this._savingShadows;
            }
        }

        static disposeShadow() {
            this._isSaving      = false;
            this._savingShadows = null;
        }

        static isMapScene() {
            return SceneManager._scene.constructor === Scene_Map;
        }

        static hasSavingData() {
            return this._isSaving;
        }

        /**
         * @param {boolean} valid
         * Set valid true/false.
         */
        static setAutoSave(valid) {
            $gameSystem.shadowAutoSaveTES = valid;
        }

        static shouldAutoSave() {
            return $gameSystem.shadowAutoSaveTES;
        }

        static fireAutoSave() {
            if(this.shouldAutoSave()){
                this.saveShadow();
            }
        }
    }

////=============================================================================
//// ShadowsFactory
////  Class for creating shadows in MapScene.
////  Refer to the memo field.
////=============================================================================

    class ShadowsFactory {
        /**
         * This factory does not function except in the map scene.
         * @param {Scene_Map} parentScene
         */
        constructor(parentScene, parentSpriteset, shadowSprites) {
            this.initialize.apply(this, arguments);
        }

        initialize(parentScene, parentSpriteset, shadowSprites) {
            if(!this.isMapScene()){
                return;//Run this class only on the map scene.
            }

            //Basic settings.
            this.parentScene      = parentScene;
            this.parentSpriteset  = parentSpriteset;
            this.shadowEvents     = null;
            this.eventSprites     = shadowSprites || [];

            this.create();
            this.refresh();
        }

        create() {
            this.shadowEvents = this.getEventsOfHavingShadowTag();
            if(this.eventSprites.length <= 0){
                this.createShadowSprites();
            }else {
                this.addShadowSpritesToParentSpriteset();
            }
        }

        createShadowSprites() {
            if(param.showShadowOnDefault){
                //Shadows are displayed on all events.
                this.getAllEvents().forEach(function(event) {
                    //Add shadow sprite settings to _characterSprites.
                    this.eventSprites.push(new Sprite_CharacterShadow(event));
                }, this);
            }else{
                //Set sprites in this class only when write "onShadow" tag.
                this.shadowEvents.forEach(function(event) {
                    //Add shadow sprite settings to _characterSprites.
                    this.eventSprites.push(new Sprite_CharacterShadow(event));
                }, this);
            }

            this.addShadowSpritesToParentSpriteset();
        }

        addShadowSpritesToParentSpriteset() {
            //Add sprites in the parent spriteset.
            this.eventSprites.forEach(function(sprite) {
                this.parentSpriteset._tilemap.addChild(sprite);
            }, this);
        }

        refresh() {
        }

        update() {
        }

        getAllEvents() {
            return $gameMap.events();
        }

        getEventsOfHavingShadowTag() {
            const events = this.getAllEvents();

            const result = events.filter(function(event) {
                return this.hasShadowTag(event.eventId());
            }, this);

            return result;
        }

        /**
         * @param {number} eventId
         * eventId : Don't set the event itself but event number. 
         */
        hasShadowTag(eventId) {
            return $dataMap.events[eventId].note.contains('<onShadow>');
        }

        isMapScene() {
            return SceneManager._scene.constructor === Scene_Map;
        }
    }

////=============================================================================
//// Sprite_CharacterShadow
////  Sprite for shadow.
////=============================================================================
    class Sprite_CharacterShadow extends Sprite_Character {
        constructor(character) {
            super(character);
        }

        initialize(character) {
            super.initialize(character)
        }

        initMembers() {
            super.initMembers();
            const shadowPosition = (param.shadowPosition === 'Left') ? 0.6 : 0.4;
            this.anchor.x = shadowPosition;
        }

        setCharacterBitmap() {
            super.setCharacterBitmap();

            this.setShadowColorTone();
        }

        setShadowColorTone() {
            const red   = param.shadowColor.red;
            const green = param.shadowColor.green;
            const blue  = param.shadowColor.blue;
            const gray  = param.shadowColor.gray;

            const shadowColor = [red, green, blue, gray];
            this.setColorTone(shadowColor);
        }

        character() {
            return this._character;
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
            return 'TsumioEventsShadow';
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
