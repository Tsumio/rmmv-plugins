//=============================================================================
// TsumioMenuSystem.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2017/10/09 公開。
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
 * @param MenuRows
 * @type number
 * @max 10
 * @desc This is a settings sets the number of rows in the menu.
 * @default 2
 * 
 * @param MenuMaxCols
 * @type number
 * @max 10
 * @desc This is a settings sets the maximum number of columns in the menu.
 * @default 5
 * 
 * @param StatusMaxCols
 * @type number
 * @max 10
 * @desc This is a settings sets the maximum number of columns in the status window.Reccomend 3-5.
 * @default 4
 * 
 * @param ChapterWindowHeight
 * @type number
 * @max 1000
 * @desc This is a settings sets the height of chapter window.
 * @default 70
 * 
 * @param StatusWindowHeight
 * @type number
 * @max 1000
 * @desc This is a settings sets the height of status window.
 * @default 290
 * 
 * @param SubWIndowsFontSize
 * @type number
 * @max 1000
 * @desc This is a settings sets the font size of sub windows(tips window and info window).
 * @default 17
 * 
 * @param ----Help Settings----
 * @desc 
 * @default 
 * 
 * @param UseHelp
 * @type select
 * @option On
 * @value On
 * @option Switching
 * @value Switching
 * @option Off
 * @value Off
 * @desc This is a settings whether using help function.
 * @default Switching
 * 
 * @param HelpText
 * @type string[]
 * @desc Please set the help text in the order of the commands.
 * @default ["Go item scene.", "Go skill scene.", "Go equip scene.", "Go status scene.", "Execute sorting.", "Go options scene.", "Go saving scene.", "End the game."]
 * 
 * @param ----Chars Settings----
 * @desc 
 * @default 
 * 
 * @param ItemNameColor
 * @type number
 * @max 31
 * @desc This is a setting sets the color of the item name in the sub window.The correspondence between color and number conforms to the window image.
 * @default 1
 * 
 * @param ItemContentsColor
 * @type number
 * @max 31
 * @desc This is a setting sets the color of the item contents in the sub window.The correspondence between color and number conforms to the window image.
 * @default 0
 * 
 * @param LocationChars
 * @type string
 * @desc This is a settings sets the characters representing the current location.
 * @default Location
 * 
 * @param FortuneChars
 * @type string
 * @desc This is a settings sets the characters representing the money in player's possession.
 * @default Fortune
 * 
 * @param CombatNumberChars
 * @type string
 * @desc This is a setting sets the characters representing the number of combat. 
 * @default Combat Number
 * 
 * @param PlayTimeChars
 * @type string
 * @desc This is a settings sets the characters representing the play time.
 * @default Play TIme
 * 
 * @param Option1
 * @type string
 * @desc This is a settings sets the characters representing the option1.
 * @default Option1
 * 
 * @param Option1Contents
 * @type string
 * @desc This is a settings sets the contents of the option1.If you want to set variable, write \V[1].
 * @default \V[1]
 * 
 * @param Option2
 * @type string
 * @desc This is a settings sets the characters representing the option2.
 * @default Option2
 * 
 * @param Option2Contens
 * @type string
 * @desc This is a settings sets the contents of the option2.If you want to cooperate Chronus.js, write [Chronus1] or [Chronus2].
 * @default [Chronus2]
 * 
 * @param Ratio
 * @type number[]
 * @max 1
 * @decimals 2
 * @desc This is a settings sets the ratio of the characters placement in sub window.
 * @default ["0.00", "0.35", "0.70"]
 * 
 * @help This plugin remodels the menu scene.
 * 
 * ----feature----
 * -> Remodels the menu scene.
 * -> Improve key operation of the menu scene
 * -> Have a window for chapter display.
 * -> Have a window for chips display.
 * -> You can also display any variable contents in the information window.
 * -> The information setting by the plugin command is saved in the save data.
 * -> This plugin works with Chronus.js created by Triacontane.
 * 
 * ----how to use----
 * You can use this plugin after setting some plugin parameters.
 * 
 * The side view butlers are displayed on the menu scene, but when "using side view fighting" of the database is OFF, these are not displayed.
 * 
 * ----chapter window----
 * You can set the chapter title from the plugin command.
 * You can also use it as a displaying help on the menu.
 * For details, please refer to "UseHelp" of the plugin parameter.
 * Control characters can also be used.
 * 
 * ----tips window----
 * You can set each chip from the plugin command.
 * Control characters can also be used.
 * 
 * ---options----
 * Optional information can be written in "Option" of the plugin parameter.
 * For example, when you enter "\V[1]", the contents of variable1 will be displayed in option window.
 * 
 * ----collaboration with Chronus.js----
 * This plugin supports collaboration with Chronus.js created by Triacontane.
 * Enter "[Chronus1]" as the content of option and get date format1.
 * Enter "[Chronus2]" as the content of option and get date format2.
 * 
 * Reference：https://raw.githubusercontent.com/triacontane/RPGMakerMV/master/Chronus.js
 * 
 * ----plugin command----
 * All plugin commands start with "TMS".
 * Plugin commands are distinguish uppercase and lowercase.
 * And separate each word with a space.
 * Please make sure.
 * 
 * "TMS setChapterName Characters" : Sets characters in the chapter window. Control characters can also be used.
 * "TMS setTips1 Characters" : Sets the characters at the top of the chips window. Control characters can also be used.
 * "TMS setTips2 Characters" : Sets the characters at the bottom of the chips window. Control characters can also be used.
 * 
 * ----other----
 * The specifications of the key operation on the menu scene are different from those of Menu made by usual MV.
 * It seems that operability is improving.
 * But if you use it together with plugin of key operation improvement system, it may compete.
 * 
 * Furthermore, if you change the dpi or change the number of rows or columns, you may get trouble.
 * 
 * ----change log---
 * 1.0.0 2017/10/09 Release.
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
 * @plugindesc メニュー画面を改造するプラグインです。
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * @param メニューの行数
 * @type number
 * @max 10
 * @desc メニューの行数を設定します。
 * @default 2
 * 
 * @param メニューの最大列数
 * @type number
 * @max 10
 * @desc メニューの最大列数を設定します。
 * @default 5
 * 
 * @param ステータスの最大列数
 * @type number
 * @max 10
 * @desc ステータスウィンドウの最大列数を設定します。3～5程度を推奨します。
 * @default 4
 * 
 * @param 章ウィンドウの高さ
 * @type number
 * @max 1000
 * @desc 章ウィンドウの高さを設定します。
 * @default 70
 * 
 * @param ステータスウィンドウの高さ
 * @type number
 * @max 1000
 * @desc ステータスウィンドウの高さを設定します。
 * @default 290
 * 
 * @param サブウィンドウのフォントサイズ
 * @type number
 * @max 1000
 * @desc サブウィンドウ（チップスウィンドウと情報ウィンドウ）のフォントサイズを設定します。
 * @default 17
 * 
 * @param ----ヘルプの設定----
 * @desc 
 * @default 
 * 
 * @param ヘルプを利用する
 * @type select
 * @option 利用する
 * @value On
 * @option 切り替え
 * @value Switching
 * @option 利用しない
 * @value Off
 * @desc ヘルプを利用するかどうかを設定します。
 * @default Switching
 * 
 * @param ヘルプ用テキスト
 * @type string[]
 * @desc コマンドの順にヘルプ用のテキストを設定します。
 * @default ["アイテムシーンへ移行します。", "スキルシーンへ移行します。", "装備シーンへ移行します。", "ステータス画面へ移行します。", "並び替え機能を実行します。", "オプションシーンへ移行します。", "セーブ画面へ移行します。", "ゲームを終了します。"]
 * 
 * @param ----文字列の設定----
 * @desc 
 * @default 
 * 
 * @param 項目名の色
 * @type number
 * @max 31
 * @desc サブウィンドウ内における項目名の色を設定します。色と番号の対応はウィンドウ画像に準拠します。
 * @default 1
 * 
 * @param 項目内容の色
 * @type number
 * @max 31
 * @desc サブウィンドウ内における項目内容の色を設定します。色と番号の対応はウィンドウ画像に準拠します。
 * @default 0
 * 
 * @param 現在地を表す文字列
 * @type string
 * @desc 現在地を表す文字列を設定します。
 * @default 現在地
 * 
 * @param 所持金を表す文字列
 * @type string
 * @desc 所持金を表す文字列を設定します。
 * @default 所持金
 * 
 * @param 戦闘回数を表す文字列
 * @type string
 * @desc 戦闘回数を表す文字列を設定します。
 * @default 戦闘回数
 * 
 * @param プレイ時間を表す文字列
 * @type string
 * @desc プレイ時間を表す文字列を設定します。
 * @default プレイ時間
 * 
 * @param オプション1
 * @type string
 * @desc オプション1を表す文字列を設定します。
 * @default オプション1
 * 
 * @param オプション1の内容
 * @type string
 * @desc オプション1の内容を設定します。変数の内容を指定したい場合、例えば\V[1]と記入してください。
 * @default \V[1]
 * 
 * @param オプション2
 * @type string
 * @desc オプション2を表す文字列を設定します。
 * @default オプション2
 * 
 * @param オプション2の内容
 * @type string
 * @desc オプション2の内容を設定します。Chronus.jsと連携したい場合、[Chronus1]か[Chronus2]と記入してください。
 * @default [Chronus2]
 * 
 * @param 比率
 * @type number[]
 * @max 1
 * @decimals 2
 * @desc サブウィンドウ内における文字列の配置の比率を設定します。
 * @default ["0.00", "0.35", "0.70"]
 * 
 * @help メニュー画面を改造するプラグインです。
 * 
 * 【特徴】
 * ・メニュー画面の見た目を改造します。
 * ・メニュー画面のキー操作を向上させます。
 * ・章表示用のウィンドウが用意されています。
 * ・チップス表示用のウィンドウが表示されています。
 * ・情報ウィンドウに任意の変数内容を表示することもできます。
 * ・プラグインコマンドでセットした情報はセーブデータに保存されます。
 * ・トリアコンタンさんが制作したプラグインChronus.jsと連携できます。
 * 
 * 【使用方法】
 * プラグインの導入後、プラグインパラメーターを設定することによって使用できます。
 * 
 * メニュー画面にはサイドビューバトラーが表示されますが、データーベースの「サイドビュー戦闘を使用」がOFFになっている場合は表示されません。
 * 
 * 【章ウィンドウ】
 * プラグインコマンドから章タイトルを設定できます。
 * また、メニューのヘルプを表示させることにも使えます。
 * 詳しくはプラグインパラメーターの「ヘルプを利用する」をご覧ください。
 * 制御文字の使用も可能です。
 * 
 * 【チップスウィンドウ】
 * プラグインコマンドから各チップスを設定できます。
 * 制御文字の使用も可能です。
 * 
 * 【オプション】
 * プラグインパラメーターの「オプション」には任意の情報を記すことができます。
 * 例えば「\V[1]」と入力すると、変数1の内容がオプションに表示されます。
 * 
 * 【Chronus.jsとの連携】
 * 当プラグインはトリアコンタンさんが制作したChronus.jsとの連携をサポートしています。
 * オプションの内容に「[Chronus1]」と入力すると日時フォーマット1を取得します。
 * また、「[Chronus2]」と入力すると日時フォーマット2を取得します。
 * 
 * 参考URL：https://raw.githubusercontent.com/triacontane/RPGMakerMV/master/Chronus.js
 * 
 * 【プラグインコマンド】
 * 全てのプラグインコマンドは「TMS」から始まります。
 * また、説明上では視認性のためにカギカッコを使用していますが、実際にプラグインコマンドに入力する際には
 * カギカッコの入力は不要です。
 * 
 * 全てのプラグインコマンドは大文字と小文字を区別します。
 * 各単語の間は半角スペースで区切ります（全角では認識しません）。
 * 間違わないように気をつけてください。
 * 
 * 「TMS setChapterName 設定する文字列」 : 章ウィンドウに文字列を設定します。制御文字の使用も可能です。
 * 「TMS setTips1 設定する文字列」 : チップスウィンドウ上部の文字列を設定します。制御文字の使用も可能です。
 * 「TMS setTips2 設定する文字列」 : チップスウィンドウ下部の文字列を設定します。制御文字の使用も可能です。
 * 
 * 【その他】
 * メニュー画面のキー操作の仕様が通常のツクールMV製のものと異なります。
 * 基本的には操作性が向上していると思っていただいて問題ないですが、キー操作向上系のプラグインと併用すると競合するかもしれません。
 * 
 * また、解像度を変えたり、行数や列数を変えたりした場合、不具合が出るかもしれません。
 * 
 * 【更新履歴】
 * 1.0.0 2017/10/09 公開。
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


function Game_TMenuSys() {
    this.initialize.apply(this, arguments);
}

(function() {
    'use strict';
    var pluginName = 'TsumioMenuSystem';

////=============================================================================
//// NTMO
////  Declare NTMO namespace.
////=============================================================================
    var NTMO = NTMO || {};
    NTMO.TMS = function(){
    };

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

    var _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents      = function(contents) {
        _DataManager_extractSaveContents.apply(this, arguments);
        $gameSystem.onLoad();
    };

////=============================================================================
//// Get and set pluguin parameters.
////=============================================================================
    var param                          = {};
    //Basic Stteings
    param.menuRows        = getParamNumber(['MenuRows', 'メニューの行数']);
    param.menuMaxCols     = getParamNumber(['MenuMaxCols', 'メニューの最大列数']);
    param.chapWinHeight   = getParamNumber(['ChapterWindowHeight', '章ウィンドウの高さ']);
    param.statusWinHeight = getParamNumber(['StatusWindowHeight', 'ステータスウィンドウの高さ']);
    param.subWinfontSize  = getParamNumber(['SubWIndowsFontSize', 'サブウィンドウのフォントサイズ']);
    param.statusMaxCols   = getParamNumber(['StatusMaxCols', 'ステータスの最大列数']);
    //Help Settings
    param.shouldUseHelp   = getParamString(['UseHelp',  'ヘルプを利用する']);
    param.textHelp        = getParamString(['HelpText', 'ヘルプ用テキスト']);
    //Chars Settings
    param.colorItemName   = getParamNumber(['ItemNameColor', '項目名の色']);
    param.colorContents   = getParamNumber(['ItemContentsColor', '項目内容の色']);
    param.charsLocation   = getParamString(['LocationChars', '現在地を表す文字列']);
    param.charsFortune    = getParamString(['FortuneChars', '所持金を表す文字列']);
    param.charsCombatNum  = getParamString(['CombatNumberChars', '戦闘回数を表す文字列']);
    param.charsPlayTime   = getParamString(['PlayTimeChars', 'プレイ時間を表す文字列']);
    param.option1         = getParamString(['Option1', 'オプション1']);
    param.op1Contents     = getParamString(['Option1Contents', 'オプション1の内容']);
    param.option2         = getParamString(['Option2', 'オプション2']);
    param.op2Contents     = getParamString(['Option2Contents', 'オプション2の内容']);
    param.ratio           = getParamString(['Ratio', '比率']);

////==============================
//// Convert parameters.
////==============================
    param.ratio    = convertParam(param.ratio);
    param.textHelp = convertParam(param.textHelp);
    
//-----------------------------------------------------------------------------
// Settings for plugin command.
//-----------------------------------------------------------------------------
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'TMS') {
            switch (args[0]) {
                case 'setChapterName':
                    $gameSystem.tMenuSys().setChapterName(args);
                    break;
                case 'setTips1':
                    $gameSystem.tMenuSys().setTips1(args);
                    break;
                case 'setTips2':
                    $gameSystem.tMenuSys().setTips2(args);
                    break;
            }
        }
    };

//////=============================================================================
///// NTMO.TMS.Base
/////  This is static class for getting various information.
/////=============================================================================
    NTMO.TMS.Base = class {
        static getActorState(actor) {
            if(actor.isStateAffected(1)){//If actor is died.
                return 'dead';
            }else if (actor.hpRate() <= 25 / 100){//If actor HP is below 25%.
                return 'dying';
            }else{
                return 'walk';
            }
        }
    };

//////=============================================================================
///// Game_System
/////  Add a game system called Game_TMenuSys.
/////==============================================================================
    var _Game_System_initialize      = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this._tMenuSys = new Game_TMenuSys();
    };

    Game_System.prototype.tMenuSys = function() {
        return this._tMenuSys;
    };

    var _Game_System_onLoad      = Game_System.prototype.onLoad;
    Game_System.prototype.onLoad = function() {
        if (_Game_System_onLoad) _Game_System_onLoad.apply(this, arguments);
        if (!this.tMenuSys()) this._tMenuSys = new Game_TMenuSys();
        this._tMenuSys.onLoad();
    };

//////=============================================================================
///// Game_TMenuSys
/////  This class manage TsumioMenuSystem's data.
/////=============================================================================
    Game_TMenuSys.prototype             = Object.create(Game_TMenuSys.prototype);
    Game_TMenuSys.prototype.constructor = Game_TMenuSys;

    Game_TMenuSys.prototype.initialize = function() {
        this._chapterName = null;
        this._tips1       = null;
        this._tips2       = null;
    };

    Game_TMenuSys.prototype.onLoad = function() {
        //When system is loaded, execute any function if necessary.
    };

    Game_TMenuSys.prototype.getChapterName = function() {
        return this._chapterName;
    };

    Game_TMenuSys.prototype.setChapterName = function(name) {
        this._chapterName = '';
        name.forEach(function(element, index) {
            if(index > 0){
                this._chapterName += element + ' ';
            }
        }, this);
    };

    Game_TMenuSys.prototype.setTips1 = function(content) {
        this._tips1 = '';
        content.forEach(function(element, index) {
            if(index > 0){
                this._tips1 += element + ' ';
            }
        }, this);
    };

    Game_TMenuSys.prototype.getTips1 = function() {
        return this._tips1;
    };

    Game_TMenuSys.prototype.setTips2 = function(content) {
        this._tips2 = '';
        content.forEach(function(element, index) {
            if(index > 0){
                this._tips2 += element + ' ';
            }
        }, this);
    };

    Game_TMenuSys.prototype.getTips2 = function() {
        return this._tips2;
    };

//////=============================================================================
///// Scene_Menu
/////  Override this class for creating original menu.
/////=============================================================================

    var _Scene_Menu_create      = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function() {
        //Call original create method.
        _Scene_Menu_create.call(this);

        //Create original windows.
        this.createChapterWindow();
        this.createTipsWindow();
        this.createInfoWindow();
        //Hide unnecessary window.
        this._goldWindow.hide();
        //Reset and refresh windows position.
        this.resetWindowsPosAndSize();
        this.refreshWindow_TMS();
        //Add eventListener.
        this.addEventListenerToCommandWindow();
        this.addEventListenerToStatusWindow();
    };

    var _Scene_Menu_createStatusWindow      = Scene_Menu.prototype.createStatusWindow;
    Scene_Menu.prototype.createStatusWindow = function() {
        _Scene_Menu_createStatusWindow.call(this);
        this._genSwapSVActors = this.genSkipFirstCalling(this._statusWindow.swapSVActors.bind(this._statusWindow));
    };

    Scene_Menu.prototype.createChapterWindow = function() {
        //Initialize.
        var x      = 0;
        var y      = 0;
        var width  = Graphics.boxWidth;
        var height = param.chapWinHeight;

        //Create and add.
        this._chapterWindow = new NTMO.TMS.Window_Chapter(x, y, width, height);
        this.addWindow(this._chapterWindow);
    };

    Scene_Menu.prototype.createTipsWindow = function() {
        //Initialize.
        var x      = 0;
        var y      = 0;
        var width  = Graphics.boxWidth;
        var height = Graphics.boxHeight;

        //Create and add.
        this._tipsWindow = new NTMO.TMS.Window_Tips(x, y, width, height);
        this.addWindow(this._tipsWindow);
    };

    Scene_Menu.prototype.createInfoWindow = function() {
        //Initialize.
        var x      = 0;
        var y      = 0;
        var width  = Graphics.boxWidth;
        var height = Graphics.boxHeight;

        //Create and add.
        this._infoWindow = new NTMO.TMS.Window_Info(x, y, width, height);
        this.addWindow(this._infoWindow);
    };

    Scene_Menu.prototype.resetWindowsPosAndSize = function() {
        //Set command window position.
        this._commandWindow.y = this._chapterWindow.height;
        //Set status window position.
        this._statusWindow.x = 0;
        this._statusWindow.y = this._commandWindow.y + this._commandWindow.height;
        //Set tips window pos and size.
        this._tipsWindow.y      = this._statusWindow.y + this._statusWindow.height;
        this._tipsWindow.height = (Graphics.boxHeight - this._tipsWindow.y)/2;
        //Set info window pos and size.
        this._infoWindow.y      = this._tipsWindow.y + this._tipsWindow.height;
        this._infoWindow.height = this._tipsWindow.height;
    };

    Scene_Menu.prototype.refreshWindow_TMS = function() {
        this._tipsWindow.refresh();
        this._infoWindow.refresh();
        this._statusWindow.modifySVActorsVisible();
    };

    Scene_Menu.prototype.addEventListenerToCommandWindow = function() {
        this._commandWindow.eventListener['onDown'].register(this.onDownTMS.bind(this));
        this._commandWindow.eventListener['onUp'].register(this.onUpTMS.bind(this));
        this._commandWindow.eventListener['onRight'].register(this.onRightTMS.bind(this));
        this._commandWindow.eventListener['onLeft'].register(this.onLeftTMS.bind(this));
        this._commandWindow.eventListener['onSelect'].register(this.onSelectTMS.bind(this));
    };

    Scene_Menu.prototype.addEventListenerToStatusWindow = function() {
        this._genUpdatePages = this.genSkipFirstCalling(this._statusWindow.modifySVActorsVisible.bind(this._statusWindow));
        this._statusWindow.eventListener['onSelect'].register(this.onSelectTMS_Status.bind(this));
    };

    Scene_Menu.prototype.getCommandIndex = function() {
        return this._commandWindow.index();
    };

    Scene_Menu.prototype.onDownTMS = function() {
        
    };

    Scene_Menu.prototype.onUpTMS = function() {
        
    };

    Scene_Menu.prototype.onRightTMS = function() {
        
    };

    Scene_Menu.prototype.onLeftTMS = function() {
        
    };

    Scene_Menu.prototype.onSelectTMS = function() {
        this._chapterWindow.reDrawContents(this.getCommandIndex());
    };

    Scene_Menu.prototype.onSelectTMS_Status = function() {
        this._genUpdatePages.next();
    };

    //Hack: This process is called many times.
    //But, I think that it is better than calling this function repeatedly in the update function.
    /**
     * @param {function} func
     */
    Scene_Menu.prototype.genSkipFirstCalling = function*(func) {
        var count = 0;
        while(true){
            if(count > 0){//Main process
                func();
            }
            count++;
            yield;
        }
    };

    var _Scene_Menu_onFormationOk      = Scene_Menu.prototype.onFormationOk;
    Scene_Menu.prototype.onFormationOk = function() {
        _Scene_Menu_onFormationOk.call(this);
        this._genSwapSVActors.next();
    };

//////=============================================================================
///// Window_MenuCommand
/////  Override Window_MenuCommand.
/////=============================================================================
    Window_MenuCommand.prototype.windowWidth = function() {
        return Graphics.boxWidth;
    };

    Window_MenuCommand.prototype.numVisibleRows = function() {
        return param.menuRows;
    };

    Window_MenuCommand.prototype.maxCols = function() {
        return param.menuMaxCols;
    };

    var _Window_MenuCommand_initialize = Window_MenuCommand.prototype.initialize;
    Window_MenuCommand.prototype.initialize = function(x, y, width, height) {
        this.createEventListener();
        _Window_MenuCommand_initialize.call(this,x, y, width, height);
    };

    Window_MenuCommand.prototype.createEventListener = function(){
        this.eventListener = new Map([['onUp',null],['onDown',null],['onLeft',null],['onRight',null],['onSelect',null]]);
        for(var key of this.eventListener.keys()){
            this.eventListener[key] = new EventListener();
        }
    };
    
    //Override.
    Window_MenuCommand.prototype.cursorDown = function(wrap) {
        var temp_index = this.index();
        if((this.maxCols()*this.maxRows()-this.maxCols()) <= this.index()){
            var oppositIndex = (this.maxCols()*this.maxRows()-this.maxCols()) - this.index();
            this.select(Math.abs(oppositIndex));
        }else{
            var index = this.index();
            var maxItems = this.maxItems();
            var maxCols = this.maxCols();
            if (index < maxItems - maxCols || (wrap && maxCols === 1)) {
                this.select((index + maxCols) % maxItems);
            }
        }

        if(temp_index === this.index()){
            if(this.index()-this.maxCols() > 0){
                this.select(this.index()-this.maxCols());
            }
        }

        this.eventListener.onDown.fire();
    };

    //Override.
    Window_MenuCommand.prototype.cursorUp = function(wrap) {
        var temp_index = this.index();
        if(this.maxCols() > this.index()){
            var oppositIndex = (this.maxCols()*this.maxRows()-this.maxCols()) + this.index();
            var newIndex     = (oppositIndex < this.maxItems()) ? oppositIndex : this.index();
            this.select(newIndex);
        }else{
            var index = this.index();
            var maxItems = this.maxItems();
            var maxCols = this.maxCols();
            if (index >= maxCols || (wrap && maxCols === 1)) {
                this.select((index - maxCols + maxItems) % maxItems);
            }
        }

        if(temp_index === this.index()){
            if(this.index()+this.maxCols() < this.maxItems()){
                this.select(this.index()+this.maxCols());
            }
        }

        this.eventListener.onUp.fire();
    };
    
    //Override.
    Window_MenuCommand.prototype.cursorRight = function(wrap) {
        if((this.index() === this.maxItems()-1)){
            this.select(0);
        }else{
            var index = this.index();
            var maxItems = this.maxItems();
            var maxCols = this.maxCols();
            if (maxCols >= 2 && (index < maxItems - 1 || (wrap && this.isHorizontal()))) {
                this.select((index + 1) % maxItems);
            }
        }

        this.eventListener.onRight.fire();
    };
    
    //Override.
    Window_MenuCommand.prototype.cursorLeft = function(wrap) {
        if((this.index() === 0)){
            this.select(this.maxItems()-1);
        }else{
            var index = this.index();
            var maxItems = this.maxItems();
            var maxCols = this.maxCols();
            if (maxCols >= 2 && (index > 0 || (wrap && this.isHorizontal()))) {
                this.select((index - 1 + maxItems) % maxItems);
            }
        }

        this.eventListener.onLeft.fire();
    };

    //Override.
    var _Window_MenuCommand_select = Window_MenuCommand.prototype.select;
    Window_MenuCommand.prototype.select = function(index) {
        _Window_MenuCommand_select.call(this, index);

        this.eventListener.onSelect.fire();
    };

//////=============================================================================
///// Window_MenuStatus
/////  Override Window_MenuStatus.
/////=============================================================================
    var _Window_MenuStatus_initialize = Window_MenuStatus.prototype.initialize;
    Window_MenuStatus.prototype.initialize = function(x, y, width, height) {
        this.createEventListener();
        _Window_MenuStatus_initialize.call(this,x, y, width, height);
    };

    Window_MenuStatus.prototype.createEventListener = function(){
        this.eventListener = new Map([['onUp',null],['onDown',null],['onLeft',null],['onRight',null],['onSelect',null]]);
        for(var key of this.eventListener.keys()){
            this.eventListener[key] = new EventListener();
        }
    };

    var _Window_MenuStatus_select = Window_MenuStatus.prototype.select;
    Window_MenuStatus.prototype.select = function(index) {
        _Window_MenuStatus_select.call(this, index);

        this.eventListener.onSelect.fire();
    };

    var _Window_MenuCommand_update = Window_MenuCommand.prototype.update;
    Window_MenuStatus.prototype.update = function() {
        _Window_MenuCommand_update.call(this);
        this.updateSVActors();
    };

    var _Window_MenuCommand_createContents = Window_MenuCommand.prototype.createContents;
    Window_MenuStatus.prototype.createContents = function() {
        _Window_MenuCommand_createContents.call(this);
        this.createSVActors();
    };

    //Override.
    Window_MenuStatus.prototype.drawItem = function(index) {
        if(index < this.topIndex()){
            //HACK: This is for not drawing unnecessary actor.
            //But I think there is a better solution.
            return;
        }
        this.drawItemBackground(index);
        this.drawFaceImage(index);
        this.drawUpperArea(index);
        this.drawLowerArea(index);
    };

    Window_MenuStatus.prototype.drawFaceImage = function(index) {
        var actor  = $gameParty.members()[index];
        var rect   = this.itemRect(index);
        var width  = 105;
        var height = 30;
        var margin = 5;
        this.changePaintOpacity(actor.isBattleMember());
        this.drawActorFace(actor, rect.x + margin, rect.y + margin, width, height);
        this.changePaintOpacity(true);
    };

    Window_MenuStatus.prototype.drawUpperArea = function (index) {
        var actor      = $gameParty.members()[index];
        var rect       = this.itemRect(index);
        var x          = rect.x;
        var y          = rect.y;
        var width      = rect.width;
        var lineHeight = this.lineHeight();
        var margin     = 10;
        var levelWidth = this.drawActorLevelTMS(actor, x, y + lineHeight * 2, width);
        this.drawActorName(actor, x, y + lineHeight * 1, width);
        this.drawActorIcons(actor, levelWidth + margin, y + lineHeight * 2, width);
    };

    Window_MenuStatus.prototype.createSVActors = function() {
        if(!$dataSystem.optSideView){
            return;
        }
        this._spriteSVActors = [];

        $gameParty.members().forEach(function(actor, i) {
            this._spriteSVActors[i] = new Sprite_Actor(actor);
            this._spriteSVActors[i].setBattler(actor);
            this._spriteSVActors[i].startMotion(NTMO.TMS.Base.getActorState(actor));
            this.addChild(this._spriteSVActors[i]);
        }, this);
    };

    Window_MenuStatus.prototype.updateSVActors = function() {
        if(!$dataSystem.optSideView || !'_spriteSVActors' in this){
            return;
        }

        var lineHeight = this.lineHeight();
        var padding    = 20;
        var correctY   = 8;
        var y = lineHeight*2 + correctY;

        $gameParty.members().forEach(function(actor, i) {
            var rect = this.itemRect(i);
            this._spriteSVActors[i].startMotion(NTMO.TMS.Base.getActorState(actor));
            this._spriteSVActors[i].x = rect.x + rect.width - padding;
            this._spriteSVActors[i].y = y;
        }, this);
    };

    Window_MenuStatus.prototype.modifySVActorsVisible = function() {
        if(!$dataSystem.optSideView || !'_spriteSVActors' in this){
            return;
        }

        var topIndex = this.topIndex();
        this._spriteSVActors.forEach(function(element, index) {
            if((index >= topIndex) && (index <= topIndex+this.maxCols()-1)){
                //When window contains the Actor.
                element.show();
            }else{
                //Not contains the Actor.Actor is next(or else) page.
                element.hide();
            }
        }, this);
    };

    Window_MenuStatus.prototype.swapSVActors = function() {
        //スワップ用の処理を書く
        this._spriteSVActors.forEach(function(element, index) {
            this.removeChild(element);
        }, this);
        this.createSVActors();
        this.modifySVActorsVisible();
    };

    /**
     * @return {number}
     */
    Window_MenuStatus.prototype.drawActorLevelTMS = function (actor, x, y) {
        var width   = this.textWidth(TextManager.levelA);
        var padding = 5;
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.levelA, x, y, 48);
        this.resetTextColor();
        this.drawText(actor.level, x + width + padding, y, 36, 'left');

        var resultWidth = x + width + padding + this.textWidth(actor.level);
        return resultWidth;
    };

    Window_MenuStatus.prototype.drawLowerArea = function (index) {
        var actor      = $gameParty.members()[index];
        var rect       = this.itemRect(index);
        var lineHeight = this.lineHeight();
        var width      = rect.width;
        var x = rect.x;
        var y = rect.y;
        this.drawActorHp(actor, x, lineHeight * 3, width);
        this.drawActorMp(actor, x, lineHeight * 4, width);
        this.drawTpPoint(actor, x, lineHeight * 5, width);
        this.drawNextExp(index, x, lineHeight * 6, width);
    };

    Window_MenuStatus.prototype.drawNextExp = function (index, x, lineHeight, width) {
        //Initialize.
        var actor           = $gameParty.members()[index];
        var rect            = this.itemRect(index);
        var requiredPercent = this.calcNextExpPercent(actor);

        //Draw gauge.
        var gaugeRate = (typeof(requiredPercent)==='number') ? requiredPercent / 100 : 0;
        var color1 = "#FFD21E";
        var color2 = "#FF9900";
        width = width || 96;
        this.drawGauge(x, lineHeight, width, gaugeRate, color1, color2);

        //Text width.
        var perWidth = this.textWidth('%');
        var expWidth = this.textWidth('EXP');
        var numWidth = this.textWidth(requiredPercent);
        var empWidth = this.textWidth('0');
        var numY     = x + rect.width - perWidth - numWidth - empWidth;
        
        //Draw text.
        this.changeTextColor(this.systemColor());
        this.drawText("EXP", x, lineHeight, expWidth,'left');
        this.resetTextColor();
        this.drawText(requiredPercent, numY, lineHeight, numWidth, 'right');
        this.changeTextColor(this.systemColor());
        this.drawText("%", x + rect.width - perWidth, lineHeight, perWidth, 'right');
        this.resetTextColor();
    }

    Window_MenuStatus.prototype.calcNextExpPercent = function (actor) {
        //Initialize
        var requiredExp       = actor.nextRequiredExp();
        var nextLevelExp      = actor.nextLevelExp();
        var currentExp        = actor.currentExp();
        var previousLevelExp  = actor.expForLevel(actor.level);//Get the previous require level exp.

        //Calculate next exp percentage.
        if (actor.level === 1) {
            return currentExp / nextLevelExp * 100;
        }else if(actor.isMaxLevel()){
            return '-------';
        }else{
            var pow          = Math.pow(10, 2);
            var remainingPer = 100 - (requiredExp / (nextLevelExp - previousLevelExp) * 100)//The remaining percentage
            return Math.floor(remainingPer * pow) / pow;
        }
    };

    Window_MenuStatus.prototype.drawTpPoint = function (actor, x, y, width) {
        width = width || 96;
        //Get text width.
        var labelWidth = this.textWidth(TextManager.tpA);
        var valueWidth = this.textWidth('0000');//Max tp is usually 100, but should align according to other digits.
        var slashWidth = this.textWidth('/');
        //Set x position.
        var maxTpX     = x + width - valueWidth;
        var slashX     = maxTpX - slashWidth;
        var currentTpX = slashX - valueWidth;
        //Get tp color.
        var color1 = this.tpGaugeColor1();
        var color2 = this.tpGaugeColor2();
        //Draw gauge.
        this.drawGauge(x, y, width, actor.tpRate(), color1, color2);
        //Draw TP texts.
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.tpA, x, y, 44);
        this.changeTextColor(this.tpColor(actor));
        //Draw number and slash.
        this.drawText(actor.tp, currentTpX, y, valueWidth, 'right');//current
        this.drawText("/", slashX, y, slashWidth, 'right');
        this.drawText(actor.maxTp(), maxTpX, y, valueWidth, 'right');
    };

    Window_MenuStatus.prototype.windowWidth = function() {
        return Graphics.boxWidth;
    };

    Window_MenuStatus.prototype.windowHeight = function() {
        return param.statusWinHeight;
    };

    Window_MenuStatus.prototype.numVisibleRows = function() {
        return 1;
    };

    Window_MenuStatus.prototype.maxCols = function() {
        return param.statusMaxCols;
    };

//////=============================================================================
///// NTMO.TMS.Window_Chapter
/////  Window of menu for drawing chapter chars.
/////=============================================================================
    NTMO.TMS.Window_Chapter = function() {
        this.initialize.apply(this, arguments);
    };

    NTMO.TMS.Window_Chapter.prototype = Object.create(Window_Base.prototype);
    NTMO.TMS.Window_Chapter.prototype.constructor = NTMO.TMS.Window_Chapter;

    NTMO.TMS.Window_Chapter.prototype.initialize = function(x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);

        this.drawChapterText();
    };

    NTMO.TMS.Window_Chapter.prototype.drawChapterText = function() {
        var x     = 0;
        var y     = 0;
        var text  = (param.shouldUseHelp==='On') ? param.textHelp[0] : $gameSystem.tMenuSys().getChapterName();
        this.drawTextEx(text, x, y);
    };

    NTMO.TMS.Window_Chapter.prototype.drawHelpText = function(index) {
        var x     = 0;
        var y     = 0;
        var text  = param.textHelp[index];
        this.contents.clear();
        this.drawTextEx(text, x, y);
    };

    NTMO.TMS.Window_Chapter.prototype.reDrawContents = function(index) {
        switch(param.shouldUseHelp){
            case 'On':
            case 'Switching':
                this.drawHelpText(index);
                break;
            default:
                break;
        }
    };

//////=============================================================================
///// NTMO.TMS.Window_Tips
/////  Window of menu for drawing Tips.
/////=============================================================================
    NTMO.TMS.Window_Tips = function() {
        this.initialize.apply(this, arguments);
    };

    NTMO.TMS.Window_Tips.prototype = Object.create(Window_Base.prototype);
    NTMO.TMS.Window_Tips.prototype.constructor = NTMO.TMS.Window_Tips;

    NTMO.TMS.Window_Tips.prototype.initialize = function(x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
    };

    NTMO.TMS.Window_Tips.prototype.refresh = function() {
        this.drawTipsText($gameSystem.tMenuSys().getTips1(), 1);
        this.drawTipsText($gameSystem.tMenuSys().getTips2(), 2);
    };

    NTMO.TMS.Window_Tips.prototype.drawTipsText = function(text, tipsNum) {
        var x     = 0;
        //If 2 was set in tipsNum, draw on the lower half.
        var y     = (tipsNum===1) ? 0 : this.contentsHeight()/2;
        this.drawTextEx(text, x, y);
    };

    NTMO.TMS.Window_Tips.prototype.standardFontSize = function() {
        return param.subWinfontSize;
    };

//////=============================================================================
///// NTMO.TMS.Window_Info
/////  Window of menu for drawing detailed information.
/////=============================================================================
    NTMO.TMS.Window_Info = function() {
        this.initialize.apply(this, arguments);
    };

    NTMO.TMS.Window_Info.prototype = Object.create(Window_Base.prototype);
    NTMO.TMS.Window_Info.prototype.constructor = NTMO.TMS.Window_Info;

    NTMO.TMS.Window_Info.prototype.initialize = function(x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
    };

    NTMO.TMS.Window_Info.prototype.refresh = function() {
        this.drawLeftArea();
        this.drawCenterArea();
        this.drawRightArea();
    };

    NTMO.TMS.Window_Info.prototype.drawLeftArea = function() {
        var x       = Number(param.ratio[0]);//Default is 0.00.
        var locationWidth = this.textWidth(param.charsLocation);
        var fortuneWidth  = this.textWidth(param.charsFortune);
        //Location.
        this.drawInfoText(param.charsLocation, $gameMap.displayName(), x, true, locationWidth, fortuneWidth);
        //The money in player's possession.
        this.drawInfoText(param.charsFortune, $gameParty.gold()+' \G', x, false, locationWidth, fortuneWidth);
    };

    NTMO.TMS.Window_Info.prototype.drawCenterArea = function() {
        var ratio   = Number(param.ratio[1]);//Default is 0.35.
        var x       = this.contentsWidth() * ratio;
        var unit    = ($gameSystem.isJapanese) ? '回' : 'times';
        //Width
        var combNumWidth   = this.textWidth(param.charsCombatNum);
        var playTimeWidth  = this.textWidth(param.charsPlayTime);
        //Numbers of combat.
        this.drawInfoText(param.charsCombatNum, `${$gameSystem.battleCount()} ${unit}`, x, true, combNumWidth, playTimeWidth);
        //Play Time.
        this.drawInfoText(param.charsPlayTime, $gameSystem.playtimeText(), x, false, combNumWidth, playTimeWidth);
    };

    NTMO.TMS.Window_Info.prototype.drawRightArea = function() {
        //Initialize.
        var ratio   = Number(param.ratio[2]);//Default is 0.7.
        var x       = this.contentsWidth() * ratio;
        //Try to parse
        var op1Text = this.tryToParseChronus(param.op1Contents);
        var op2Text = this.tryToParseChronus(param.op2Contents);
        //Drawing.
        this.drawInfoText(param.option1, op1Text, x, true);
        this.drawInfoText(param.option2, op2Text, x, false);
    };

    /**
     * @param {string} itemName
     * @param {string} contents
     * @param {number} x
     * @param {boolean} isUpper
     * @param {number} upperWidth
     * @param {number} bottomWidth
     */
    NTMO.TMS.Window_Info.prototype.drawInfoText = function(itemName, contents, x, isUpper, upperWidth, bottomWidth) {
        //Color settings.
        var itemNameColor = param.colorItemName;
        var contentsColor = param.colorContents;
        
        //Align.
        var margin;
        if(isUpper){
            margin = (upperWidth - bottomWidth)<0 ? Math.abs(upperWidth - bottomWidth) : 0;
        }else{
            margin = (bottomWidth - upperWidth)<0 ? Math.abs(bottomWidth - upperWidth) : 0;
        }

        //Text drawing.
        var y     = (isUpper) ? 0 : this.contentsHeight()/2;//If 'isUpper' is true, draw on the higher half.
        var text  = `\\C[${itemNameColor}]${itemName} \\C[${contentsColor}]${contents}`;
        this.drawTextEx(text, x + margin, y);
    };

    NTMO.TMS.Window_Info.prototype.standardFontSize = function() {
        return param.subWinfontSize;
    };

    NTMO.TMS.Window_Info.prototype.tryToParseChronus = function(data) {
        if(data !== '[Chronus1]' && data !== '[Chronus2]'){
            //When data is not Chronus, return data as is. 
            return data;
        }

        if('Game_Chronus' in window){
            //Collaborate with Chronus and acquire time data.
            //1 is Years etc.2 is 24hours.
            return (data==='[Chronus1]') ? $gameSystem.chronus().getDateFormat(1) : $gameSystem.chronus().getDateFormat(2);
        }else{
            return 'Chronus is not found.';
        }
    };

////=============================================================================
//// EventListener
////  This class is event listener for window system.
////  I use the class syntax to test the class syntax.There is no deep meaning.
////=============================================================================
    class EventListener {
        constructor() {
            this._callbacks  = [];
        }

        register(fnc) {
            if(fnc && typeof(fnc) === 'function'){
                this._callbacks.push(fnc);
            }
        }

        fire() {
            for(var fnc of this._callbacks){
                fnc();
            }
        }
    };

})();