//=============================================================================
// MultipleWindowSkinSystem.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2018 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.9 2019/03/03 並列処理で注釈を実行した際に正常に動作しない不具合を修正。
// 1.0.8 2019/02/16 名前の色変更を可能にした。
// 1.0.7 2019/02/10 MADOへ対応させた。
// 1.0.6 2018/10/09 コモンイベントの並列処理が走っている際にピクチャが表示されない不具合を修正。
//                  名前欄を制御文字の中身に従って拡張するように変更。
// 1.0.5 2018/09/22 並列処理が走っている際にピクチャが表示されない不具合を修正。
// 1.0.4 2018/08/31 起動時に発生するエラーを修正。
// 1.0.3 2018/01/21 ウィンドウの画像を正常に読み込めるよう修正。
// 1.0.2 2018/01/12 ライセンス表記を修正。
// 1.0.1 2018/01/12 注釈が不正な場合、通常のウィンドウを表示するよう変更。
// 1.0.0 2018/01/12 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

//=============================================================================
// jQuery.easing(include EASING EQUATIONS) is:
// Copyright (c) 2008 George McGinley Smith
// EASING EQUATIONS is:
// Copyright (c) 2001 Robert Penner
// 
// Neither the name of the the names of contributors may be used to endorse or
// promote products derived from this software without specific prior written permission.
//=============================================================================

/*:
 * @plugindesc Dynamically change the image and display method of the message window.
 * @author Tsumio
 *
 * @param ----Basic Settings----
 * @desc 
 * @default 
 * 
 * @param WindowsSettings
 * @type struct<WindowSettings>[]
 * @desc Settings of windows.
 * 
 * @param PictureId
 * @type number
 * @max 999
 * @desc Picture ID to use for standing picture.
 * @default 100
 * 
 * @help Dynamically change the image and display method of the message window.
 * 
 * ----feature----
 * -> Dynamically change the image and display method of the message window.
 * -> Easing available.
 * 
 * ----how to use----
 * After introducing this plugin, please set the window settings from the plugin parameter.
 * You can set any number of windows.
 * 
 * Parameters meaning:
 * ・uniqueID -> Unique value used to distinguish message windows
 * ・skin: -> Skin image to apply to message window
 * ・actorName -> Name of the name window
 * ・picture -> Picture settings to be linked with the window
 * ・opacity -> Opacity
 * ・tone -> Tone
 * ・movement -> Where to display windows from
 * ・duration -> Time until easing stops
 * ・easingType -> Easing type
 * 
 * After setting the parameters, create a "show text" event in the same way as usual of the event editor.
 * At this time, please create an "comment" event in front of the corresponding sentence.
 * Write a character string set with uniqueID in "comment".
 * It is also possible to give uniqueID "Black" to sentence A and give uniqueID "White" to sentence B in one event.
 * 
 * Please do the above for each "show text" event.
 * When you run the game and start the event, a message window with uniqueID set in the "comment" event will be displayed.
 * 
 * If the "comment" event is not set, a normal message window will be displayed.
 * 
 * ---picture----
 * The picture uses the number specified by the "pictureId" of the plugin parameter.
 * If you leave the fileName parameter of the picture blank, the picture will not be displayed.
 * 
 * ----name window----
 * It is displayed only when actorName is set.
 * 
 * ---easing----
 * What is easing ?
 * See http://easings.net/
 * 
 * EASING EQUATIONS of this program is created by Robert Penner.
 * See http://robertpenner.com/easing/
 * 
 * In addition, I created the easing function by referring to the code published by George McGinley Smith.
 * See https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
 * 
 * I may be paying attention to licenses, but if there is any violation please contact me.
 * 
 * ----plugin command----
 * There is no plugin command.
 * 
 * ----change log---
 * 1.0.9 2019/03/03 Fixed bug that does not work properly when comment is executed in parallel processing.
 * 1.0.8 2019/02/16 Possible to change the color of the name.
 * 1.0.7 2019/02/10 Corresponded to MADO.
 * 1.0.6 2018/10/09 Fix a bug that picture is not displayed when parallel common event is running.
 *                  Changed name window to expand according to contents of control characters.
 * 1.0.5 2018/09/22 Fix a bug that picture is not displayed when parallel event is running.
 * 1.0.4 2018/08/31 Fix a bug that cant' load game.
 * 1.0.3 2018/01/21 Fix a bug that can't load windows images.
 * 1.0.2 2018/01/12 Fix license notation.
 * 1.0.1 2018/01/12 If comment is invalid, to display normal window.
 * 1.0.0 2018/01/12 Release.
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
 * @plugindesc メッセージウィンドウの画像や表示方法を動的に変更できるようにします。
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * @param ウィンドウの設定
 * @type struct<WindowSettings>[]
 * @desc ウィンドウの設定。
 * 
 * @param ピクチャ番号
 * @type number
 * @max 999
 * @desc 立ち絵の表示に使用するピクチャ番号。
 * @default 100
 * 
 * @help メッセージウィンドウの画像や表示方法を動的に変更できるようにします。
 * 
 * 【特徴】
 * ・メッセージウィンドウの画像や表示方法を動的に変更できるようにします。
 * ・イージングが利用できます。
 * 
 * 【使用方法】
 * プラグインの導入後、プラグインパラメーターからウィンドウの設定をおこなってください。
 * ウィンドウはいくつでも設定できます。
 * 
 * 各パラメーターは次のような意味です。
 * ・uniqueID： メッセージウィンドウを区別するために使用する一意の値
 * ・skin: メッセージウィンドウに適用するスキン画像
 * ・actorName:名前ウィンドウに表示する名前
 * ・picture：ウィンドウの表示に連動させるピクチャの設定
 * ・opacity: 透明度
 * ・tone: 色調
 * ・movement: どこからウィンドウを表示させるか
 * ・duration: イージングが停止するまでの時間
 * ・easingType: イージングの種類
 * 
 * パラメーター設定後、イベントエディタの「文章の表示」で通常と同じように文章の表示イベントを作成します。
 * このとき、該当の文章の一つ手前に「注釈」イベントを作成してください。
 * 「注釈」にはuniqueIDで設定した文字列を書き込みます。
 * 一つのイベント内でAという文章にはuniqueID「Black」を与え、Bという文章にはuniqueID「White」を与えるといったことも可能です。
 *  
 * 以上を各文章に対しておこなってください。
 * ゲームを実行し、イベントを起動すると「注釈」イベントで設定したuniqueIDのメッセージウィンドウが表示されます。
 * 
 * なお、「注釈」イベントが設定されていない場合、通常のメッセージウィンドウが表示されます。
 * 
 * 【ピクチャ】
 * ピクチャはプラグインパラメータの「ピクチャ番号」で指定した番号を利用します。
 * また、ピクチャのfileNameパラメータを空白にしておくと、ピクチャは表示されません。
 * 
 * 【名前ウィンドウ】
 * actorNameを設定した場合にのみ表示されます。
 * 
 * 【イージング】
 * イージングがどのような動作をするのかは、イージング早見表が参考になるかもしれません。
 * http://easings.net/ja
 * 
 * なお、当プログラムで使用しているイージングの計算式はRobert Penner氏によって作成されました。
 * http://robertpenner.com/easing/
 * 
 * また、George McGinley Smith氏が公開しているコードを参考にイージングの機能を作成しました。
 * https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
 * 
 * ライセンスには注意しているつもりですが、もし何か違反があればご連絡ください。
 * 
 * 【プラグインコマンド】
 * プラグインコマンドはありません。
 * 
 * 【更新履歴】
 * 1.0.9 2019/03/03 並列処理で注釈を実行した際に正常に動作しない不具合を修正。
 * 1.0.8 2019/02/16 名前の色変更を可能にした。
 * 1.0.7 2019/02/10 MADOへ対応させた。
 * 1.0.6 2018/10/09 コモンイベントの並列処理が走っている際にピクチャが表示されない不具合を修正。
 *                  名前欄を制御文字の中身に従って拡張するように変更。
 * 1.0.5 2018/09/22 並列処理が走っている際にピクチャが表示されない不具合を修正。
 * 1.0.4 2018/08/31 起動時に発生するエラーを修正。
 * 1.0.3 2018/01/21 ウィンドウの画像を正常に読み込めるよう修正。
 * 1.0.2 2018/01/12 ライセンス表記を修正。
 * 1.0.1 2018/01/12 注釈が不正な場合、通常のウィンドウを表示するよう変更。
 * 1.0.0 2018/01/12 公開。
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
/*~struct~WindowSettings:
 * 
 * @param uniqueID
 * @type string
 * @desc ユニークID(Unique ID).
 * 
 * @param skin
 * @type file
 * @desc スキン(Skin).
 * @dir img/system
 * 
 * @param actorName
 * @type string
 * @desc アクター名(Actor name).
 * 
 * @param picture
 * @type struct<Picture>
 * @desc ピクチャの設定(Picture settings).
 * 
 * @param opacity
 * @type number
 * @max 255
 * @desc 透明度(Opacity).
 * @default 192
 * 
 * @param tone
 * @type struct<Tone>
 * @desc 色調(Tone).
 * @default {"red":"0","green":"0","blue":"0"}
 * 
 * @param movement
 * @type select
 * @option None
 * @option fromTop
 * @option fromBottom
 * @option fromRight
 * @option fromLeft
 * @desc 動作(Movement).
 * @default None
 * 
 * @param duration
 * @type number
 * @decimals 1
 * @desc 期間(Duration)。秒(Sec)。
 * @default 0.3
 * 
 * @param easingType
 * @type select
 * @option linear
 * @option easeInQuad
 * @option easeOutQuad
 * @option easeInOutQuad
 * @option easeInCubic
 * @option easeOutCubic
 * @option easeInOutCubic
 * @option easeInQuart
 * @option easeOutQuart
 * @option easeInOutQuart
 * @option easeInQuint
 * @option easeOutQuint
 * @option easeInOutQuint
 * @option easeInSine
 * @option easeOutSine
 * @option easeInOutSine
 * @option easeInExpo
 * @option easeOutExpo
 * @option easeInOutExpo
 * @option easeInCirc
 * @option easeOutCirc
 * @option easeInOutCirc
 * @option easeInElastic
 * @option easeOutElastic
 * @option easeInOutElastic
 * @option easeOutBounce
 * @desc イージングの種類(Easing type).
 * @default linear
 * 
 */
/*~struct~Tone:
 * 
 * @param red
 * @type number
 * @max 255
 * @desc 赤(Red).
 * @default 0
 * 
 * @param green
 * @type number
 * @max 255
 * @desc 緑(Green).
 * @default 0
 * 
 * @param blue
 * @type number
 * @max 255
 * @desc 青(Blue).
 * @default 0
 * 
 */
/*~struct~Picture:
 * 
 * @param fileName
 * @type file
 * @desc ピクチャのファイル名前(File name of the picture).
 * @dir img/pictures
 * 
 * @param origin
 * @type select
 * @option 左上(LeftTop)
 * @value 0
 * @option 中央(Center)
 * @value 1
 * @desc 原点(Origin).
 * @default 0
 * 
 * @param x
 * @type number
 * @max 10000
 * @min -10000
 * @desc X座標(X coordinate).
 * @default 0
 * 
 * @param y
 * @type number
 * @max 10000
 * @min -10000
 * @desc Y座標(Y coordinate).
 * @default 0
 * 
 * @param scaleX
 * @type number
 * @max 10000
 * @min -10000
 * @desc 幅の拡大率。パーセンテージ。(Scale X.Percentage)
 * @default 100
 * 
 * @param scaleY
 * @type number
 * @max 10000
 * @min -10000
 * @desc 高さの拡大率。パーセンテージ。(Scale Y.Percentage)
 * @default 100
 * 
 * @param opacity
 * @type number
 * @max 255
 * @desc 透明度(Opacity)
 * @default 255
 * 
 * @param blendMode
 * @type select
 * @option 通常(Normal)
 * @value 0
 * @option 加算(Addition)
 * @value 1
 * @option 乗算(Multiply)
 * @value 2
 * @option スクリーン(Screen)
 * @value 3
 * @desc 合成方法(BlendMode)
 * @default 0
 * 
 */

(function() {
    'use strict';
    var pluginName = 'MultipleWindowSkinSystem';

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
    //Basic Stteings
    param.windowsSettings        = getParamString(['WindowsSettings', 'ウィンドウの設定']);
    param.pictureId               = getParamNumber(['PictureId',   'ピクチャ番号']);

////==============================
//// Convert parameters.
////==============================
    param.windowsSettings        = convertArrayParam(param.windowsSettings);

////==============================
//// Convert to Number.
////==============================
    //None

////=============================================================================
//// Scene_Boot
///   Override this class for loading images.
////=============================================================================
    const _Scene_Boot_loadSystemWindowImage      = Scene_Boot.prototype.loadSystemWindowImage;
    Scene_Boot.prototype.loadSystemWindowImage = function() {
        _Scene_Boot_loadSystemWindowImage.call(this);

        //Addtional window images.
        for(let setting of param.windowsSettings) {
            ImageManager.reserveSystem(setting.skin);
        }
    };

////=============================================================================
//// Scene_Map
////  Add MultipleWindow.
////=============================================================================
    const _Scene_Map_createMessageWindow = Scene_Map.prototype.createMessageWindow;
    Scene_Map.prototype.createMessageWindow = function() {
        _Scene_Map_createMessageWindow.call(this);
        this.createMultipleMessageWindows();
    };

    Scene_Map.prototype.createMultipleMessageWindows = function() {
        const factory       = new WindowFactory();
        this._multipleMessageWindow = new Map();
        for(let setting of param.windowsSettings) {
            this._multipleMessageWindow.set(setting.uniqueID, factory.getInstance(setting.uniqueID));
            this.addWindow(this._multipleMessageWindow.get(setting.uniqueID));
            this._multipleMessageWindow.get(setting.uniqueID).subWindows().forEach(function(window) {
                this.addWindow(window);
            }, this);
        }
    };

////=============================================================================
//// MultipleWindow_Base
////  Inherit from Window_Message.
////=============================================================================
    const _Window_Message_canStart = Window_Message.prototype.canStart;
    Window_Message.prototype.canStart = function() {
        const result = _Window_Message_canStart.call(this);
        return result && this.isEnabled();
    };

    const _Window_Message_updateWait = Window_Message.prototype.updateWait;
    Window_Message.prototype.updateWait = function() {
        const result = _Window_Message_updateWait.call(this);
        this.modifyWindow();
        return result;
    };

    const _Window_Message_startInput = Window_Message.prototype.startInput;
    Window_Message.prototype.startInput = function() {
        if(!this.isEnabled()) {
            return false;
        }
        const result = _Window_Message_startInput.call(this);
        return result;
    };

    Window_Message.prototype.modifyWindow = function() {
        if(this.isEnabled()) {
            this.show();
        }else {
            //HACK : These code may cause problems.
            this.close();
            this.hide();
        }
    };

    Window_Message.prototype.isEnabled = function() {
        return $gameMessage.currentWindow === null || !this.anyMultipleWindowValid();
    };

    Window_Message.prototype.anyMultipleWindowValid = function() {
        for(let setting of param.windowsSettings) {
            if(setting.uniqueID === $gameMessage.currentWindow) {
                return true;
            }
        }
        return false;
    }

////=============================================================================
//// Game_Interpreter
////  Decide the appropriate window from the comments.
////=============================================================================

    const _Game_Interpreter_initialize = Game_Interpreter.prototype.initialize;
    Game_Interpreter.prototype.initialize = function(depth, isParallel) {
        _Game_Interpreter_initialize.apply(this, arguments);
       
        this._isParalell = isParallel;
    };

    const _Game_Interpreter_command108 = Game_Interpreter.prototype.command108;
    Game_Interpreter.prototype.command108 = function() {//Comment
        if(this._isParalell) {
            return _Game_Interpreter_command108.call(this);
        }
        $gameMessage.currentWindow = this._params[0];

        const result = _Game_Interpreter_command108.call(this);
        return result;
    };

    const _Game_Interpreter_terminate = Game_Interpreter.prototype.terminate;
    Game_Interpreter.prototype.terminate = function() {
        _Game_Interpreter_terminate.call(this);

        //After the event ends, forcibly erase the picture.
        if(!this._isParalell) {
            PictureAction.erase();
        }
    };

////=============================================================================
//// Game_Event
////  Override to distinguish between interpreters.
////=============================================================================

    const _Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
    Game_Event.prototype.setupPageSettings = function() {
        _Game_Event_setupPageSettings.call(this);
        if (this._trigger === 4) {
            this._interpreter = new Game_Interpreter(0, true);
        }
    };

////=============================================================================
//// Game_CommonEvent
////  Override to distinguish between interpreters.
////=============================================================================

    const _Game_CommonEvent_refresh = Game_CommonEvent.prototype.refresh;
    Game_CommonEvent.prototype.refresh = function() {
        _Game_CommonEvent_refresh.call(this);
        if(this.isActive() && this._interpreter) {
            this._interpreter._isParalell = true;
        }
    };

////=============================================================================
//// Game_Message
////  Add ccurent window information.
////=============================================================================
    const _Game_Message_clear = Game_Message.prototype.clear;
    Game_Message.prototype.clear = function() {
        _Game_Message_clear.call(this);
        this.currentWindow = null;
    };

////=============================================================================
//// PictureAction
////  Create a picture.
////=============================================================================
    class PictureAction {
        /**
         * @param {PictureSettings} settings
         */
        static tryShow(settings) {
            if(!this.canShow(settings.FILE_NAME)){
                return false;
            }
            $gameScreen.showPicture(param.pictureId, settings.FILE_NAME, settings.FILE_NAME,
                 settings.X, settings.Y, settings.SCALE_X, settings.SCALE_Y, settings.OPACITY, settings.BLEND_MODE);
            return true;
        }

        static erase() {
            $gameScreen.erasePicture(param.pictureId);
        }

        static canShow(fileName) {
            return fileName.length > 0;
        }
    }

////=============================================================================
//// PictureSettings
////  Settings.
////=============================================================================
    class PictureSettings {
        constructor(settings) {
            this.initialize.apply(this, arguments);
        }

        initialize(settings) {
            this._fileName  = settings.fileName;
            this._origin    = Number(settings.origin);
            this._x         = Number(settings.x);
            this._y         = Number(settings.y);
            this._scaleX    = Number(settings.scaleX);
            this._scaleY    = Number(settings.scaleY);
            this._opacity   = Number(settings.opacity);
            this._blendMode = Number(settings.blendMode);
        }

        get FILE_NAME() {
            return this._fileName;
        }

        get ORIGIN() {
            return this._origin;
        }

        get X() {
            return this._x;
        }

        get Y() {
            return this._y;
        }

        get SCALE_X() {
            return this._scaleX;
        }

        get SCALE_Y() {
            return this._scaleY;
        }

        get OPACITY() {
            return this._opacity;
        }

        get BLEND_MODE() {
            return this._blendMode;
        }
    }

////=============================================================================
//// EasingFactory
////  Create easing data.
////  t: current time, b: begInnIng value, c: change In value, d: duration
////
////  EASING EQUATIONS are created by Robert Penner.
////  See http://robertpenner.com/easing/
////
////  And I referred to jQuery Easing written by George McGinley Smith.
////  See https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
////=============================================================================
//=============================================================================
// jQuery.easing(include EASING EQUATIONS) is:
// Copyright (c) 2008 George McGinley Smith
// EASING EQUATIONS is:
// Copyright (c) 2001 Robert Penner
// 
// Neither the name of the the names of contributors may be used to endorse or
// promote products derived from this software without specific prior written permission.
//=============================================================================
    class EasingFactory {
        /**
         * Get initialize location.
         */
        static create(type, windowWidth, windowHeight, easingType) {
            const initialPosition = this.getInitialPosition(type, windowWidth, windowHeight);
            const data = { initPos:initialPosition, easingFunc : this[easingType] };
            return data;
        }

        static getInitialPosition(type, windowWidth, windowHeight) {
            const posList  = this.getPositionList(type, windowWidth, windowHeight);

            for(let elm of posList) {
                if(elm.type === type) {
                    return elm;
                }
            }
            return posList[0];//None
        }

        static getPositionList(type, windowWidth, windowHeight) {
            const defaultX = (Graphics.boxWidth - windowWidth) / 2;
            const defaultY = $gameMessage.positionType() * (Graphics.boxHeight - windowHeight) / 2;
            const posList  = []; 

            //Push.
            posList.push({ x:defaultX, y:defaultY, type:'None' });
            posList.push({ x:defaultX, y:-windowHeight, type:'fromTop' });
            posList.push({ x:defaultX, y:(Graphics.boxHeight + windowHeight), type:'fromBottom' });
            posList.push({x:defaultX + windowWidth, y:defaultY, type:'fromRight'});
            posList.push({x:-windowWidth, y:defaultY, type:'fromLeft'});

            return posList;
        }

        // t: current time, b: begInnIng value, c: change In value, d: duration
        static linear(t, b, c, d) {
            return c*t/d+b;
        }

        static easeInQuad(t, b, c, d) {
            return c*(t/=d)*t + b;
        }

        static easeOutQuad(t, b, c, d) {
            return -c *(t/=d)*(t-2) + b;
        }

        static easeInOutQuad(t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) - 1) + b;
        }

        static easeInCubic(t, b, c, d) {
            return c*(t/=d)*t*t + b;
        }

        static easeOutCubic(t, b, c, d) {
            return c*((t=t/d-1)*t*t + 1) + b;
        }

        static easeInOutCubic(t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        }

        static easeInQuart(t, b, c, d) {
            return c*(t/=d)*t*t*t + b;
        }

        static easeOutQuart(t, b, c, d) {
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        }

        static easeInOutQuart(t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        }

        static easeInQuint(t, b, c, d) {
            return c*(t/=d)*t*t*t*t + b;
        }

        static easeOutQuint(t, b, c, d) {
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        }

        static easeInOutQuint(t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
            return c/2*((t-=2)*t*t*t*t + 2) + b;
        }

        static easeInSine(t, b, c, d) {
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        }

        static easeOutSine(t, b, c, d) {
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        }

        static easeInOutSine(t, b, c, d) {
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        }

        static easeInExpo(t, b, c, d) {
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        }

        static easeOutExpo(t, b, c, d) {
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        }

        static easeInOutExpo(t, b, c, d) {
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
            return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }

        static easeInCirc(t, b, c, d) {
            return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
        }

        static easeOutCirc(t, b, c, d) {
            return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
        }

        static easeInOutCirc(t, b, c, d) {
            if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
        }

        static easeInElastic(t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        }

        static easeOutElastic(t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
        }

        static easeInOutElastic(t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
        }

        static easeOutBounce(t, b, c, d) {
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        }
    }

////=============================================================================
//// MultipleWindow_Base
////  Inherit from Window_Message.
////=============================================================================
    class MultipleWindow_Base extends Window_Message {
        /**
         * @param {MultipleWindow_Settings} settings
         */
        initialize(settings) {
            this._settings   = settings;
            this._easing     = null;
            this._easingTime = 0;
            super.initialize();

            this.loadWindowskin();//Note:MADOとの競合を解消
        }

        /**
         * @return {MultipleWindow_Settings}
         */
        get SETTINGS() {
            return this._settings;
        }

        loadWindowskin() {
            this.windowskin = ImageManager.loadSystem(this.SETTINGS.SKIN_NAME);
        }

        standardBackOpacity() {
            return this.SETTINGS.OPACITY;
        }

        hide() {
            super.hide();
            this._actorNameWindow.hide();
        }

        updateTone() {
            const tone = this.SETTINGS.TONE;
            this.setTone(tone.red, tone.blue, tone.green);
        }

        canStart() {
            //NOTE : Don't use "super.canStart()".It cause some troubles.
            return $gameMessage.hasText() && !$gameMessage.scrollMode() && this.isEnabled();
        }

        createSubWindows() {
            super.createSubWindows();
            this._goldWindow   = new MultipleWindow_Gold(0, 0, this.SETTINGS);
            this._goldWindow.x = Graphics.boxWidth - this._goldWindow.width;
            this._goldWindow.openness = 0;
            this._choiceWindow    = new MultipleWindow_ChoiceList(this, this.SETTINGS);
            this._numberWindow    = new MultipleWindow_NumberInput(this, this.SETTINGS);
            this._itemWindow      = new MultipleWindow_EventItem(this, this.SETTINGS);
            this._actorNameWindow = new MultipleWindow_ActorName(this, this.SETTINGS);
        }

        //Override
        subWindows() {
            return [this._goldWindow, this._choiceWindow,
                    this._numberWindow, this._itemWindow,
                    this._actorNameWindow];
        }

        update() {
            super.update();

            this.updateEasing();
        }

        updateEasing() {
            if(!this._easing) {
                return;
            }
            //Initialize.
            const startValueX  = this._easing.initPos.x;
            const startValueY  = this._easing.initPos.y;
            const changeValueX = this.destX - startValueX;
            const changeValueY = this.destY - startValueY;
            const duration     = this.SETTINGS.DURATION;

            //Update position.
            if(this.easingTime <= duration){
                this.x = this._easing.easingFunc(this.easingTime, startValueX, changeValueX, duration);
                this.y = this._easing.easingFunc(this.easingTime, startValueY, changeValueY, duration);
            }

            //Update time.
            this.updateEasingTime();
        }

        startEasing() {
            //Initialize destination.
            this.destX = this.x;
            this.destY = this.y;

            //Set initial location.
            this._easing = EasingFactory.create(this.SETTINGS.MOVEMENT,
                 this.windowWidth(), this.windowHeight(), this.SETTINGS.EASING_TYPE);
            this.x = this._easing.initPos.x;
            this.y = this._easing.initPos.y;

            //Initialize time.
            this.resetEasingTime();
        }

        startMessage() {
            super.startMessage();
            this.startEasing();
            this._actorNameWindow.start();
            this.tryShowPicture();
        }

        updatePlacement() {
            super.updatePlacement();
            this.x = (Graphics.boxWidth - this.windowWidth()) / 2;//Initial position.
        }

        /**
         * Can enable this window ?
         */
        isEnabled() {
            //Override.
            return $gameMessage.currentWindow === this.SETTINGS.UNIQUE_ID;
        }

        get easingTime() {
            return this._easingTime/60;
        }

        updateEasingTime() {
            this._easingTime++;
        }

        resetEasingTime() {
            this._easingTime = 0;
        }

        tryShowPicture() {
            const isValid = PictureAction.tryShow(this.SETTINGS.PICTURE);
            if(!isValid) {
                PictureAction.erase();
            }
        }
    }

////=============================================================================
//// SettingsFactory
////  MultipleWindow_Settings of factory.
////=============================================================================
    class WindowFactory {
        constructor() {
            this.initialize.apply(this, arguments);
        }

        initialize() {
            const settings  = new SettingsFactory();
            this._instances = new Map();

            //Set all settings from parameter.
            for(let entry of settings.instances.entries()) {
                this._instances.set(entry[0], new MultipleWindow_Base(entry[1]));//key, value
            }
        }

        get instances() {
            return this._instances;
        }

        getInstance(windowName) {
            return this.instances.get(windowName);
        }

        existInstances() {
            return !!this._instances;
        }
    }

////=============================================================================
//// SettingsFactory
////  MultipleWindow_Settings of factory.
////=============================================================================
    class SettingsFactory {
        constructor() {
            this.initialize.apply(this, arguments);
        }

        initialize() {
            this._instances = new Map();
            //Set all settings from parameter.
            for(let setting of param.windowsSettings) {
                this._instances.set(setting.uniqueID, 
                    new MultipleWindow_Settings(setting.uniqueID, setting.skin,
                         setting.opacity, setting.tone, setting.movement,
                         setting.duration, setting.easingType,
                         setting.actorName, setting.picture));
            }
        }

        get instances() {
            return this._instances;
        }

        getInstance(windowName) {
            return this.instances.get(windowName);
        }

        existInstances() {
            return !!this._instances;
        }
    }


////=============================================================================
//// MultipleWindow_Settings
////  Multiple window settings.
////=============================================================================
    class MultipleWindow_Settings {
        constructor(uniqueID, skinName, opacity, tone, movement, duration, easingType, actorName, picture) {
            this.initialize.apply(this, arguments);
        }

        initialize(uniqueID, skinName, opacity, tone, movement, duration, easingType, actorName, picture) {
            this._uniqueID    = uniqueID;
            this._skinName    = skinName;
            this._opacity     = Number(opacity);
            this._tone        = convertToNumber(convertParam(tone));
            this._movement    = movement;
            this._duration    = duration;
            this._easingType  = easingType;
            this._actorName   = actorName;
            this._picture     = new PictureSettings(convertParam(picture));
        }

        /**
         * @return {String}
         */
        get SKIN_NAME() {
            return this._skinName;
        }

        /**
         * @return {String}
         */
        get UNIQUE_ID() {
            return this._uniqueID;
        }

        /**
         * @return {Number}
         */
        get OPACITY() {
            return this._opacity;
        }

        /**
         * @return {Object}
         */
        get TONE() {
            return this._tone;
        }

        /**
         * @return {String}
         */
        get MOVEMENT() {
            return this._movement;
        }

        /**
         * @return {Number}
         */
        get DURATION() {
            return this._duration;
        }

        /**
         * @return {String}
         */
        get EASING_TYPE() {
            return this._easingType;
        }

        /**
         * @return {String}
         */
        get ACTOR_NAME() {
            return this._actorName;
        }

        /**
         * @return {String}
         */
        get PICTURE() {
            return this._picture;
        }
    }

////=============================================================================
//// MultipleWindow_Gold
////  
////=============================================================================
    class MultipleWindow_Gold extends Window_Gold {
        /**
         * @param {MultipleWindow_Settings} settings
         */
        initialize(x, y, settings) {
            this.SETTINGS   = settings;
            super.initialize(x, y);

            this.windowskin = ImageManager.loadSystem(settings.SKIN_NAME);
        }

        updateTone() {
            const tone = this.SETTINGS.TONE;
            this.setTone(tone.red, tone.blue, tone.green);
        }

        standardBackOpacity() {
            return this.SETTINGS.OPACITY;
        }
    }

////=============================================================================
//// MultipleWindow_ChoiceList
////  
////=============================================================================
    class MultipleWindow_ChoiceList extends Window_ChoiceList {
        /**
         * @param {MultipleWindow_Settings} skin
         */
        initialize(messageWindow, settings) {
            this.SETTINGS   = settings;
            super.initialize(messageWindow);
            
            this.windowskin = ImageManager.loadSystem(settings.SKIN_NAME);
        }

        updateTone() {
            const tone = this.SETTINGS.TONE;
            this.setTone(tone.red, tone.blue, tone.green);
        }

        standardBackOpacity() {
            return this.SETTINGS.OPACITY;
        }

        //Override.
        updatePlacement() {
            var positionType = $gameMessage.choicePositionType();
            var messageY = this._messageWindow.destY;//Changed.
            this.width = this.windowWidth();
            this.height = this.windowHeight();
            switch (positionType) {
            case 0:
                this.x = 0;
                break;
            case 1:
                this.x = (Graphics.boxWidth - this.width) / 2;
                break;
            case 2:
                this.x = Graphics.boxWidth - this.width;
                break;
            }
            if (messageY >= Graphics.boxHeight / 2) {
                this.y = messageY - this.height;
            } else {
                this.y = messageY + this._messageWindow.height;
            }
        }
    }

////=============================================================================
//// MultipleWindow_NumberInput
////  
////=============================================================================
    class MultipleWindow_NumberInput extends Window_NumberInput {
        /**
         * @param {MultipleWindow_Settings} settings
         */
        initialize(messageWindow, settings) {
            this.SETTINGS   = settings;
            super.initialize(messageWindow);
            
            this.windowskin = ImageManager.loadSystem(settings.SKIN_NAME);
        }

        updateTone() {
            const tone = this.SETTINGS.TONE;
            this.setTone(tone.red, tone.blue, tone.green);
        }

        standardBackOpacity() {
            return this.SETTINGS.OPACITY;
        }

        //Override.
        updatePlacement() {
            var messageY = this._messageWindow.destY;
            var spacing = 8;
            this.width = this.windowWidth();
            this.height = this.windowHeight();
            this.x = (Graphics.boxWidth - this.width) / 2;
            if (messageY >= Graphics.boxHeight / 2) {
                this.y = messageY - this.height - spacing;
            } else {
                this.y = messageY + this._messageWindow.height + spacing;
            }
        }
    }

////=============================================================================
//// MultipleWindow_EventItem
////  
////=============================================================================
    class MultipleWindow_EventItem extends Window_EventItem {
        /**
         * @param {MultipleWindow_Settings} settings
         */
        initialize(messageWindow, settings) {
            this.SETTINGS   = settings;
            super.initialize(messageWindow);
            
            this.windowskin = ImageManager.loadSystem(settings.SKIN_NAME);
        }

        updateTone() {
            const tone = this.SETTINGS.TONE;
            this.setTone(tone.red, tone.blue, tone.green);
        }

        standardBackOpacity() {
            return this.SETTINGS.OPACITY;
        }

        updatePlacement() {
            if (this._messageWindow.destY >= Graphics.boxHeight / 2) {
                this.y = 0;
            } else {
                this.y = Graphics.boxHeight - this.height;
            }
        }
    }

////=============================================================================
//// MultipleWindow_ActorName
////  Sub window for actor name.
////=============================================================================
    class MultipleWindow_ActorName extends Window_Base {
        /**
         * @param {MultipleWindow_Settings} settings
         */
        initialize(messageWindow, settings) {
            //Class Settings.
            this.SETTINGS    = settings;
            this._easing     = null;
            this._easingTime = 0;

            //Local settings.
            const actorName  = settings.ACTOR_NAME;
            const actorName2 = actorName.replace(/\\C\[(\d+)\]/gi, '');//カラーコードを除ける
            const tempBitmap = new Bitmap();
            const width      = tempBitmap.measureTextWidth(this.convertEscapeCharacters(actorName2)||'') + this.standardPadding()*2;
            const height     = this.fittingHeight(1); 

            //Initialize
            super.initialize(0, 0, width, height);
            this._messageWindow = messageWindow;
            this.windowskin     = ImageManager.loadSystem(settings.SKIN_NAME);
            this._isEnabled     = !!actorName;

            //Move
            this.move(0, 0, width, height);
            this.hide();

            //Draw actor name
            this.drawTextEx(actorName, 0, 0);
        }

        start() {
            if(!this.isEnabled()){
                return;
            }
            this.updatePlacement();
            this.show();
            this.startEasing();
        }

        updateTone() {
            const tone = this.SETTINGS.TONE;
            this.setTone(tone.red, tone.blue, tone.green);
        }

        standardBackOpacity() {
            return this.SETTINGS.OPACITY;
        }

        updatePlacement() {
            const messageY     = this._messageWindow.destY;//Changed.
            this.x = 0;
            if (messageY >= Graphics.boxHeight / 2) {
                this.y = messageY - this.height;
            } else {
                this.y = messageY + this._messageWindow.height;
            }
        }

        isEnabled() {
            return this._isEnabled;
        }

        update() {
            super.update();

            this.updateEasing();
        }

        updateEasing() {
            if(!this._easing) {
                return;
            }
            //Initialize.
            const startValueX  = this._easing.initPos.x;
            const startValueY  = this._easing.initPos.y;
            const changeValueX = this.destX - startValueX;
            const changeValueY = this.destY - startValueY;
            const duration     = this.SETTINGS.DURATION;

            //Update position.
            if(this.easingTime <= duration){
                this.x = this._easing.easingFunc(this.easingTime, startValueX, changeValueX, duration);
                this.y = this._easing.easingFunc(this.easingTime, startValueY, changeValueY, duration);
            }

            //Update time.
            this.updateEasingTime();
        }

        startEasing() {
            //対処療法的
            if(this.SETTINGS.MOVEMENT === 'None') {
                return;
            }

            //Initialize destination.
            this.destX = this.x;
            this.destY = this.y;

            //Set initial location.
            this._easing = EasingFactory.create(this.SETTINGS.MOVEMENT,
                 this.width, this.height, this.SETTINGS.EASING_TYPE);
            this.x = this._easing.initPos.x;
            this.y = this._easing.initPos.y;

            //Initialize time.
            this.resetEasingTime();
        }

        get easingTime() {
            return this._easingTime/60;
        }

        updateEasingTime() {
            this._easingTime++;
        }

        resetEasingTime() {
            this._easingTime = 0;
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
            return 'MultipleWindowSkinSystem';
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

/* ============================================================
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Open source under the BSD License.
 *
 * Copyright c 2008 George McGinley Smith
 * All rights reserved.
 * https://raw.github.com/danro/jquery-easing/master/LICENSE
 * ======================================================== */

 /*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright c 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
