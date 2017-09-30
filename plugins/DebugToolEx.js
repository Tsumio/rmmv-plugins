//=============================================================================
// DebugToolEx.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 0.9.2 2017/09/21 変数入力欄におけるエラー出力の調整。
// 0.9.1 2017/09/21 変数入力欄に「#」を指定しても文字列として認識されていた不具合の修正。
// 0.9.0 2017/09/20 バグ修正。プラグイン管理機能の追加。入力補完機能の向上。デザインの改善。
// 0.8.2 2017/09/18 バグ修正。変数入力欄に入力補完機能を実装。
// 0.8.1 2017/09/17 細かい修正と英語版に対応。
// 0.8.0 2017/09/16 公開。
// ----------------------------------------------------------------------------
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc This plugin help to do the debugging.
 * @author Tsumio
 *
 * @param ----Basic Settings----
 * @desc 
 * @default 
 * 
 * 
 * @param CommandPaletteModeKey
 * @type select
 * @option F1
 * @value F1
 * @option F2
 * @value F2
 * @option F3
 * @value F3
 * @option F4
 * @value F4
 * @option F5
 * @value F5
 * @option F6
 * @value F6
 * @option F7
 * @value F7
 * @option F8
 * @value F8
 * @option F9
 * @value F9
 * @option F10
 * @value F10
 * @option F11
 * @value F11
 * @option F12
 * @value F12
 * @option Tab
 * @value Tab
 * @option Ctrl
 * @value Ctrl
 * @option Alt
 * @value Alt
 * @desc This is a setting sets a key to start command palette mode.
 * @default Tab
 * 
 * @param ShowManagementWindow
 * @type boolean
 * @desc This is a setting sets whether to show management window at game startup.
 * @default false
 * 
 * @param SortPluginList
 * @type boolean
 * @desc Sort the plugin list by ON/OFF.
 * @default true
 * 
 * @help This plugin help to do the debugging.
 * 
 * ----feature----
 * -> When you press a specific key (default setting is tab key), the command palette starts.
 * -> You can execute reserved functions by entering commands in the command palette.
 * -> If you do not specify a command, it will be executed as a script.
 * -> You can use management window.
 * -> There is autocomplete to support input of variables.1
 * -> This plugin is valid only when test play in local environment.
 * -> You can see at a glance the currently active plugin.
 * -> If an error occurs during game execution, it attempts to identify the plugin from which the error occurred.
 * 
 * ----how to use----
 * This plugin is valid only when test play in local environment.
 * After introduce the plugin, you can use it by installing the specified "debug_en.html" file in the project folder (the folder where index.html is located).
 * I also recommend that you delete this plugin from the plugin list when you do deployment.
 * 
 * This plugin is operated from "Command Palette".
 * To launch the command palette, you need to press "CommandPaletteModeKey" after starting the game (default setting is tab key).
 * After starting the command palette, if you press "CommandPaletteModeKey" again, the command or script in the palette will be executed.
 * After execution, the results are displayed on the console screen of the developer tool.
 * 
 * Furthermore, I don't check the operation except for Windows 10.
 * 
 * ----command palette----
 * In command palette, you can enter a command or scripts.
 * All palette commands start with "->" or "=>" (they have the same meaning, please use the one you like).
 * The command needs to be written on the first line.
 * In addition, although the explanation uses "double quotation" for visibility, it is unnecessary when actually entering on the command palette.
 * 
 * Palette commands are distinguish uppercase and lowercase.
 * And separate each word with a space.
 * Please make sure.
 * 
 * "-> save name" : Save the script (after the second lines) on the command palette as "name".
 * "-> exe name" : Execute the "name" script saved by the save command.
 * "-> bind objectName" : Bind "this" on the command palette (details will be described later).
 * "-> open" : Start up the Management Window.
 * "-> com number": Executes the common event with the number specified by "number".
 * "-> e number page" : Executes the event of the specified "page" of the event number "number" on the current map.
 * "-> memo" : Start up the Memo System(details will be described later).
 * 
 * ----about "this"----
 * Enter "this" in the command palette, "this" refers to a reference to the instance of the current scene (in other words, SceneManager._scene).
 * For map screen only, "this" is meant to point to $ gameMap._interpreter.
 * Events can also be executed on the map.
 * The battle screen's "this" is not $gameTroop._interpreter, "this" points to the scene in the same way as elsewhere (in the battle screen, it is not possible without devising the script execution).
 * 
 * If "this" is changed with the command "bind", that setting takes precedence.
 * If you want to clear 'bind' setting, enter '-> bind null' or just enter '-> bind' on the command palette.
 * 
 * ----management window----
 * In the management window, you can operate switches and variables.
 * If you change the value in the game, the value in the management window also changes. And vice versa.
 * 
 * There is one thing you need to be aware of when assigning values to variables through the management window.
 * That is, all assignments to variables are recognized as primitive type strings.
 * Since it is not possible to use the at sign in this documentation, it is all expressed as "#", but even if it is replaced with a at sigin, it will work.
 * If you want to assign it as a primitive type other than an object or character string, please add "at sign" or '#' at the beginning of the sentence.
 * 
 * It is also possible to substitute the result of the calculation formula.
 * example：「#1000」「#100+$gameParty.gold()」「#false」「#undefined」
 * When substituting the result of calculation formula, it conforms to the behavior of Game_Variables.prototype.setValue().
  * That is, if you have not made any changes to the setValue method, the decimal places are truncated.
 * 
 * It is also possible to assign the result of an object or method (function).
 * If you want to substitute the result of a method, please end it with ");";
 * Also, when assigning objects, we implicitly refer to global objects.
 * example：「#$gameActors.actor(1);」「#$gameParty.steps();」「#$gameSystem」
 * 「#$gameParty._weapons」「#$gameParty['_weapons']」
 * 
 * If you click the button in "registered command list" in the managament window, registered command will be executed.
 * This is equivalent to executing "-> exe name" in the palette.
 * 
 * ----memo system----
 * Executing the command "-> memo" will start the memo system.
 * Unlike normal text area, command input is not accepted.
 * Furthermore, after completing the input (when you press the tab key), the text area's text string is saved in the file.
 * This saved file will be read at the next memo system startup.
 * 
 * ----file save destination----
 * Executing the command "save" creates a file called "dte_commands.txt" in the js folder
 * When executing command "exe", read this file.
 * In other words, you can edit the file directly.
 * 
 * Also, executing the command "memo" will read the file "dte_memo.txt" in the js folder.
 * When you exit the command "memo" (when you press the tab key), "dte_memo.txt" will be overwritten in the js folder.
 * 
 * ----keyboard shortcut----
 * After starting the command palette, if you press Ctrl + Shift + P, "->" is automatically entered.
 * 
 * ----autocomplete in variable input field----
 * When assigning a value to a variable, autocomplete is applied to the global variable prepared in the RMMV.
 * For methods that intend to do not return values, only undefined is returned, so they are excluded from autocomplete.
 * I think that there is also incomplete input supplement, so please report if there is a missing.
 * 
 * Furthermore, it currently supports only direct methods belonging to $gameXXX.
 * I'm planning to complete input supplementing for properties derived from methods of the $gameXXX and corresponding to the $dataXXX.
 * 
 * ----plugin management function----
 * In the management window, a list of plugins used in the current project is displayed.
 * By setting with plugin parameters, plugin list can be sorted by plugin ON / OFF order.
 * 
 * If an error occurs during execution of the game, it will list the plugins that are considered to be the source of the error.
 * This feature makes it easier to identify the plugin from which the error occurred.
 * However, it does not capture errors at the time of startup reading (for example, when the specification of the image file is illegal).
 * Furthermore, it does not capture the source of error accurately and provide information.
 * When you want to know detailed error information, please be sure to check the stack trace on the console screen.
 * 
 * Even if an error occurs in the core scripts, the error is not caught.
 * Please be careful if you are editing core scripts directly.
 * 
 * ----plugin command----
 * There is no plugin command.
 * 
 * ---how to update plugin---
 * When updating the plugin, you need to update both DebugToolEx.js and debug.html.
 * Please place DebugToolEx.js in the plugin folder and debug.html in the project folder (where index.html is located).
 * 
 * ----known issue----
 * There is no current.
 * 
 * ----other debugging tools----
 * This is an introduction of debugging tools by other authors.
 * 
 * -> DevToolsManage.js by Triacontane
 *  https://triacontane.blogspot.jp/2016/04/blog-post_23.html
 * -> MPI_ValueMonitor.js by Nekoma Otobuki
 *  http://makonet.sakura.ne.jp/rpg_tkool/contents/MPI_ValueMonitor.js
 * -> EventDebugger.js by Triacontane
 *  https://triacontane.blogspot.jp/2017/01/blog-post.html
 * 
 * Especially, "DevToolsManage.js" is very awesome plugin, so please try using it.
 * 
 * ----change log---
 * 0.9.2 2017/09/21 Adjust error output in variable input field.
 * 0.9.1 2017/09/21 Bug fix.Variable was recognized as string even if "#" was specified in the variable input field.
 * 0.9.0 2017/09/20 Bug fix.Added Plugin Manager Function.Improved autocomplete function.Improved design.
 * 0.8.2 2017/09/18 Bug fix.Implemented autocomplete function in variable input field.
 * 0.8.1 2017/09/17 Minor fixes and corresponds to English version.
 * 0.8.0 2017/09/16 Release.
 * 
 * ----remarks----
 * I shall not be responsible for any loss, damages and troubles from using this plugin.
 * 
 * --Terms of Use--
 * This plugin is free for both commercial and non-commercial use.
 * You don't have to make sure to credit.
 * Furthermore, you may edit the source code to suit your needs,
 * so long as you don't claim the source code belongs to you.
 * 
 */
/*:ja
 * @plugindesc デバッグを支援するプラグインです。
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * 
 * @param コマンドパレット起動キー
 * @type select
 * @option F1
 * @value F1
 * @option F2
 * @value F2
 * @option F3
 * @value F3
 * @option F4
 * @value F4
 * @option F5
 * @value F5
 * @option F6
 * @value F6
 * @option F7
 * @value F7
 * @option F8
 * @value F8
 * @option F9
 * @value F9
 * @option F10
 * @value F10
 * @option F11
 * @value F11
 * @option F12
 * @value F12
 * @option Tab
 * @value Tab
 * @option Ctrl
 * @value Ctrl
 * @option Alt
 * @value Alt
 * @desc コマンドパレットを起動するキーを設定します。
 * @default Tab
 * 
 * @param ゲーム起動時に管理ウィンドウを表示
 * @type boolean
 * @desc ゲーム起動時に管理ウィンドウを表示させるかどうかを設定します。
 * @default false
 * 
 * @param プラグインリストをソートする
 * @type boolean
 * @desc プラグインリストをON/OFFでソートします。
 * @default true
 * 
 * 
 * @help デバッグを支援するプラグインです。
 * 
 * 【特徴】
 * ・特定のキー（初期設定はタブキー）を押すと、コマンドパレットが起動します。
 * ・コマンドパレットにコマンドを入力することにより、予約された機能を実行できます。
 * ・コマンドを指定しない場合、スクリプトとして実行されます。
 * ・変数やスイッチの管理ウィンドウを表示させることができます。
 * ・変数の入力を支援する入力補完機能があります。
 * ・ローカル環境でのテストプレイ時のみ有効になります。
 * ・現在有効になっているプラグインが一瞥でわかります。
 * ・ゲーム実行時にエラーが発生した場合、エラー発生元のプラグインを特定しようと試みます。
 * 
 * 【使用方法】
 * 当プラグインはローカル環境でのテストプレイ時のみ有効になります。
 * プラグインの導入後、所定の「debug.html」ファイルをプロジェクトフォルダ（index.htmlの置いてあるフォルダ）に設置することで利用が可能になります。
 * また、デプロイメント時は当プラグインをプラグインリストから消去することを推奨します。
 * 
 * このプラグインは「コマンドパレット」から操作します。
 * コマンドパレットを起動するには、ゲーム起動後に「コマンドパレット起動キー」を押す必要があります（初期設定はタブキー）。
 * コマンドパレット起動後、もう一度「コマンドパレット起動キー」を押すと、コマンドパレットに入力したスクリプトやコマンドが実行されます。
 * 実行後はデベロッパーツールのコンソール画面に結果が表示されるので、ご確認ください。
 * 
 * なお、当プラグインはWindows10以外での動作確認をしていません。
 * 
 * 【コマンドパレット】
 * コマンドパレットにはコマンドもしくはスクリプトを入力します。
 * 全てのコマンドは「->」もしくは「=>」から始まります（どちらも同じ意味です。好みの方を使用してください）。
 * コマンドは一行目に書く必要があり、二行目以降は認識しません。
 * また、説明上では視認性のためにカギカッコを使用していますが、実際にコマンドパレットに入力する際にはカギカッコの入力は不要です。
 * 
 * 全てのパレットコマンドは大文字と小文字を区別します。
 * 各単語の間は半角スペースで区切ります（全角では認識しません）。
 * 間違わないように気をつけてください。
 * 
 * 「-> save 保存名」 : コマンドパレット上のスクリプト（2行目以降）を「保存名」で保存します。
 * 「-> exe 保存名」 : saveコマンドで保存した「保存名」のスクリプトを実行します。
 * 「-> bind オブジェクト名」 : コマンドパレット上のthisを指定します（詳細は後述）。
 * 「-> open」 : 管理ウィンドウを起動します。
 * 「-> com 番号」: 「番号」で指定した番号のコモンイベントを実行します。
 * 「-> e 番号 ページ」 : 現在のマップ上にあるイベント番号「番号」の、指定された「ページ」のイベントを実行します。
 * 「-> memo」 : メモシステムを起動します（詳細は後述）。
 * 
 * 【thisについて】
 * コマンドパレットに入力するthisは、現在のシーンのインスタンスへの参照を指します（つまりSceneManager._scene）。
 * マップ画面のみ、thisは$gameMap._interpreterを指すようになっています（こちらの方が使いやすいと僕が感じるため）。
 * また、マップ上ではイベントの実行も可能です。
 * 戦闘画面は$gameTroop._interpreterではなく、他と同じくシーンを指します（つまり戦闘画面では、スクリプトの実行は工夫しないと不可）。
 * 
 * コマンド「bind」でthisを変更した場合、そちらの設定が優先されます。
 * 「bind」を解除したい場合、「-> bind null」とするか、そのまま「-> bind」とだけコマンドパレットに入力してください。
 * 
 * 【管理ウィンドウ】
 * 管理ウィンドウでは、スイッチや変数の操作ができます。
 * ゲーム内の値を変えると、管理ウィンドウ内の値も変わります。逆も同じです。
 * 
 * 管理ウィンドウを通じて変数へ値を代入する際、気をつけなければならないことが一つあります。
 * それは、変数への代入は全てプリミティブ型の文字列として認識されることです。
 * オブジェクトや文字列以外のプリミティブ型として代入したい場合、文頭に半角のアットマークもしくは「#」をつけてください。
 * このドキュメンテーション内ではアットマークを使用できないので全て「#」で表現しますが、半角のアットマークに置き換えても動作します。
 * 
 * また、計算式の結果を代入することも可能です。
 * 例：「#1000」「#100+$gameParty.gold()」「#false」「#undefined」
 * 計算式の結果を代入する場合、Game_Variables.prototype.setValue()の挙動に準拠します。
 * すなわち、setValueメソッドに特に何も変更を加えていない場合、小数点以下は切り捨てられます。
 * 
 * オブジェクトや、メソッド（関数）の結果を代入することも可能です。
 * メソッドの結果を代入したい場合、末尾を「);」で終わらせてください。
 * また、オブジェクトを代入する場合、グローバルオブジェクトを暗黙的に参照します。
 * 例：「#$gameActors.actor(1);」「#$gameParty.steps();」「#$gameSystem」
 * 「#$gameParty._weapons」「#$gameParty['_weapons']」
 * 
 * 管理ウィンドウ内の「登録済みコマンド一覧」にあるボタンをクリックすると、登録済みのコマンドが実行されます。
 * これはパレットウィンドウで「-> exe コマンド名」を実行することと等価です。
 * 
 * 【メモシステム】
 * コマンド「-> memo」を実行すると、メモシステムが起動します。
 * 通常のテキストエリアとは違い、コマンドの入力は受け付けません。
 * また、入力終了後（タブキーを押した時点）、テキストエリアの文字列がファイルに保存されます。
 * この保存されたファイルは、次回のメモシステム起動時に読み込まれます。
 * 
 * 【ファイルの保存先】
 * コマンド「save」を実行すると、jsフォルダ内に「dte_commands.txt」というファイルが作られます。
 * コマンド「exe」を実行する際はこのファイルを読み取ります。
 * つまり、直接ファイルを編集することも可能です。
 * 
 * また、コマンド「memo」を実行すると、jsフォルダ内の「dte_memo.txt」というファイルを読み込みます。
 * コマンド「memo」を終了した時点（タブキーを押した時点）で、jsフォルダ内に「dte_memo.txt」は上書きされます。
 * 
 * 【ショートカットキー】
 * コマンドパレット起動後、Ctrl+Shift+Pキーを押すと「->」が自動で入力されます。
 * 
 * 
 * 【変数入力中の補完】
 * 変数に値を代入するとき、ツクールMVに用意されているグローバル変数に対して入力補完が働きます。
 * 値を返さない（ことを意図している）メソッドについては、undefinedしか返ってこないため入力補完から除外しています。
 * 未対応の入力補完もあるかと思いますので、抜けがあればご報告ください。
 * 
 * また、現在は$gameXXX系に属する直接のメソッドのみに対応しています。
 * $gameXXX系のメソッドから派生するプロパティに対する入力補完や、$dataXXX系への対応も一応は予定しています。
 * 
 * 【プラグイン管理機能】
 * 管理ウィンドウ内には、現在のプロジェクトで使用されているプラグインの一覧が表示されます。
 * プラグインパラメーターで設定をおこなうと、プラグインの一覧はプラグインのON/OFF順でソートさせることもできます。
 * 
 * ゲームの実行時にエラーが発生した場合、エラー発生元と思われるプラグインをリストアップします。
 * この機能により、エラー発生元のプラグインを特定しやすくなります。
 * ただし読み込み時のエラー（例えば画像ファイルの指定が不正だった場合など）は捕捉しません。
 * また、エラーの発生元を正確に捕捉し、情報を提供するものでもありません。
 * 詳細なエラー情報を知りたい場合、必ずコンソール画面のスタックトレースをご確認ください。
 * 
 * なお、コアスクリプト内でエラーが発生したとしても、そのエラーは捕捉されません。
 * コアスクリプトを直接編集している方はご注意ください。
 * 
 * 【プラグインコマンド】
 * このプラグインにプラグインコマンドはありません。
 * 
 * 【プラグインの更新方法】
 * プラグインを更新する場合、DebugToolEx.jsとdebug.htmlの二つを更新する必要があります。
 * DebugToolEx.jsはプラグインフォルダに設置し、debug.htmlはプロジェクトフォルダ（index.htmlの置いてあるフォルダ）に設置してください。
 * 
 * 【既知の不具合】
 * 現在はありません。
 * 
 * 【その他のデバッグツール】
 * 他の制作者様によるデバッグツールの紹介です。
 * 
 * ・総合開発支援プラグイン（トリアコンタンさん）
 *  https://triacontane.blogspot.jp/2016/04/blog-post_23.html
 * ・変数スイッチ監視ウインドウ（奏ねこまさん）
 *  http://makonet.sakura.ne.jp/rpg_tkool/contents/MPI_ValueMonitor.js
 * ・イベントデバッグプラグイン（トリアコンタンさん）
 *  https://triacontane.blogspot.jp/2017/01/blog-post.html
 * 
 * 特に総合開発支援プラグインは多機能なので、ぜひ一度導入してみてください。
 * 
 * 【更新履歴】
 * 0.9.2 2017/09/21 変数入力欄におけるエラー出力の調整。
 * 0.9.1 2017/09/21 変数入力欄に「#」を指定しても文字列として認識されていた不具合の修正。
 * 0.9.0 2017/09/20 バグ修正。プラグイン管理機能の追加。入力補完機能の向上。デザインの改善。
 * 0.8.2 2017/09/18 バグ修正。変数入力欄に入力補完機能を実装。
 * 0.8.1 2017/09/17 細かい修正と英語版に対応。
 * 0.8.0 2017/09/16 公開。
 * 
 * 【備考】
 * 当プラグインを利用したことによるいかなる損害に対しても、制作者は一切の責任を負わないこととします。
 * 
 * 【利用規約】
 * 作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 * についても制限はありません。
 * 自由に使用してください。
 * 
 */

(function() {
    'use strict';
    var pluginName = 'DebugToolEx';

    //This plugin is valid only test play.
    if (!Utils.isNwjs() || !Utils.isOptionValid('test')) {
        console.warn(pluginName + ' is valid only test play!');
        return;
    }

////=============================================================================
//// NTMO
////  Declare NTMO namespace.
////=============================================================================
    var NTMO = NTMO || {};
    NTMO.DTE = function(){
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

////=============================================================================
//// Get and set pluguin parameters.
////=============================================================================
    var param                          = {};
    //Basic Stteings
    param.keyCommandPalette     = getParamString(['CommandPaletteModeKey', 'コマンドパレット起動キー']);
    param.showManagementWindow  = getParamString(['ShowManagementWindow',  'ゲーム起動時に管理ウィンドウを表示']);
    param.shouldSortPluginList  = getParamString(['SortPluginList',        'プラグインリストをソートする']);

////=============================================================================
//// Convert parameters.
////=============================================================================
    param.showManagementWindow = convertParam(param.showManagementWindow);
    param.shouldSortPluginList = convertParam(param.shouldSortPluginList);

////==============================
//// NTMO.DTE_Base
//================================
    NTMO.DTE_Base = function(){
        this._isTextBoxVisible     = false;
        this._bind                 = null;
        this._isDebugWindowOpened  = false;
    };

    NTMO.DTE_Base.createInputArea = function () {
        var input = document.createElement('textarea');
        input.type           = 'textarea';
        input.style.width    = '97%';
        input.style.height   = '20%';
        input.style.fontSize = '16px';
        input.style.zIndex   = 999;
        input.style.position = 'absolute';
        return input;
    };

    NTMO.DTE_Base.changeInputMode = function() {
        if(!DataManager.isDatabaseLoaded()){
            return;
        }

        if(this.isTextBoxVisible()){
            this.executeScript();
            if(!NTMO.DTE_Memo.canMemoSystemUse()){
                this.hideTextBox();
            }
        }else{
            this.showTextBox();
            this.showCurrentSceneProperties();
        }
    };

    NTMO.DTE_Base.showTextBox = function() {
        this._isTextBoxVisible = true;
        this.input = this.createInputArea();
        document.body.appendChild(this.input);
        this.input.focus();
    };

    NTMO.DTE_Base.hideTextBox = function() {
        this._isTextBoxVisible = false;
        this.input.remove();
    };

    NTMO.DTE_Base.getTextBox = function() {
        return this.input;
    };

    NTMO.DTE_Base.isTextBoxVisible = function() {
        return this._isTextBoxVisible;
    };

    NTMO.DTE_Base.splitByLine = function(data) {
        var text  = data.replace(/\r\n|\r/g, "\n");
        var lines = text.split( '\n' );
        var outArray = new Array();
     
        for ( var i = 0; i < lines.length; i++ ) {
            //Ignore empty line.
            if ( lines[i] == '' ) {
                continue;
            }
     
            outArray.push( lines[i] );
        }
     
        return outArray;
    }

    NTMO.DTE_Base.getFirstLine = function() {
        var textArray = this.splitByLine(this.input.value);

        return textArray[0];
    };

    NTMO.DTE_Base.hasCommand = function(text) {
        return text.startsWith('=>') || text.startsWith('->');
    };

    //When return 'false', has not command.Go normal eval.
    NTMO.DTE_Base.executeCommand = function() {
        var text = String(this.getFirstLine());

        if(!this.hasCommand(text)){
            return false;
        }

        var args = text.split(" ");
        var command = args.shift();

        this.debugCommand(command, args);

        return true;
    };

    NTMO.DTE_Base.debugCommand = function (command, args) {
        var color = '#CCE6FF';
        if (command === '->' || command === '=>') {
            switch (args[0]) {
                case 'save':
                    NTMO.DTE_File.appendFile(this.input.value);
                    console.log('%cSave command was executed.','background-color:' + color);
                    break;
                case 'exe':
                    this.executeScriptsByTextFile(args[1]);
                    console.log('%cExe command was executed.','background-color:' + color);
                    break;
                case 'del':
                    console.log('%cDel command was executed.','background-color:' + color);
                    break;
                case 'bind':
                    this.setBind(args[1]);
                    console.log('%cBind command was executed.','background-color:' + color);
                    break;
                case 'open':
                    this.openDebugWindow();
                    console.log('%cOpen command was executed.','background-color:' + color);
                    break;
                case 'com':
                    $gameTemp.reserveCommonEvent(Number(args[1]));
                    console.log('%cCom command was executed.','background-color:' + color);
                    break;
                case 'e':
                    this.callMapEvent(Number(args[1]), Number(args[2]));
                    console.log('%cE command was executed.','background-color:' + color);
                    break;
                case 'memo':
                    this.activateMemoSystem();
                    console.log('%cMemo command was executed.','background-color:' + color);
                    break;
                default:
                    console.warn('%c' + args[0] + ' is invalid ! Please make sure command.','background-color:' + color);
                    break;
            }
        }
    };

    NTMO.DTE_Base.executeScript = function() {
        try{
            //Is the current mode memo ?
            if(NTMO.DTE_Memo.canMemoSystemUse()){
                NTMO.DTE_Memo.saveMemoFile(this.input.value);
                NTMO.DTE_Memo.activateMemoSystem(false);
                return;
            }
            //Check command.
            if(this.executeCommand()){
                return;
            }

            //Set bind.
            var bind;
            if(this._bind){
                bind = '}.call(' + this._bind + ')';
            }else{
                bind = '}.call(current)';
            }

            //Set scripts.
            var scripts = this.input.value;

            //Eval.
            if(SceneManager._scene.constructor === Scene_Map){
                var setupInterpreter = "this.setup(null, null);";
                eval("var current = $gameMap._interpreter;" + 
                    "var fnc = function() {" + setupInterpreter + scripts + bind);
            }else{
                eval("var current = SceneManager._scene;" + 
                "var fnc = function() {" + scripts + bind);
            }
        }catch(e){
            console.log(e);
            console.log(e.message);
        }
    };

    NTMO.DTE_Base.showCurrentSceneProperties = function() {
        var current = SceneManager._scene;
        if($dataSystem.locale.match(/^ja/)){
            console.group(current.constructor.name + 'のプロパティを表示します。');
            console.log(current.constructor.prototype);
            console.log(current.constructor.name + 'のプロパティは以上です。');
            console.groupEnd();
            if(current.constructor === Scene_Map){
                console.group($gameMap._interpreter.constructor.name + 'のプロパティを表示します。');
                console.log($gameMap._interpreter.constructor.prototype);
                console.log($gameMap._interpreter.constructor.name + 'のプロパティは以上です。');
                console.groupEnd();
            }
        }else{
            console.group('Start: ' + current.constructor.name + 'properties.');
            console.log(current.constructor.prototype);
            console.log('End: ' + current.constructor.name + 'properties.');
            console.groupEnd();
            if(current.constructor === Scene_Map){
                console.group('Start: ' + $gameMap._interpreter.constructor.name + 'properties.');
                console.log($gameMap._interpreter.constructor.prototype);
                console.log('End: ' + $gameMap._interpreter.constructor.name + 'properties.');
                console.groupEnd();
            }
        }
    };

    NTMO.DTE_Base.setBind = function(text) {
        if(text === 'null'){
            this._bind = null;
        }else if(typeof(text) === 'string'){
            this._bind = text;
        }else{
            this._bind = null;
        }
    };

    NTMO.DTE_Base.analyzeTextArray = function(command) {
        //First : Search in arrays for items starting with '#'
        //Second: Among those element, look for matches with the argument 'command'.
        //Third : After searching, read the array up to the next empty line and return it as one string type.
        var textArray = NTMO.DTE_File.readLine();
        var length    = textArray.length;
        
        for(var i = 0; i < length; i++){
            if(!textArray[i].startsWith('#')){
                continue;
            }

            if(this.matchCommand(textArray[i], command)){
                var k = i + 1;
                var text = '';
                while(true){
                    if( k > length){
                        return text;
                    }

                    if(typeof(textArray[k]) !== 'string'){
                        k++;
                        continue;
                    }

                    if(textArray[k].startsWith('#')){
                        return text;
                    }

                    text += textArray[k];
                    k++;
                }
            }
        }

        return null;
    };

    //This method receives the result of analyzeTextArray() and executes as eval.
    NTMO.DTE_Base.executeScriptsByTextFile = function(command) {
        var scripts = this.analyzeTextArray(command);

        try{
            //Set bind.
            var bind;
            if(this._bind){
                bind = '}.call(' + this._bind + ')';
            }else{
                bind = '}.call(current)';
            }

            //Eval.
            if(SceneManager._scene.constructor === Scene_Map){
                var setupInterpreter = "this.setup(null, null);";
                eval("var current = $gameMap._interpreter;" + 
                    "var fnc = function() {" + setupInterpreter + scripts + bind);
            }else{
                eval("var current = SceneManager._scene;" + 
                "var fnc = function() {" + scripts + bind);
            }
        }catch(e){
            console.log(e);
            console.log(e.message);
        }
    };

    NTMO.DTE_Base.matchCommand = function(text, command) {
        if(text === '#' + command){
            return true;
        }
        return false;
    };

    NTMO.DTE_Base.openDebugWindow = function() {
        if(!this.isDebugWindowOpened()){
            this._debugWindow         = new NTMO.DTE.DebugWindow();
            this._isDebugWindowOpened = true;
        }else{
            console.warn('Debug window was already opened.');
        }
    };

    NTMO.DTE_Base.reOpenDebugWindow = function() {
        if(this.isDebugWindowOpened()){
            this._debugWindow.disposeDebugWindow();
            this._debugWindow         = new NTMO.DTE.DebugWindow();
            this._isDebugWindowOpened = true;
        }
    };

    NTMO.DTE_Base.isDebugWindowOpened = function(){
        return this._isDebugWindowOpened;
    };

    NTMO.DTE_Base.closeDebugWindow = function() {
        this._isDebugWindowOpened = false;
    };

    NTMO.DTE_Base.callMapEvent = function(eventId, pageIndex) {
        var event = $gameMap.event(eventId);
        if(event){
            $gameMap._interpreter.setup(event.event().pages[pageIndex-1].list, eventId);
        }
    };

    NTMO.DTE_Base.activateMemoSystem = function() {
        var text = NTMO.DTE_Memo.readAllLines();
        NTMO.DTE_Memo.activateMemoSystem(true);
        this.input.value = text;
    };


////==============================
//// NTMO.DTE_File
////  This class manipulate file.
//================================
    NTMO.DTE_File = function(){
    };

    NTMO.DTE_File.getPath = function(){
        //Basic settings.
        var fs       = require('fs');
        var path     = require('path');
        var dirPath  = path.dirname(process.mainModule.filename);
        var filePath = "dte_commands.txt";
        var fullPath = dirPath + '/js/' + filePath;

        return fullPath;
    };

    NTMO.DTE_File.appendFile = function(data) {
        var fs = require('fs');
        //Text settings.
        data = data.replace('-> save ', '#');
        data = data.replace('=> save ', '#');

        fs.appendFile(this.getPath(), data + '\r\n\r\n', function (err) {
            if (err) {
                throw err;
            }
        });
    };

    NTMO.DTE_File.readLine = function() {
        var fs = require('fs');
        //Read by sync.
        var buf       = fs.readFileSync(this.getPath());
        var text      = buf.toString();
        var textArray = text.split(/\r\n|\r|\n/);
        
        return textArray;
    };

////==============================
//// NTMO.DTE_Memo
////  This class is for memo system.
//================================
    NTMO.DTE_Memo = function(){
        this._canUse = false;
    };

    NTMO.DTE_Memo.getPath = function(){
        //Basic settings.
        var fs       = require('fs');
        var path     = require('path');
        var dirPath  = path.dirname(process.mainModule.filename);
        var filePath = "dte_memo.txt";
        var fullPath = dirPath + '/js/' + filePath;

        return fullPath;
    };

    NTMO.DTE_Memo.readAllLines = function(){
        try{
            var fs = require('fs');
            //Read by sync.
            var buf       = fs.readFileSync(this.getPath());
            var text      = buf.toString();

            return text;
        }catch(e){
            return '';
        }
    };

    NTMO.DTE_Memo.saveMemoFile = function(data){
        var fs = require('fs');
        fs.writeFile(this.getPath(), data, function (err) {
            if (err) {
                throw err;
            }
        });
    };

    NTMO.DTE_Memo.canMemoSystemUse = function(){
        return this._canUse;
    };

    NTMO.DTE_Memo.activateMemoSystem = function(flag){
        this._canUse = flag;
    };

//=============================================================================
// NTMO.DTE.DebugWindow
//  This class is base class for debug window.
//=============================================================================
    NTMO.DTE.DebugWindow = function(){
        this.initialize.apply(this, arguments);
    };

    NTMO.DTE.DebugWindow.prototype.initialize = function(){
        //Initialize.
        this._window        = null;
        this._topId         = 1;
        this._document      = null;
        this._commandLength = 0;
        this._pluginList    = null;

        //Original window
        var gui = require('nw.gui');
        var win = gui.Window.get();//Get the current window

        //Hack: Maybe this method cause ERROR!!!!
        //Probably I should check if the original window is opened.
        var callDebugWindow = setInterval( function() {
            //Async load.
            if (DataManager.isDatabaseLoaded() && SceneManager.isCurrentSceneStarted()) {
                clearInterval(callDebugWindow);
                this.createAllObjects();
            }
        }.bind(this), 100);
    };

    NTMO.DTE.DebugWindow.prototype.createAllObjects = function(){
        this.createWindow();
        this.window().on('document-end', function(){
            this.createDocument();
            this.createPluginList();
            this.createSwitchElements();
            this.createVariableElements();
            this.createCommandElements(this);
            this.addEventListener();
        }.bind(this));
    };

    NTMO.DTE.DebugWindow.prototype.createPluginList = function(){
        this._pluginList = new NTMO.DTE.PluginManager();
        this._pluginList.createPluginListElement(this);
    };

    NTMO.DTE.DebugWindow.prototype.createSwitchElements = function(){
        var length = $dataSystem.switches.length;
        for(var i = 0; i < length; i++){
            this.createSwitchElement(i);
        }
    };

    NTMO.DTE.DebugWindow.prototype.createSwitchElement = function(index){
        //Switch settings.
        var dataId    = this._topId + index;
        var idText    = dataId.padZero(4);
        var name      = this.switchName(dataId) || '-----';
        var status    = this.switchStatus(dataId);

        //DOM settings initialize.
        var div_switch = this.document().getElementById('switch');
        var br         = this.document().createElement('br');
        var radio_on   = this.document().createElement('input');
        var radio_off  = this.document().createElement('input');
        var table      = this.createTable();
        var text_node  = null;
        var label      = null;

        //Radio buttons.
        radio_on.type    = 'radio';
        radio_off.type   = 'radio';
        radio_on.name    = 'switch' + dataId;
        radio_off.name   = 'switch' + dataId;
        radio_on.value   = 'On';
        radio_off.value  = 'Off';
        radio_on.number  = dataId;
        radio_off.number = dataId;
        if(status){
            radio_on.checked  = true;
        }else{
            radio_off.checked = true;
        }

        //Create tr.
        var o_row = table.insertRow(-1);
        //Create first Cell.
        var elm_cell_1          = o_row.insertCell(-1);
        elm_cell_1.innerHTML    = idText + ': <strong>'+ name +'</strong>';
        elm_cell_1.width        = '200';
        //Create second Cell.
        var elm_cell_2     = o_row.insertCell(-1);
        label              = document.createElement('label');
        text_node          = document.createTextNode('ON');
        elm_cell_2.bgColor = status ? '#9DCEFF' : '';
        elm_cell_2.id      = 'switchCell2_' + dataId;
        elm_cell_2.appendChild(label);
        label.appendChild(text_node);
        label.appendChild(radio_on);
        //Create third Cell.
        var elm_cell_3   = o_row.insertCell(-1);
        label            = document.createElement('label');
        text_node        = document.createTextNode('OFF');
        elm_cell_3.appendChild(label);
        label.appendChild(text_node);
        label.appendChild(radio_off);

        //Create div tag.
        div_switch.appendChild(table);
        
    };

    NTMO.DTE.DebugWindow.prototype.createTable = function(){
        var table = this.document().createElement('table');
        table.border      = 2;
        table.box         = 'frame';
        //table.width       = 200;
        table.cellPadding = 4;

        return table;
    }

    NTMO.DTE.DebugWindow.prototype.switchName = function(dataId) {
        return $dataSystem.switches[dataId];
    };

    NTMO.DTE.DebugWindow.prototype.switchStatus = function(dataId) {
        return $gameSwitches.value(dataId);
    };

    NTMO.DTE.DebugWindow.prototype.createVariableElements = function(){
        var length = $dataSystem.variables.length;
        for(var i = 0; i < length; i++){
            this.createVariableElement(i);
        }
    };

    NTMO.DTE.DebugWindow.prototype.createVariableElement = function(index){
        //Variable settings.
        var dataId    = this._topId + index;
        var idText    = dataId.padZero(4);
        var name      = this.variableName(dataId) || '-----';
        var status    = this.variableStatus(dataId);

        //DOM settings initialize.
        var div_variable = this.document().getElementById('variable');
        var br           = this.document().createElement('br');
        var textBox      = this.document().createElement('input');
        var table        = this.createTable();
        var text_node    = null;
        var label        = null;

        //Text box.
        textBox.type         = 'text';
        textBox.id           = 'variable' + dataId;
        textBox.value        = status;
        textBox.number       = dataId;
        textBox.autocomplete = 'on';
        textBox.style.width  = '300px';
        textBox.setAttribute('list', 'global');

        //Create tr.
        var o_row = table.insertRow(-1);
        //Create first Cell.
        var elm_cell_1          = o_row.insertCell(-1);
        elm_cell_1.innerHTML    = idText + ': <strong>'+ name +'</strong>';
        elm_cell_1.width        = '200';
        //Create second Cell.
        var elm_cell_2   = o_row.insertCell(-1);
        elm_cell_2.appendChild(textBox);

        //Create div tag.
        div_variable.appendChild(table);
    };

    NTMO.DTE.DebugWindow.prototype.variableName = function(dataId) {
        return $dataSystem.variables[dataId];
    };

    NTMO.DTE.DebugWindow.prototype.variableStatus = function(dataId) {
        return String($gameVariables.value(dataId));
    };

    NTMO.DTE.DebugWindow.prototype.createCommandElements = function(){
        var textArray = NTMO.DTE_File.readLine();
        var length    = textArray.length;
        var index     = 0;
        
        for(var i = 0; i < length; i++){
            if(textArray[i].startsWith('#')){
                this.createCommandElement(index, textArray[i]);
                index++;
            }
        }

        //Set command length to instance.
        this._commandLength = index;
    };

    NTMO.DTE.DebugWindow.prototype.createCommandElement = function(index, text){
        //DOM settings initialize.
        var div_command  = this.document().getElementById('command');
        var br           = this.document().createElement('br');
        var button       = this.document().createElement('input');
        var table        = this.createTable();

        //Replace
        text = text.replace('#', '');

        //Button settings.
        button.type    = 'button';
        button.id      = 'command' + index;
        button.value   = text;
        button.number  = index;

        //Create tr.
        var o_row = table.insertRow(-1);
        //Create first Cell.
        var elm_cell_1          = o_row.insertCell(-1);
        elm_cell_1.appendChild(button);

        //Create div tag.
        div_command.appendChild(table);
    };

    NTMO.DTE.DebugWindow.prototype.createWindow = function(){
        //Load native UI library
        var gui = require('nw.gui');
        //Get the current window
        var win = gui.Window.get();
        //Set window position.
        var width  = 600;
        var height = 640;

        //Open window.
        if($dataSystem.locale.match(/^ja/)){
            this._window = gui.Window.open('debug.html', {
                position: 'center',
                width: width,
                height: height,
                x: win.x + win.width,
                y: win.y,
            });
        }else{
            this._window = gui.Window.open('debug_en.html', {
                position: 'center',
                width: width,
                height: height,
                x: win.x + win.width,
                y: win.y,
            });
        }
        //Initialize window
        this._window.setAlwaysOnTop(true);
    };

    NTMO.DTE.DebugWindow.prototype.createDocument = function(){
        this._document = this.window().window.document;
    };

    NTMO.DTE.DebugWindow.prototype.addEventListener = function(){
        var that = this;

        this.window().on('loaded', function(){

            //Emitted when the switch is clicked.
            var s_length = $dataSystem.switches.length;
            for(var switch_i = 0; switch_i < s_length; switch_i++){
                var elm_switch = this.document().getElementsByName('switch' + switch_i);
                for(var switch_k = 0; switch_k < elm_switch.length; switch_k++){
                    //console.log(elm_switch.item(switch_k).name);
                    elm_switch.item(switch_k).addEventListener('change', function() {
                        that.applySwitchValueToGame(this);
                        //console.log(this.name);
                    }, false);
                }
            }

            //Emitted when the textBox is changed.(blur)
            var v_length = $dataSystem.variables.length;
            for(var variable_i = 1; variable_i <= v_length; variable_i++){
                var elm_v = this.document().getElementById('variable' + variable_i);
                elm_v.addEventListener('change', function(e) {
                    that.applyVariableValueToGame(this);
                    //Hack: Maybe these methods cause problems.
                    e.stopImmediatePropagation();
                    e.preventDefault();
                }, false);

                elm_v.addEventListener('keydown', function(e) {
                    var result = NTMO.DTE.Suggest.Global.tryToGetNextSuggest(e.keyCode, this);
                    e.stopImmediatePropagation();
                    //e.preventDefault();
                }, false);
            }

            //Emitted when command button is cliked.
            for(var command_i = 0; command_i < this._commandLength; command_i++){
                var elm_c = this.document().getElementById('command' + command_i);
                elm_c.addEventListener('click', function(e) {
                    NTMO.DTE_Base.executeScriptsByTextFile(this.value);
                    e.stopImmediatePropagation();
                    e.preventDefault();
                }, false);
            }

            //Emitted when window close.
            this.window().on('close', function() {
                this.disposeDebugWindow();
            }.bind(this));

            //Add Event listner for MAIN WINDOW!!!!
            var gui = require('nw.gui');
            var win = gui.Window.get();//Get the current window
            win.on('closed', function() {
                this.disposeDebugWindow();
            }.bind(this));

            //Emitted when window reloaded(F5).
            win.on('loading', function() {
                this.disposeDebugWindow();
            }.bind(this));

            //EOF addEventListener().
        }.bind(this));
    };

    NTMO.DTE.DebugWindow.prototype.disposeDebugWindow = function(){
        if(this.window()){
            this.window().hide(); // Pretend to be closed already
            this.window().close(true);
            NTMO.DTE_Base.closeDebugWindow();
        }
    };

    NTMO.DTE.DebugWindow.prototype.window = function(){
        return this._window;
    };

    NTMO.DTE.DebugWindow.prototype.document = function(){
        return this._document;
    };

    NTMO.DTE.DebugWindow.prototype.changeSwitchValue = function(swithcId, value){
        var dom_switch = this.document().getElementsByName('switch' + swithcId);
        var elm_switch = this.document().getElementById('switchCell2_' + swithcId);

        //If turn on switch, debug window swich is also changeed    .
        for(var i = 0, len = dom_switch.length; i < len; i++){
            var elm = dom_switch.item(i);
            if(value){
                if(elm.value === 'On'){
                    elm.checked = true;
                    elm_switch.bgColor = '#9DCEFF';
                    break;
                }
            }else{
                if(elm.value === 'Off'){
                    elm.checked = true;
                    elm_switch.bgColor = '';
                    break;
                }
            }
        }
    };

    NTMO.DTE.DebugWindow.prototype.applySwitchValueToGame = function(radio){
        if(radio.value === 'On'){
            $gameSwitches.setValue(radio.number, true);
        }else if(radio.value === 'Off'){
            $gameSwitches.setValue(radio.number, false);
        }
    };

    NTMO.DTE.DebugWindow.prototype.changeVariableValue = function(variableId, value){
        var dom_variable   = this.document().getElementById('variable' + variableId);
        dom_variable.value = value;
    };

    NTMO.DTE.DebugWindow.prototype.applyVariableValueToGame = function(variable){
        var value;
        //Check literal.
        if(variable.value.startsWith('@')){
            value          = this.convertToAnotherType(variable.value, '@');
        }else if(variable.value.startsWith('#')){
            value          = this.convertToAnotherType(variable.value, '#');
        }

        if(value){//If literal mode(@ or #).
            $gameVariables.setValue(variable.number, value);
         }else{//If not literal mode.
            $gameVariables.setValue(variable.number, variable.value);
         }

         //Set value to textbox from floor number or text or etc...
         //Anyway, In case the user is changing the way of saving the variable,
         //the value is directly extracted from the method for '$gameVariables.value'.
         variable.value = $gameVariables.value(variable.number);
    };

    NTMO.DTE.DebugWindow.prototype.convertToAnotherType = function(variable, sign){
        //First: delete the first '@' or '#'.
        variable = variable.replace(sign, '');

        //Check whether the variable is number.
        var number = Number(variable);
        if(!isNaN(number)){
            //Return as a number.
            return Number(number);
        }

        //Check whether the variable is formula.
        if(this.isTextValueFormula(variable)){
            var e_number = eval(variable);
            return Number(e_number);
        }

        //If the number is not a number.
        switch(variable){
            case 'true':
                return true;
                break;
            case 'false':
                return false;
                break;
            case 'null':
                return null;
                break;
            case 'undefined':
                return undefined;
                break;
            case 'Infinity':
                return Infinity;
                break;
            case '-Infinity':
                return -Infinity;
                break;
            default : //Return as a object reference name.
                if(this.isTextValueMethod(variable)){
                    return this.returnMethodResult(variable);
                }else{
                    try{
                        var end_result = eval(variable);
                        if(typeof(end_result) === 'object'){
                            return end_result;
                        }else{
                            throw new Error();
                        }
                    }catch(e){
                        console.warn('Error! The value is invalid.');
                        return 'Error!';
                    }
                }
                break;
        }
    };

    NTMO.DTE.DebugWindow.prototype.returnMethodResult = function(s_func){
        try{
            return eval(s_func);
        }catch(e){
            console.warn('Error! The method is invalid.');
            return 'Error!';
        }
    }

    NTMO.DTE.DebugWindow.prototype.isTextValueMethod = function(text){
        return text.endsWith(');') ? true : false;
    }

    NTMO.DTE.DebugWindow.prototype.isTextValueFormula = function(text){
        try{
            var e_number = eval(text);
            if(typeof(e_number) === 'number'){
                return true;
            }
            return false;
        }catch(e){
            return false;
        }
    }

//=============================================================================
// NTMO.DTE.Suggest
//  Suggest lists and parse methods.
//=============================================================================
    NTMO.DTE.Suggest = {};
    NTMO.DTE.Suggest.Global      = function(){};
    NTMO.DTE.Suggest.Game_Actors = function(){};
    //NTMO.DTE.Suggest.Global = function(){};


//=============================================================================
// NTMO.DTE.Suggest.Global
//  Global suggest lists and parse methods.
//=============================================================================

    //When return false, this method do not do anything.
    NTMO.DTE.Suggest.Global.tryToGetNextSuggest = function(keyCode, elm_v) {
        var text = elm_v.value;

        if(keyCode === 8 || keyCode === 46){//When use press BS or Delete key.
            for(var data in this.list){
                if(text.contains(this.list[data])){
                    //This means current suggest is not global.
                    //NTMO.DTE.Suggest.Game_Actors.tryToGetNextSuggest(text);
                    return false;
                }
            }
            //This means current suggest must be global.
            elm_v.setAttribute('list', this.listId);
            return true;
        }

        if(keyCode !== 190){// Only when user press "." , go next code.
            return false;
        }

        //When in global.
        for(var data in this.list){
            if(text === this.list[data]){
                elm_v.setAttribute('list', text);
                return true;
            }
        }

        //When except global.
        NTMO.DTE.Suggest.Game_Actors.tryToGetNextSuggest(elm_v);
        return false;
    };

    NTMO.DTE.Suggest.Global.listId = 'global';

    NTMO.DTE.Suggest.Global.list = {
        $dataActors       : '$dataActors',
        $dataAnimations   : '$dataAnimations',
        $dataArmors       : '$dataArmors',
        $dataClasses      : '$dataClasses',
        $dataCommonEvents : '$dataCommonEvents',
        $dataEnemies      : '$dataEnemies',
        $dataItems        : '$dataItems',
        $dataMap          : '$dataMap',
        $dataMapInfos     : '$dataMapInfos',
        $dataSkills       : '$dataSkills',
        $dataStates       : '$dataStates',
        $dataSystem       : '$dataSystem',
        $dataTilesets     : '$dataTilesets',
        $dataTroops       : '$dataTroops',
        $dataWeapons      : '$dataWeapons',
        $gameActors       : '$gameActors',
        $gameMap          : '$gameMap',
        $gameMessage      : '$gameMessage',
        $gameParty        : '$gameParty',
        $gamePlayer       : '$gamePlayer',
        $gameScreen       : '$gameScreen',
        $gameSelfSwitches : '$gameSelfSwitches',
        $gameSwitches     : '$gameSwitches',
        $gameSystem       : '$gameSystem',
        $gameTemp         : '$gameTemp',
        $gameTimer        : '$gameTimer',
        $gameTroop        : '$gameTroop',
        $gameVariables    : '$gameVariables'
    };

    //Freeze
    Object.freeze(NTMO.DTE.Suggest.Global.list);

//=============================================================================
// NTMO.DTE.Suggest.Game_Actors
//  Game_Actors suggest lists and parse methods.
//=============================================================================
    NTMO.DTE.Suggest.Game_Actors.tryToGetNextSuggest = function(elm_v) {
        var text    = elm_v.value;
        var result  = text.match(/\$gameActors\.actor\((\d*)\)$/i);
        if(result !== null){
            elm_v.setAttribute('list', this.listId);
            return true;
        }
        return false;
    };

    NTMO.DTE.Suggest.Game_Actors.listId = 'actor()';

    NTMO.DTE.Suggest.Game_Actors.list = {
    };

//=============================================================================
// NTMO.DTE.PluginManager
//  This class create PluginManager.
//=============================================================================
    NTMO.DTE.PluginManager = function(){
        this.initialize.apply(this, arguments);
    };

    NTMO.DTE.PluginManager.prototype.initialize = function(){
        this._sortedPluginList = null;
        this._excludedList     = null;

        this.createPluginList();
    };

    NTMO.DTE.PluginManager.prototype.createPluginList = function(){
        this.tryToGetSortedPluginList();//insert to this._sortedPluginList.
    };

    NTMO.DTE.PluginManager.prototype.tryToGetSortedPluginList = function(){
        this._sortedPluginList = $plugins.slice();

        //Only when user set 'param.shouldSortPluginList' to true,this method sort plugin list.
        if(param.shouldSortPluginList){
            this._sortedPluginList.sort(function(x, y) {
                return y.status - x.status;
            });
        }
    };

    NTMO.DTE.PluginManager.prototype.createPluginListElement = function(parent){
        this._sortedPluginList.forEach(function(plugin, index) {
            //Plugin settings.
            var dataId    = index;
            var name      = plugin.name;
            var desc      = plugin.description;
            var status    = plugin.status;
            var idText    = dataId.padZero(4);

            //DOM settings initialize.
            var div_plugin   = parent.document().getElementById('plugin');
            var br           = parent.document().createElement('br');
            var table        = parent.createTable();

            table.style.tableLayout = 'fixed';
            //table.bgColor = "#ffcc00";

            //Create tr.
            var o_row = table.insertRow(-1);
            //Create first Cell.
            var elm_cell_1          = o_row.insertCell(-1);
            elm_cell_1.innerHTML    = idText + ': <strong>'+ name +'</strong>';
            //elm_cell_1.width        = "150";
            elm_cell_1.style.width  = '200px';
            //Create second Cell.
            var elm_cell_2          = o_row.insertCell(-1);
            elm_cell_2.innerHTML    = desc;
            elm_cell_2.style.width  = '300px';
            //elm_cell_2.width        = "300";
            //Create third Cell.
            var elm_cell_3          = o_row.insertCell(-1);
            elm_cell_3.innerHTML    = status ? 'ON' : 'OFF';
            elm_cell_3.bgColor      = status ? '#9DCEFF' : '';
            elm_cell_3.style.width  = '30px';

            //Create div tag.
            div_plugin.appendChild(table);
        }, this);
    };

    NTMO.DTE.PluginManager.prototype.getErrorPluginList = function(errorLog){
        var ex_length = this._excludedList.length;
        //First, exclude the list of excluded.
        var list = errorLog.filter(function(log) {
            for(var i = 0; i < ex_length; i++){
                if(log.contains(this._excludedList[i])){
                    return false;
                }
            }
            return true;
        }, this);

        //Next, exlude those not including '.js'.
        list = list.filter(function(log) {
            if(log.contains('.js')){
                return true;
            }
            return false;
        }, this);

        return list;
    };

    //Get errors other than loading here.
    NTMO.DTE.PluginManager.prototype.createErrorPluginListElement = function(e){
        this.createExcludedList();
        var errorLog      = NTMO.DTE_Base.splitByLine(e.stack);
        var errorList     = this.getErrorPluginList(errorLog);
        var formattedList = this.formatErrorList(errorList);
        var errorBox      = this.createErrorReportBox(formattedList);
        var copyButton    = this.createCopyButton();
        document.body.appendChild(errorBox);
        document.body.appendChild(copyButton);
    };

    NTMO.DTE.PluginManager.prototype.createErrorReportBox = function(list){
        var input = document.createElement('textarea');
        input.type           = 'textarea';
        input.style.width    = '97%';
        input.style.height   = '20%';
        input.style.fontSize = '14px';
        input.style.zIndex   = 999;
        input.style.position = 'absolute';
        input.style.bottom   = '30px';
        input.id             = 'reportBox';
        var delimiter = '---------------------------------------------------\n';
        if($dataSystem.locale.match(/^ja/)){
            list.forEach(function(element) {
                input.value += 'エラーが発生した可能性のあるプラグイン名：' + element.name + '\n';
                input.value += 'エラーが発生した可能性のある行：'+ element.line + '\n';
                input.value += delimiter;
            }, this);
        }else{
            list.forEach(function(element) {
                input.value += 'Plugin name that may have caused an error:' + element.name + '\n';
                input.value += 'Lines that may have caused an error:'+ element.line + '\n';
                input.value += delimiter;
            }, this);
        }
        return input;
    };

    NTMO.DTE.PluginManager.prototype.createCopyButton = function(){
        var button = document.createElement('button');
        button.innerHTML      = ($dataSystem.locale.match(/^ja/)) ? 'コピー' : 'Copy';
        button.style.position = 'absolute';
        button.style.fontSize = '20px';
        button.style.bottom   = '170px';
        button.style.zIndex   = 1000;

        //Add event listener.
        var doc = document;
        button.onmousedown = button.ontouchstart = function(event) {
            //Create clipbord.
            var gui       = require('nw.gui');
            var clipboard = gui.Clipboard.get();
            //Get errorBox value.
            var box     = doc.getElementById('reportBox');
            var text    = box.value;
            //Set error log to clipbord.
            clipboard.set(text, 'text');
            //Output to console screen.
            if($dataSystem.locale.match(/^ja/)){
                console.log('コピー完了しました。');
            }else{
                console.log('Copy completed.');
            }
            //End.
            event.stopPropagation();
        };
        return button;
    };

    NTMO.DTE.PluginManager.prototype.formatErrorList = function(list){
        var formattedList = [];
        list.forEach(function(element, index) {
            //Create arrary.
            formattedList[index] = {};
            //Get Erro plugin name.
            var name = element.match(/.+\/(.*.js)/i);
            formattedList[index].name = name[1];

            //Get error line.
            var line = element.match(/.js:(\d+):/i);
            formattedList[index].line = line[1];
        }, this);

        return formattedList;
    };

    NTMO.DTE.PluginManager.prototype.createExcludedList = function(){
        this._excludedList = [
            'main.js',
            'plugins.js',
            'rpg_core.js',
            'rpg_managers.js',
            'rpg_objects.js',
            'rpg_scenes.js',
            'rpg_sprites.js',
            'rpg_windows.js',
            'pixi.js',
            'pixi-picture.js',
            'pixi-tilemap.js',
            'DevToolsManage.js',
            'DebugToolEx.js'
        ];
    };

    NTMO.DTE.PluginManager.prototype.getPluginList = function(){
        return this._sortedPluginList;
    };

////=============================================================================
//// Game_Switches
////  Set event for debug window.
////=============================================================================
    var _Game_Switches_setValue = Game_Switches.prototype.setValue;
    Game_Switches.prototype.setValue = function(switchId, value) {
        _Game_Switches_setValue.call(this, switchId, value);

        //Set event for debug window.
        if(NTMO.DTE_Base.isDebugWindowOpened()){
            NTMO.DTE_Base._debugWindow.changeSwitchValue(switchId, value);
        }
    };

////=============================================================================
//// Game_Variables
////  Set event for debug window.
////=============================================================================
    var _Game_Variables_setValue = Game_Variables.prototype.setValue;
    Game_Variables.prototype.setValue = function(variableId, value) {
        _Game_Variables_setValue.call(this, variableId, value);

        //Set event for debug window.
        if(NTMO.DTE_Base.isDebugWindowOpened()){
            NTMO.DTE_Base._debugWindow.changeVariableValue(variableId, value);
        }
    };

//=============================================================================
// Input
//  In the debug mode, interferes with key operation.
//=============================================================================
    Input.DTE_KeyMapper = {
        F1 : 112,
        F2 : 113,
        F3 : 114,
        F4 : 115,
        F5 : 116,
        F6 : 117,
        F7 : 118,
        F8 : 119,
        F9 : 120,
        F10: 121,
        F11: 122,
        F12: 123,
        Tab: 9,
        Ctrl:116,
        Alt: 117
    };

//=============================================================================
// SceneManager
//  Add a system for debug mode.
//=============================================================================
    var _SceneManager_onKeyDown = SceneManager.onKeyDown;
    SceneManager.onKeyDown      = function(event) {
        _SceneManager_onKeyDown.apply(this, arguments);
        if (!event.ctrlKey && !event.altKey) {
            switch (event.keyCode) {
                case Input.DTE_KeyMapper[param.keyCommandPalette]:
                    NTMO.DTE_Base.changeInputMode();
                    break;
            }
        }
        if (event.ctrlKey && event.shiftKey) {
            switch (event.keyCode) {
                case 80: //P
                    NTMO.DTE_Base.input.value = '-> ';
                    break;
            }
        }
    };

    var _SceneManager_updateMain = SceneManager.updateMain;
    SceneManager.updateMain = function() {
        if(!NTMO.DTE_Base.isTextBoxVisible()){
            _SceneManager_updateMain.call(this);
            return;
        }

        if (Utils.isMobileSafari()) {
            this.changeScene();
            this.updateScene();
        } else {
            var newTime = this._getTimeInMsWithoutMobileSafari();
            var fTime = (newTime - this._currentTime) / 1000;
            if (fTime > 0.25) fTime = 0.25;
            this._currentTime = newTime;
            this._accumulator += fTime;
            while (this._accumulator >= this._deltaTime) {
                //this.updateInputData();
                //this.changeScene();
                //this.updateScene();
                this._accumulator -= this._deltaTime;
            }
        }
        this.renderScene();
        this.requestUpdate();

        NTMO.DTE_Base.getTextBox().focus();
    };

    var _SceneManager_initialize = SceneManager.initialize;
    SceneManager.initialize        = function() {
        _SceneManager_initialize.apply(this, arguments);

        if(param.showManagementWindow){
            var gui = require('nw.gui');
            var win = gui.Window.get();//Get the current window
            win.on('loaded', function() {
                //Hack: Maybe these methods cause problems.
                var callDebugWindow = setInterval( function() {
                    if (DataManager.isDatabaseLoaded() && SceneManager.isCurrentSceneStarted()) {
                        clearInterval(callDebugWindow);
                        NTMO.DTE_Base.openDebugWindow();
                        console.log('Debug window is opend.');
                    }
                }, 100);
            }.bind(this));
        }
    };

    var _SceneManager_catchException = SceneManager.catchException;
    SceneManager.catchException        = function(e) {
        var errorCollection = new NTMO.DTE.PluginManager();
        errorCollection.createErrorPluginListElement(e);
        _SceneManager_catchException.apply(this, arguments);
    };

    var _SceneManager_onError = SceneManager.onError;
    SceneManager.onError = function(e) {
        var errorCollection = new NTMO.DTE.PluginManager();
        errorCollection.createErrorPluginListElement(e);
        _SceneManager_onError.apply(this, arguments);
    };

//=============================================================================
// Input
//  In the debug mode, interferes with key operation.
//=============================================================================

    var _Input_onKeyDown = Input._onKeyDown;
    Input._onKeyDown = function(event) {
        if(NTMO.DTE_Base.isTextBoxVisible()){
            return;
        }
        _Input_onKeyDown.call(this , event)
    };

    var _Input_onKeyUp = Input._onKeyUp;
    Input._onKeyUp = function(event) {
        if(NTMO.DTE_Base.isTextBoxVisible()){
            return;
        }
        _Input_onKeyUp.call(this , event)
    };

//=============================================================================
// DataManager
//  At the data loaded, debug windo must be refresh.
//=============================================================================
    var _DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function() {
        _DataManager_createGameObjects.call(this);
        
        NTMO.DTE_Base.reOpenDebugWindow();
    };


})();
