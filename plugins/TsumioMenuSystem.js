//=============================================================================
// TsumioMenuSystem.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.1.1 2017/10/12 バグ修正。背景設定・ウィンドウスキン設定・DestinationWindow.jsとの連携機能の追加。
// 1.1.0 2017/10/11 コンテンツの高さパラメーターの追加とコードの改善。
// 1.0.2 2017/10/10 バグ修正とコードの改善。
// 1.0.1 2017/10/10 バグ修正と設定項目の追加。
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
 * @param ShowChapterWindow
 * @type boolean
 * @desc This is a settings sets the whether or not to display the chapter window.
 * @default true
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
 * 
 * @param FaceSize
 * @type struct<Size>
 * @desc This is a settings sets the face size.INITIAL VALUE:105*30 FULL:144*144
 * @default {"width":"105","height":"30"}
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
 * @param ----背景の設定----
 * @desc 
 * @default 
 * 
 * @param MainBackgroundImage
 * @type file
 * @require 1
 * @desc This is a setting sets the main background image.
 * @dir img/tsumio
 * @default
 * 
 * @param MainBackgroundSettings
 * @type struct<Background>
 * @desc This is a setting sets the main background settings.If you set minus number in size, sets the screen size.
 *  * @default {"x":"0", "y":"0", "width":"-1", "height":"-1", "speedX":"0.00", "speedY":"0.00"}
 * 
 * @param SubBackgroundImage
 * @type file
 * @require 1
 * @desc This is a setting sets the main background image.
 * @dir img/tsumio
 * @default
 * 
 * @param SubBackgroundSettings
 * @type struct<Background>
 * @desc This is a setting sets the main background settings.If you set minus number in size, sets the screen size.
 *  * @default {"x":"0", "y":"0", "width":"-1", "height":"-1", "speedX":"0.00", "speedY":"0.00"}
 * 
 * @param ParticleImage
 * @type file
 * @require 1
 * @desc This is a setting sets the particle image.
 * @dir img/tsumio
 * @default
 * 
 * @param ParticleSettings
 * @type struct<Particle>
 * @desc This is a setting sets the particle settings.If you set minus number in size, sets the screen size.
 * @default {"x":"0", "y":"0", "width":"-1", "height":"-1", "speedX":"-1.00", "speedY":"1.00", "opacity":"150", "blendMode":"0"}
 * 
 * @param ParticleFlashing
 * @type boolean
 * @desc This is a setting sets whether to make the particles flashing.
 * @default true
 * 
 * @param ----Special Settings----
 * @desc 
 * @default 
 * 
 * @param Ratio
 * @type number[]
 * @max 1
 * @decimals 2
 * @desc This is a settings sets the ratio of the characters placement in sub window.
 * @default ["0.00", "0.35", "0.70"]
 * 
 * @param LineHeight
 * @type struct<LineHeight>
 * @desc This is a settings sets the line height of the status window contents.The larger the number, displayed in lower.
 * @default {"class":"-1", "face":"0", "name":"1", "level":"2", "icons":"2", "hp":"3", "mp":"4", "tp":"5", "exp":"6"}
 * 
 * @param WindowSkin
 * @type struct<WindowSkin>
 * @desc This is a settings sets the skin of the each window.
 * @default {"command":"", "status":"", "chapter":"", "tips":"", "info":""}
 * 
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
 * You can hide chapter windows from v1.0.1.
 * When the chapter window is hidden., the windows are displayed in a stuffed state by the height of the chapter window set by the parameter.
 * At this time, the window to be enlarged is the chips window and the information window.
 * If you want to enlarge the status window, change the height of the status window with the plugin parameter.
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
 * ----collaboration with DestinationWindow.js----
 * This plugin supports collaboration with DestinationWindow.js created by Triacontane.
 * Enter "[Destination]" as the content of option and get destination.
 * 
 * 参考URL：https://raw.githubusercontent.com/triacontane/RPGMakerMV/master/DestinationWindow.js
 * 
 * Reference：https://raw.githubusercontent.com/triacontane/RPGMakerMV/master/Chronus.js
 * 
 * ----line height----
 * By setting "LineHeight" of the plugin parameter, you can change the height of the display contents in the status window.
 * The larger the number, displayed in lower.
 * In addition, the height is not specified in pixels but in line units.
 * 
 * ----background and particle----
 * You can set background images and particles.
 * The sub background is displayed above the main background.
 * By changing the speed of the X axis and the Y axis, it is possible to move the image while looping it.
 * 
 * ----window skin----
 * If you do not set the window skin, the standard window skin will be applied.
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
 * 1.1.1 2017/10/12 Bug fix.Added background settings, window skin settings, collaboration function with DestinationWindow.js.
 * 1.1.0 2017/10/11 Added line height parameter and code improvement.
 * 1.0.2 2017/10/10 Bug fix and code improvement.
 * 1.0.1 2017/10/10 Bug fix and added plugin parameters.
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
 * @param 章ウィンドウを表示する
 * @type boolean
 * @desc 章ウィンドウを表示するかどうかを設定します。
 * @default true
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
 * 
 * @param 顔グラフィックのサイズ
 * @type struct<Size>
 * @desc 顔グラフィックのサイズを設定します。初期値:105*30 フルサイズ:144*144
 * @default {"width":"105","height":"30"}
 * 
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
 * 
 * @param ----背景の設定----
 * @desc 
 * @default 
 * 
 * @param メイン背景の画像
 * @type file
 * @require 1
 * @desc メイン背景の画像を設定します。
 * @dir img/tsumio
 * @default
 * 
 * @param メイン背景の設定
 * @type struct<Background>
 * @desc メイン背景の設定を設定します。幅と高さにマイナスの値を設定すると、スクリーンサイズが代入されます。
 * @default {"x":"0", "y":"0", "width":"-1", "height":"-1", "speedX":"0.00", "speedY":"0.00"}
 * 
 * @param サブ背景の画像
 * @type file
 * @require 1
 * @desc メイン背景の画像を設定します。
 * @dir img/tsumio
 * @default
 * 
 * @param サブ背景の設定
 * @type struct<Background>
 * @desc メイン背景の設定を設定します。幅と高さにマイナスの値を設定すると、スクリーンサイズが代入されます。
 * @default {"x":"0", "y":"0", "width":"-1", "height":"-1", "speedX":"0.00", "speedY":"0.00"}
 * 
 * @param パーティクルの画像
 * @type file
 * @require 1
 * @desc パーティクルの画像を設定します。
 * @dir img/tsumio
 * @default
 * 
 * @param パーティクルの設定
 * @type struct<Particle>
 * @desc パーティクルの設定を設定します。幅と高さにマイナスの値を設定すると、スクリーンサイズが代入されます。
 * @default {"x":"0", "y":"0", "width":"-1", "height":"-1", "speedX":"-1.00", "speedY":"1.00", "opacity":"150", "blendMode":"0"}
 * 
 * @param パーティクルの点滅
 * @type boolean
 * @desc パーティクルを点滅させるかどうかを設定します。
 * @default true
 * 
 * @param ----特殊な設定----
 * @desc 
 * @default 
 * 
 * @param 比率
 * @type number[]
 * @max 1
 * @decimals 2
 * @desc サブウィンドウ内における文字列の配置の比率を設定します。
 * @default ["0.00", "0.35", "0.70"]
 * 
 * @param コンテンツの高さ
 * @type struct<LineHeight>
 * @desc ステータスウィンドウ内のコンテンツの高さを設定します。数字が大きいほど下に表示されます。
 * @default {"class":"-1", "face":"0", "name":"1", "level":"2", "icons":"2", "hp":"3", "mp":"4", "tp":"5", "exp":"6"}
 * 
 * @param ウィンドウスキン
 * @type struct<WindowSkin>
 * @desc 各ウィンドウのスキンを設定します。
 * @default {"command":"", "status":"", "chapter":"", "tips":"", "info":""}
 * 
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
 * v1.0.1より、章ウィンドウの非表示が可能になりました。
 * 章ウィンドウを非表示にした場合、パラメーターで設定した章ウィンドウの高さ分だけウィンドウが詰めて表示されます。
 * このとき、拡大されるウィンドウはチップスウィンドウと情報ウィンドウです。
 * ステータスウィンドウを拡大したい場合はプラグインパラメーターでステータスウィンドウの高さを変更してください。
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
 * 【DestinationWindow.jsとの連携】
 * 当プラグインはトリアコンタンさんが制作したDestinationWindow.jsとの連携をサポートしています。
 * オプションの内容に「[Destination]」と入力すると、設定した行動目標をを取得します。
 * 
 * 参考URL：https://raw.githubusercontent.com/triacontane/RPGMakerMV/master/DestinationWindow.js
 * 
 *【コンテンツの高さ】
 * プラグインパラメーターのコンテンツの高さを設定すると、ステータスウィンドウにおける表示内容の高さを変更することができます。
 * 数字を大きくすれば大きくするほど表示内容は下に表示されます。
 * なお、高さはピクセルで指定するのではなく行単位です。
 * 
 * 【背景画像とパーティクル】
 * 背景画像とパーティクルを設定することができます。
 * サブ背景はメイン背景よりも上に表示されます。
 * X軸Y軸のスピードを変更することにより、画像をループさせて移動させることもできます。
 * 
 * 【ウィンドウスキン】
 * ウィンドウスキンを設定しない場合、標準のウィンドウスキンが適用されます。
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
 * 1.1.1 2017/10/12 バグ修正。背景設定・ウィンドウスキン設定・DestinationWindow.jsとの連携機能の追加。
 * 1.1.0 2017/10/11 コンテンツの高さパラメーターの追加とコードの改善。
 * 1.0.2 2017/10/10 バグ修正とコードの改善。
 * 1.0.1 2017/10/10 バグ修正と設定項目の追加。
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
/*~struct~Size:
 *
 * @param width
 * @type number
 * @desc 幅(width).
 * 
 * @param height
 * @type number
 * @desc 高さ(height).
 */
/*~struct~Background:
 *
 * @param x
 * @type number
 * @min -2000
 * @max 2000
 * @desc X座標(X coordinate).
 * 
 * @param y
 * @type number
 * @min -2000
 * @max 2000
 * @desc Y座標(Y coordinate).
 * 
 * @param width
 * @type number
 * @min -2000
 * @max 2000
 * @desc 幅(width).
 * 
 * @param height
 * @type number
 * @min -2000
 * @max 2000
 * @desc 高さ(height).
 * 
 * @param speedX
 * @type number
 * @min -255
 * @max 255
 * @decimals 2
 * @desc X軸のスピード(The speed of the X direction).
 * 
 * @param speedY
 * @type number
 * @min -255
 * @max 255
 * @decimals 2
 * @desc Y軸のスピード(The speed of the Y direction).
 * 
 */
/*~struct~Particle:
 *
 * @param x
 * @type number
 * @min -2000
 * @max 2000
 * @desc X座標(X coordinate).
 * 
 * @param y
 * @type number
 * @min -2000
 * @max 2000
 * @desc Y座標(Y coordinate).
 * 
 * @param width
 * @type number
 * @min -2000
 * @max 2000
 * @desc 幅(width).
 * 
 * @param height
 * @type number
 * @min -2000
 * @max 2000
 * @desc 高さ(height).
 * 
 * @param speedX
 * @type number
 * @min -255
 * @max 255
 * @decimals 2
 * @desc X軸のスピード(The speed of the X direction).
 * 
 * @param speedY
 * @type number
 * @min -255
 * @max 255
 * @decimals 2
 * @desc Y軸のスピード(The speed of the Y direction).
 * 
 * @param opacity
 * @type number
 * @max 255
 * @desc 透明度(opacity).
 * 
 * @param blendMode
 * @type number
 * @max 3
 * @desc ブレンドモード(blend mode).0：通常 1：加算 2：乗算 3：スクリーン(0:Normal 1:Addition 2:Multiplication 3:Screen).
 * 
 */
/*~struct~LineHeight:
 * 
 * @param class
 * @type number
 * @min -255
 * @max 255
 * @desc 職業(class).
 * 
 * @param face
 * @type number
 * @min -255
 * @max 255
 * @desc 顔グラフィック(face).
 * 
 * @param name
 * @type number
 * @min -255
 * @max 255
 * @desc 名前(name).
 * 
 * @param level
 * @type number
 * @min -255
 * @max 255
 * @desc レベル(level).
 * 
 * @param icons
 * @type number
 * @min -255
 * @max 255
 * @desc アイコン(icons).
 * 
 * @param hp
 * @type number
 * @min -255
 * @max 255
 * @desc HP.
 * 
 * @param mp
 * @type number
 * @min -255
 * @max 255
 * @desc MP.
 * 
 * @param tp
 * @type number
 * @min -255
 * @max 255
 * @desc TP.
 * 
 * @param exp
 * @type number
 * @min -255
 * @max 255
 * @desc 経験値(exp).
 */
/*~struct~WindowSkin:
 *
 * @param command
 * @type file
 * @require 1
 * @desc コマンドウィンドウのスキン(The skin of the command window).
 * @dir img/tsumio
 * 
 * @param status
 * @type file
 * @require 1
 * @desc ステータスウィンドウのスキン(The skin of the status window).
 * @dir img/tsumio
 * 
 * @param chapter
 * @type file
 * @require 1
 * @desc 章ウィンドウのスキン(The skin of the chapter window).
 * @dir img/tsumio
 * 
 * @param tips
 * @type file
 * @require 1
 * @desc チップスウィンドウのスキン(The skin of the tips window).
 * @dir img/tsumio
 * 
 * @param info
 * @type file
 * @require 1
 * @desc 情報ウィンドウのスキン(The skin of the info window).
 * @dir img/tsumio
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
    param.menuRows         = getParamNumber(['MenuRows', 'メニューの行数']);
    param.menuMaxCols      = getParamNumber(['MenuMaxCols', 'メニューの最大列数']);
    param.shouldUseChapWin = getParamString(['ShowChapterWindow', '章ウィンドウを表示する']);
    param.chapWinHeight    = getParamNumber(['ChapterWindowHeight', '章ウィンドウの高さ']);
    param.statusWinHeight  = getParamNumber(['StatusWindowHeight', 'ステータスウィンドウの高さ']);
    param.faceSize         = getParamString(['FaceSize', '顔グラフィックのサイズ']);
    param.subWinfontSize   = getParamNumber(['SubWIndowsFontSize', 'サブウィンドウのフォントサイズ']);
    param.statusMaxCols    = getParamNumber(['StatusMaxCols', 'ステータスの最大列数']);
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
    //Background Settings
    param.mainBackImg     = getParamString(['MainBackgroundImage', 'メイン背景の画像']);
    param.mainBackSet     = getParamString(['MainBackgroundSettings', 'メイン背景の設定']);
    param.subBackImg      = getParamString(['SubBackgroundImage', 'サブ背景の画像']);
    param.subBackSet      = getParamString(['SubBackgroundSettings', 'サブ背景の設定']);
    param.particleImg     = getParamString(['ParticleImage', 'パーティクルの画像']);
    param.particleSet     = getParamString(['ParticleSettings', 'パーティクルの設定']);
    param.particleFlash   = getParamString(['ParticleFlashing', 'パーティクルの点滅']);
    //Special Settings
    param.ratio           = getParamString(['Ratio', '比率']);
    param.lineHeight      = getParamString(['LineHeight', 'コンテンツの高さ']);
    param.windowSkin      = getParamString(['WindowSkin', 'ウィンドウスキン']);


////==============================
//// Convert parameters.
////==============================
    param.ratio    = convertParam(param.ratio);
    param.textHelp = convertParam(param.textHelp);
    param.faceSize = convertParam(param.faceSize);
    param.shouldUseChapWin = convertParam(param.shouldUseChapWin);
    param.lineHeight       = convertParam(param.lineHeight);
    param.windowSkin       = convertParam(param.windowSkin);
    param.mainBackSet      = convertParam(param.mainBackSet);
    param.subBackSet       = convertParam(param.subBackSet);
    param.particleSet      = convertParam(param.particleSet);
    param.particleFlash    = convertParam(param.particleFlash);
////==============================
//// Convert to Number.
////==============================
    param.faceSize    = convertToNumber(param.faceSize);
    param.lineHeight  = convertToNumber(param.lineHeight);
    param.mainBackSet = convertToNumber(param.mainBackSet);
    param.subBackSet  = convertToNumber(param.subBackSet);
    param.particleSet = convertToNumber(param.particleSet);

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

////==============================
//// Add tsumio folder to ImageManager.
////==============================
    ImageManager.loadTsumio = function(filename) {
        return this.loadBitmap('img/tsumio/', filename, 0, true);
    };

////==============================
//// Scene_Boot
///   Override this class for loading images.
////==============================
    var _Scene_Boot_loadSystemWindowImage      = Scene_Boot.prototype.loadSystemWindowImage;
    Scene_Boot.prototype.loadSystemWindowImage = function() {
        _Scene_Boot_loadSystemWindowImage.call(this);

        //Addtional window images.
        if(param.windowSkin.command){
            ImageManager.loadTsumio(param.windowSkin.command);
        }
        if(param.windowSkin.status){
            ImageManager.loadTsumio(param.windowSkin.status);
        }
        if(param.windowSkin.chapter){
            ImageManager.loadTsumio(param.windowSkin.chapter);
        }
        if(param.windowSkin.tips){
            ImageManager.loadTsumio(param.windowSkin.tips);
        }
        if(param.windowSkin.info){
            ImageManager.loadTsumio(param.windowSkin.info);
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

        static isNumberMinus(num) {
            if(num < 0){
                return true;
            }
            return false;
        }

        static convertBackgroundWidth(num) {
            if(this.isNumberMinus(num)){
                return Graphics.width; 
            }else{
                return num;
            }
        }

        static convertBackgroundHeight(num) {
            if(this.isNumberMinus(num)){
                return Graphics.height; 
            }else{
                return num;
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

        /*
          Note : Create Particle.
          Should be created with createBackground() or here.
          I can not decide which is better.
        */
        //this.createParticle();

        //Hide unnecessary window.
        this.hideUnnecessaryWindows();

        //Reset and refresh windows position.
        this.resetWindowsPosAndSize();
        this.refreshWindow_TMS();

        //Add eventListener.
        this.addEventListenerToCommandWindow();
        this.addEventListenerToStatusWindow();
    };

    var _Scene_Menu_update      = Scene_Menu.prototype.update;
    Scene_Menu.prototype.update = function() {
        _Scene_Menu_update.call(this);

        this.scrollBackImages.update();
        this.particleImage.update();
    };
    
    var _Scene_Menu_createBackground      = Scene_Menu.prototype.createBackground;
    Scene_Menu.prototype.createBackground = function() {
        _Scene_Menu_createBackground.call(this);

        this.createScrollBackground();
        this.createParticle();//Refer -> Note : Create Particle.
    };

    Scene_Menu.prototype.createScrollBackground = function() {
        //Initialize background settings.
        var main_x      = param.mainBackSet.x;
        var main_y      = param.mainBackSet.y;
        var main_width  = NTMO.TMS.Base.convertBackgroundWidth(param.mainBackSet.width);
        var main_height = NTMO.TMS.Base.convertBackgroundHeight(param.mainBackSet.height);
        var sub_x       = param.subBackSet.x;
        var sub_y       = param.subBackSet.y;
        var sub_width   = NTMO.TMS.Base.convertBackgroundWidth(param.subBackSet.width);
        var sub_height  = NTMO.TMS.Base.convertBackgroundHeight(param.subBackSet.height);

        //Create scrolling background.You should 'move()' each image, if you want to draw a certain range.
        this.scrollBackImages = new ScrollBackImages(this, param.mainBackImg, param.subBackImg);
        this.scrollBackImages.setMainSpeed(param.mainBackSet.speedX, param.mainBackSet.speedY);
        this.scrollBackImages.setSubSpeed(param.subBackSet.speedX, param.subBackSet.speedY);
        this.scrollBackImages.moveMainSprite(main_x, main_y, main_width, main_height);
        this.scrollBackImages.moveSubSprite(sub_x, sub_y, sub_width, sub_height);
    };

    Scene_Menu.prototype.createParticle = function() {
        //Initialize particle settings.
        var fileName    = param.particleImg;
        var opacity     = param.particleSet.opacity;
        var blendMode   = param.particleSet.blendMode;
        var flashing    = param.particleFlash;
        var x           = param.particleSet.x;
        var y           = param.particleSet.y;
        var width       = NTMO.TMS.Base.convertBackgroundWidth(param.particleSet.width);
        var height      = NTMO.TMS.Base.convertBackgroundHeight(param.particleSet.height);

        //Create particle.You should 'move()' each image, if you want to draw a certain range.
        this.particleImage = new ParticleImage(this, fileName, opacity, blendMode, flashing);
        this.particleImage.setSpeed(param.particleSet.speedX, param.particleSet.speedY);
        this.particleImage.moveSprite(x, y, width, height);
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

    Scene_Menu.prototype.hideUnnecessaryWindows = function() {
        this._goldWindow.hide();
        if(!param.shouldUseChapWin){
            this._chapterWindow.hide();
            //Adjust the position of other windows by setting the height to 0.
            this._chapterWindow.height = 0;
        }
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
            yield count;
        }
    };

    var _Scene_Menu_onFormationOk      = Scene_Menu.prototype.onFormationOk;
    Scene_Menu.prototype.onFormationOk = function() {
        _Scene_Menu_onFormationOk.call(this);
        
        //HACK: Not best answer.But anyway works.
        //This is a process to guard SVActors from flickering.
        //See the "onFormationCancel()".
        var count = this._genSwapSVActors.next();
        if(count.value >= 2){
            this._genSwapSVActors = this.genSkipFirstCalling(this._statusWindow.swapSVActors.bind(this._statusWindow));
        }
    };

    var _Scene_Menu_onFormationCancel      = Scene_Menu.prototype.onFormationCancel;
    Scene_Menu.prototype.onFormationCancel = function() {
        _Scene_Menu_onFormationCancel.call(this);

        //HACK: Not best answer.But anyway works.
        //This is a process to guard SVActors from flickering.
        //See the "onFormationOk()".
        this._genSwapSVActors = this.genSkipFirstCalling(this._statusWindow.swapSVActors.bind(this._statusWindow));
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

    Window_MenuCommand.prototype.loadWindowskin = function() {
        if (param.windowSkin.command) {
            this.windowskin = ImageManager.loadTsumio(param.windowSkin.command);
        } else {
            Window_Base.prototype.loadWindowskin.call(this);
        }
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

    Window_MenuStatus.prototype.loadWindowskin = function() {
        if (param.windowSkin.status) {
            this.windowskin = ImageManager.loadTsumio(param.windowSkin.status);
        } else {
            Window_Base.prototype.loadWindowskin.call(this);
        }
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

    var _Window_MenuStatus_update = Window_MenuStatus.prototype.update;
    Window_MenuStatus.prototype.update = function() {
        _Window_MenuStatus_update.call(this);
        this.sVActors.update();
    };

    var _Window_MenuCommand_createContents = Window_MenuCommand.prototype.createContents;
    Window_MenuStatus.prototype.createContents = function() {
        _Window_MenuCommand_createContents.call(this);
        this.sVActors = new SVActors(this, this.lineHeight(), this.getCorrectY());
    };

    Window_MenuStatus.prototype.modifySVActorsVisible = function() {
        this.sVActors.modifyVisible();
    };

    Window_MenuStatus.prototype.swapSVActors = function() {
        Debug.log('swapSVActors()でswap発生');
        this.sVActors.swap();
    };

    //If do not use chapter window, lower the contents of the status window by the height of the chapter window.
    Window_MenuStatus.prototype.getCorrectY = function() {
        var initHeight = 290;
        return this.height - initHeight;
        /*
          [Obsolete]
          return (param.shouldUseChapWin) ? 0 : this.height-initHeight;
          WHY : When user shows chapter window, the contents position will be corrupted.
                Should simply return "this.height - initHeight".
        */
    };

    //Override.
    Window_MenuStatus.prototype.drawItem = function(index) {
        if(index < this.topIndex()){
            //HACK: This is for not drawing unnecessary actor.
            //But I think there is a better solution.
            return;
        }
        var correctY   = this.getCorrectY();

        //Draw all contents.
        this.drawItemBackground(index);
        this.drawFaceImage(index, correctY);
        this.drawUpperArea(index, correctY);
        this.drawLowerArea(index, correctY);
    };

    Window_MenuStatus.prototype.drawFaceImage = function(index, correctY) {
        var actor  = $gameParty.members()[index];
        var rect   = this.itemRect(index);
        var width  = param.faceSize.width;
        var height = param.faceSize.height;
        var margin = 5;
        var lineHeight = this.lineHeight() * param.lineHeight.face;
        var y      = rect.y + margin + correctY + lineHeight;
        this.changePaintOpacity(actor.isBattleMember());
        this.drawActorFace(actor, rect.x + margin, y, width, height);
        this.changePaintOpacity(true);
    };

    Window_MenuStatus.prototype.drawUpperArea = function (index, yCorrect) {
        var actor      = $gameParty.members()[index];
        var rect       = this.itemRect(index);
        var x          = rect.x;
        var y          = rect.y + yCorrect;
        var width      = rect.width;
        var lineHeight = this.lineHeight();
        var margin     = 10;
        var levelWidth = this.drawActorLevelTMS(actor, x, y + lineHeight * param.lineHeight.level, width);
        this.drawActorClass(actor, x, y + lineHeight * param.lineHeight.class, width);
        this.drawActorName(actor, x, y + lineHeight * param.lineHeight.name, width);
        this.drawActorIcons(actor, levelWidth + margin, y + lineHeight * param.lineHeight.icons, width);
    };

    Window_MenuStatus.prototype.drawLowerArea = function (index, yCorrect) {
        var actor      = $gameParty.members()[index];
        var rect       = this.itemRect(index);
        var lineHeight = this.lineHeight();
        var width      = rect.width;
        var x = rect.x;
        this.drawActorHp(actor, x, yCorrect + lineHeight * param.lineHeight.hp,  width);
        this.drawActorMp(actor, x, yCorrect + lineHeight * param.lineHeight.mp,  width);
        this.drawTpPoint(actor, x, yCorrect + lineHeight * param.lineHeight.tp,  width);
        this.drawNextExp(index, x, yCorrect + lineHeight * param.lineHeight.exp, width);
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
        this.drawText('EXP', x, lineHeight, expWidth,'left');
        this.resetTextColor();
        this.drawText(requiredPercent, numY, lineHeight, numWidth, 'right');
        this.changeTextColor(this.systemColor());
        this.drawText('%', x + rect.width - perWidth, lineHeight, perWidth, 'right');
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
            return this.calcAppropriateMaxExpExpression();
        }else{
            var pow          = Math.pow(10, 2);
            var remainingPer = 100 - (requiredExp / (nextLevelExp - previousLevelExp) * 100)//The remaining percentage
            return Math.floor(remainingPer * pow) / pow;
        }
    };

    Window_MenuStatus.prototype.calcAppropriateMaxExpExpression = function () {
        var rectWidth = this.itemWidth();
        var textMax   = '-------';
        var maxWidth  = this.textWidth(textMax);
        var textExp   = 'Exp%';
        var expWidth  = this.textWidth(textExp);
        if(maxWidth+expWidth > rectWidth){ 
            return '---';
        }else {
            return textMax;
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

    NTMO.TMS.Window_Chapter.prototype.loadWindowskin = function() {
        if (param.windowSkin.chapter) {
            this.windowskin = ImageManager.loadTsumio(param.windowSkin.chapter);
        } else {
            Window_Base.prototype.loadWindowskin.call(this);
        }
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

    NTMO.TMS.Window_Tips.prototype.loadWindowskin = function() {
        if (param.windowSkin.tips) {
            this.windowskin = ImageManager.loadTsumio(param.windowSkin.tips);
        } else {
            Window_Base.prototype.loadWindowskin.call(this);
        }
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

    NTMO.TMS.Window_Info.prototype.loadWindowskin = function() {
        if (param.windowSkin.info) {
            this.windowskin = ImageManager.loadTsumio(param.windowSkin.info);
        } else {
            Window_Base.prototype.loadWindowskin.call(this);
        }
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
        this.drawInfoText(param.charsFortune, $gameParty.gold()+' \\G', x, false, locationWidth, fortuneWidth);
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
        var op1Text = this.tryToParse(param.op1Contents);
        var op2Text = this.tryToParse(param.op2Contents);
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

    NTMO.TMS.Window_Info.prototype.tryToParse = function(data) {
        data = this.tryToParseChronus(data);
        data = this.tryToParseDestination(data);

        return data;
    };

    NTMO.TMS.Window_Info.prototype.tryToParseDestination = function(data) {
        if(data !== '[Destination]'){
            //When data is not Destination, return data as is. 
            Debug.log('Dest:parse不実行');
            return data;
        }

        if('getDestination' in $gameSystem){
            Debug.log('Dest:parse実行');
            return $gameSystem.getDestination().trim();
        }else{
            return 'Destination is not found.';
        }
    };

    NTMO.TMS.Window_Info.prototype.tryToParseChronus = function(data) {
        if(data !== '[Chronus1]' && data !== '[Chronus2]'){
            //When data is not Chronus, return data as is. 
            Debug.log('Chronus:parse不実行');
            return data;
        }

        if('Game_Chronus' in window){
            //Collaborate with Chronus and acquire time data.
            //1 is Years etc.2 is 24hours.
            Debug.log('Chronus:parse実行');
            return (data==='[Chronus1]') ? $gameSystem.chronus().getDateFormat(1) : $gameSystem.chronus().getDateFormat(2);
        }else{
            return 'Chronus is not found.';
        }
    };

////=============================================================================
//// SVActors
////  This is a wrapper class of the side view actor.
////=============================================================================
    class SVActors {
        /**
         * @param {Window_Base} parent
         * @param {number} lineHeight
         * @param {number} correctY
         */
        constructor(parent, lineHeight, correctY) {
            this._parent      = parent;//Parent window.
            this._lineHeight  = lineHeight;
            this._correctY    = correctY;
            this._sprites     = [];

            this.create();
        }

        get parent() {
            return this._parent;
        }

        get lineHeight() {
            return this._lineHeight;
        }

        get correctY() {
            //8 is usually correction.
            return this._correctY+8;
        }

        get sprites() {
            return this._sprites;
        }

        create() {
            if(!this._canDraw()){
                return;
            }
    
            $gameParty.members().forEach(function(actor, i) {
                this.sprites[i] = new Sprite_Actor(actor);
                this.sprites[i].setBattler(actor);
                this.sprites[i].startMotion(NTMO.TMS.Base.getActorState(actor));
                this.parent.addChild(this.sprites[i]);
            }, this);
        }

        /**
         * Modify side view actors.Show and hide.
         * @param {number} topIndex
         */
        modifyVisible() {
            if(!this._canDraw()){
                return;
            }

            var topIndex = this.parent.topIndex();
    
            this.sprites.forEach(function(element, index) {
                if((index >= topIndex) && (index <= topIndex+this.parent.maxCols()-1)){
                    //When window contains the Actor.
                    element.show();
                }else{
                    //Not contains the Actor.Actor is next(or else) page.
                    element.hide();
                }
            }, this);
        }

        update() {
            if(!this._canDraw()){
                return;
            }
    
            var padding    = 20;
            //If do not use chapter window, lower the contents of the status window by the height of the chapter window.
            var y     = this.lineHeight*2 + this.correctY;
    
            $gameParty.members().forEach(function(actor, i) {
                var rect = this.parent.itemRect(i);
                this.sprites[i].startMotion(NTMO.TMS.Base.getActorState(actor));
                this.sprites[i].x = rect.x + rect.width - padding;
                this.sprites[i].y = y;
            }, this);
        }

        swap() {
            if(!this._canDraw()){
                return;
            }
    
            this.sprites.forEach(function(element, index) {
                this.parent.removeChild(element);
            }, this);
            
            this.create();
            this.modifyVisible();
        }

        /**
         * This methos is private.
         * @return {boolean}
         */
        _canDraw() {
            return $dataSystem.optSideView;
        }
    };

////=============================================================================
//// ScrollBackImages
////  This class is for scrolling back image.
////=============================================================================
    class ScrollBackImages {

        /**
         * @param {Scene_Base} parent
         * @param {string} mainFileName
         * @param {string} subFileName
         */
        constructor(parent, mainFileName, subFileName) {
            this.initialize.apply(this, arguments);
        }

        initialize(parent, mainFileName, subFileName) {
            //Initialize
            this._parent         = parent;//parent scene.
            this._backMainSprite = null;
            this._backSubSprite  = null;
            this._mainSpeedX     = 0;
            this._mainSpeedY     = 0;
            this._subSpeedX      = 0;
            this._subSpeedY      = 0;
            this._mainFileName   = mainFileName;
            this._subFileName    = subFileName;

            //Create.
            this.createSprites();
            this.moveMainSprite(0, 0, Graphics.width, Graphics.height);
            this.moveSubSprite(0, 0, Graphics.width, Graphics.height);
        }

        get mainFileName() {
            if(this._mainFileName){
                return this._mainFileName;
            }
            return null;
        }

        get subFileName() {
            if(this._subFileName){
                return this._subFileName;
            }
            return null;
        }

        get parent() {
            return this._parent;
        }

        createSprites() {
            //Create.
            this._backMainSprite = new TilingSprite(ImageManager.loadTsumio(this.mainFileName));
            this._backSubSprite  = new TilingSprite(ImageManager.loadTsumio(this.subFileName));
            //AddChild.
            this.parent.addChild(this._backMainSprite);
            this.parent.addChild(this._backSubSprite);
        }

        moveMainSprite(x, y, width, height) {
            this._backMainSprite.move(x, y, width, height);
        }

        moveSubSprite(x, y, width, height) {
            this._backSubSprite.move(x, y, width, height);
        }

        setMainSpeed(speedX, speedY) {
            this._mainSpeedX = (isFinite(speedX)) ? speedX : 0;
            this._mainSpeedY = (isFinite(speedY)) ? speedY : 0;
        }

        setSubSpeed(speedX, speedY) {
            this._subSpeedX = (isFinite(speedX)) ? speedX : 0;
            this._subSpeedY = (isFinite(speedY)) ? speedY : 0;
        }

        update() {
            this._updateOriginPosition();
        }

        _updateOriginPosition() {
            //Main.
            this._backMainSprite.origin.x += this._mainSpeedX;
            this._backMainSprite.origin.y += this._mainSpeedY;
            //Sub.
            this._backSubSprite.origin.x  += this._subSpeedX;
            this._backSubSprite.origin.y  += this._subSpeedY;
        }
    }

////=============================================================================
//// ParticleImage
////  This class implements particle image.
////=============================================================================
    class ParticleImage {
        
        /**
         * @param {Scene_Base} parent
         * @param {string} fileName
         * @param {number} opacity
         * @param {number} blendMode
         * @param {boolean} isFlashing
         */
        constructor(parent, fileName, opacity, blendMode, isFlashing) {
            this.initialize.apply(this, arguments);
        }

        initialize(parent, fileName, opacity, blendMode, isFlashing) {
            //Initialize basic settings.
            this._parent         = parent;//parent scene.
            this._particleSprite = null;
            this._speedX         = 0;
            this._speedY         = 0;
            this._fileName       = fileName;

            //Flashing settings.
            this._opacity        = Number(opacity);
            this._blendMode      = Number(blendMode);//0:Normal 1:Addition 2:Multiplication 3:Screen
            this._amp            = this._opacity / 2;//Wave amplitude
            this._phase          = 0;//Wave phase
            this._isFlashing     = isFlashing;

            //Create.
            this.createSprite();
            this.moveSprite(0, 0, Graphics.width, Graphics.height);
        }

        /**
         * CENTER_OPACITY is used to calculate flashing.
         */
        get CENTER_OPACITY() {
            return 127;// -> 255 / 2;
        }

        get fileName() {
            if(this._fileName){
                return this._fileName;
            }
            return null;
        }

        get parent() {
            return this._parent;
        }

        get blendMode() {
            return this._blendMode;
        }

        get opacity() {
            return this._opacity;
        }

        set opacity(value) {
            this._opacity = value;
        }

        createSprite() {
            //Create and set.
            this._particleSprite           = new TilingSprite(ImageManager.loadTsumio(this.fileName));
            this._particleSprite.blendMode = this.blendMode;
            this._particleSprite.opacity   = this.opacity;
            //AddChild.
            this.parent.addChild(this._particleSprite);
        }

        moveSprite(x, y, width, height) {
            this._particleSprite.move(x, y, width, height);
        }

        setSpeed(speedX, speedY) {
            this._speedX = (isFinite(speedX)) ? speedX : 0;
            this._speedY = (isFinite(speedY)) ? speedY : 0;
        }

        isFlashing() {
            return this._isFlashing;
        }

        /**
         * Count up wave phase for flashing.
         */
        wavePhaseCountUp() {
            this._phase++;
        }

        update() {
            this.updateOriginPosition();
            this.updateOpacity();
        }

        updateOriginPosition() {
            this._particleSprite.origin.x += this._speedX;
            this._particleSprite.origin.y += this._speedY;
        }

        updateOpacity() {
            if(this.isFlashing()){
                //Get new opacity.
                var d         = Math.sin(this._phase * Math.PI / 180);
                this.opacity  = d * this._amp + this.CENTER_OPACITY;
                this.wavePhaseCountUp();
                //Set new opacity.
                this._particleSprite.opacity = this.opacity;
            }
        }
    }

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
            return 'TsumioMenuSystem';
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

        static warn(args) {
            this._output('warn', arguments);
        }

        static error(args) {
            this._output('error', arguments);
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
