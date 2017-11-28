//=============================================================================
// MaskScrollingText.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.1 2017/11/28 円形のマスクに対応。マスク内のみでスクロールするよう調整。
// 1.0.0 2017/11/27 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc Add mask function to scrolling text.
 * @author Tsumio
 *
 * @param ----Basic Settings----
 * @desc 
 * @default 
 * 
 * 
 * @help Add mask function to scrolling text.
 * 
 * ----feature----
 * -> Add mask function to scrolling text.
 * 
 * ----how to use----
 * After introducing the plugin, you can add a mask to "scrolling text" by using plugin commands.
 * 
 * The created mask is automatically diposed after the "scrolling text" event is executed.
 * Therefore, I recommend that you create a mask just before executing the "scrolling text" event.
 * 
 * In addition, there is no function that letters are automatically broken according to the width of the mask.
 * Please make a line break in the event editor appropriately.
 * 
 * ----plugin command----
 * All plugin commands start with "MST".
 * Plugin commands are distinguish uppercase and lowercase.
 * And separate each word with a space.
 * Please make sure.
 * 
 * 「MST setRectMask x y width height」 : Creates a mask for the specified rectangle.
 * 「MST setEllipseMask x y halfWidth halfHeight」 : Creates a mask for the specified ellipse.。The X and Y are coordinate of the center of this circle.
 * 「MST setCircleMask x y radius」 : Creates a mask for the specified circle.The X and Y are coordinate of the center of this circle.
 * 
 * Furthermore, By using Graphics.width and Graphics.height, you can also get the width and height of the screen.
 * Example："MST setMaskRect 200 200 Graphics.width-400 200"
 * 
 * ----obsolete plugin command----
 * These are plugin commands that exist only for compatibility.
 * You should not use these commands.
 * 
 * "MST setMaskRect x y width height" : Creates a mask for the specified rectangle.
 * 
 * ----change log----
 * 1.0.1 2017/11/28 Corresponds to a circular mask.Adjust to scroll only in the mask.
 * 1.0.0 2017/11/27 Release.
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
 * @plugindesc 文章のスクロール表示にマスク機能を加えます。
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * 
 * @help 文章のスクロール表示にマスク機能を加えます。
 * 
 * 【特徴】
 * ・文章のスクロール表示にマスク機能を加えます。
 * 
 * 【使用方法】
 * プラグインの導入後、プラグインコマンドを使用することにより「文章のスクロール表示」にマスクを加えることができます。
 * 
 * 作成されたマスクは「文章のスクロール表示」イベント実行後、自動的に破棄されます。
 * したがって、「文章のスクロール表示」イベントを実行する直前にマスクを作成することを推奨します。
 * 
 * なお、マスクの幅に合わせて自動で文字が改行される機能はありません。
 * イベントエディタ内で適切に改行してください。
 * 
 * 【プラグインコマンド】
 * 全てのプラグインコマンドは「MST」から始まります。
 * また、説明上では視認性のためにカギカッコを使用していますが、実際にプラグインコマンドに入力する際には
 * カギカッコの入力は不要です。
 * 
 * 全てのプラグインコマンドは大文字と小文字を区別します。
 * 各単語の間は半角スペースで区切ります（全角では認識しません）。
 * 間違わないように気をつけてください。
 * 
 * 「MST setRectMask x y width height」 : 指定した矩形のマスクを作成します。
 * 「MST setEllipseMask x y halfWidth halfHeight」 : 指定した楕円形のマスクを作成します。xとyは円の中心座標です。
 * 「MST setCircleMask x y radius」 : 指定した円形のマスクを作成します。xとyは円の中心座標です。
 * 
 * なお、Graphics.widthやGraphics.heightを用いるこにより、画面の幅や高さを取得することもできます。
 * 例：「MST setMaskRect 200 200 Graphics.width-400 200」
 * 
 * 【廃止したプラグインコマンド】
 * 互換性のためだけに存在しているプラグインコマンドです。
 * 通常は使用しないでください。
 * 
 * 「MST setMaskRect x y width height」 : 指定した矩形のマスクを作成します。
 * 
 * 【更新履歴】
 * 1.0.1 2017/11/28 円形のマスクに対応。マスク内のみでスクロールするよう調整。
 * 1.0.0 2017/11/27 公開。
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
    var pluginName = 'MaskScrollingText';

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


////=============================================================================
//// Settings for plugin command.
////=============================================================================

    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'MST') {
            switch (args[0]) {
                case 'setMaskRect'://[Obsolete]
                    SceneManager._scene._scrollTextWindow.setRectMask(args[1], args[2], args[3], args[4]);
                    break;
                case 'setRectMask':
                    SceneManager._scene._scrollTextWindow.setRectMask(args[1], args[2], args[3], args[4]);
                    break;
                case 'setEllipseMask':
                    SceneManager._scene._scrollTextWindow.setEllipseMask(args[1], args[2], args[3], args[4]);
                    break;
                case 'setCircleMask':
                    SceneManager._scene._scrollTextWindow.setCircleMask(args[1], args[2], args[3]);
                    break;
            }
        }
    };

////=============================================================================
//// Window_ScrollText
////  Override window for mask.
////=============================================================================

    const _Window_ScrollText_initialize = Window_ScrollText.prototype.initialize;
    Window_ScrollText.prototype.initialize = function() {
        _Window_ScrollText_initialize.call(this);

        this.maskRect = this.getRectZero();
    };

    /**
     * Called from plugin command.
     * 
     */
    Window_ScrollText.prototype.setRectMask = function(x, y, width, height) {
        const _x      = eval(x);
        const _y      = eval(y);
        const _width  = eval(width);
        const _height = eval(height);

        this.createRectMask(_x, _y, _width, _height);
        this.maskRect = {x:_x, y:_y, width:_width, height:_height};
    };

    /**
     * Called from plugin command.
     * 
     */
    Window_ScrollText.prototype.setEllipseMask = function(x, y, halfWidth, halfHeight) {
        const _halfWidth  = eval(halfWidth);
        const _halfHeight = eval(halfHeight);
        const _x      = eval(x);
        const _y      = eval(y);

        this.createEllipseMask(_x, _y, _halfWidth, _halfHeight);
        this.maskRect = {x:_x-_halfWidth, y:_y-_halfHeight, halfWidth:_halfWidth, halfHeight:_halfHeight};
    };

    /**
     * Called from plugin command.
     * 
     */
    Window_ScrollText.prototype.setCircleMask = function(x, y, radius) {
        const _x      = eval(x);
        const _y      = eval(y);
        const _radius = eval(radius);

        this.createCircleMask(_x, _y, _radius);
        this.maskRect = {x:_x-_radius, y:_y-_radius, width:_radius, height:_radius};
    };

    Window_ScrollText.prototype.createRectMask = function(x, y, width, height) {        
        //Set new mask settings.
        const mask = new PIXI.Graphics();
        mask.beginFill(0xffffff, 1);
        mask.drawRect(x, y, width, height); 
        mask.endFill();
        this._windowContentsSprite.mask = mask;
    };

    Window_ScrollText.prototype.createEllipseMask = function(x, y, halfWidth, halfHeight) {        
        //Set new mask settings.
        const mask = new PIXI.Graphics();
        mask.beginFill(0xffffff, 1);
        mask.drawEllipse(x, y, halfWidth, halfHeight);
        mask.endFill();
        this._windowContentsSprite.mask = mask;
        console.log(this._windowContentsSprite.mask);
    };

    Window_ScrollText.prototype.createCircleMask = function(x, y, radius) {        
        //Set new mask settings.
        const mask = new PIXI.Graphics();
        mask.beginFill(0xffffff, 1);
        mask.drawCircle(x, y, radius);
        mask.endFill();
        this._windowContentsSprite.mask = mask;
    };

    Window_ScrollText.prototype.getDefaultMaskSettings = function() {
        return null;//Null is default mask for Window_Base.
    };

    Window_ScrollText.prototype.resetMask = function() {
        this._windowContentsSprite.mask = this.getDefaultMaskSettings();
        this.maskRect = this.getRectZero();
    };

    Window_ScrollText.prototype.getRectZero = function() {
        return {x:0, y:0, width:0, height:0};
    };

    const _Window_ScrollText_terminateMessage = Window_ScrollText.prototype.terminateMessage;
    Window_ScrollText.prototype.terminateMessage = function() {
        _Window_ScrollText_terminateMessage.call(this);
        
        this.resetMask();
    };

    const _Window_ScrollText_refresh = Window_ScrollText.prototype.refresh;
    Window_ScrollText.prototype.refresh = function() {
        _Window_ScrollText_refresh.call(this);

        const mask = this._windowContentsSprite.mask;//Alias
        if(mask === null){
            return;
        }
        //Overwrite if mask is set.
        var textState = { index: 0 };
        textState.text = this.convertEscapeCharacters(this._text);
        this.resetFontSettings();
        this._allTextHeight = this.calcTextHeight(textState, true);
        this.createContents();
        this.origin.y = -this.height + this.maskRect.y;
        this.drawTextEx(this._text, this.maskRect.x, 1);
    };

    const _Window_ScrollText_updateMessage = Window_ScrollText.prototype.updateMessage;
    Window_ScrollText.prototype.updateMessage = function() {
        _Window_ScrollText_updateMessage.call(this);
        if (this.origin.y >= this.contents.height - this.maskRect.y) {
            this.terminateMessage();
        }
    };


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
            return 'MaskScrollingText';
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
