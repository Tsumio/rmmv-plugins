//=============================================================================
// SimpleMenuLayout.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2017/10/28 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc This plugin remodels the menu scene.
 * @author Tsumio
 *
 * @param ----Basic Settings----
 * @desc 
 * @default 
 * 
 * @param MenuWidth
 * @type number
 * @desc Set the width of the menu window.
 * @default 240
 * 
 * @param MenuCols
 * @type number
 * @desc Set the cols of the menu window.
 * @default 1
 * 
 * @param MenuXPosition
 * @type struct<XPos>
 * @desc Set the X position of the menu window.
 * @default {"basis":"center","correction":"0"}
 * 
 * @param MenuYPosition
 * @type struct<YPos>
 * @desc Set the Y position of the menu window.
 * @default {"basis":"center","correction":"0"}
 * 
 * @help This plugin remodels the menu scene.
 * 
 * ----feature----
 * -> Remodels the menu scene.
 * -> Show a picture according to the first character in the menu scene.
 * 
 * ----how to use----
 * The introduction of the plugin will change the design of the menu scene.
 * 
 * To display a picture in accordance with the first character, write the following in the memo field of the actor.
 * <stand_sml:["fileName","X","Y"]>
 * 
 * Example: <stand_sml:["Package1_2","400","50"]>
 * 
 * The image file is read from the img/tsumio folder.
 * 
 * ----plugin command----
 * There is no plugin command.
 * 
 * 
 * ----change log---
 * 1.0.0 2017/10/28 Release.
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
 * @plugindesc シンプルなメニュー画面を実装します。
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * @param メニュー幅
 * @type number
 * @desc メニューウィンドウの幅を指定します。
 * @default 240
 * 
 * @param メニュー列数
 * @type number
 * @desc メニューウィンドウの列数を指定します。
 * @default 1
 * 
 * @param メニューX座標
 * @type struct<XPos>
 * @desc メニューウィンドウのX座標を指定します。
 * @default {"basis":"center","correction":"0"}
 * 
 * @param メニューY座標
 * @type struct<YPos>
 * @desc メニューウィンドウのY座標を指定します。
 * @default {"basis":"center","correction":"0"}
 * 
 * @help シンプルなメニュー画面を実装します。
 * 
 * 【特徴】
 * ・メニュー画面のデザインを変更します。
 * ・先頭のキャラクターに合わせて一枚絵を表示できます。
 * 
 * 【使用方法】
 * プラグインを導入するとメニュー画面のデザインが変更されます。
 * 
 * 先頭のキャラクターに合わせて一枚絵を表示するには、アクターのメモ欄に以下のような記述をします。
 * <stand_sml:["ファイル名","X座標","Y座標"]>
 * 
 * 例：<stand_sml:["Package1_2","400","50"]>
 * 
 * なお、画像ファイルはimg/tsumioフォルダから読み込まれます。
 * 
 * 
 * 【プラグインコマンド】
 * プラグインコマンドはありません。
 * 
 * 
 * 【更新履歴】
 * 1.0.0 2017/10/28 公開。
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
/*~struct~XPos:
 *
 * @param basis
 * @type select
 * @option right
 * @option left
 * @option center
 * @desc 基準位置(basis).
 * 
 * @param correction
 * @type number
 * @min -3000
 * @max 3000
 * @desc 補正(correction).
 */
/*~struct~YPos:
 *
 * @param basis
 * @type select
 * @option top
 * @option bottom
 * @option center
 * @desc 基準位置(basis).
 * 
 * @param correction
 * @type number
 * @min -3000
 * @max 3000
 * @desc 補正(correction).
 */

(function() {
    'use strict';
    var pluginName = 'SimpleMenuLayout';


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

////=============================================================================
//// Get and set pluguin parameters.
////=============================================================================
    var param                          = {};
    //Basic Stteings
    param.menuWidth         = getParamNumber(['MenuWidth', 'メニュー幅']);
    param.menuCols          = getParamNumber(['MenuCols', 'メニュー列数']);
    param.menuXPos          = getParamString(['MenuXPosition', 'メニューX座標']);
    param.menuYPos          = getParamString(['MenuYPosition', 'メニューY座標']);

////==============================
//// Convert parameters.
////==============================
    param.menuXPos    = convertParam(param.menuXPos);
    param.menuYPos    = convertParam(param.menuYPos);

////==============================
//// Convert to Number.
////==============================
    //None

////==============================
//// Add tsumio folder to ImageManager.
////==============================
    ImageManager.loadTsumio = function(filename) {
        return this.loadBitmap('img/tsumio/', filename, 0, true);
    };

////=============================================================================
//// SceneManager
////  Snap clear background.
////=============================================================================
    const _SceneManager_snapForBackground = SceneManager.snapForBackground;
    SceneManager.snapForBackground = function() {
        _SceneManager_snapForBackground.call(this);
        
        if(SceneManager.isNextScene(Scene_Menu)){
            this._backgroundBitmap = this.snap();
        }
    };

////=============================================================================
//// Scene_Menu
////  New simple menu scene!
////=============================================================================
    const _Scene_Menu_initialize = Scene_Menu.prototype.initialize;
    Scene_Menu.prototype.initialize = function() {
        _Scene_Menu_initialize.call(this);

        this._metaData = null;
    };

    const _Scene_Menu_start = Scene_Menu.prototype.start;
    Scene_Menu.prototype.start = function() {
        _Scene_Menu_start.call(this);
        this.hideUnnecessaryWindows();
        this.resetMenuWindowPos();
    };

    const _Scene_Menu_create = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function() {
        _Scene_Menu_create.call(this);

        const actor = $gameParty.members()[0];
        this.setMetaData(actor);
        this.createStandPicture();
    };

    Scene_Menu.prototype.createStandPicture = function() {
        const fileName = this.getMetaData()[0];
        const x        = Number(this.getMetaData()[1]);
        const y        = Number(this.getMetaData()[2]);

        if(!fileName){
            return;
        }
        //Create and addChild.
        const picture = new Sprite(ImageManager.loadTsumio(fileName));
        picture.x = x;
        picture.y = y;
        this.addChild(picture);
    };

    const _Scene_Menu_commandPersonal = Scene_Menu.prototype.commandPersonal;
    Scene_Menu.prototype.commandPersonal = function() {
        _Scene_Menu_commandPersonal.call(this);
        this.onPersonalOk();//Skip selecting character in status window. 
    };

    Scene_Menu.prototype.hideUnnecessaryWindows = function() {
        this._statusWindow.hide();
        this._goldWindow.hide();
    };

    Scene_Menu.prototype.resetMenuWindowPos = function() {
        const width  = this._commandWindow.width;
        const height = this._commandWindow.height;
        this._commandWindow.x = MenuPosition.x(width);
        this._commandWindow.y = MenuPosition.y(height);
    };

    Scene_Menu.prototype.setMetaData = function(actor) {
        const actorId = actor.actorId();
        if($dataActors[actorId].meta['stand_sml']){
            this._metaData = JSON.parse($dataActors[actorId].meta['stand_sml']);
        }else{
            //Assign blank data.
            this._metaData = [null, 0, 0];
        }
    };

    Scene_Menu.prototype.getMetaData = function() {
        return this._metaData;
    };


////=============================================================================
//// Scene_Menu
////  New simple menu window!
////=============================================================================
    Window_MenuCommand.prototype.windowWidth = function() {
        return param.menuWidth;
    };

    Window_MenuCommand.prototype.maxCols = function() {
        return param.menuCols;
    };

    Window_MenuCommand.prototype.windowHeight = function() {
        return this.fittingHeight(this.numVisibleRows());
    };
    
    Window_MenuCommand.prototype.numVisibleRows = function() {
        return Math.ceil(this.maxItems() / this.maxCols());
    };

////=============================================================================
//// MenuPosition
////  This static class is for calculate Window position.
////=============================================================================
    class MenuPosition {
        static basisX(width){
            switch(param.menuXPos.basis){
                case 'right' :
                    return Graphics.boxWidth - width;
                    break;
                case 'left' :
                    return 0;
                    break;
                case 'center' :
                    return Graphics.boxWidth/2 - width/2;
                    break;
                default :
                    return 0;
                    break;
            }
        }

        static get correctX(){
            return Number(param.menuXPos.correction);
        }

        static x(width){
            return this.basisX(width) + this.correctX;
        }

        static basisY(height){
            switch(param.menuYPos.basis){
                case 'top' :
                    return 0;
                    break;
                case 'bottom' :
                    return Graphics.boxHeight - height;
                    break;
                case 'center' :
                    return Graphics.boxHeight/2 - height/2;
                    break;
                default :
                    return 0;
                    break;
            }
        }

        static get correctY(){
            return Number(param.menuYPos.correction);
        }

        static y(height){
            return this.basisY(height) + this.correctY;
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
            return 'SimpleMenuLayout';
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
