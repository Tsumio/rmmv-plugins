//=============================================================================
// SimpleFileLayout.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.3 2017/10/31 拡張用の描画メソッド追加。
// 1.0.2 2017/10/27 セーブデータが存在しない場合、ピクチャを消去するよう修正。
// 1.0.1 2017/10/26 セーブデータが存在しないとエラー落ちする不具合の修正。
// 1.0.0 2017/10/25 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc This plugin remodels the file scene.
 * @author Tsumio
 *
 * @param ----Basic Settings----
 * @desc 
 * @default 
 * 
 * 
 * 
 * @help This plugin remodels the file scene.
 * 
 * ----feature----
 * -> Remodels the file scene.
 * -> Show a picture according to the first character in the file scene.
 * 
 * ----how to use----
 * The introduction of the plugin will change the design of the file scene.
 * 
 * To display a picture in accordance with the first character, write the following in the memo field of the actor.
 * <stand_sfl:["fileName","X","Y"]>
 * 
 * Example: <stand_sfl:["Package2_8","50","150"]>
 * 
 * The image file is read from the img/tsumio folder.
 * 
 * ----plugin command----
 * There is no plugin command.
 * 
 * 
 * ----change log---
 * 1.0.3 2017/10/31 Added drawing method for extension.
 * 1.0.2 2017/10/27 Fixed to erase pictures when save data does not exist.
 * 1.0.1 2017/10/26 Fixed a bug occurred when saved data does not exist.
 * 1.0.0 2017/10/25 Release.
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
 * @plugindesc ファイルシーンのデザインを変更するプラグインです。
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * 
 * 
 * @help ファイルシーンのデザインを変更するプラグインです。
 * 
 * 【特徴】
 * ・ファイルシーンのデザインを変更します。
 * ・先頭のキャラクターに合わせて一枚絵を表示できます。
 * 
 * 【使用方法】
 * プラグインを導入するとファイルシーンのデザインが変更されます。
 * 
 * 先頭のキャラクターに合わせて一枚絵を表示するには、アクターのメモ欄に以下のような記述をします。
 * <stand_sfl:["ファイル名","X座標","Y座標"]>
 * 
 * 例：<stand_sfl:["Package2_8","50","150"]>
 * 
 * なお、画像ファイルはimg/tsumioフォルダから読み込まれます。
 * 
 * 
 * 【プラグインコマンド】
 * プラグインコマンドはありません。
 * 
 * 
 * 【更新履歴】
 * 1.0.3 2017/10/31 拡張用の描画メソッド追加。
 * 1.0.2 2017/10/27 セーブデータが存在しない場合、ピクチャを消去するよう修正。
 * 1.0.1 2017/10/26 セーブデータが存在しないとエラー落ちする不具合の修正。
 * 1.0.0 2017/10/25 公開。
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
    var pluginName = 'SimpleFileLayout';


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

////==============================
//// Convert parameters.
////==============================
    //None

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
//// Scene_File
////  Set new design !
////=============================================================================

    const _Scene_File_createListWindow    = Scene_File.prototype.createListWindow;
    Scene_File.prototype.createListWindow = function() {
        this._helpWindow.height = 0;
        _Scene_File_createListWindow.call(this);
    };

    const _Scene_File_create      = Scene_File.prototype.create;
    Scene_File.prototype.create = function() {
        _Scene_File_create.call(this);
        this.resetWindowsPosAndSize();
        this.createInfoWindow();
    };

    Scene_File.prototype.createInfoWindow = function() {
        const x = this._listWindow.width;
        const y = 0;

        this._infoWindow = new Window_FileInfo(x, y, this.infoWindowWidth());
        this._infoWindow.refresh(this._listWindow.index());
        this.addWindow(this._infoWindow);

        this._listWindow.setChildWindow(this._infoWindow);
    };

    Scene_File.prototype.resetWindowsPosAndSize = function() {
        this._listWindow.width -= this.infoWindowWidth();
    };

    Scene_File.prototype.infoWindowWidth = function() {
        return 300;
    };

////=============================================================================
//// Window_SavefileList
////  Set new design !
////=============================================================================
    Window_SavefileList.prototype.maxVisibleItems = function() {
        return 15;
    };

    Window_SavefileList.prototype.drawContents = function(info, rect, valid) {
        this.drawPlaytime(info, rect.x, rect.y, rect.width);
    };

    const _Window_SavefileList_select    = Window_SavefileList.prototype.select;
    Window_SavefileList.prototype.select = function(index) {
        _Window_SavefileList_select.call(this, index);
        
        if(this.childWindow){
            this.childWindow.refresh(index);
        }
    };

    Window_SavefileList.prototype.setChildWindow = function(window) {
        this.childWindow = window;
    };

////=============================================================================
//// Window_FileInfo
////  Window class for Scene_File
////=============================================================================

    class Window_FileInfo extends Window_Base {
        constructor(x, y, width) {
            super(x, y, width);
        }

        initialize(x, y, width) {
            const height = Graphics.boxHeight;
            super.initialize(x, y, width, height);

            //Initialize data.
            this.spriteActor       = null;
            this._metaData         = null;
        }

        get parentIndex() {
            return this.parentWindow.index();
        }

        get fileName() {
            return this._metaData[0];
        }

        get actorX() {
            return Number(this._metaData[1]);
        }

        get actorY() {
            return Number(this._metaData[2]);
        }

        partyInfo(index) {
            const savefileId = index+1;
            if (DataManager.isThisGameFile(savefileId)){
                const json    = StorageManager.load(savefileId);
                const party   = this.extractSaveContents(JsonEx.parse(json));
                return party;
            }else{
                this.deleteActorPicture();
                return null;
            }
        }

        deleteActorPicture(){
            if(this.spriteActor !== null){
                this.removeChild(this.spriteActor);
                this.spriteActor = null;
            }
        }

        /**
         * Get party contents.
         */
        extractSaveContents(contents) {
            return contents.party;
        };

        refresh(index) {
            const partyInfo = this.partyInfo(index);
            if(!partyInfo){
                return;
            }
            const members = partyInfo.members();
            this.refreshMetaData(members);
            this.removeChild(this.spriteActor);
            this.drawExtraContents();
            this.createActorPicture();
        }

        drawExtraContents() {
            //Example for kurige.
            //this.drawTextEx('aaa',0, 0);
        }

        createActorPicture() {
            if(!this.fileName){
                return;
            }
            //Create and addChild.
            this.spriteActor   = new Sprite(ImageManager.loadTsumio(this.fileName));
            this.spriteActor.x = this.actorX;
            this.spriteActor.y = this.actorY;
            this.addChild(this.spriteActor);
        }

        refreshMetaData(info) {
            if(info.length <= 0){
                //Info do not exsist.
                this._metaData = [null, 0, 0];
                return;
            }

            //Info exsist.
            const actorId = info[0].actorId();//Get first actor id.
            if($dataActors[actorId].meta['stand_sfl']){
                this._metaData = JSON.parse($dataActors[actorId].meta['stand_sfl']);
            }else{
                //Assign blank data.
                this._metaData = [null, 0, 0];
            }
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
            return 'SimpleFileLayout';
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
