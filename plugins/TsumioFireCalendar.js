//=============================================================================
// TsumioFireCalendar.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.1 2017/11/10 プラグインパラメーターの追加と説明の加筆。
// 1.0.0 2017/11/04 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc This plugin implements the calendar function.
 * @author Tsumio
 *
 * @param ----Basic Settings----
 * @desc 
 * @default 
 * 
 * @param CalendarSettings
 * @type struct<CalendarMain>
 * @desc Sets coordinate and size ot the calendar.
 * @default {"x":"0","y":"-100","width":"400","height":"350","outerFrameWidth":"5","innerFrameWidth":"0"}
 * 
 * @param CalendarColors
 * @type struct<CalendarColor>
 * @desc Sets the colors of the calendar.
 * @default {"background":"#FFF","textRed":"#CC0000","textBlue":"#0066FF","textBlack":"#000","todayColor":"#66CC99","selectedColor":"#FFCC66"}
 * 
 * @param DayOfTheWeekColors
 * @type struct<DayOfTheWeekColors>
 * @desc Sets the colors of the day of the week.
 * @default {"sunday":"#CC0000","monday":"#FF3366","tuesday":"#FF6633","wednesday":"#FF9933","thursday":"#66CC33","friday":"#006600","saturday":"#0066FF"}
 * 
 * @param CheckingMarkColor
 * @type string
 * @desc Sets the color of the checking mark.
 * @default #FF6600
 * 
 * 
 * @help This This plugin implements the calendar function.
 * 
 * ----feature----
 * -> Implements the calendar function.
 * -> You can write comments as a diary.
 * -> This plugin works with Chronus.js created by Triacontane.
 * 
 * ----how to use----
 * To use this plugin you need to install "canvas-arrow.js".
 * Please download "canvas-arrow.js" from the following URL (the author is frogcat, not Tsumio).
 * https://raw.githubusercontent.com/frogcat/canvas-arrow/master/canvas-arrow.js
 * 
 * After introducing the plugin, it can be used by using plugin command.
 * 
 * When you execute "TFC goto_Scene" with the plugin command, it will shift to the calendar scene.
 * You can write the contents in the calendar.
 * For example, when you execute the plugin command "TFC append 2005-10-10 OhOHOhoH~", the calendar on October 10, 2005 will be written as "OhOHOhoH~".
 * 
 * You can also execute append from the sentence display.
 * For details, please refer to "how to execute append from 'ShowText of EventCommand'".
 * 
 * ----date format----
 * Date must be entered in the following format.
 * "One or more digits"-"One to two digits"-"One to two digits"
 * However, please do not fill numbers with zeros (eg 01, 09 etc).
 * 
 * OK:10-10-12
 * OK:2015-3-5
 * NG:2015-3-09
 * NG:1999-03-1
 * 
 * ----plugin command----
 * All plugin commands start with "TFC".
 * Plugin commands are distinguish uppercase and lowercase.
 * And separate each word with a space.
 * Please make sure.
 * 
 * 
 * "TFC goto_Scene" : Go to the calendar scene.
 * "TFC set date contents" : Rewrite the contents of the specified date.
 * "TFC append date contents" : Add the contents on the specified date.
 * "TFC clear date" : Clear the contents on the specified date.
 * 
 * ----how to execute append from 'ShowText of EventCommand'----
 * The same function as append can be executed from "ShowText of EventCommand".
 * First, launch an event command in the same way as entering normal sentences.
 * Next, insert "<TFC:date>" anywhere in each line.
 * 
 * Example:
 * <TFC:1991-5-11>abcdefgh
 * Insertion place is<TFC  :       1991-5-11>anywhere OK
 * This line is not registered because TFC is not specified
 * Between TFC and semicolon<TFC : 1991-5-11>even if there is a space, it is OK.
 *
 * ----how to operate with mouse----
 * Click on each date to read the data for that date. Click the button to activate.
 * When you rotate the wheel, the bar in the text area moves according to the rotation amount.
 * Holding down the Ctrl key and rotating the wheel doubles the amount of movement.
 * The touch operation of the smartphone should be possible with the same feeling, but it is not confirmed with the actual machine.
 * 
 * ----how to operate with keyboard----
 * Basically it does not assume operation with the keyboard, but supports basic operation.
 * Use the arrow keys to move each date.
 * Move the text area bar with the OK key or Cancel key.
 * You can turn the calendar to the previous month and the following month with Q key and W key.
 * 
 * ----collaboration with Chronus.js----
 * This plugin supports collaboration with Chronus.js created by Triacontane.
 * When Chronus.js is introduced, the date of Chronus.js is the base date.
 * When Chronus.js is not introduced, the actual date will be the base date.
 * 
 * 参考URL：https://raw.githubusercontent.com/triacontane/RPGMakerMV/master/Chronus.js
 * 
 * ----change log---
 * 1.0.1 2017/11/10 Add plugin parameters and a description of explanation.
 * 1.0.0 2017/11/04 Release.
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
 * @plugindesc カレンダー機能を実装します。
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * @param カレンダーの設定
 * @type struct<CalendarMain>
 * @desc カレンダーの座標とサイズを設定します。
 * @default {"x":"0","y":"-100","width":"400","height":"350","outerFrameWidth":"5","innerFrameWidth":"0"}
 * 
 * @param カレンダーの色
 * @type struct<CalendarColor>
 * @desc カレンダーの色を設定します。
 * @default {"background":"#FFF","textRed":"#CC0000","textBlue":"#0066FF","textBlack":"#000","todayColor":"#66CC99","selectedColor":"#FFCC66"}
 * 
 * @param 曜日の背景色
 * @type struct<DayOfTheWeekColors>
 * @desc 各曜日の背景色を設定します。
 * @default {"sunday":"#CC0000","monday":"#FF3366","tuesday":"#FF6633","wednesday":"#FF9933","thursday":"#66CC33","friday":"#006600","saturday":"#0066FF"}
 * 
 * @param チェックマークの色
 * @type string
 * @desc チェックマークの色を設定します。
 * @default #FF6600
 * 
 * @help カレンダー機能を実装します。
 * 
 * 【特徴】
 * ・カレンダー機能を実装します。
 * ・日記感覚でコメントを書くことができます。
 * ・トリアコンタンさんが制作したプラグインChronus.jsと連携できます。
 * 
 * 【使用方法】
 * このプラグインを使用するには、canvas-arrow.jsを導入する必要があります。
 * canvas-arrow.jsは以下のURLからダウンロードしてください（作者はツミオではなくfrogcatさんです）。
 * https://raw.githubusercontent.com/frogcat/canvas-arrow/master/canvas-arrow.js
 * 
 * 
 * プラグインの導入後、プラグインコマンドを使用することによって使用できます。
 * 
 * プラグインコマンドで「TFC goto_Scene」を実行すると、カレンダーシーンへ移行します。
 * このカレンダーには内容を書き込むことができます。
 * 例えばプラグインコマンド「TFC append 2005-10-10 二千五年10月とおかです」とすると、2005年10月10日のカレンダーに「二千五年10月とおかです」と書き足されます。
 * 
 * 
 * また、文章の表示からappendを実行することもできます。
 * 詳細は【文章の表示からappendを実行する方法】を参照してください。
 * 
 * 【年月日のフォーマット】
 * 年月日は以下のフォーマットで入力する必要があります。
 * 《1桁以上の数字》-《1桁から2桁の数字》-《1桁から2桁の数字》
 * ただし、数字をゼロで埋めないでください（例えば01や09など）。
 * 
 * OK:10-10-12
 * OK:2015-3-5
 * NG:2015-3-09
 * NG:1999-03-1
 * 
 * 【プラグインコマンド】
 * 全てのプラグインコマンドは「TFC」から始まります。
 * また、説明上では視認性のためにカギカッコを使用していますが、実際にプラグインコマンドに入力する際には
 * カギカッコの入力は不要です。
 * 
 * 全てのプラグインコマンドは大文字と小文字を区別します。
 * 各単語の間は半角スペースで区切ります（全角では認識しません）。
 * 間違わないように気をつけてください。
 * 
 * 「TFC goto_Scene」: カレンダーシーンへ移動します。
 * 「TFC set 年月日 内容」: 指定した年月日の内容を内容で書き換えます。
 * 「TFC append 年月日 内容」: 指定した年月日に内容を書き足します。
 * 「TFC clear 年月日」: 指定した年月日の内容を消去します。
 * 
 * 【文章の表示からappendを実行する方法】
 * 「イベントコマンドの《文章の表示》」からもappendと同等の機能を実行できます。
 * まず、通常の文章を入力するのと同じようにしてイベントコマンドを立ち上げます。
 * 次に、各行の任意の場所に「<TFC:年月日>」を挿入してください。
 * 
 * 例：
 * <TFC:1991-5-11>あいうえおかきくけこ
 * 挿入場所は<TFC  :       1991-5-11>どこでもOK
 * この行はTFCが指定されていないため登録されない
 * TFCとセミコロンの間に<TFC : 1991-5-11>空白はあってもOK
 * 
 * 【マウスでの操作方法】
 * 各日付をクリックすると、その日付のデータを読み込みます。ボタンもクリックすることで作動します。
 * また、ホイールを回転させるとテキストエリアのバーが回転量に応じて移動します。
 * Ctrlキーを押しながらホイールを回転させると移動量が倍になります。
 * スマホのタッチ操作も同じ感覚で可能なはずですが、実機での確認はしていません。
 * 
 * 【キーボードでの操作方法】
 * 基本的にはキーボードでの操作を想定していませんが、基本的な動作はサポートしています。
 * カーソルキーで各日付を移動します。
 * 決定キーやキャンセルキーでテキストエリアのバーを移動させます。
 * QキーおよびWキーで前月と翌月へカレンダーをめくることができます。
 * 
 * 【Chronus.jsとの連携】
 * 当プラグインはトリアコンタンさんが制作したChronus.jsとの連携をサポートしています。
 * Chronus.jsを導入した場合、Chronus.jsの日付が基準日になります。
 * Chronus.jsを導入していない場合は実際の日付が基準日になります。
 * 
 * 参考URL：https://raw.githubusercontent.com/triacontane/RPGMakerMV/master/Chronus.js
 * 
 * 【更新履歴】
 * 1.0.1 2017/11/10 プラグインパラメーターの追加と説明の加筆。
 * 1.0.0 2017/11/04 公開。
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
/*~struct~CalendarMain:
 * 
 * @param x
 * @type number
 * @min -3000
 * @max 3000
 * @desc X座標(X Coordinate).
 * 
 * @param y
 * @type number
 * @min -3000
 * @max 3000
 * @desc Y座標(Y Coordinate).
 * 
 * @param width
 * @type number
 * @desc 幅(Width).
 * 
 * @param height
 * @type number
 * @desc 高さ(Height).
 * 
 * @param outerFrameWidth
 * @type number
 * @desc 外枠の太さ(Outer frame width).
 * 
 * @param innerFrameWidth
 * @type number
 * @desc 外枠の太さ(Inner frame width).
 * 
 */
/*~struct~CalendarColor:
 * 
 * @param background
 * @type string
 * @desc 背景色(BackgroundColor).
 * 
 * @param textRed
 * @type string
 * @desc 日曜日の文字色(Font color on Sunday).
 * 
 * @param textBlue
 * @type string
 * @desc 土曜日の文字色(Font color on Saturday).
 * 
 * @param textBlack
 * @type string
 * @desc 土日以外の文字色(Font color except Saturdays and Sundays).
 * 
 * @param todayColor
 * @type string
 * @desc 今日の背景色(Today's background color).
 * 
 * @param selectedColor
 * @type string
 * @desc 選択中の日付の背景色(Selected day's background color).
 * 
 */
/*~struct~DayOfTheWeekColors:
 * 
 * @param sunday
 * @type string
 * @desc 日曜日の背景色(Background color on Sunday).
 * 
 * @param monday
 * @type string
 * @desc 月曜日の背景色(Background color on Monday).
 * 
 * @param tuesday
 * @type string
 * @desc 火曜日の背景色(Background color on Tuesday).
 * 
 * @param wednesday
 * @type string
 * @desc 水曜日の背景色(Background color on Wednesday).
 * 
 * @param thursday
 * @type string
 * @desc 木曜日の背景色(Background color on Thursday).
 * 
 * @param friday
 * @type string
 * @desc 金曜日の背景色(Background color on Friday).
 * 
 * @param saturday
 * @type string
 * @desc 土曜日の背景色(Background color on Saturday).
 * 
 */

function Game_CalendarTFC() {
    this.initialize.apply(this, arguments);
}

(function() {
    'use strict';
    var pluginName = 'TsumioFireCalendar';


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
    var getPluginCommandText = function(args) {
        var length = args.length;
        var text   = '';
        for(var i = 2; i < length; i++){
            //If match 'return'.
            if(args[i] === '\\n'){
                args[i] = '\n';
                text += args[i];
            }else{
                text += args[i] + ' ';
            }
        }
        return text;
    };

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
    param.calendarSettings    = getParamString(['CalendarSettings', 'カレンダーの設定']);
    param.calendarColors      = getParamString(['CalendarColors',   'カレンダーの色']);
    param.checkingMarkColor   = getParamString(['CheckingMarkColor', 'チェックマークの色']);
    param.dayOfWeekcolors     = getParamString(['DayOfTheWeekColors', '曜日の背景色']);

////==============================
//// Convert parameters.
////==============================
    param.calendarSettings    = convertParam(param.calendarSettings);
    param.calendarColors      = convertParam(param.calendarColors);
    param.dayOfWeekcolors     = convertParam(param.dayOfWeekcolors);

////==============================
//// Convert to Number.
////==============================
    param.calendarSettings    = convertToNumber(param.calendarSettings);


////=============================================================================
//// Settings for plugin command.
////=============================================================================
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'TFC') {
            switch(args[0]){
                case 'goto_Scene':
                    SceneManager.push(Scene_Diary);
                    break;
                case 'set' :
                    var text = getPluginCommandText(args);
                    $gameSystem.calendarTFC().setData(args[1], text);
                    break;
                case 'getAllData' :
                    Debug.log($gameSystem.calendarTFC().getAllData()); 
                    break;
                case 'clear' :
                    $gameSystem.calendarTFC().clearData(args[1]);
                    break;
                case 'append' :
                    var text = getPluginCommandText(args);
                    $gameSystem.calendarTFC().appendData(args[1], text);
                    break;
            }
        }
    };

//////=============================================================================
///// Game_Message
/////  Hook Game_Message for showing text in synopsis scene.
/////==============================================================================
    
    //HACK : Probalby this code cause any problem.
    const _Game_Message_add      = Game_Message.prototype.add;
    Game_Message.prototype.add = function(text) {
        const matchResult = text.match(/<TFC(?:\s*)?:(?:\s*)?(\d+-\d{1,2}-\d{1,2})>/);
        if(matchResult){
            $gameSystem.calendarTFC().appendData(matchResult[1], text);
        }else{
            _Game_Message_add.call(this, text);
        }
    };

//////=============================================================================
///// Game_System
/////  Add a game system called Game_CalendarTFC.
/////==============================================================================
    const _Game_System_initialize      = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this._calendarTFC = new Game_CalendarTFC();
    };

    Game_System.prototype.calendarTFC = function() {
        return this._calendarTFC;
    };

    const _Game_System_onLoad      = Game_System.prototype.onLoad;
    Game_System.prototype.onLoad = function() {
        if (_Game_System_onLoad) _Game_System_onLoad.apply(this, arguments);
        if (!this.calendarTFC()) this._calendarTFC = new Game_CalendarTFC();
        this._calendarTFC.onLoad();
    };

//////=============================================================================
///// Game_CalendarTFC
/////  This class manage TsumioFireCalendar's data.
/////=============================================================================
    Game_CalendarTFC.prototype             = Object.create(Game_CalendarTFC.prototype);
    Game_CalendarTFC.prototype.constructor = Game_CalendarTFC;

    Game_CalendarTFC.prototype.initialize = function() {
        this._yearData = {};
    };

    Game_CalendarTFC.prototype.onLoad = function() {
        //When system is loaded, execute any function if necessary.
    };

    /**
     *  date is 'year-month-date';
     *  [0] -> year
     *  [1] -> month
     *  [2] -> day
     */
    Game_CalendarTFC.prototype.setData = function(date, contents) {
        const dateArray = this.splitDate(date);
        const year      = dateArray[0];
        const month     = dateArray[1];
        const day       = dateArray[2];
        if(this.hasYearData(year)){
            //const monthAndDay = this._yearData[year];
            this._yearData[year][`${month}-${day}`] = contents;
            //monthAndDay.set(`${month}-${date}`, contents);
        }else {
            this._yearData[year] = {};
            this._yearData[year][`${month}-${day}`] = contents;
            //const monthAndDay = this._yearData[year];
            //monthAndDay.set(`${month}-${date}`, contents);
        }
    };

    Game_CalendarTFC.prototype.getData = function(date) {
        const dateArray = this.splitDate(date);
        const year      = dateArray[0];
        const month     = dateArray[1];
        const day       = dateArray[2];
        if(this.hasYearData(year)){
            //const monthAndDay = this._yearData.get(year);
            return this._yearData[year][`${month}-${day}`];
            //return monthAndDay.get(`${dateArray[1]}-${dateArray[2]}`);
        }else {
            return undefined;
        }
    };

    Game_CalendarTFC.prototype.appendData = function(date, contents) {
        contents = contents.replace(/<TFC(?:\s*)?:(?:\s*)?(\d+-\d{1,2}-\d{1,2})>/, '');//Hack : Prbabley this code cause any problem.
        const dateArray = this.splitDate(date);
        const year      = dateArray[0];
        const month     = dateArray[1];
        const day       = dateArray[2];
        if(this.hasYearData(year)){
            if(this._yearData[year][`${month}-${day}`]){
                this._yearData[year][`${month}-${day}`] += contents+'\n';
            }else{
                this._yearData[year][`${month}-${day}`] = contents+'\n';
            }
        }else {
            this._yearData[year] = {};
            this._yearData[year][`${month}-${day}`] = contents+'\n';
        }
    };

    Game_CalendarTFC.prototype.clearData = function(date) {
        const dateArray = this.splitDate(date);
        const year      = dateArray[0];
        const month     = dateArray[1];
        const day       = dateArray[2];
        if(this.hasYearData(year) && this._yearData[year][`${month}-${day}`]){
            this._yearData[year][`${month}-${day}`] = '';
        }else {
            console.warn(`${year}-${month}-${day} : Data does not exist!`);
        }
    };

    /**
     * For debugging.
     */
    Game_CalendarTFC.prototype.getAllData = function() {
        return this._yearData;
    };

    /**
     * Get the year all data.
     */
    Game_CalendarTFC.prototype.getYearData = function(year) {
        if(this.hasYearData(year)){
            return this._yearData[year];
        }
        return null;
    };

    /**
     * @param {string} date
     */
    Game_CalendarTFC.prototype.splitDate = function(date) {
        //[0] -> year
        //[1] -> month
        //[2] -> date
        return date.split('-');
    };

    Game_CalendarTFC.prototype.hasYearData = function(year) {
        for(let prop in this._yearData) {
            if(this._yearData.hasOwnProperty(prop)){
                if(prop === year) {
                    return true;
                }
            }
        }
        return false;
        //return this._yearData.has(year);
    };

////=============================================================================
//// Scene_Diary
////  This class implements diary system.
////=============================================================================
    class Scene_Diary extends Scene_Base {
        constructor() {
            super();
        }

        initialize() {
            super.initialize();
        }

        create() {
            super.create();

            this.createBackground();
        }

        createBackground() {
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
            this.addChild(this._backgroundSprite);
        };

        start() {
            super.start();
            const x = param.calendarSettings.x;//Default value is 0;
            const y = param.calendarSettings.y;//Default value is -100;
            const outerFrame = param.calendarSettings.outerFrameWidth;
            const innerFrame = param.calendarSettings.innerFrameWidth;
            this.calendar = new Calendar_Main(this, x, y, outerFrame, innerFrame);
        }

        update() {
            super.update();
            this.calendar.update();
        }
    }

////=============================================================================
//// Calendar_Main
////  This class wrapper calendar system.
////=============================================================================
    class Calendar_Main {
        /**
         * @param {Scene_Base} parent
         * @param {number} x
         * @param {number} y
         * @param {number} outerFrame
         * @param {number} innerFrame
         */
        constructor(parent, x, y, outerFrame, innerFrame) {
            this.initialize.apply(this, arguments);
        }

        initialize(parent, x, y, outerFrame, innerFrame) {
            //Create each instance
            this.calendarBase = new Calendar_Base(parent, x, y, outerFrame, innerFrame);
            this.button       = new Calendar_Button(parent, 70);
            this.textArea     = new Calendar_TextArea(parent);

            //Add event listener
            this.addEventListener();
            this.onRefresh();//Calling for first display.
        }

        addEventListener() {
            this.button.eventListener['onTouchNext'].register(this.onTouchNext.bind(this));
            this.button.eventListener['onTouchPrev'].register(this.onTouchPrev.bind(this));
            this.button.eventListener['onBack'].register(this.onBack.bind(this));
            this.calendarBase.eventListener['onRefresh'].register(this.onRefresh.bind(this));
        }

        onTouchNext() {
            Debug.log('翌月へ');
            this.calendarBase.gotoNextMonth();
        }

        onTouchPrev() {
            Debug.log('前月へ');
            this.calendarBase.gotoPreviousMonth();
        }

        onBack() {
            SceneManager.pop();
        }

        /**
         * Update diary contents (text area).
         */
        onRefresh() {
            const date = this.calendarBase.selectedDayData;
            const text = $gameSystem.calendarTFC().getData(date);
            this.textArea.text = text;
        }

        update() {
            this.calendarBase.update();
            this.button.update();
            this.textArea.update();
        }
    }

////=============================================================================
//// Calendar_TextArea
////  This class implements Calendar System.
////=============================================================================
    class Calendar_TextArea {

        /**
         * @param {Scene_Base} parent
         */
        constructor(parent) {
            this.initialize.apply(this, arguments);
        }

        initialize(parent) {
            //Basic settings.
            this.parent     = parent;
            this.baseSprite = null;
            this.textSprite = null;
            this.scrollBar  = null;
            this.dataEasing = null;

            //Text settings.
            this._text           = null;
            this._textY          = 10;
            this._totalTextHeight = 0;

            this.create();
            this.refresh();
        }

        get width() {
            return Graphics.width - this.x*2;
        }

        get height() {
            return Graphics.height - (Graphics.height/2 + 180);//180 is button's y+height.
        }

        get x() {
            return 140;
        }

        get y() {
            return Graphics.height - this.height - 20;//20 is margin.
        }

        get fontSize() {
            return 22;
        }

        get text() {
            return this._text ? this._text : '';
        }

        set text(value) {
            this._text = value ? value : '';
            this.refresh();
        }

        get textX() {
            return 20;
        }

        get textY() {
            return 10;
        }

        set totalTextHeight(value) {
            this._totalTextHeight = value;
        }

        get totalTextHeight() {
            return this._totalTextHeight;
        }

        get textSpriteY() {
            return this.textSprite.y;
        }

        get backgroundColor() {
            return '#FFF';
        }

        get scrollAmount() {
            return 30;
        }

        get maxScrollAmount() {
            return this.totalTextHeight - this.height;
        }

        create() {
            this.createSprite();
            this.createScrollBar();
            this.createEasing();
        }

        refresh() {
            this.textSprite.bitmap.clear();
            this.resetTextSettings();
            this.drawText();
            this.scrollBar.refresh(this.totalTextHeight);
        }

        resetTextSettings() {
            //this.text  = '';
            this.textSprite.y = 0;
            this.dataEasing.refresh(0);
            /*if(Debug.isDebugMode){
                this.text = 'おいらが天才\nおいおいおいらが天才さあ\nまたたびオイラ～♪\nがんがんボイラ～♪\nオイラはオイラ～♪\n死んでもオイラさぁ。\nいえいえいえオイラ～♪\nおいおいおいらが天才さあ\nまたたびオイラ～♪\nがんがんボイラ～♪\nオイラはオイラ～♪\n死んでもオイラさぁ。\nいえいえいえオイラ～♪';
            }*/
        }

        update() {
            this.updateTouchInput();
            this.updateInput();
            this.updateScrollBar();
            this.dataEasing.moveToDestination();
        }

        updateTouchInput() {
            if(TouchInput.wheelY < -5){//Wheel up.
                this.scrollUp();
            }
            if(TouchInput.wheelY > 5){//Wheel down.
                this.scrollDown();
            }
        }

        updateInput() {
            if (Input.isRepeated('ok')) {
                this.scrollDown();
            }else if (Input.isRepeated('cancel')) {
                this.scrollUp();
            }
        }

        updateScrollBar() {
            this.scrollBar.update(this.textSpriteY);
        }

        createSprite() {
            this.createBaseSprite();
            this.createMask();
            this.createTextSprite();
        }

        createBaseSprite() {
            this.baseSprite = new Sprite();
            this.baseSprite.bitmap = new Bitmap(this.width, this.height);
            this.baseSprite.x = this.x;
            this.baseSprite.y = this.y;
            this.parent.addChild(this.baseSprite);

            //TODO:More beautiful display.
            this.baseSprite.bitmap.fillAll(this.backgroundColor);
        }

        createMask() {
            //Create mask.
            var mask = new PIXI.Graphics();
            mask.beginFill(0xffffff, 1);
            mask.drawRect(this.baseSprite.x, this.baseSprite.y, this.width, this.height); 
            mask.endFill();
            this.baseSprite.mask = mask;
        };

        createTextSprite() {
            this.textSprite = new Sprite();
            this.textSprite.bitmap = new Bitmap(this.width, Graphics.height);
            this.baseSprite.addChild(this.textSprite);
        }

        createScrollBar() {
            this.scrollBar = new Calendar_ScrollBar(this.baseSprite, this.totalTextHeight);
        }

        createEasing() {
            const sprite    = this.textSprite;
            this.dataEasing = new Easing_ScrollBar(sprite, sprite.x, sprite.y, 0, 0, 0.9, 7, 3);
        }

        drawText() {
            //各テキストを\nで分解し、それを挿入
            const textArray = this.splitText(this.text);

            textArray.forEach(function(text, index) {
                const width = this.textSprite.bitmap.measureTextWidth(text);
                const extra = 10;
                const y     = this.textY + (this.fontSize+extra)*index;
                this.textSprite.bitmap.drawText(text, this.textX, y, width, this.fontSize, 'left');
                this.totalTextHeight = this.textY + (this.fontSize+extra)*(index+2);
            }, this);
        }

        /**
         * @return {Array}
         */
        splitText(text) {
            return text.split(/\r\n|\r|\n|\\n/);
        }

        scrollUp() {
            let tempY = this.textSprite.y + this.scrollAmount;
            if(Input.isPressed('control')){//If the control key is pressed, move the amount to triple.
                tempY = this.textSprite.y + (this.scrollAmount*3);
            }

            if(tempY > 0){// On the top.
                //this.textSprite.y = 0;
                this.dataEasing.refresh(0);
            }else {
                //this.textSprite.y = tempY;
                this.dataEasing.refresh(tempY);
            }
        }

        scrollDown() {
            const tempY = this.textSprite.y - this.scrollAmount;
            
            if(tempY > -(this.maxScrollAmount)){// On the End.
                let dist = this.textSprite.y - this.scrollAmount;
                //this.textSprite.y  -= this.scrollAmount;
                if(Input.isPressed('control')){//If the control key is pressed, move the amount to triple.
                    dist = this.textSprite.y - (this.scrollAmount*3);
                }
                this.dataEasing.refresh(dist);
            }else{
                let dist = -this.maxScrollAmount;
                //this.textSprite.y = -(this.maxScrollAmount);
                this.dataEasing.refresh(dist);
            }
        }
    }

////=============================================================================
//// Calendar_ScrollBar
////  This class implements ScrollBar.
////=============================================================================
    class Calendar_ScrollBar {
        constructor() {
            this.initialize.apply(this, arguments);
        }

        initialize(parent, totalTextHeight) {
            this.parentSprite     = parent;
            this.spriteBackground = null;
            this.spriteScrollBar  = null;
            this._maxScrollAmount = 0;
            this.dataEasing       = null;

            this.create();
            this.refresh();
        }

        get baseX() {
            return this.spriteBackground.width - this.width;
        }

        get baseY() {
            return 0;
        }

        get width() {
            return 30;
        }

        get height() {
            return this.spriteBackground.height - this.baseY*2;
        }

        get barHeight() {
            return this.height/4;
        }

        get backgroundColor() {
            return '#CCC';
        }

        get scrollBarColor() {
            return '#555';
        }

        get maxScrollAmount() {
            return this._maxScrollAmount;
        }

        get scrollY() {
            return this.spriteScrollBar.y;
        }

        set scrollY(value) {
            this.spriteScrollBar.y = value;
        }

        create() {
            this.createBackground();
            this.createScrollBar();
            this.createEasing();
        }

        createBackground() {
            this.spriteBackground        = new Sprite();
            this.spriteBackground.bitmap = new Bitmap(this.parentSprite.width, this.parentSprite.height);
            this.parentSprite.addChild(this.spriteBackground);
        }

        createScrollBar() {
            this.spriteScrollBar         = new Sprite();
            this.spriteScrollBar.bitmap  = new Bitmap(this.parentSprite.width, this.parentSprite.height);
            this.parentSprite.addChild(this.spriteScrollBar);
        }

        createEasing() {
            const sprite    = this.spriteScrollBar;
            this.dataEasing = new Easing_ScrollBar(sprite, sprite.x, sprite.y, 0, 0, 0.9, 7, 3);
        }

        refresh(totalTextHeight) {
            this.spriteBackground.bitmap.clear();
            this._maxScrollAmount = totalTextHeight - this.height;
            this.drawBackground();
            this.drawScrollBar();
        }

        /**
         * Update bar position.
         */
        update(parentY) {
            const scrollAmount = this.calculateScrollAmount(parentY);

            this.updateEasing(scrollAmount);
        }

        updateEasing(dist) {
            this.dataEasing.refresh(dist);
            this.dataEasing.moveToDestination();
        }

        drawBackground() {
            this.spriteBackground.bitmap.fillRect(this.baseX, this.baseY, this.width, this.height, this.backgroundColor);
        }

        drawScrollBar() {
            this.spriteScrollBar.bitmap.fillRect(this.baseX, this.baseY, this.width, this.barHeight, this.scrollBarColor);
        }

        /**
         * Parameter current is current Y.Get percentage.
         * @param {number} current
         */
        calculateScrollAmount(current) {
            const percent      = -current / (this.maxScrollAmount);
            const scrollAmount = (this.height-this.barHeight) * percent;
            return scrollAmount;
        }
    }

////=============================================================================
//// Calendar_Button
////  This class implements Calendar System.
////=============================================================================
    class Calendar_Button {
        /**
         * @param {Scene_Base} parent
         * @param {number} distance
         */
        constructor(parent,distance) {
            this.initialize.apply(this, arguments);
        }

        initialize(parent, distance) {
            this.parent    = parent;
            this.bitmap    = null;
            this._distance = distance;
            this.eventListener = null;

            this.create();
            this.refresh();
        }

        get context() {
            return this.bitmap.context;
        }

        /**
         * Distance from the edge where the button is located. Both left and right.
         */
        get distance() {
            return this._distance;
        }

        get y() {
            return Graphics.height/2 + 120;//120 is a suitable number.
        }

        get width() {
            return 140;
        }

        get height() {
            return 60;
        }

        get strokeColor() {
            return '#3366FF';
        }

        get fillColor() {
            return '#FFF';
        }

        get textColor() {
            return '#FF66CC';//'#000';
        }

        get fontSize() {
            return 20;
        }

        get prevText() {
            return $gameSystem.isJapanese() ? '前の月へ' : 'Prev';
        }

        get nextText() {
            return $gameSystem.isJapanese() ? '次の月へ' : 'Next';
        }

        get backButtonColor() {
            return '#6699FF';
        }

        get backButtonRadius() {
            return 60;
        }

        get backButtonText() {
            return '戻る';
        }

        create() {
            this.createSprite();
            this.createEventListener();
        }

        refresh() {
            this.bitmap.clear();
            this.drawButtons();
        }

        update() {
            this.updateTouchInput();
            this.updateInput();
        }

        updateTouchInput() {
            if(TouchInput.isTriggered()){
                this.checkCollision();
            }
        }

        updateInput() {
            
        }

        createSprite() {
            this.sprite  = new Sprite();
            this.sprite.bitmap = new Bitmap(Graphics.boxWidth, Graphics.boxHeight);
            this.parent.addChild(this.sprite);
            //Alias
            this.bitmap = this.sprite.bitmap;
        }

        createEventListener() {
            this.eventListener = new Map([['onTouchNext', null], ['onTouchPrev', null], ['onBack', null]]);
            for(var key of this.eventListener.keys()){
                this.eventListener[key] = new EventListener();
            }
        };

        drawButtons() {
            this.drawDebugSquare();
            this.drawNextButton();
            this.drawPreviousButton();
            this.drawBackButton();
            this.drawButtonTexts();
        }

        drawBackButton() {
            const margin = 10;
            const x      = this.backButtonRadius + margin;
            const y      = Graphics.height - this.backButtonRadius - margin;
            const textX  = x - this.bitmap.measureTextWidth(this.backButtonText)/2;
            const textY  = y - this.fontSize/2;
            this.bitmap.drawCircle(x, y, this.backButtonRadius, this.backButtonColor);
            this.bitmap.drawText(this.backButtonText, textX, textY, this.backButtonRadius*2, this.fontSize, 'left');
        }

        drawDebugSquare() {
            if(!Debug.isDebugMode){
                return;
            }
            //Next button
            const nextX   = Graphics.width - this.distance - this.width;
            const nextY   = this.y - this.height/2;
            this.bitmap.fillRect(nextX, nextY, this.width, this.height, '#FFF');

            //Prev button.
            const prevX = this.distance;
            const prevY = this.y - this.height/2;
            this.bitmap.fillRect(prevX, prevY, this.width, this.height, '#FFF');

            //Back button
            const backMargin = 10;
            const backX      = backMargin;
            const backY      = Graphics.height - this.backButtonRadius*2 - backMargin;
            this.bitmap.fillRect(backX, backY, this.backButtonRadius*2, this.backButtonRadius*2, '#FFF');
        }

        drawButtonTexts() {
            //Text settings.
            this.bitmap.textColor    = this.textColor;
            this.bitmap.outlineWidth = 0;
            this.bitmap.fontSize     = this.fontSize;
            //Position settings.
            const prevWidth = this.bitmap.measureTextWidth(this.prevText);
            const margin    = 10;
            const prevX = this.distance + this.width - prevWidth - margin;
            const nextX = Graphics.width - this.distance - this.width + margin;
            const y     = this.y - this.fontSize/2;

            //Draw
            this.bitmap.drawText(this.prevText, prevX, y, this.width, this.fontSize, 'left');
            this.bitmap.drawText(this.nextText, nextX, y, this.width, this.fontSize, 'left');
        }

        drawNextButton() {
            const x = Graphics.width - this.distance;
            this.context.save();
            this.context.lineWidth   = 3;
            this.context.strokeStyle = this.strokeColor;
            this.context.fillStyle   = this.fillColor;
            this.context.beginPath();
            this.context.arrow(x - this.width, this.y, x, this.y, [0,20, -40,20, -40,40]);
            this.context.fill();
            this.context.stroke();

            this.context.closePath();
            this.context.restore();
            this.bitmap._setDirty();
        }

        drawPreviousButton() {
            const x = this.distance;
            this.context.save();
            this.context.lineWidth   = 3;
            this.context.strokeStyle = this.strokeColor;
            this.context.fillStyle   = this.fillColor;
            this.context.beginPath();
            this.context.arrow(x + this.width, this.y, x, this.y, [0,20, -40,20, -40,40]);
            this.context.fill();
            this.context.stroke();

            this.context.closePath();
            this.context.restore();
            this.bitmap._setDirty();
        }

        /**
         * This method not return bool.Only when collision, fire an event.
         */
        checkCollision() {
            if(this.isCollisionToNextButton()) {
                this.eventListener.onTouchNext.fire();
            }

            if(this.isCollisionToPrevButton()) {
                this.eventListener.onTouchPrev.fire();
            }

            if(this.isCollisionToBackButton()) {
                this.eventListener.onBack.fire();
            }
        }

        isCollisionToNextButton() {
            const nextX   = Graphics.width - this.distance - this.width;
            const nextY   = this.y - this.height/2;
            const width   = this.width;
            const height  = this.height;
            const touchX  = TouchInput.x;
            const touchY  = TouchInput.y;

            if((touchX >= nextX && touchY >= nextY) && (touchX <= nextX+width) && (touchY <= nextY+height)){
                return true;
            }
            return false;
        }

        isCollisionToPrevButton() {
            const prevX   = this.distance;
            const prevY   = this.y - this.height/2;
            const width   = this.width;
            const height  = this.height;
            const touchX  = TouchInput.x;
            const touchY  = TouchInput.y;

            if((touchX >= prevX && touchY >= prevY) && (touchX <= prevX+width) && (touchY <= prevY+height)){
                return true;
            }
            return false;
        }

        isCollisionToBackButton() {
            const backMargin = 10;
            const backX      = backMargin;
            const backY      = Graphics.height - this.backButtonRadius*2 - backMargin;
            const width   = this.backButtonRadius*2;
            const height  = this.backButtonRadius*2;
            const touchX  = TouchInput.x;
            const touchY  = TouchInput.y;

            if((touchX >= backX && touchY >= backY) && (touchX <= backX+width) && (touchY <= backY+height)){
                Debug.log('戻るボタン押された');
                return true;
            }
            return false;
        }
    }


////=============================================================================
//// Calendar_Base
////  This class implements Calendar System.
////=============================================================================

    /**
     * Use public method in other class.
     * And you must call update().
     */
    class Calendar_Base {
        /**
         * @param {Scene_Base} parent
         * @param {number} x
         * @param {number} y
         * @param {number} outerFrame
         * @param {number} innerFrame
         */
        constructor(parent, x, y, outerFrame, innerFrame) {
            this.initialize.apply(this, arguments);
        }

        initialize(parent, x, y, outerFrame, innerFrame) {
            //Initialize
            this.parent = parent;
            this.bitmap = null;
            this.trout  = [];
            this.eventListener = null;
            if('Game_Chronus' in window){
                this.date   = new Date(this.chronusDate);
            }else{
                this.date   = new Date();
            }
        
            //General settings.
            this._outerFrameWidth = outerFrame;
            this._innerFrameWidth = innerFrame;
            this._x = x || 0;
            this._y = y || 0;

            //Day Setting
            this._year  = this.date.getFullYear();
            this._month = this.date.getMonth();
            this._today = this.date.getDate();
            this._selectedDay = this.today;

            //Create
            this.create();
            this.refresh();
        }

        get width() {
            return param.calendarSettings.width;
        }

        get height() {
            return param.calendarSettings.height;
        }

        get weekWidth() {
            return this.width/7;
        }

        get yearY() {
            return 50;
        }

        get weekY() {
            return this.yearY + this.weekHeight;
        }

        get weekHeight() {
            return 30;
        }

        get daysHeight() {
            return (this.height-this.weekY)/6;//6 is horizontalLine.
        }

        get x() {
            return Graphics.width/2  - this.width/2 + this._x;
        }

        get y() {
            return Graphics.height/2 - this.height/2 + this._y; 
        }

        get context() {
            return this.bitmap.context;
        }

        get backgroundColor() {
            return param.calendarColors.background;
        }

        get textRedColor() {
            return param.calendarColors.textRed;
        }

        get textBlueColor() {
            return param.calendarColors.textBlue;
        }

        get textBlackColor() {
            return param.calendarColors.textBlack;
        }

        get todayColor() {
            return param.calendarColors.todayColor;
        }

        get selectedColor() {
            return param.calendarColors.selectedColor;
        }

        get fullYear() {
            return this.date.getFullYear();
        }

        get month() {
            return this.date.getMonth()+1;
        }

        get today() {
            if(this._year === this.date.getFullYear() && this._month === this.date.getMonth()){
                return this._today;
            }
            return -1;
        }

        get firstDate() {
            return new Date(this.fullYear, this.date.getMonth(), 1);
        }

        get lastDate() {
            return new Date(this.fullYear, this.date.getMonth()+1, 0);
        }

        get standardFontSize() {
            return 32;
        }

        get smallFontSize() {
            return 22;
        }

        get innerFrameWidth() {
            return (this._innerFrameWidth > 0) ? this._innerFrameWidth : -1;
        }

        get outerFrameWidth() {
            return (this._outerFrameWidth > 0) ? this._outerFrameWidth : -1;
        }

        get chronusDate() {
            const year   = $gameSystem.chronus().getYear();
            const month  = $gameSystem.chronus().getMonth();
            const day    = $gameSystem.chronus().getDay();
            const hour   = $gameSystem.chronus().getHour();
            const minute = $gameSystem.chronus().getMinute();
            const result = `${year}-${month}-${day} ${hour}:${minute}`;
            
            return result;
        }

        get selectedDay() {
            if(this._selectedDay > this.lastDate.getDate()){
                return this.lastDate.getDate();
            }
            return this._selectedDay;
        }

        set selectedDay(value) {
            if(value.x < 0 || value.y < 0){
                this._selectedDay = null;
                return;
            }

            this._selectedDay = this.trout[value.x][value.y];
        }

        /**
         * Return selected day date.
         * Format: 'year-month-selectedDay'.
         */
        get selectedDayData() {
            return `${this.fullYear}-${this.month}-${this.selectedDay}`;
        }

        get checkingMarkRadius() {
            return 9;
        }

        get checkingMarkColor() {
            return param.checkingMarkColor;
        }

        monthToString() {
            const monthArray = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
            return monthArray[this.date.getMonth()];
        }

        /**
         * When you use this class, you must update.Public method.
         */
        update() {
            this.updateTouchInput();
            this.updateInput();
        }

        updateTouchInput() {
            if(TouchInput.isTriggered()){
                const troutXY    = this.screenToTroutXY(TouchInput.x, TouchInput.y);
                this.selectedDay = troutXY;
                this.refresh();
            }
        }

        updateInput() {
            if (Input.isRepeated('down')) {
                this.gotoNextWeek();
            }else if (Input.isRepeated('up')) {
                this.gotoPreviousWeek();
            }else if (Input.isRepeated('right')) {
                this.gotoNextDay();
            }else if (Input.isRepeated('left')) {
                this.gotoPreviousDay();
            }else if (Input.isTriggered('pagedown')) {
                this.gotoNextMonth();
            }else if (Input.isTriggered('pageup')) {
                this.gotoPreviousMonth();
            }
        }

        refresh() {
            this.bitmap.clear();
            this.subSprite.bitmap.clear();
            this.createTroutArray();
            this.refreshTroutData();
            this.drawCalendar();
            this.eventListener.onRefresh.fire();
        }

        create() {
            this.createSprite();
            this.createSubSprite();
            this.createTroutArray();
            this.createEventListener();
        }

        createEventListener() {
            this.eventListener = new Map([['onRefresh',null]]);
            for(var key of this.eventListener.keys()){
                this.eventListener[key] = new EventListener();
            }
        };

        /**
         * Public method.
         */
        gotoNextMonth() {
            this.date.setMonth(this.date.getMonth() + 1);
            this.refresh();
        }

        /**
         * Public method.
         */
        gotoPreviousMonth() {
            this.date.setMonth(this.date.getMonth() - 1);
            this.refresh();
        }

        createSprite() {
            this.sprite        = new Sprite();
            this.sprite.bitmap = new Bitmap(Graphics.boxWidth, Graphics.boxHeight);
            this.parent.addChild(this.sprite);
            //Alias
            this.bitmap = this.sprite.bitmap;
        }

        /**
         * For checking mark.
         */
        createSubSprite() {
            this.subSprite        = new Sprite();
            this.subSprite.bitmap = new Bitmap(Graphics.boxWidth, Graphics.boxHeight);
            this.parent.addChild(this.subSprite);
        }

        drawCalendar() {
            this.drawBackground();
            this.drawFrame();
            this.drawText();
        }

        drawText() {
            this.drawYearAndMonth();
            this.drawDayOfWeek();
            this.drawDays();
        }

        drawBackground() {
            this.drawMainBackground();
            this.drawDayOfWeekBackground();
            this.drawTodyBackground();
            this.drawSelectedDayBackground();
            this.drawCheckingMark();
        }

        drawCheckingMark() {
            const monthData = this.getMonthData();
            const baseX     = this.x + this.weekWidth/4 + this.checkingMarkRadius + 15;//15 is adjustment.
            const baseY     = this.y + this.weekY + this.checkingMarkRadius + 20;//20 is adjustment.

            const firstDay  = this.firstDate.getDay();//Get the day of the week on the first day of the month.
            const lastDay   = this.lastDate.getDate()+1;//Get the day of the week on the last day of the month.
            let days = 1;
            //Draw
            for(let row = 0; row < 6; row++){
                let col = (row===0) ? firstDay : 0;
                for(; col < 7; col++){
                    if(monthData && monthData.contains(days)){
                        this.drawCheckingCircle(baseX + this.weekWidth*col, baseY+(row*this.daysHeight));
                    }
                    days++;
                    if(this.isEndOfMonth(days, lastDay)){
                        return;
                    }
                }
            }
        }

        drawCheckingCircle(x, y) {
            this.subSprite.bitmap.context.save();
            this.subSprite.bitmap.context.strokeStyle = this.checkingMarkColor;
            this.subSprite.bitmap.drawCircle(x, y, this.checkingMarkRadius, this.checkingMarkColor);
            this.subSprite.bitmap.context.restore();
        }

        getMonthData() {
            //Get year data.
            const yearData  = $gameSystem.calendarTFC().getYearData(this.fullYear.toString());
            if(!yearData){
                return null;
            }

            //Get month data.
            const regex     = new RegExp(`^${this.month}-`, 'i');
            const monthData = this.filter(yearData, regex);
            if(monthData.length <= 0) {
                return null;
            }

            //Get day data.
            const dayData = monthData.map(function(element) {
                return Number(element.replace(`${this.month}-`, ''));
            }, this);
            if(dayData.length <= 0){
                return null;
            }

            return dayData;
        }

        /**
         * Return Objects.
         * @param {Object} obj
         * @param {RegExp} regex
         */
        filter(obj, regex) {
            const result = Object.keys(obj).filter(function(value) {
                return regex.test(value);
            });

            return result;
        }

        /*[Obsolete] : Because I changed the checking mark to circle.
        drawCheckingMark() {
            const context = this.sprite.bitmap.context;
            const width   = 10;
            const height  = 30;
            const baseX   = 60;
            const baseY   = 60;

            //Initialize
            context.save();
            context.lineWidth   = this.checkingMarkWidth;
            context.strokeStyle = this.checkingMarkColor;

            context.beginPath();
            context.moveTo(baseX + this.x + width,   baseY + this.y + height + height/2);
            context.lineTo(baseX + this.x + width*2, baseY + this.y + height*2);
            context.lineTo(baseX + this.x + width*3, baseY + this.y + height);
            context.stroke();

            //Dispose.
            context.closePath();
            context.restore();
            this.sprite.bitmap._setDirty();
        }*/

        drawSelectedDayBackground() {
            if(!this.selectedDay){
                return;
            }
            const troutXY    = this.getTroutData(this.selectedDay);
            const screenXY   = this.troutToScreenXY(troutXY.x, troutXY.y);
            this.bitmap.fillRect(screenXY.x, screenXY.y, this.weekWidth, this.daysHeight, this.selectedColor);
        }

        drawTodyBackground() {
            //Get relative position.
            if(this.today < 0){
                return;
            }
            const dataXY = this.getTroutData(this.today);
            const posXY  = this.troutToScreenXY(dataXY.x, dataXY.y); 
            this.bitmap.fillRect(posXY.x, posXY.y, this.weekWidth, this.daysHeight, this.todayColor);
        }

        drawMainBackground() {
            this.bitmap.fillRect(this.x, this.y, this.width, this.height, this.backgroundColor);
        }

        drawDayOfWeekBackground() {
            //Color Settings.
            const sunColor = param.dayOfWeekcolors.sunday;
            const monColor = param.dayOfWeekcolors.monday;
            const tueColor = param.dayOfWeekcolors.tuesday;
            const wedColor = param.dayOfWeekcolors.wednesday;
            const thuColor = param.dayOfWeekcolors.thursday;
            const friColor = param.dayOfWeekcolors.friday;
            const satColor = param.dayOfWeekcolors.saturday;
            //Draw background.Start with sunday.End with saturday.
            this.bitmap.fillRect(this.x, this.y + this.yearY, this.weekWidth, this.weekHeight, sunColor);
            this.bitmap.fillRect(this.x+this.weekWidth, this.y + this.yearY, this.weekWidth, this.weekHeight, monColor);
            this.bitmap.fillRect(this.x+this.weekWidth*2, this.y + this.yearY, this.weekWidth, this.weekHeight, tueColor);
            this.bitmap.fillRect(this.x+this.weekWidth*3, this.y + this.yearY, this.weekWidth, this.weekHeight, wedColor);
            this.bitmap.fillRect(this.x+this.weekWidth*4, this.y + this.yearY, this.weekWidth, this.weekHeight, thuColor);
            this.bitmap.fillRect(this.x+this.weekWidth*5, this.y + this.yearY, this.weekWidth, this.weekHeight, friColor);
            this.bitmap.fillRect(this.x+this.weekWidth*6, this.y + this.yearY, this.weekWidth, this.weekHeight, satColor);
        }

        drawDays() {
            //Get days infomation.
            const firstDay  = this.firstDate.getDay();//Get the day of the week on the first day of the month.
            const lastDay   = this.lastDate.getDate()+1;//Get the day of the week on the last day of the month.
            let days = 1;
            //Font settings.
            this.bitmap.fontSize     = this.smallFontSize;
            //Position settings.
            const x = this.x + this.weekWidth/4 + 2;
            const y = this.y + this.weekY + 3;
            //Draw
            for(let row = 0; row < 6; row++){
                let col = (row===0) ? firstDay : 0;
                for(; col < 7; col++){
                    this.drawDaysText(days, x + this.weekWidth*col, y+(row*this.daysHeight));
                    days++;
                    if(this.isEndOfMonth(days, lastDay)){
                        return;
                    }
                }
            }
        }

        drawDaysText(day, x, y) {
            const date       = new Date(this.fullYear, this.month-1, day);
            const dayOfWeek  = date.getDay();
            switch(dayOfWeek){
                case 0 : //Sunday
                    this.bitmap.textColor    = this.textRedColor;
                    break;
                case 6 : //Saturday
                    this.bitmap.textColor    = this.textBlueColor;
                    break;
                default :
                    this.bitmap.textColor    = this.textBlackColor;
                    break;
            }
            this.bitmap.drawText(day, x, y, this.width, this.smallFontSize, 'left');
        }

        drawDayOfWeek() {
            //Week text settings.
            const dayOfWeekEng = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
            const dayOfWeekJp  = ['日', '月', '火', '水', '木', '金', '土'];
            //Font settings.
            this.bitmap.textColor    = this.backgroundColor;
            this.bitmap.fontSize     = this.smallFontSize;
            //Position settings.
            const x = this.x + this.weekWidth/4 + 2;
            const y = this.y + this.yearY + 3;
            //Draw
            for(let i = 0; i < 7; i++) {
                if($gameSystem.isJapanese()){
                    this.bitmap.drawText(dayOfWeekJp[i], x + this.weekWidth*i, y, this.width, this.smallFontSize, 'left');
                }else {
                    this.bitmap.drawText(dayOfWeekEng[i], x + this.weekWidth*i, y, this.width, this.smallFontSize, 'left');
                }
            }
        }

        drawYearAndMonth() {
            //Settings.
            this.bitmap.fontSize     = 28;//28 is default font size.
            this.bitmap.outlineWidth = 0;
            const fullText  = `${this.fullYear} ${this.month} ${this.monthToString()}`;
            const fullTextWidth = this.bitmap.measureTextWidth(fullText);
            const x         = this.x + this.width/2 - fullTextWidth/2;
            const y         = this.y + 10;
            const correctY  = this.smallFontSize/3;
            const correctX  = this.smallFontSize;
            //Draw month number.
            this.bitmap.fontSize     = this.standardFontSize;
            const monthTextWidth     = this.bitmap.measureTextWidth(this.month);
            const monthX             = this.x + this.width/2 - monthTextWidth/2;
            this.bitmap.textColor    = this.textRedColor;
            this.bitmap.drawText(this.month, monthX, y, this.width, this.standardFontSize, 'left');
            //Draw month text and year text.
            this.bitmap.textColor    = this.textBlackColor;
            this.bitmap.fontSize     = this.smallFontSize;
            const yearWidth   = this.bitmap.measureTextWidth(this.fullYear);
            const monthStrX   = this.x + this.width/2 + (yearWidth/2) +(monthTextWidth/2);
            this.bitmap.drawText(this.fullYear, x, y+correctY, this.width, this.smallFontSize, 'left');
            this.bitmap.drawText(this.monthToString(), monthStrX, y+correctY, this.width, this.smallFontSize, 'left');
        }

        drawFrame() {
            this.drawOuterFrame();
            this.drawInnerFrame();
            this.drawDummyFrame();
        }

        drawInnerFrame() {
            if(this.innerFrameWidth < 0){
                return;
            }
            //Initialize
            this.context.save();
            this.context.lineWidth = this.innerFrameWidth;

            //On the top is a display such as 2017, October
            const yearLine = this.yearY;
            this.context.beginPath();
            this.context.moveTo(this.x, this.y + yearLine);
            this.context.lineTo(this.x + this.width, this.y + yearLine);
            this.context.stroke();
            //Small field for displaying Sun,Mon,TUE etc...
            const weekLine = this.weekY;
            this.context.moveTo(this.x, this.y + weekLine);
            this.context.lineTo(this.x + this.width, this.y + weekLine);
            this.context.stroke();
            //Horizontal line divided by 5.
            const horizontalLine = 6;
            const daysLine       = this.daysHeight;
            for(let i = 1; i < horizontalLine; i++) {
                this.context.moveTo(this.x, this.y + weekLine + daysLine*i);
                this.context.lineTo(this.x + this.width, this.y + weekLine + daysLine*i);
                this.context.stroke();
            }
            //Vertical line divided by 7.
            const week         = 7;
            const verticalLine = (this.width/week);
            for(let i = 1; i < week; i++) {
                this.context.moveTo(this.x + verticalLine*i, this.y + yearLine);
                this.context.lineTo(this.x + verticalLine*i, this.y + this.height);
                this.context.stroke();
            }

            //Dispose.
            this.context.closePath();
            this.context.restore();
            this.bitmap._setDirty();
        }

        drawOuterFrame() {
            if(this.outerFrameWidth < 0){
                return;
            }

            this.context.save();
            this.context.lineWidth = this.outerFrameWidth;
            this.context.rect(this.x, this.y, this.width, this.height);
            this.context.stroke();
            this.context.restore();
            this.bitmap._setDirty();
        }

        /**
         * HACK : FOOOOL!!
         * To avoid changing lines.I don't know why changing lines.
         */
        drawDummyFrame() {
            this.context.save();
            this.context.beginPath();
            this.context.moveTo(0, 0);
            this.context.lineTo(0, 0);
            this.context.stroke();
            this.context.closePath();
            this.context.restore();
            this.bitmap._setDirty();
        }

        isEndOfMonth(currentDay, endDay) {
            this.getTrout
            return currentDay >= endDay;
        }

        createTroutArray() {
            for(let row = 0; row < 6; row++){
                for(let col = 0; col < 7; col++){
                    this.trout[col] = [];
                }
            }
        }

        refreshTroutData() {
            const firstDay  = this.firstDate.getDay();//Get the day of the week on the first day of the month.
            const lastDay   = this.lastDate.getDate()+1;//Get the day of the week on the last day of the month.
            let days = 1;
            for(let row = 0; row < 6; row++){
                let col = (row===0) ? firstDay : 0;
                for(; col < 7; col++){
                    this.trout[col][row] = days;
                    days++;
                    if(this.isEndOfMonth(days, lastDay)){
                        return;
                    }
                }
            }
        }

        /**
         * Return top left not coordinates but trout.X and Y.{x:x, y:y};
         * @param {number} day
         * @return {Object}
         * 
         */
        getTroutData(day) {
            let objXY;
            this.trout.forEach(function(element, tx) {
                element.forEach(function(element2, ty) {
                    if(this.trout[tx][ty] === day){
                        objXY = {x:tx, y:ty};
                    }
                }, this);
            }, this);
            return objXY;
        }

        /**
         * Return top left coordinates.X and Y.
         * @param {number} tx
         * @param {number} ty
         * @return {Object}
         * 
         */
        troutToScreenXY(tx, ty) {
            //Calculation
            const baseX     = this.x;
            const baseY     = this.weekY;
            const selectedX = tx*this.weekWidth;
            const selectedY = ty*this.daysHeight;
            //Result
            const screenX = this.x + selectedX;
            const screenY = this.y + this.weekY + selectedY;

            return {x:screenX, y:screenY}
        }

        /**
         * Return trout position.X and Y.If not in trout, return {x:-1, y:-1}.
         * @param {number} sx
         * @param {number} sy
         * @return {Object}
         * 
         */
        screenToTroutXY(sx, sy) {
            //Calculation
            const baseX     = this.x;
            const baseY     = this.y + this.weekY;
            const vertical  = 6;
            const week      = 7;
            const selectedX = Math.floor((sx - baseX) / this.weekWidth);
            const selectedY = Math.floor((sy - baseY) / this.daysHeight);

            //Is Collision
            if((selectedX >= 0 && selectedY >= 0) && (selectedX <= vertical && selectedY <= week))
            {
                return {x:selectedX, y:selectedY};
            }
            //Not collision
            return {x:-1, y:-1};
        }

        gotoNextDay() {
            const lastDay = this.lastDate.getDate();
            if(this._selectedDay < lastDay){
                this._selectedDay++;
                this.refresh();
            }
        }

        gotoPreviousDay() {
            if(this.selectedDay > 1){
                this._selectedDay--;
                this.refresh();
            }
        }

        gotoNextWeek() {
            const tempNextWeek = this.selectedDay + 7;
            const lastDay      = this.lastDate.getDate();
            if(tempNextWeek < lastDay) {
                this._selectedDay += 7;//7 is a weeek.
                this.refresh();
            }
        }

        gotoPreviousWeek() {
            const tempPrevWeek = this.selectedDay - 7;
            if(tempPrevWeek >= 1) {
                this._selectedDay -= 7;//7 is a weeek.
                this.refresh();
            }
        }
    }

////=============================================================================
//// Easing_ScrollBar
////  This is class for easing(move scroll bar).
////=============================================================================
    class Easing_ScrollBar {
        constructor(obj, x, y, speedX, speedY, friction, max_speed, tolerance) {
            this.initialize.apply(this, arguments);
        }

        initialize(obj, x, y, speedX, speedY, friction, max_speed, tolerance) {
            //Basic settings.
            this.object      = obj;        // Object. 
            this.px          = x;          // Pos x.
            this.py          = y;          // Pos y.
            this.dx          = speedX;     // Speed to X.
            this.dy          = speedY;     // Speed to Y.
            this.friction    = friction;   // Coefficient of friction(0.0～1.0)
            this.destination = 0;          // Destination.
            this.MAX_SPEED   = max_speed;  // Max speed.
            this.TOLERANCE   = tolerance;  // Tolerance for determining a destination.

            //Vertical motion settings.
            this.angle       = 0;
            this._isReached  = false;
        }

        moveToDestination() {
            //Distance to the destination.
            let sub = this.destination - this.py;
            //The speed multiplied by the distance to the destination (1.0 - the coefficient of friction)
            this.dy = sub * (1.0 - this.friction);
    
            //Give a maximum speed limit.
            if(this.dy >  this.MAX_SPEED){
                this.dy =  this.MAX_SPEED;
            }
            if(this.dy < -this.MAX_SPEED){
                this.dy = -this.MAX_SPEED;
            }
    
            //Add speed to coordinates.
            this.px += this.dx;
            this.py += this.dy;
            
            //Reflect coordinates in the object.
            this.object.x = this.px;
            this.object.y = this.py;
        }

        isObjectReachDestination() {
            if(this._isReached){
                return true;
            }
    
            if(Math.abs(this.destination - this.object.y) <= this.TOLERANCE){
                this._isReached = true;
                this.py         = this.object.y;
                this.angle      = 0;
                return true;
            }
    
            return false;
        }

        moveVerticalMotion(range, speed) {
            this.object.y    = this.py + Math.sin(this.angle) * range;
            this.angle      += speed;
        }

        setDestination(destination) {
            this.destination = destination;
        }

        getDestination() {
            return this.destination;
        }

        getDistance(distance) {
            var p = Math.cos( 360 * Math.PI / 180 ) * distance;
            return p;
        }

        refresh(dist, correct) {
            if(correct === undefined){
                correct = 0;
            }

            this.correct     = correct;
            this._isReached  = false;
            this.px          = this.object.x;                    // Pos x.
            this.py          = this.object.y + this.correct;     // Pos y.
            this.setDestination(dist + this.correct);
        }
    }


////=============================================================================
//// EventListener
////  This class is event listener.
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
            return 'TsumioFireCalendar';
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