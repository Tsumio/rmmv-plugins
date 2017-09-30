//=============================================================================
// PreviouslyOnStory.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.1.2 2017/09/30 GitHubのアドレスを追加。
// 1.1.1 2017/09/02 ボイス再生機能に対応。
// 1.1.0 2017/08/26 振り返りシーンの追加と、不具合の修正。
// 1.0.2 2017/08/25 あらすじのセーブとロード機能の追加。
// 1.0.1 2017/08/24 いくつかの不具合の修正と、機能の追加（writeLineの拡張とデフォルトウィンドウの指定）。
// 1.0.0 2017/08/23 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc This plugin implement the synopsis function.
 * @author Tsumio
 *
 * @param ----Basic Settings----
 * @desc 
 * @default 
 * 
 * 
 * @param ShowPageNumber
 * @type boolean
 * @desc This is a setting whether to display the page number at the bottom of the screen.
 * @default true
 * 
 * @param ShowShowConfirmWindow
 * @type boolean
 * @desc This is a setting whether to display the confirm window.
 * @default true
 * 
 * @param FadeOutDuration
 * @type number
 * @max 1000
 * @min 1
 * @desc This is a setting the fade out duration when moving to the map scene.
 * @default 90
 * 
 * @param ShouldSkipWhenTextIsEmpty
 * @type boolean
 * @desc This is a setting wether to skip the scene when the text is empty.
 * @default true
 * 
 * @param ----Title Window Settings----
 * @desc 
 * @default 
 * 
 * @param TitleWindowSkin
 * @type file
 * @require 1
 * @desc This is a setting sets the skin of the title window.
 * @dir img/tsumio
 * @default
 * 
 * @param TitleWindowOpacity
 * @type number
 * @max 255
 * @desc This is a setting sets the opacity of the title window.
 * @default 255
 * 
 * @param TitleText
 * @type string
 * @desc This is a setting sets expressing 'previously on story'.
 * @default PreviouslyOnStory
 * 
 * @param TitleWindowHeight
 * @type number
 * @max 1000
 * @desc This is a setting sets the height of title window.
 * @default 80
 * 
 * 
 * @param ----Synopsis Window Settings----
 * @desc 
 * @default 
 * 
 * @param SynopsisWindowSkin
 * @type file
 * @require 1
 * @desc This is a setting sets the skin of the synopsis window.
 * @dir img/tsumio
 * @default
 * 
 * @param SynopsisWindowOpacity
 * @type number
 * @max 255
 * @desc This is a setting sets the opacity of the synopsis window.
 * @default 255
 * 
 * @param SynopsisTextOffsetX
 * @type number
 * @min -1000
 * @max 1000
 * @desc This is a setting sets the offset X of the synopsis text.
 * @default 0
 * 
 * @param SynopsisTextOffsetY
 * @type number
 * @min -1000
 * @max 1000
 * @desc This is a setting sets the offset Y of the synopsis text.
 * @default 0
 * 
 * 
 * @param ----Confirm Window Settings----
 * @desc 
 * @default 
 * 
 * @param ConfirmWindowSkin
 * @type file
 * @require 1
 * @desc This is a setting sets the skin of the confirm window.
 * @dir img/tsumio
 * @default
 * 
 * @param ConfirmWindowDescription
 * @type string
 * @desc This is a setting sets the description of the confirm window.
 * @default Do you read the synopsis ?
 * 
 * @param CharactersRepresentingYes
 * @type string
 * @desc This is a setting sets the characters representing 'YES'.
 * @default YES
 * 
 * @param CharactersRepresentingNo
 * @type string
 * @desc This is a setting sets the characters representing 'NO'.
 * @default NO
 * 
 * @param ConfirmWindowOpacity
 * @type number
 * @max 255
 * @desc This is a setting sets the opacity of the confirm window.
 * @default 255
 * 
 * @param ConfirmWindowOffsetX
 * @type number
 * @min -2000
 * @max 2000
 * @desc This is a setting sets the offset X of the confirm window.
 * @default 0
 * 
 * @param ConfirmWindowOffsetY
 * @type number
 * @min -2000
 * @max 2000
 * @desc This is a setting sets the offset Y of the confirm window.
 * @default 0
 * 
 * @param ----Background Settings----
 * @desc 
 * @default 
 * 
 * @param MainDrawingArea
 * @type number[]
 * @min -2000
 * @max 2000
 * @desc This is a setting sets the drawing area of the main background.The order is [x, y, width, heigh].If you set '-1' in size, sets the screen size.
 * @default ["0","0","-1","-1"]
 * 
 * @param MainBackgroundSpeedX
 * @type number
 * @min -255
 * @max 255
 * @decimals 2
 * @desc This is a setting sets the speed of the main background X direction.
 * @default 0
 * 
 * @param MainBackgroundSpeedY
 * @type number
 * @min -255
 * @max 255
 * @decimals 2
 * @desc This is a setting sets the speed of the main background Y direction.
 * @default 0
 * 
 * @param SubDrawingArea
 * @type number[]
 * @min -2000
 * @max 2000
 * @desc This is a setting sets the drawing area of the sub background.The order is [x, y, width, heigh].If you set '-1' in size, sets the screen size.
 * @default ["0","0","-1","-1"]
 * 
 * @param SubBackgroundSpeedX
 * @type number
 * @min -255
 * @max 255
 * @decimals 2
 * @desc This is a setting sets the speed of the sub background X direction.
 * @default 0
 * 
 * @param SubBackgroundSpeedY
 * @type number
 * @min -255
 * @max 255
 * @decimals 2
 * @desc This is a setting sets the speed of the sub background Y direction.
 * @default 0
 * 
 * @param ----Particle Settings----
 * @desc 
 * @default 
 * 
 * 
 * 
 * @param ParticleDrawingArea
 * @type number[]
 * @min -2000
 * @max 2000
 * @desc This is a setting sets the drawing area of the particle.The order is [x, y, width, heigh].If you set '-1' in size, sets the screen size.
 * @default ["0","0","-1","-1"]
 * 
 * @param ParticleSettings
 * @type number[]
 * @min -2000
 * @max 2000
 * @desc This is a setting sets the opacity and blend mode(0:Normal 1:Addition 2:Multiplication 3:Screen）.The order is [opacity, blendMode].  
 * @default ["255","0"]
 * 
 * 
 * @param ParticleFlashing
 * @type boolean
 * @desc This is a setting sets whether to make the particles flash.
 * @default true
 * 
 * @param ParticleScrollSpeedX
 * @type number
 * @min -255
 * @max 255
 * @decimals 2
 * @desc This is a setting sets the scroll X speed of the particle.
 * @default 0
 * 
 * @param ParticleScrollSpeedY
 * @type number
 * @min -255
 * @max 255
 * @decimals 2
 * @desc This is a setting sets the scroll Y speed of the particle.
 * @default 0
 * 
 * @param ----SE Settings----
 * @desc 
 * @default
 * 
 * @param NextSE
 * @desc This is a setting sets the SE when page goes the next.
 * @default Book1
 * @require 1
 * @dir audio/se/
 * @type file
 * 
 * @param NextSE_Volume
 * @type number
 * @desc This is a setting sets the volume when page goes the next.
 * @default 100
 * 
 * @param NextSe_Pitch
 * @type number
 * @desc This is a setting sets the pitch when page goes the next.
 * @default 100
 * 
 * @param PrevSE
 * @desc This is a setting sets the SE when page goes the prev.
 * @default Book2
 * @require 1
 * @dir audio/se/
 * @type file
 * 
 * @param PrevSE_Volume
 * @type number
 * @desc This is a setting sets the volume when page goes the prev.
 * @default 100
 * 
 * @param PrevSE_Pitch
 * @type number
 * @desc This is a setting sets the pitch when page goes the prev.
 * @default 100
 * 
 * @param ----Looking Back Scene Settings----
 * @desc 
 * @default 
 * 
 * @param UseLookingBackScene
 * @type boolean
 * @desc When turning on the switch, the LookingBackScene command is added to the menu scene.
 * @default true
 * 
 * @param LookingBackTitle
 * @type string
 * @desc This is a setting sets the title of the looking back scene.
 * @default The Results So Far
 * 
 * 
 * @param LookingBackTitleShortName
 * @type string
 * @desc This is a setting sets the title of the looking back scene in menu scene.
 * @default SoFar
 * 
 * @param LookingBackRows
 * @type number
 * @max 255
 * @desc This is a setting sets the rows of the window which looking back scene.Items to be displayed at once.
 * @default 3
 * 
 * @param LookingBackColumns
 * @type number
 * @max 255
 * @desc This is a setting sets the columns of the window which looking back scene.Items to be displayed at once.
 * @default 3
 * 
 * @param EachTitleColor
 * @type number
 * @max 255
 * @desc This is a setting sets the color of the looking back each title(Compliant with window image).
 * @default 1
 * 
 * @param LookingBackStringMaxLine
 * @type number
 * @max 255
 * @min 1
 * @desc This is a setting sets the max line of the string in looking back scene.
 * @default 3
 * 
 * @param LookingBackLineMaxString
 * @type number
 * @max 255
 * @min 4
 * @desc This is a setting sets the max characters of the line in looking back scene.
 * @default 16
 * 
 * @help This plugin implement the synopsis function.
 * 
 * ----feature----
 * -> When saving data is loaded, it will shift to the synopsis scene.
 * -> Synopsis can be registered from the plugin command.
 * -> Synopsis also can be registered from 'ShowText of EventCommand'.(v1.0.1）
 * -> Background and BGM settings can register from plugin commands.
 * -> You can execute the registered common event when saving data is loaded.
 * -> You can scroll background images and set particle image.
 * -> You can play voice data.(v1.1.1）
 * -> This plugin can operate with cursor keys and mouse.
 * -> This plugin also can operate with decision key and cancel key.
 * -> The saved synopsis can be read again with the LookingBack scene.(v1.1.0）
 * 
 * ----how to use----
 * You can use this plugin after setting some plugin parameters.
 * 
 * All images are loaded from "img\tsumio" folder.
 * Be sure to prepare necessary images in "img\tsumio" folder.
 * 
 * All voice data are loaded from "audio\se\voice" folder.
 * Be sure to prepare necessary voice data in "audio\se\voice" folder.
 * 
 * If minus is specified for the background image and particle speed, scroll backward.
 * 
 * 
 * ----plugin command----
 * 
 * All plugin commands start with "POS".
 * Plugin commands are distinguish uppercase and lowercase.
 * And separate each word with a space.
 * Please make sure.
 * 
 * Line breaks are possible with "\n" or a new "writeLine".
 * When using "\n", please make sure to insert a space between before and after.
 * 
 * "POS writeLine AddtionalString" : Add a string to the synopsis. It is also possible to use some control characters.
 * "POS newPage" : Add a new page to the synopsis. Subsequent writeLines are done for the new page.
 * "POS setMainBackground BackgroundName" : Set the image of the main background.
 * "POS setSubBackground BackgroundName" : Set the image of the sub background.
 * "POS setParticle ParticleName" : Set the image of the particle.
 * "POS setBgm FileName Volume Pitch" : Set up BGM.
 * "POS setPicture FileName XPosition YPosition Opacity" : Set up a picture.
 * "POS setAlign Align" : Set up the align of the strings."left" or "center" can be specified.
 * "POS reserveCommonEvent EventNumber" : Set the common event number to be executed after transitioning the map scene.
 * "POS setVoice VoiceFileName" : Set the voice playing the current page.
 * "POS clearAll" : Clear all settings in plugin command.
 * "POS clearTextAndPage" : Clear text and page settings.
 * "POS clearAllBackground" : Clear main background and sub background settings.
 * "POS clearParticle" : Clear particle settings.
 * "POS clearBgm" : Clear bgm settings.
 * "POS clearPicture" : Clear a picture settings.
 * "POS clearCommonEvent" : Clear common event settings.
 * "POS saveSynopsis FileName" : Save current synopsis data as FileName.If you don't set FileName, the index is given automatically.
 * "POS loadSynopsis FileName" : Load the saved synopsis data.
 * "POS getDataLength" : The number of saved synopsis data is output to the console screen (for debugging).
 * "POS initialize" : Delete all synopsis data.
 * 
 * ----about saving synopsis file----
 * Files saved by "POS saveSynopsis FileName" command can be read with "POS loadSynopsis FileName".
 * If you don't set FileName, the index is given automatically.
 * And, if a file with the same name already exists, it will be overwritten.
 * 
 * ----if an error occurs after plugin update----
 * If an error occurs after plugin update、please execute "POS initialize" from the plugin command.
 * All synopsis data will be deleted, but errors may not occur.
 * 
 * ----how to execute writeLine from 'ShowText of EventCommand'----
 * V1.0.1 or later, we can execute writeLine from 'ShowText of EventCommand'.
 * In the same way as showing text, launch the event command and enter "<POS>" anywhere on each line.
 * 
 * For example:
 * <POS>This is test message.
 * Te\I[1]st<POS>test test。
 * Position of tag POS is OK anywhere.<POS>
 * 
 * ----about looking back scene----
 * LookingBack scene dose not mean normal synopsis scene.These are different things.
 * Please note this point first.
 * 
 * It is possible to read the synopsis saved (command "POS saveSynopsis FileName") in the replay scene again.
 * The LookingBack scene can be displayed from the menu scene.
 * The background and particles of this LookingBack scene are applied to the current background and particle.
 * When you read the synopsis scene from LookingBack scene, the saved background and particles will be played back.
 * And, the function of the LookingBack scene can be turned off.
 * 
 * The title applied to the LookingBack scene is the saved name of the synopsis.
 * 
 * ----change log---
 * 1.1.1 2017/09/30 Add GitHub address.
 * 1.1.1 2017/09/02 Add the voice system.
 * 1.1.0 2017/08/26 Add the looking back scene sytem and fix some bugs.
 * 1.0.2 2017/08/25 Add the Saving and Loading system.
 * 1.0.1 2017/08/24 Fix some bugs and expand 'writeLine'.
 * 1.0.0 2017/08/23 Release
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
 * @plugindesc あらすじ機能を実装します。
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * @param ページ数を表示する
 * @type boolean
 * @desc 画面下部にページ数を表示するかどうかを設定します。
 * @default true
 * 
 * @param 確認ウィンドウを表示する
 * @type boolean
 * @desc 確認ウィンドウを表示するかどうかを設定します。
 * @default true
 * 
 * @param フェードアウトの時間
 * @type number
 * @max 1000
 * @min 1
 * @desc マップ画面へ移行する際のフェードアウトの時間を設定します。
 * @default 90
 * 
 * @param テキスト空白時にスキップ
 * @type boolean
 * @desc テキストが空白のとき、あらすじシーンをスキップするかどうかを設定します。
 * @default true
 * 
 * @param ----タイトルウィンドウの設定----
 * @desc 
 * @default 
 * 
 * @param タイトルウィンドウのスキン
 * @type file
 * @require 1
 * @desc タイトルウィンドウのスキンを設定します。
 * @dir img/tsumio
 * @default
 * 
 * @param タイトルウィンドウの透明度
 * @type number
 * @max 255
 * @desc タイトルウィンドウの透明度を設定します。
 * @default 255
 * 
 * @param あらすじを表す文字
 * @type string
 * @desc あらすじを表す文字を設定します。
 * @default これまでのあらすじ
 * 
 * 
 * @param タイトルウィンドウの高さ
 * @type number
 * @max 1000
 * @desc タイトルウィンドウの高さを設定します。
 * @default 80
 * 
 * 
 * @param ----あらすじウィンドウの設定----
 * @desc 
 * @default 
 * 
 * @param あらすじウィンドウのスキン
 * @type file
 * @require 1
 * @desc あらすじウィンドウのスキンを設定します。
 * @dir img/tsumio
 * @default
 * 
 * @param あらすじウィンドウの透明度
 * @type number
 * @max 255
 * @desc あらすじウィンドウの透明度を設定します。
 * @default 255
 * 
 * @param あらすじX座標のオフセット
 * @type number
 * @min -1000
 * @max 1000
 * @desc あらすじ文字列のX座標のオフセットを設定します。
 * @default 0
 * 
 * @param あらすじY座標のオフセット
 * @type number
 * @min -1000
 * @max 1000
 * @desc あらすじ文字列のY座標のオフセットを設定します。
 * @default 0
 * 
 * @param ----確認ウィンドウの設定----
 * @desc 
 * @default 
 * 
 * @param 確認ウィンドウのスキン
 * @type file
 * @require 1
 * @desc 確認ウィンドウのスキンを設定します。
 * @dir img/tsumio
 * @default
 * 
 * @param 確認ウィンドウの説明文
 * @type string
 * @desc 確認ウィンドウ内の説明文を設定します。
 * @default あらすじを読みますか？
 * 
 * @param 「はい」を表す文字
 * @type string
 * @desc 確認ウィンドウ内の「はい」を表す文字を設定します。
 * @default はい
 * 
 * @param 「いいえ」を表す文字
 * @type string
 * @desc 確認ウィンドウ内の「いいえ」を表す文字を設定します。
 * @default いいえ
 * 
 * @param 確認ウィンドウの透明度
 * @type number
 * @max 255
 * @desc あらすじウィンドウの透明度を設定します。
 * @default 255
 * 
 * @param 確認ウィンドウのX座標オフセット
 * @type number
 * @min -2000
 * @max 2000
 * @desc 確認ウィンドウのX座標のオフセットを設定します。
 * @default 0
 * 
 * @param 確認ウィンドウのY座標オフセット
 * @type number
 * @min -2000
 * @max 2000
 * @desc 確認ウィンドウのY座標のオフセットを設定します。
 * @default 0
 * 
 * @param ----背景の設定----
 * @desc 
 * @default 
 * 
 * @param メイン背景の描画領域
 * @type number[]
 * @min -2000
 * @max 2000
 * @desc メイン背景の描画領域を指定します。[x, y, width, heigh]の順。サイズに-1を指定した場合、スクリーンのサイズが代入されます。
 * @default ["0","0","-1","-1"]
 * 
 * @param メイン背景のX方向の速度
 * @type number
 * @min -255
 * @max 255
 * @decimals 2
 * @desc メイン背景のX方向の速度を設定します。
 * @default 0
 * 
 * @param メイン背景のY方向の速度
 * @type number
 * @min -255
 * @max 255
 * @decimals 2
 * @desc メイン背景のX方向の速度を設定します。
 * @default 0

 * @param サブ背景のX方向の速度
 * @type number
 * @min -255
 * @max 255
 * @decimals 2
 * @desc サブ背景のX方向の速度を設定します。
 * @default 0

 * @param サブ背景のY方向の速度
 * @type number
 * @min -255
 * @max 255
 * @decimals 2
 * @desc サブ背景のY方向の速度を設定します。
 * @default 0
 * 
 * @param サブ背景の描画領域
 * @type number[]
 * @min -2000
 * @max 2000
 * @desc サブ背景の描画領域を指定します。[x, y, width, heigh]の順。サイズに-1を指定した場合、スクリーンのサイズが代入されます。
 * @default ["0","0","-1","-1"]
 * 
 * 
 * @param ----パーティクルの設定----
 * @desc 
 * @default 
 * 
 * 
 * @param パーティクル画像の描画領域
 * @type number[]
 * @min -2000
 * @max 2000
 * @desc 画像の描画領域を指定します。[x, y, width, heigh]の順。サイズに-1を指定した場合、スクリーンのサイズが代入されます。
 * @default ["0","0","-1","-1"]
 * 
 * @param パーティクル画像の設定
 * @type number[]
 * @min -2000
 * @max 2000
 * @desc 画像の透明度とブレンドモード（0：通常 1：加算 2：乗算 3：スクリーン）を指定します。[opacity, blendMode]の順。 
 * @default ["255","0"]
 * 
 * 
 * @param パーティクル画像の点滅
 * @type boolean
 * @desc パーティクル画像を点滅させるかどうかを設定します。
 * @default true
 * 
 * @param パーティクル画像のX方向の速度
 * @type number
 * @min -255
 * @max 255
 * @decimals 2
 * @desc パーティクル画像の横方向の速度を設定します。
 * @default 0
 * 
 * @param パーティクル画像のY方向の速度
 * @type number
 * @min -255
 * @max 255
 * @decimals 2
 * @desc パーティクル画像のY方向の速度を設定します。
 * @default 0
 * 
 * @param ----SEの設定----
 * @desc 
 * @default
 * 
 * @param 進むSE
 * @desc ページが進んだときに再生されるSEを設定します。
 * @default Book1
 * @require 1
 * @dir audio/se/
 * @type file
 * 
 * @param 進むSE音量
 * @type number
 * @desc ページが進んだときに再生されるSEの音量を設定します。
 * @default 100
 * 
 * @param 進むSEピッチ
 * @type number
 * @desc ページが進んだときに再生されるSEのピッチを設定します。
 * @default 100
 * 
 * @param 戻るSE
 * @desc ページが戻ったときに再生されるSEを設定します。
 * @default Book2
 * @require 1
 * @dir audio/se/
 * @type file
 * 
 * @param 戻るSE音量
 * @type number
 * @desc ページが戻ったときに再生されるSEの音量を設定します。
 * @default 100
 * 
 * @param 戻るSEピッチ
 * @type number
 * @desc ページが戻ったときに再生されるSEのピッチを設定します。
 * @default 100
 * 
 * @param ----振り返りシーンの設定----
 * @desc 
 * @default 
 * 
 * @param 振り返りシーンを利用する
 * @type boolean
 * @desc スイッチをONにすると、メニュー画面に振り返りシーンコマンドが追加されます。
 * @default true
 * 
 * @param 振り返りシーンのタイトル
 * @type string
 * @desc 振り返りシーンのタイトルを設定します。
 * @default これまでの冒険
 * 
 * 
 * @param 振り返りシーンの短縮名
 * @type string
 * @desc メニュー画面で使用される、振り返りシーンの短縮名を設定します。
 * @default 振り返り
 * 
 * @param 振り返りシーンの行
 * @type number
 * @max 255
 * @desc 振り返りシーンのウィンドウに一度に表示するアイテムの行の数を設定します。
 * @default 3
 * 
 * @param 振り返りシーンの列
 * @type number
 * @max 255
 * @desc 振り返りシーンのウィンドウに一度に表示するアイテムの列の数を設定します。
 * @default 3
 * 
 * @param 各タイトルの色
 * @type number
 * @max 255
 * @desc 振り返りシーンの各タイトルに使用する色番号を設定します（ウィンドウ画像に準拠）。
 * @default 1
 * 
 * @param 振り返りシーン文字の最大行数
 * @type number
 * @max 255
 * @min 1
 * @desc 振り返りシーンに表示される文字列の最大行数を設定します。
 * @default 3
 * 
 * @param 振り返りシーン一行の最大文字数
 * @type number
 * @max 255
 * @min 4
 * @desc 振り返りシーンに表示される文字列の、一行あたりの最大文字数を設定します。
 * @default 8
 * 
 * @help あらすじ機能を実装します。
 * 
 * 【特徴】
 * ・セーブデータのロード時にあらすじシーンへ移行します。
 * ・あらすじはプラグインコマンドから登録できます。
 * ・イベントコマンドの「文章の表示」からも登録できるようになりました。(v1.0.1以降）
 * ・背景やBGMなどの設定もプラグインコマンドを通じておこないます。
 * ・登録していたコモンイベントを、セーブデータのロード時に実行できます。
 * ・背景画像をスクロールさせたり、パーティクル画像を設定することができます。
 * ・ボイスの再生も可能です(v1.1.1以降）
 * ・カーソルキーおよびマウスでの操作OK。
 * ・決定キーやキャンセルキーでの操作もOK。
 * ・セーブしたあらすじは、振り返りシーンで再度読み込むことが可能です。(v1.1.0以降）
 * 
 * 【使用方法】
 * プラグインの導入後、プラグインパラメーターを設定することによって使用できます。
 * 
 * 全ての画像は「img/tsumio」フォルダから読み込まれます。
 * 必要な画像は必ず「img/tsumio」フォルダに用意してください。
 * 
 * ボイスデータは「audio/se/voice」フォルダから読み込まれます。
 * 必要なボイスデータは必ず「audio/se/voice」フォルダに用意してください。
 * 
 * 背景画像およびパーティクルの速度にマイナスを指定した場合、逆向きへスクロールします。
 * 
 * 【プラグインコマンド】
 * 全てのプラグインコマンドは「POS」から始まります。
 * また、説明上では視認性のためにカギカッコを使用していますが、実際にプラグインコマンドに入力する際には
 * カギカッコの入力は不要です。
 * 
 * 全てのプラグインコマンドは大文字と小文字を区別します。
 * 各単語の間は半角スペースで区切ります（全角では認識しません）。
 * 間違わないように気をつけてください。
 * 
 * 改行は「\n」か、新しい「writeLine」によって可能です。
 * 「\n」を利用する場合、前後に必ず半角の空白を挟んでください。
 * 
 * 「POS writeLine 追加する文字」 : あらすじに文字列を追加します。制御文字の使用も可能ですが、全ての制御文字の動作を確認したわけではありません。
 * 「POS newPage」 :あらすじに新しいページを追加します。以降のwriteLineは新しいページに対して行われます。
 * 「POS setMainBackground 背景名」 : メイン背景の画像を設定します。
 * 「POS setSubBackground 背景名」 : サブ背景の画像を設定します。
 * 「POS setParticle パーティクル名」 : パーティクル画像を設定します。
 * 「POS setBgm ファイル名 音量 ピッチ」 : BGMの設定をします。
 * 「POS setPicture ファイル名 X座標 Y座標 透明度」 : ピクチャの設定をおこないます。
 * 「POS setAlign 揃える方向」 : 文字列の揃える方向を指定します。「left」「center」が指定できます。
 * 「POS reserveCommonEvent イベント番号」 : マップ画面遷移後に実行するコモンイベント番号を設定します。
 * 「POS setVoice 音声ファイル名」 : 現在のページで再生する音声を設定します。
 * 「POS clearAll」 : すべての設定を消去します。
 * 「POS clearTextAndPage」 : テキストとページの設定を消去します。
 * 「POS clearAllBackground」 : メイン背景とサブ背景の設定を消去します。
 * 「POS clearParticle」 : パーティクルの設定を消去します。
 * 「POS clearBgm」 : BGMの設定を消去します。
 * 「POS clearPicture」 : ピクチャの設定を消去します。
 * 「POS clearCommonEvent」 : コモンイベントの設定を消去します。
 * 「POS saveSynopsis 保存名」 : 現在のあらすじデータを「保存名」で保存します。保存名を指定しなかった場合、自動でインデックスが与えられます。
 * 「POS loadSynopsis 保存名」 : 保存されているあらすじデータを読み込みます。
 * 「POS getDataLength」 : 保存しているあらすじデータの数をコンソール画面に出力します（デバッグ用）。
 * 「POS initialize」 : 全てのあらすじデータを初期化します。
 * 
 * 【あらすじの保存について】
 * 「POS saveSynopsis 保存名」コマンドで保存したファイルは、「POS loadSynopsis 保存名」で読み込めます。
 * 保存時に名前を指定しなかった場合は自動でインデックス名が与えられます。
 * また、すでに同名のファイルが存在した場合は上書きされます。
 * 
 * 【プラグイン更新後にエラーが出た場合】
 * プラグイン更新後にエラーが出た場合、プラグインコマンドから「POS initialize」を実行してください。
 * 全てのあらすじデータが破棄されますが、エラーが出なくなるかもしれません。
 * 
 * 【文章の表示からwriteLineを実行する方法】
 *  v1.0.1以降、「イベントコマンドの《文章の表示》」からもwriteLineと同等の機能を実行することができるようになりました。
 * 通常の文章を入力するのと同じようにしてイベントコマンドを立ち上げ、各行の任意の場所に「<POS>」を入力してください。
 * 
 * 例：
 * <POS>テストメッセージです。
 * テスト\I[1]テ<POS>スト。
 * タグPOSの位置はどこでもOKです。<POS>
 * 
 * 【振り返りシーンについて】
 * 振り返りシーンと、通常のあらすじシーンは別のシーンを指します。まずこの点に注意してください。
 * 
 * 「POS saveSynopsis 保存名」で保存したあらすじは、振り返りシーンで再度読み込むことが可能です。
 * 振り返りシーンはメニュー画面から表示させることができます。
 * この振り返りシーンの背景およびパーティクルは、現在の背景およびパーティクルが適用されます。
 * 実際に振り返りシーンからあらすじシーンを読み込んだときは、そのとき保存した背景およびパーティクルが再生されます。
 * また、振り返りシーンの機能はOFFにできます。
 * 
 * 振り返りシーンに適用されるタイトルは、あらすじの保存名です。
 * 
 * 【更新履歴】
 * 1.1.1 2017/09/30 GitHubのアドレスを追加。
 * 1.1.1 2017/09/02 ボイス再生機能に対応。
 * 1.1.0 2017/08/26 振り返りシーンの追加と、不具合の修正。
 * 1.0.2 2017/08/25 あらすじのセーブとロード機能の追加。
 * 1.0.1 2017/08/24 いくつかの不具合の修正と、機能の追加（writeLineの拡張とデフォルトウィンドウの指定）。
 * 1.0.0 2017/08/23 公開。
 * 
 * 【備考】
 * 当プラグインを利用したことによるいかなる損害に対しても、制作者は一切の責任を負わないこととします。
 * 
 * 利用規約：
 * 作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 * についても制限はありません。
 * 自由に使用してください。
 * 
 */


function Game_Synopsis() {
    this.initialize.apply(this, arguments);
};

(function() {
    'use strict';
    var pluginName = 'PreviouslyOnStory';

////=============================================================================
//// NTMO
////  Declare NTMO namespace.
////=============================================================================
    var NTMO = NTMO || {};
    NTMO.POS = function(){
    };

    NTMO.POS.getPluginCommandText = function(args) {
        var length = args.length;
        var text   = '';
        for(var i = 1; i < length; i++){
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
    var getParamDouble = function(paramNames, min, max) {
        var value = getParamString(paramNames);
        if (arguments.length < 2) min = -Infinity;
        if (arguments.length < 3) max = Infinity;
        return Number(value);
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
    param.shouldShowPageNumber         = getParamString(['ShowPageNumber',             'ページ数を表示する']);
    param.shouldShowConfirmWindow      = getParamString(['ShowShowConfirmWindow',      '確認ウィンドウを表示する']);
    param.duration_fadeOut             = getParamNumber(['FadeOutDuration',            'フェードアウトの時間']);
    param.shouldSkipScene              = getParamString(['ShouldSkipWhenTextIsEmpty',  'テキスト空白時にスキップ']);
    //Title Settings.
    param.skin_titleWindow             = getParamString(['TitleWindowSkin',        'タイトルウィンドウのスキン']);
    param.opacity_titleWindow          = getParamNumber(['TitleWindowOpacity',     'タイトルウィンドウの透明度']);
    param.string_titleWindow           = getParamString(['TitleText',              'あらすじを表す文字']);
    param.height_titleWindow           = getParamNumber(['TitleWindowHeight',      'タイトルウィンドウの高さ']);
    //Synopsis Setteings
    param.skin_synopsisWindow          = getParamString(['SynopsisWindowSkin',     'あらすじウィンドウのスキン']);
    param.opacity_synopsisWindow       = getParamNumber(['SynopsisWindowOpacity',  'あらすじウィンドウの透明度']);
    param.offsetX_synopsis             = getParamNumber(['SynopsisTextOffsetX',    'あらすじX座標のオフセット']);
    param.offsetY_synopsis             = getParamNumber(['SynopsisTextOffsetY',    'あらすじY座標のオフセット']);
    //Confirm Setteings
    param.skin_confirmWindow           = getParamString(['ConfirmWindowSkin',         '確認ウィンドウのスキン']);
    param.desc_confirmWindow           = getParamString(['ConfirmWindowDescription',  '確認ウィンドウの説明文']);
    param.yes_confirmWindow            = getParamString(['CharactersRepresentingYes', '「はい」を表す文字']);
    param.no_confirmWindow             = getParamString(['CharactersRepresentingNo',  '「いいえ」を表す文字']);
    param.opacity_confirmWindow        = getParamNumber(['ConfirmWindowOpacity',      '確認ウィンドウの透明度']);
    param.offsetX_confirmWindow        = getParamNumber(['ConfirmWindowOffsetX',      '確認ウィンドウのX座標オフセット']);
    param.offsetY_confirmWindow        = getParamNumber(['ConfirmWindowOffsetY',      '確認ウィンドウのY座標オフセット']);
    //Se Settings.
    param.se_next                      = getParamString(['NextSE',              '進むSE']);
    param.volume_next                  = getParamString(['NextSE_Volume',       '進むSE音量']);
    param.pitch_next                   = getParamString(['NextSe_Pitch',        '進むSEピッチ']);
    param.se_prev                      = getParamString(['PrevSE',              '戻るSE']);
    param.volume_prev                  = getParamString(['PrevSE_Volume',       '戻るSE音量']);
    param.pitch_prev                   = getParamString(['PrevSE_Pitch',        '戻るSEピッチ']);
    //Background parameter.
    param.settings_mainBackground      = getParamString(['MainDrawingArea',       'メイン背景の描画領域']);
    param.speed_mainBackgroundX        = getParamDouble(['MainBackgroundSpeedX',  'メイン背景のX方向の速度']);
    param.speed_mainBackgroundY        = getParamDouble(['MainBackgroundSpeedY',  'メイン背景のY方向の速度']);
    param.settings_subBackground       = getParamString(['SubDrawingArea',        'サブ背景の描画領域']);
    param.speed_subBackgroundX         = getParamDouble(['SubBackgroundSpeedX',   'サブ背景のX方向の速度']);
    param.speed_subBackgroundY         = getParamDouble(['SubBackgroundSpeedY',   'サブ背景のY方向の速度']);
    //Particle parameter.
    param.img_particle                 = getParamString(['ParticleImage',         'パーティクル画像']);
    param.drawingArea_particle         = getParamString(['ParticleDrawingArea',   'パーティクル画像の描画領域']);
    param.settings_particle            = getParamString(['ParticleSettings',      'パーティクル画像の設定']);
    param.isFlahing_particle           = getParamString(['ParticleFlashing',      'パーティクル画像の点滅']);
    param.speedX_particle              = getParamDouble(['ParticleScrollSpeedX',  'パーティクル画像のX方向の速度']);
    param.speedY_particle              = getParamDouble(['ParticleScrollSpeedY',  'パーティクル画像のY方向の速度']);
    //Looking back parameter.
    param.string_lookingBackTitle      = getParamString(['LookingBackTitle',          '振り返りシーンのタイトル']);
    param.string_lookingBackShortName  = getParamString(['LookingBackTitleShortName', '振り返りシーンの短縮名']);
    param.canUseLookinBackScene        = getParamString(['UseLookingBackScene',       '振り返りシーンを利用する']);
    param.rows_lookingBackWindow       = getParamNumber(['LookingBackRows',           '振り返りシーンの行']);
    param.columns_lookingBackWindow    = getParamNumber(['LookingBackColumns',        '振り返りシーンの列']);
    param.color_eachTitle              = getParamNumber(['EachTitleColor',            '各タイトルの色']);
    param.maxLine_lookingBackStr       = getParamNumber(['LookingBackStringMaxLine',  '振り返りシーン文字の最大行数']);
    param.maxStr_lookingBackLine       = getParamNumber(['LookingBackLineMaxString',  '振り返りシーン一行の最大文字数']);

////==============================
//// Convert parameters.
////==============================
    //Basic Settings.
    param.shouldShowPageNumber       = convertParam(param.shouldShowPageNumber);
    param.shouldShowConfirmWindow    = convertParam(param.shouldShowConfirmWindow);
    param.shouldSkipScene            = convertParam(param.shouldSkipScene);
    //Background
    param.settings_mainBackground    = convertParam(param.settings_mainBackground);
    param.settings_subBackground     = convertParam(param.settings_subBackground);
    //Particle
    param.drawingArea_particle       = convertParam(param.drawingArea_particle);
    param.settings_particle          = convertParam(param.settings_particle);
    param.isFlahing_particle         = convertParam(param.isFlahing_particle);
    //Looking back scene.
    param.canUseLookinBackScene      = convertParam(param.canUseLookinBackScene);

////==============================
//// Add tsumio folder to ImageManager.
////==============================
    ImageManager.loadTsumio = function(filename) {
        return this.loadBitmap('img/tsumio/', filename, 0, true);
    };

////==============================
//// Add voice type to AudioManager.
////==============================
    AudioManager.playVoice_POS = function(seName) {
        var se = {"name":seName, "volume":100, "pitch":100, "pan":0};
        if (se.name) {
            this._seBuffers = this._seBuffers.filter(function(audio) {
                return audio.isPlaying();
            });
            var buffer = this.createBuffer('se/voice', se.name);
            this.updateSeParameters(buffer, se);
            buffer.play(false);
            this._seBuffers.push(buffer);
        }
    };

    AudioManager.stopVoice_POS = function() {
        this._seBuffers.forEach(function(buffer) {
            if(/audio\/se\/voice\//.test(buffer._url)){
                buffer.stop();
            }
        });
        this._seBuffers = [];
    };

//-----------------------------------------------------------------------------
// Settings for plugin command.
//-----------------------------------------------------------------------------
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'POS') {
            switch (args[0]) {
                case 'initialize':
                    $gameSystem.synopsis().initialize();
                    break;
                case 'writeLine':
                    var text = NTMO.POS.getPluginCommandText(args);
                    $gameSystem.synopsis().writeLine(text);
                    break;
                case 'newPage':
                    $gameSystem.synopsis().newPage();
                    break;
                case 'setMainBackground':
                    $gameSystem.synopsis().setMainBackground(args[1]);
                    break;
                case 'setSubBackground':
                    $gameSystem.synopsis().setSubBackground(args[1]);
                    break;
                case 'setParticle':
                    $gameSystem.synopsis().setParticle(args[1]);
                    break;
                case 'setBgm':
                    $gameSystem.synopsis().setBgm(args[1], args[2], args[3]);
                    break;
                case 'setPicture':
                    $gameSystem.synopsis().setPicture(args[1], args[2], args[3], args[4]);
                    break;
                case 'reserveCommonEvent':
                    $gameSystem.synopsis().reserveCommonEvent(args[1]);
                    break;
                case 'setVoice':
                    $gameSystem.synopsis().setVoice(args[1]);
                    break;
                case 'clearAll':
                    $gameSystem.synopsis().clearAll();
                    break;
                case 'clearTextAndPage':
                    $gameSystem.synopsis().clearTextAndPage();
                    break;
                case 'clearAllBackground':
                    $gameSystem.synopsis().clearAllBackground();
                    break;
                case 'clearParticle':
                    $gameSystem.synopsis().clearParticle();
                    break;
                case 'clearBgm':
                    $gameSystem.synopsis().clearBgm();
                    break;
                case 'clearPicture':
                    $gameSystem.synopsis().clearPicture();
                    break;
                case 'clearCommonEvent':
                    $gameSystem.synopsis().clearCommonEvent();
                    break;
                case 'setAlign':
                    $gameSystem.synopsis().setAlign(args[1]);
                    break;
                case 'getDataLength':
                    console.log('POS Data Length :' + $gameSystem.synopsis().getDataLength());
                    break;
                case 'loadSynopsis':
                    $gameSystem.synopsis().loadSynopsis(args[1]);
                    break;
                case 'saveSynopsis':
                    $gameSystem.synopsis().saveSynopsis(args[1]);
                    break;
            }
        }
    };

////==============================
//// NTMO.POS_Base
//================================
    NTMO.POS_Base = function(){
    };

    NTMO.POS_Base.playNextPage = function(){
        if($gameSystem.synopsis().canNextPage()){
            var se = {name:param.se_next, volume:param.volume_next, pitch:param.pitch_next};
            AudioManager.playSe(se);
        }
    };

    NTMO.POS_Base.playPrevPage = function(){
        if($gameSystem.synopsis().canPrevPage()){
            var se = {name:param.se_prev, volume:param.volume_prev, pitch:param.pitch_prev};
            AudioManager.playSe(se);
        }
    };

    NTMO.POS_Base.isNumberMinus = function(num) {
        if(num < 0){
            return true;
        }
        return false;
    };

    NTMO.POS_Base.convertBackgroundWidth = function(num) {
        if(NTMO.POS_Base.isNumberMinus(num)){
            return Graphics.width; 
        }else{
            return num;
        }
    };

    NTMO.POS_Base.convertBackgroundHeight = function(num) {
        if(NTMO.POS_Base.isNumberMinus(num)){
            return Graphics.height; 
        }else{
            return num;
        }
    };

    //I borrowed this function from PanicBlanket.com.
    //URL : http://blog.panicblanket.com/archives/2961
    //Thank you for useful code !
    //This function slice strings to the arry.
    NTMO.POS_Base.stringSlices = function(n, str) {
        if (str.length == 0) {
            return [];
        } else {
            var l = NTMO.POS_Base.stringSlices(n, str.slice(n))
            l.unshift(str.slice(0, n))
            return l
        }
    }
     

////==============================
//// Scene_Boot
///   Override this class for loading images.
////==============================
    var _Scene_Boot_loadSystemWindowImage      = Scene_Boot.prototype.loadSystemWindowImage;
    Scene_Boot.prototype.loadSystemWindowImage = function() {
        _Scene_Boot_loadSystemWindowImage.call(this);

        //Addtional window images.
        if(param.skin_titleWindow){
            ImageManager.loadTsumio(param.skin_titleWindow);
        }
        if(param.skin_synopsisWindow){
            ImageManager.loadTsumio(param.skin_synopsisWindow);
        }
        if(param.skin_confirmWindow){
            ImageManager.loadTsumio(param.skin_confirmWindow);
        }
    };

//////=============================================================================
///// Game_Message
/////  Hook Game_Message for showing text in synopsis scene.
/////==============================================================================
    
    //HACK : Probalby this code cause any problem.
    var _Game_Message_add      = Game_Message.prototype.add;
    Game_Message.prototype.add = function(text) {
        if(/<POS>/.test(text)){
            $gameSystem.synopsis().writeLine(text);
        }else{
            _Game_Message_add.call(this, text);
        }
    };

//////=============================================================================
///// Game_System
/////  Add a game system called Game_Synopsis.
/////==============================================================================
    var _Game_System_initialize      = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this._synopsis = new Game_Synopsis();
    };

    Game_System.prototype.synopsis = function() {
        return this._synopsis;
    };

    var _Game_System_onLoad      = Game_System.prototype.onLoad;
    Game_System.prototype.onLoad = function() {
        if (_Game_System_onLoad) _Game_System_onLoad.apply(this, arguments);
        if (!this.synopsis()) this._synopsis = new Game_Synopsis();
        this._synopsis.onLoad();
    };

//////=============================================================================
///// Scene_Load
/////  Hook to display previously on story scene.
/////==============================================================================
    Scene_Load.prototype.onLoadSuccess = function() {
        SoundManager.playLoad();
        this.fadeOutAll();
        this.reloadMapIfUpdated();
        SceneManager.goto(NTMO.POS.Scene_PreviouslyOnStory);
        this._loadSuccess = true;
    };

//////=============================================================================
///// Scene_Menu and Window_MenuCommand
/////  Add a menu(for going to Scene_LookingBack) to Scene_Menu.
/////==============================================================================
    var _Scene_Menu_createCommandWindow      = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _Scene_Menu_createCommandWindow.call(this);
        this._commandWindow.setHandler('synopsis', this.commandSynopsis.bind(this));
    };

    Scene_Menu.prototype.commandSynopsis = function() {
        SceneManager.push(NTMO.POS.Scene_LookingBack);
    };

    var _Window_MenuCommand_addOriginalCommands      = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        _Window_MenuCommand_addOriginalCommands.call(this);

        if (param.canUseLookinBackScene) {
            var enabled = $gameSystem.synopsis().getDataLength() > 0;//Does the save data exist?
            this.addCommand(param.string_lookingBackShortName, 'synopsis', enabled);
        }
    };

//////=============================================================================
///// NTMO.POS.Scene_PreviouslyOnStory
/////  This class is base scene of this plugin.
/////=============================================================================
    NTMO.POS.Scene_PreviouslyOnStory = function() {
        this.initialize.apply(this, arguments);
    };

    NTMO.POS.Scene_PreviouslyOnStory.prototype = Object.create(Scene_Base.prototype);
    NTMO.POS.Scene_PreviouslyOnStory.prototype.constructor = NTMO.POS.Scene_PreviouslyOnStory;

    NTMO.POS.Scene_PreviouslyOnStory.prototype.initialize = function() {
        Scene_Base.prototype.initialize.call(this);

        //Initialize window.
        this._titleWindow    = null;
        this._synopsisWindow = null;
        this._confirmWindow  = null;
        //flag
        this._canFadeOut       = false;
        this._countFadeOut     = 0;
        this._fadeOutDuration  = param.duration_fadeOut;
    };

    NTMO.POS.Scene_PreviouslyOnStory.prototype.update = function() {
        Scene_Base.prototype.update.call(this);

        if(this.shouldSkipScenePOS()){
            return;
        }

        this.scrollBackImages.update();
        this.particleImage.update();
        this.updateFadeOut();
    };
    
    NTMO.POS.Scene_PreviouslyOnStory.prototype.create = function() {
        Scene_Base.prototype.create.call(this);

        if(this.shouldSkipScenePOS()){
            return;
        }

        //Create lower additional member.
        this.createBackground();


        //Create windows layer.
        this.createWindowLayer();
        this.createTitleWindow();
        this.createSynopsisWindow();
        this.createConfirmWindow();

        //Create upper additional member.
        this.createParticle();
    };

    NTMO.POS.Scene_PreviouslyOnStory.prototype.start = function() {
        Scene_Base.prototype.start.call(this);
        
        AudioManager.stopBgm();
        this.playBgm();
        if(this.shouldSkipScenePOS()){
            this.goMapScene();
        }
    };

    NTMO.POS.Scene_PreviouslyOnStory.prototype.playBgm = function() {
        var bgm = $gameSystem.synopsis().getBgm();
        //Check if exsit bgm data.
        if(bgm && bgm.name && bgm.volume && bgm.pitch){
            //Play BGM.
            AudioManager.playBgm(bgm);
        }
    };
    
    NTMO.POS.Scene_PreviouslyOnStory.prototype.createTitleWindow = function() {
        var height        = param.height_titleWindow;
        this._titleWindow = new NTMO.POS.Window_Title(0, 0, Graphics.width, height);
        this.addWindow(this._titleWindow);
    };

    //Set the position according to the screen.
    NTMO.POS.Scene_PreviouslyOnStory.prototype.createConfirmWindow = function() {
        //Set position.
        var x = Graphics.width/2  + param.offsetX_confirmWindow;
        var y = Graphics.height/2 + param.offsetY_confirmWindow;
        this._confirmWindow = new NTMO.POS.Window_Confirm(x, y);
        //Set handler
        this._confirmWindow.setHandler('yes', this.onConfirmYes.bind(this));
        this._confirmWindow.setHandler('no', this.onConfirmNo.bind(this));
        //Add window.
        this.addWindow(this._confirmWindow);
    };

    //Set the size according to the title window.
    NTMO.POS.Scene_PreviouslyOnStory.prototype.createSynopsisWindow = function() {
        //basic settings.
        var x      = 0;
        var y      = this._titleWindow.y + this._titleWindow.height;
        var width  = Graphics.width;
        var height = Graphics.height - y;
        this._synopsisWindow = new NTMO.POS.Window_Synopsis(x, y, width, height);
        //set handler.
        this._synopsisWindow.setHandler('ok',     this.onSynopsisOk.bind(this));
        this._synopsisWindow.setHandler('cancel', this.onSynopsisCancel.bind(this));
        //add child.
        this.addWindow(this._synopsisWindow);
    };

    NTMO.POS.Scene_PreviouslyOnStory.prototype.setFadeOutFlag = function() {
        if(!this._canFadeOut){
            this.startFadeOut(this.getFadeOutDuration());
        }
        this._canFadeOut = true;
    };

    NTMO.POS.Scene_PreviouslyOnStory.prototype.canFadeOut = function() {
        return this._canFadeOut;
    };

    NTMO.POS.Scene_PreviouslyOnStory.prototype.getFadeOutDuration = function() {
        return this._fadeOutDuration;
    };

    NTMO.POS.Scene_PreviouslyOnStory.prototype.updateFadeOut = function() {
        if(!this.canFadeOut()){
            return;
        }

        if(this._countFadeOut > this.getFadeOutDuration()){
            this.goMapScene();
        }
        this._countFadeOut++;
    };

    NTMO.POS.Scene_PreviouslyOnStory.prototype.goMapScene = function() {
        //Go map scene.
        SceneManager.goto(Scene_Map);
        this.onAfterGoMap();

        //Reserve common event.
        if($gameSystem.synopsis().getCommonEventNum() >= 1){
            $gameTemp.reserveCommonEvent($gameSystem.synopsis().getCommonEventNum());
        }
    };

    NTMO.POS.Scene_PreviouslyOnStory.prototype.shouldSkipScenePOS = function() {
        return param.shouldSkipScene && $gameSystem.synopsis().isTextNull();
    };

    NTMO.POS.Scene_PreviouslyOnStory.prototype.allWindowDeactivate = function() {
        this._confirmWindow.deactivate();
        this._confirmWindow.hide();
        this._synopsisWindow.deactivate();
    };

    //=============================================================================
    // NTMO.POS.Scene_PreviouslyOnStory
    //  Create background image and particle.
    //=============================================================================

    NTMO.POS.Scene_PreviouslyOnStory.prototype.createBackground = function() {
        //Initialize background settings.
        var main_x      = param.settings_mainBackground[0];
        var main_y      = param.settings_mainBackground[1];
        var main_width  = NTMO.POS_Base.convertBackgroundWidth(param.settings_mainBackground[2]);
        var main_height = NTMO.POS_Base.convertBackgroundHeight(param.settings_mainBackground[3]);
        var sub_x       = param.settings_subBackground[0];
        var sub_y       = param.settings_subBackground[1];
        var sub_width   = NTMO.POS_Base.convertBackgroundWidth(param.settings_subBackground[2]);
        var sub_height  = NTMO.POS_Base.convertBackgroundHeight(param.settings_subBackground[3]);

        //Create scrolling background.You should 'move()' each image, if you want to draw a certain range.
        this.scrollBackImages = new NTMO.POS.ScrollBackImages(this, $gameSystem.synopsis().getMainBackground(), $gameSystem.synopsis().getSubBackground());
        this.scrollBackImages.setMainSpeed(param.speed_mainBackgroundX,param.speed_mainBackgroundY);
        this.scrollBackImages.setSubSpeed(param.speed_subBackgroundX, param.speed_subBackgroundY);
        this.scrollBackImages.moveMainSprite(main_x, main_y, main_width, main_height);
        this.scrollBackImages.moveSubSprite(sub_x, sub_y, sub_width, sub_height);
    };

    NTMO.POS.Scene_PreviouslyOnStory.prototype.createParticle = function() {
        //Initialize particle settings.
        var fileName    = $gameSystem.synopsis().getParticle();
        var opacity     = param.settings_particle[0];
        var blendMode   = param.settings_particle[1];
        var x           = param.drawingArea_particle[0];
        var y           = param.drawingArea_particle[1];
        var width       = NTMO.POS_Base.convertBackgroundWidth(param.drawingArea_particle[2]);
        var height      = NTMO.POS_Base.convertBackgroundHeight(param.drawingArea_particle[3]);

        //Create particle.You should 'move()' each image, if you want to draw a certain range.
        this.particleImage = new NTMO.POS.ParticleImage(this, fileName, opacity, blendMode, param.isFlahing_particle);
        this.particleImage.setSpeed(param.speedX_particle, param.speedY_particle);
        this.particleImage.moveSprite(x, y, width, height);
    };

    //=============================================================================
    // NTMO.POS.Scene_PreviouslyOnStory
    //  Set handler for Synopsis Window.
    //=============================================================================
    NTMO.POS.Scene_PreviouslyOnStory.prototype.onSynopsisOk = function() {
        if($gameSystem.synopsis().shouldNextScene()){
            this.setFadeOutFlag();
            this.allWindowDeactivate();
            return;
        }

        $gameSystem.synopsis().nextPage();
        this._synopsisWindow.refresh();
    };

    NTMO.POS.Scene_PreviouslyOnStory.prototype.onSynopsisCancel = function() {
        if(!$gameSystem.synopsis().shouldPrevPage()){
            return;
        }

        $gameSystem.synopsis().prevPage();
        this._synopsisWindow.refresh();
    };

    //This method is needed for play original map music after ending Scene_Synopsis.
    NTMO.POS.Scene_PreviouslyOnStory.prototype.onAfterGoMap = function() {
        AudioManager.playBgm($gameSystem._bgmOnSave);
        AudioManager.playBgs($gameSystem._bgsOnSave);
    };

    //Confirm
    NTMO.POS.Scene_PreviouslyOnStory.prototype.onConfirmYes = function() {
        this._confirmWindow.deactivate();
        this._confirmWindow.hide();
        this._synopsisWindow.activate();
        this._synopsisWindow.playVoice();
    };

    NTMO.POS.Scene_PreviouslyOnStory.prototype.onConfirmNo = function() {
        this.setFadeOutFlag();
        this.allWindowDeactivate();
    };

//////=============================================================================
///// NTMO.POS.Scene_LookingBack
/////  This class is for selecting scene of PreviouslyOnStory
/////=============================================================================
    NTMO.POS.Scene_LookingBack = function() {
        this.initialize.apply(this, arguments);
    };

    NTMO.POS.Scene_LookingBack.prototype = Object.create(Scene_Base.prototype);
    NTMO.POS.Scene_LookingBack.prototype.constructor = NTMO.POS.Scene_LookingBack;

    NTMO.POS.Scene_LookingBack.prototype.initialize = function() {
        Scene_Base.prototype.initialize.call(this);

        //Initialize window.
        this._titleWindow    = null;
        this._selectingWindow = null;
        //flag
        this._canFadeOut       = false;
        this._countFadeOut     = 0;
        this._fadeOutDuration  = param.duration_fadeOut;
    };

    NTMO.POS.Scene_LookingBack.prototype.update = function() {
        Scene_Base.prototype.update.call(this);

        this.scrollBackImages.update();
        this.particleImage.update();
    };

    NTMO.POS.Scene_LookingBack.prototype.create = function() {
        Scene_Base.prototype.create.call(this);
        //Create lower additional member.
        this.createBackground();

        //Create windows layer.
        this.createWindowLayer();
        this.createTitleWindow();
        this.createSelectingWindow();

        //Create upper additional member.
        this.createParticle();
    };

    NTMO.POS.Scene_LookingBack.prototype.createTitleWindow = function() {
        var height        = param.height_titleWindow;
        this._titleWindow = new NTMO.POS.Window_LookingBackTitle(0, 0, Graphics.width, height);
        this.addWindow(this._titleWindow);
    };

    //Set the size according to the title window.
    NTMO.POS.Scene_LookingBack.prototype.createSelectingWindow = function() {
        //basic settings.
        var x      = 0;
        var y      = this._titleWindow.y + this._titleWindow.height;
        var width  = Graphics.width;
        var height = Graphics.height - y;
        this._selectingWindow = new NTMO.POS.Window_SelectingLookingBack(x, y, width, height);
        //set handler.
        this._selectingWindow.setHandler('ok',     this.onSelectingOk.bind(this));
        this._selectingWindow.setHandler('cancel', this.onSelectingCancel.bind(this));
        //add child.
        this.addWindow(this._selectingWindow);
    };

    //=============================================================================
    // NTMO.POS.Scene_LookingBack
    //  Set handler for Window_SelectingLookingBack.
    //=============================================================================
    NTMO.POS.Scene_LookingBack.prototype.onSelectingOk = function() {
        $gameSystem.synopsis().onLoad();
        $gameSystem.synopsis().setLastSelectedList(this._selectingWindow.index());
        $gameSystem.synopsis().saveCurrentDataToTemp();
        $gameSystem.synopsis().loadSynopsisForLookingBack(this._selectingWindow.index());
        SceneManager.push(NTMO.POS.Scene_Reply);
    };

    NTMO.POS.Scene_LookingBack.prototype.onSelectingCancel = function() {
        SceneManager.pop();
    };

    //=============================================================================
    // NTMO.POS.Scene_LookingBack
    //  Create background image and particle.
    //=============================================================================
    NTMO.POS.Scene_LookingBack.prototype.createBackground = function() {
        //Initialize background settings.
        var main_x      = param.settings_mainBackground[0];
        var main_y      = param.settings_mainBackground[1];
        var main_width  = NTMO.POS_Base.convertBackgroundWidth(param.settings_mainBackground[2]);
        var main_height = NTMO.POS_Base.convertBackgroundHeight(param.settings_mainBackground[3]);
        var sub_x       = param.settings_subBackground[0];
        var sub_y       = param.settings_subBackground[1];
        var sub_width   = NTMO.POS_Base.convertBackgroundWidth(param.settings_subBackground[2]);
        var sub_height  = NTMO.POS_Base.convertBackgroundHeight(param.settings_subBackground[3]);

        //Create scrolling background.You should 'move()' each image, if you want to draw a certain range.
        this.scrollBackImages = new NTMO.POS.ScrollBackImages(this, $gameSystem.synopsis().getMainBackground(), $gameSystem.synopsis().getSubBackground());
        this.scrollBackImages.setMainSpeed(param.speed_mainBackgroundX,param.speed_mainBackgroundY);
        this.scrollBackImages.setSubSpeed(param.speed_subBackgroundX, param.speed_subBackgroundY);
        this.scrollBackImages.moveMainSprite(main_x, main_y, main_width, main_height);
        this.scrollBackImages.moveSubSprite(sub_x, sub_y, sub_width, sub_height);
    };

    NTMO.POS.Scene_LookingBack.prototype.createParticle = function() {
        //Initialize particle settings.
        var fileName    = $gameSystem.synopsis().getParticle();
        var opacity     = param.settings_particle[0];
        var blendMode   = param.settings_particle[1];
        var x           = param.drawingArea_particle[0];
        var y           = param.drawingArea_particle[1];
        var width       = NTMO.POS_Base.convertBackgroundWidth(param.drawingArea_particle[2]);
        var height      = NTMO.POS_Base.convertBackgroundHeight(param.drawingArea_particle[3]);

        //Create particle.You should 'move()' each image, if you want to draw a certain range.
        this.particleImage = new NTMO.POS.ParticleImage(this, fileName, opacity, blendMode, param.isFlahing_particle);
        this.particleImage.setSpeed(param.speedX_particle, param.speedY_particle);
        this.particleImage.moveSprite(x, y, width, height);
    };

//////=============================================================================
///// NTMO.POS.Scene_Reply
/////  This class inherit Scene_PreviouslyOnStory.
/////=============================================================================
    NTMO.POS.Scene_Reply = function() {
        this.initialize.apply(this, arguments);
    };

    NTMO.POS.Scene_Reply.prototype = Object.create(NTMO.POS.Scene_PreviouslyOnStory.prototype);
    NTMO.POS.Scene_Reply.prototype.constructor = NTMO.POS.Scene_Reply;

    //Override this method.
    NTMO.POS.Scene_Reply.prototype.start = function() {
        Scene_Base.prototype.start.call(this);
        
        $gameSystem.saveBgm();
        AudioManager.stopBgm();
        this.playBgm();
        if(this.shouldSkipScenePOS()){
            this.goMapScene();
        }
    };

    //Override this method.
    //This method does not go map scene but LookinBack scene in this class.
    NTMO.POS.Scene_Reply.prototype.goMapScene = function() {
        $gameSystem.synopsis().loadCurrentDataFromTemp();
        SceneManager.pop();
        $gameSystem.replayBgm();
    };

    //Override this method.
    NTMO.POS.Scene_Reply.prototype.playBgm = function() {
        var bgm = $gameSystem.synopsis().getBgm();
        //Check if exsit bgm data.
        if(bgm && bgm.name && bgm.volume && bgm.pitch){
            //Play BGM.
            AudioManager.playBgm(bgm);
        }
    };

//////=============================================================================
///// NTMO.POS.Window_Title
/////  This class is for title window in this plugin.
/////=============================================================================
    NTMO.POS.Window_Title = function() {
        this.initialize.apply(this, arguments);
    };

    NTMO.POS.Window_Title.prototype = Object.create(Window_Base.prototype);
    NTMO.POS.Window_Title.prototype.constructor = NTMO.POS.Window_Title;

    NTMO.POS.Window_Title.prototype.initialize = function(x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);

        this.opacity = param.opacity_titleWindow;
        this.drawTitle();
    };

    NTMO.POS.Window_Title.prototype.loadWindowskin = function() {
        if(param.skin_titleWindow){
            this.windowskin = ImageManager.loadTsumio(param.skin_titleWindow);
        }else{
            this.windowskin = ImageManager.loadSystem('Window');
        }
    };

    NTMO.POS.Window_Title.prototype.drawTitle = function() {
        var text_width = this.textWidth(param.string_titleWindow);
        var center_x   = (this.contentsWidth() - text_width) / 2;
        this.drawTextEx(param.string_titleWindow, center_x, 0);
    };

//////=============================================================================
///// NTMO.POS.Window_SelectingTitle
/////  This class is for title window in SelectingSynopsis scene.
/////=============================================================================
    NTMO.POS.Window_LookingBackTitle = function() {
        this.initialize.apply(this, arguments);
    };

    NTMO.POS.Window_LookingBackTitle.prototype = Object.create(NTMO.POS.Window_Title.prototype);
    NTMO.POS.Window_LookingBackTitle.prototype.constructor = NTMO.POS.Window_LookingBackTitle;

    NTMO.POS.Window_LookingBackTitle.prototype.initialize = function(x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);

        this.opacity = param.opacity_titleWindow;
        this.drawTitle();
    };

    NTMO.POS.Window_LookingBackTitle.prototype.drawTitle = function() {
        var text_width = this.textWidth(param.string_lookingBackTitle);
        var center_x   = (this.contentsWidth() - text_width) / 2;
        this.drawTextEx(param.string_lookingBackTitle, center_x, 0);
    };

//////=============================================================================
///// NTMO.POS.Window_Synopsis
/////  This class is for synopsis window in this plugin.
/////=============================================================================
    NTMO.POS.Window_Synopsis = function() {
        this.initialize.apply(this, arguments);
    };

    NTMO.POS.Window_Synopsis.prototype = Object.create(Window_Selectable.prototype);
    NTMO.POS.Window_Synopsis.prototype.constructor = NTMO.POS.Window_Synopsis;

    NTMO.POS.Window_Synopsis.prototype.initialize = function(x, y, width, height) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        
        this.sprite_picture = null;
        this.opacity = param.opacity_synopsisWindow;
        this.createPicture();
        if(!param.shouldShowConfirmWindow){
            this.activate();
        }
        this.refresh();
    };

    NTMO.POS.Window_Synopsis.prototype.update = function() {
        Window_Selectable.prototype.update.call(this);

        this.updateTouchInputOnLeftClick();
    };

    NTMO.POS.Window_Synopsis.prototype.loadWindowskin = function() {
        if(param.skin_synopsisWindow){
            this.windowskin = ImageManager.loadTsumio(param.skin_synopsisWindow);
        }else{
            this.windowskin = ImageManager.loadSystem('Window');
        }
    };

    NTMO.POS.Window_Synopsis.prototype.drawSynopsis = function() {
        var text = $gameSystem.synopsis().getCurrentPageTextList();
        var x    = param.offsetX_synopsis;
        var y    = param.offsetY_synopsis;
        switch(this.getAlign()){
            case 'left' :
                this.drawTextEx(text, x, y);
                break;
            case 'right' :
                this.drawTextEx(text, x, y);
                break;
            case 'center' :
                this.drawCenterTextEx(text, x, y);
                break;
        }
    };

    NTMO.POS.Window_Synopsis.prototype.drawPageNumber = function() {
        if(!param.shouldShowPageNumber){
            return;
        }

        //Resetting font setting is necessary for calculating the width. 
        this.resetFontSettings();
        //zero padding
        var current_num   = ( '00'  + ($gameSystem.synopsis().getCurrentPage()+1) ).slice( -2 );
        var max_num       = ( '00'  + ($gameSystem.synopsis().getMaxPage()+1) ).slice( -2 );
        //contact strings.
        var text          = current_num + ' / ' + max_num;
        //get width and Xposition.
        var text_width    = this.textWidth(text);
        var center_x      = (this.contentsWidth() - text_width) / 2;
        var y             = this.contentsHeight() - this.calcTextHeight(text, false);
        //draw
        this.drawTextEx(text, center_x, y);
    };

    //This method split text in '\n' or else escape characters.
    NTMO.POS.Window_Synopsis.prototype.drawCenterTextEx = function(text, x, y) {
        var each_text = text.split('\n');
        var length    = each_text.length;
        for(var i = 0; i < length; i++){
            var newText    = each_text[i].replace( /\\c\[\d+\]/gi , '');
            var text_width = this.textWidth(newText);
            var center_x   = (this.contentsWidth() - text_width) / 2;
            var lineHeight = this.calcTextHeight(each_text[i], false);
            var width      = this.contentsWidth();
            this.drawTextEx(each_text[i], center_x + x, lineHeight*i + y);
        }
    };

    NTMO.POS.Window_Synopsis.prototype.createPicture = function() {
        //Create sprite.
        var picture = $gameSystem.synopsis().getPicture();
        if(picture.name !== null || picture.name !== undefined || picture.name !== '')
        {
            var bitmap                  = ImageManager.loadTsumio(picture.name);
            this.sprite_picture         = new Sprite(bitmap);
            this.sprite_picture.x       = picture.x;
            this.sprite_picture.y       = picture.y;
            this.sprite_picture.opacity = Number(picture.opacity);
        }
        //addChild
        this.addChild(this.sprite_picture);
    };

    NTMO.POS.Window_Synopsis.prototype.playVoice = function() {
        if(!this.isOpenAndActive()){
            return;
        }
        AudioManager.stopVoice_POS();
        var voiceName = $gameSystem.synopsis().getVoice();
        if(voiceName){
            AudioManager.playVoice_POS(voiceName);
        }
    };

    NTMO.POS.Window_Synopsis.prototype.refresh = function() {
        if (this.contents) {
            this.contents.clear();
            this.drawAllItems();
            this.drawSynopsis();
            this.drawPageNumber();
            this.playVoice();
        }
    };

    NTMO.POS.Window_Synopsis.prototype.processOk = function() {
        if (this.isCurrentItemEnabled()) {
            this.playOkSound();
            this.updateInputData();
            //this.deactivate();
            this.callOkHandler();
        } else {
            this.playBuzzerSound();
        }
    };

    NTMO.POS.Window_Synopsis.prototype.processCancel = function() {
        NTMO.POS_Base.playPrevPage();
        this.updateInputData();
        //this.deactivate();
        this.callCancelHandler();
    };

    NTMO.POS.Window_Synopsis.prototype.cursorRight = function() {
        if($gameSystem.synopsis().canNextPage()){
            this.processOk();
        }
    };
    
    NTMO.POS.Window_Synopsis.prototype.cursorLeft = function() {
        this.processCancel();
    };
    
    NTMO.POS.Window_Synopsis.prototype.playOkSound = function() {
        NTMO.POS_Base.playNextPage();
    };

    NTMO.POS.Window_Synopsis.prototype.getAlign = function() {
        return $gameSystem.synopsis().getAlign();
    };

    NTMO.POS.Window_Synopsis.prototype.isCursorMovable = function() {
        return this.isOpenAndActive();
    };

    NTMO.POS.Window_Synopsis.prototype.updateTouchInputOnLeftClick = function() {
        if (!this.isOpenAndActive()) {
            return;
        }

        if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
            this.processOk();
        }
    };

    NTMO.POS.Window_Synopsis.prototype.calcTextHeight = function(textState, all) {
        var lastFontSize = this.contents.fontSize;
        var textHeight = 0;
        var lines = 1;
        var maxLines = all ? lines.length : 1;
    
        for (var i = 0; i < maxLines; i++) {
            var maxFontSize = this.contents.fontSize;
            var regExp = /\x1b[\{\}]/g;
            for (;;) {
                var array = regExp.exec(lines[i]);
                if (array) {
                    if (array[0] === '\x1b{') {
                        this.makeFontBigger();
                    }
                    if (array[0] === '\x1b}') {
                        this.makeFontSmaller();
                    }
                    if (maxFontSize < this.contents.fontSize) {
                        maxFontSize = this.contents.fontSize;
                    }
                } else {
                    break;
                }
            }
            textHeight += maxFontSize + 8;
        }
    
        this.contents.fontSize = lastFontSize;
        return textHeight;
    };

//////=============================================================================
///// NTMO.POS.Window_SelectingLookingBack
/////  This class is for selecting window in the looking back scene.
/////=============================================================================
    NTMO.POS.Window_SelectingLookingBack = function() {
        this.initialize.apply(this, arguments);
    };

    NTMO.POS.Window_SelectingLookingBack.prototype = Object.create(Window_Selectable.prototype);
    NTMO.POS.Window_SelectingLookingBack.prototype.constructor = NTMO.POS.Window_SelectingLookingBack;

    NTMO.POS.Window_SelectingLookingBack.prototype.initialize = function(x, y, width, height) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        
        this.opacity = param.opacity_synopsisWindow;
        this.selectLast();
        this.refresh();
        this.activate();
    };

    NTMO.POS.Window_SelectingLookingBack.prototype.update = function() {
        Window_Selectable.prototype.update.call(this);
    };

    NTMO.POS.Window_SelectingLookingBack.prototype.loadWindowskin = function() {
        if(param.skin_synopsisWindow){
            this.windowskin = ImageManager.loadTsumio(param.skin_synopsisWindow);
        }else{
            this.windowskin = ImageManager.loadSystem('Window');
        }
    };

    NTMO.POS.Window_SelectingLookingBack.prototype.numVisibleRows = function() {
        return param.rows_lookingBackWindow;
    };

    NTMO.POS.Window_SelectingLookingBack.prototype.maxCols = function() {
        return param.columns_lookingBackWindow;
    };

    NTMO.POS.Window_SelectingLookingBack.prototype.itemHeight = function() {
        var clientHeight = this.height - this.padding * 2;
        return Math.floor(clientHeight / this.numVisibleRows());
    };

    NTMO.POS.Window_SelectingLookingBack.prototype.maxItems = function() {
        return $gameSystem.synopsis().getDataLength();
    };

    NTMO.POS.Window_SelectingLookingBack.prototype.selectLast = function() {
        this.select($gameSystem.synopsis().getLastSelectedList());
    };

    NTMO.POS.Window_SelectingLookingBack.prototype.drawItem = function(index) {
        this.drawItemTitle(index);
        this.drawItemSynopsis(index);
    };

    NTMO.POS.Window_SelectingLookingBack.prototype.drawItemTitle = function(index) {
        //Initialize settings.
        var rect         = this.itemRect(index);
        var title        = this.getFileName(index);
        var text_width   = this.textWidth(title);
        var center_x     = (rect.width - this.padding - text_width) / 2;
        var y            = 10;
        //Change color.
        this.drawTextEx('\\c\[' + param.color_eachTitle + '\]' + title + '\\c\[0\]', rect.x + center_x, rect.y + y);
    };

    NTMO.POS.Window_SelectingLookingBack.prototype.drawItemSynopsis = function(index) {
        //Initialize settings.
        this.resetFontSettings();
        var rect         = this.itemRect(index);
        var text         = this.getFirstPageText(index);
        var x            = 5;
        var y            = 10 + this.lineHeight();
        //Check if text is exist.
        if(!text){
            console.warn('Text is empty! Please check saving data.');
            console.warn('Reference : NTMO.POS.Window_SelectingLookingBack.prototype.drawItemSynopsis()');
            return;
        }

        //Slice text.
        text          = text.replace( /\n/gi , '');//delete '\n' in the text variable.
        var arry_text = NTMO.POS_Base.stringSlices(param.maxStr_lookingBackLine,text);
        //Connect text with '\n'.
        var connectedText = '';
        var maxLine       = arry_text.length > param.maxLine_lookingBackStr ? param.maxLine_lookingBackStr : arry_text.length;
        for(var i = 0; i < maxLine; i++){
            if(i !== maxLine-1){
                connectedText += arry_text[i] + '\n';
            }else{//if i === maxline
                var temp_text  = arry_text[i].slice(0,param.maxStr_lookingBackLine-4);
                //8 and 7 mean glay.
                connectedText += '\\c\[8\]' + temp_text + '\\c\[7\]\\{....\\}\\c\[0\]';
            }
        }
        //Draw connected text.
        this.drawTextEx(connectedText, rect.x + x, rect.y + y);
    };

    NTMO.POS.Window_SelectingLookingBack.prototype.getFileName = function(index) {
        return $gameSystem.synopsis().getDataList()[index].fileDict.fileName;
    };

    NTMO.POS.Window_SelectingLookingBack.prototype.getFirstPageText = function(index) {
        //Get a first page text.
        return $gameSystem.synopsis().getDataList()[index].textList[0];
    };

//////=============================================================================
///// NTMO.POS.Window_Confirm
/////  This class is for confirm window of synopsis scene.
/////=============================================================================
    NTMO.POS.Window_Confirm = function() {
        this.initialize.apply(this, arguments);
    };

    NTMO.POS.Window_Confirm.prototype = Object.create(Window_Command.prototype);
    NTMO.POS.Window_Confirm.prototype.constructor = NTMO.POS.Window_Confirm;

    NTMO.POS.Window_Confirm.prototype.initialize = function(x, y) {
        Window_Command.prototype.initialize.call(this, x, y);

        if(param.shouldShowConfirmWindow){
            this.activate();
        }else{
            this.deactivate();
            this.hide();
        }

        //Set position.
        var x  = Graphics.width/2  + param.offsetX_confirmWindow - this.width/2;
        var y  = Graphics.height/2 + param.offsetY_confirmWindow - this.height/2;
        this.x = x;
        this.y = y;
        //Set opacity
        this.opacity = param.opacity_confirmWindow;
    };

    NTMO.POS.Window_Confirm.prototype.makeCommandList = function() {
        this.addCommand(param.yes_confirmWindow, 'yes', true);
        this.addCommand(param.no_confirmWindow, 'no', true);
    };

    NTMO.POS.Window_Confirm.prototype.loadWindowskin = function() {
        if(param.skin_confirmWindow){
            this.windowskin = ImageManager.loadTsumio(param.skin_confirmWindow);
        }else{
            this.windowskin = ImageManager.loadSystem('Window');
        }
    };

    NTMO.POS.Window_Confirm.prototype.windowWidth = function() {
        return Graphics.width/1.5;
    };
    
    NTMO.POS.Window_Confirm.prototype.windowHeight = function() {
        return this.fittingHeight(this.numVisibleRows()) + this.fittingHeight(1);
    };

    NTMO.POS.Window_Confirm.prototype.numVisibleRows = function() {
        return 1;
    };

    NTMO.POS.Window_Confirm.prototype.maxCols = function() {
        return 2;
    };

    NTMO.POS.Window_Confirm.prototype.drawItem = function(index) {
        var rect  = this.itemRectForText(index);
        var align = this.itemTextAlign();
        var y     = this.contentsHeight() - this.itemHeight();
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawText(this.commandName(index), rect.x, y, rect.width, align);
    };

    NTMO.POS.Window_Confirm.prototype.drawDescription = function() {
        var text_width = this.textWidth(param.desc_confirmWindow);
        var center_x   = (this.contentsWidth() - text_width) / 2;
        this.drawTextEx(param.desc_confirmWindow, center_x, 0);
    };
    
    NTMO.POS.Window_Confirm.prototype.itemTextAlign = function() {
        return 'center';
    };

    NTMO.POS.Window_Confirm.prototype.refresh = function() {
        Window_Command.prototype.refresh.call(this);

        this.drawDescription();
    };

    NTMO.POS.Window_Confirm.prototype.hitTest = function(x, y) {
        if (this.isContentsArea(x, y)) {
            var cx = x - this.padding;
            var cy = y - this.padding;
            var topIndex = this.topIndex();
            for (var i = 0; i < this.maxPageItems(); i++) {
                var index = topIndex + i;
                if (index < this.maxItems()) {
                    var rect = this.itemRect(index);
                    var right = rect.x + rect.width;
                    var bottom = rect.y + rect.height + this.contentsHeight() - this.itemHeight();
                    if (cx >= rect.x && cy >= rect.y && cx < right && cy < bottom) {
                        return index;
                    }
                }
            }
        }
        return -1;
    };

    NTMO.POS.Window_Confirm.prototype._refreshCursor = function() {
        var pad = this._padding;
        var x = this._cursorRect.x + pad - this.origin.x;
        var y = this._cursorRect.y + pad - this.origin.y + this.contentsHeight() - this.itemHeight();
        var w = this._cursorRect.width;
        var h = this._cursorRect.height;
        var m = 4;
        var x2 = Math.max(x, pad);
        var y2 = Math.max(y, pad);
        var ox = x - x2;
        var oy = y - y2;
        var w2 = Math.min(w, this._width - pad - x2);
        var h2 = Math.min(h, this._height - pad - y2);
        var bitmap = new Bitmap(w2, h2);
    
        this._windowCursorSprite.bitmap = bitmap;
        this._windowCursorSprite.setFrame(0, 0, w2, h2);
        this._windowCursorSprite.move(x2, y2);
    
        if (w > 0 && h > 0 && this._windowskin) {
            var skin = this._windowskin;
            var p = 96;
            var q = 48;
            bitmap.blt(skin, p+m, p+m, q-m*2, q-m*2, ox+m, oy+m, w-m*2, h-m*2);
            bitmap.blt(skin, p+m, p+0, q-m*2, m, ox+m, oy+0, w-m*2, m);
            bitmap.blt(skin, p+m, p+q-m, q-m*2, m, ox+m, oy+h-m, w-m*2, m);
            bitmap.blt(skin, p+0, p+m, m, q-m*2, ox+0, oy+m, m, h-m*2);
            bitmap.blt(skin, p+q-m, p+m, m, q-m*2, ox+w-m, oy+m, m, h-m*2);
            bitmap.blt(skin, p+0, p+0, m, m, ox+0, oy+0, m, m);
            bitmap.blt(skin, p+q-m, p+0, m, m, ox+w-m, oy+0, m, m);
            bitmap.blt(skin, p+0, p+q-m, m, m, ox+0, oy+h-m, m, m);
            bitmap.blt(skin, p+q-m, p+q-m, m, m, ox+w-m, oy+h-m, m, m);
        }
    };

//////=============================================================================
///// Game_Synopsis
/////  This class manage synopsis window.
/////=============================================================================
    Game_Synopsis.prototype             = Object.create(Game_Synopsis.prototype);
    Game_Synopsis.prototype.constructor = Game_Synopsis;

    Game_Synopsis.prototype.initialize = function() {
        this._textList         = new Array();
        this._page             = 0;
        this._currentPage      = 0;
        this._bgm              = null;
        this._mainBackground   = null;
        this._subBackground    = null;
        this._particle         = null;
        this._picture          = null;
        this._picture_x        = 0;
        this._picture_y        = 0;
        this._picture_opacity  = 255;
        this._align            = 'left';
        this._commonEventNum   = null;
        this._voiceData        = new Array();
        //Save data.
        this._saveList         = new Array();//Dictionaly
        this._lastSelectedList = 0;
        //Temp data for LookingBackScene.
        this._tempSavingData   = null;
    };

    Game_Synopsis.prototype.isTextNull = function() {
        return this._textList.length <= 0;
    };

    Game_Synopsis.prototype.onLoad = function() {
        this._currentPage = 0;
    };

    Game_Synopsis.prototype.writeLine = function(text) {
        //Check the text.
        text = text.replace( /<POS>/ , '');//Hack : Prbabley this code cause any problem.

        if(!this._textList[this._page]){
            this._textList[this._page] = new Array();
        }
        this._textList[this._page] += text + '\n';
    };

    Game_Synopsis.prototype.reserveCommonEvent = function(num) {
        this._commonEventNum = num;
    };

    Game_Synopsis.prototype.newPage = function() {
        this._page++;
    };

    Game_Synopsis.prototype.setMainBackground = function(name) {
        this._mainBackground = name;
    };

    Game_Synopsis.prototype.setSubBackground = function(name) {
        this._subBackground = name;
    };

    Game_Synopsis.prototype.setParticle = function(name) {
        this._particle = name;
    };

    Game_Synopsis.prototype.setPicture = function(name, x, y, opacity) {
        this._picture         = name;
        this._picture_x       = x;
        this._picture_y       = y;
        this._picture_opacity = opacity;
    };

    Game_Synopsis.prototype.getParticle = function() {
        return this._particle;
    };

    Game_Synopsis.prototype.getMainBackground = function() {
        return this._mainBackground;
    };

    Game_Synopsis.prototype.getSubBackground = function() {
        return this._subBackground;
    };

    Game_Synopsis.prototype.getPicture = function() {
        if(!this._picture_opacity){
            this._picture_opacity = 255;
        }
        return {name:this._picture, x:this._picture_x, y:this._picture_y, opacity:this._picture_opacity};
    };

    Game_Synopsis.prototype.getCommonEventNum = function() {
        return this._commonEventNum;
    };

    Game_Synopsis.prototype.setBgm = function(name, volume, pitch) {
        volume = volume? volume : 100;
        pitch  = pitch ? pitch  : 100;
        this._bgm = {name:name, volume:volume, pitch:pitch};
    };

    Game_Synopsis.prototype.getBgm = function() {
        return this._bgm;
    };

    Game_Synopsis.prototype.clearAll = function() {
        this._textList        = new Array();
        this._page            = 0;
        this._currentPage     = 0;
        this._bgm             = null;
        this._mainBackground  = null;
        this._subBackground   = null;
        this._particle        = null;
        this._picture         = null;
        this._picture_x       = 0;
        this._picture_y       = 0;
        this._picture_opacity = 255;
        this._align           = 'left';
        this._commonEventNum  = null;
        this._voiceData       = new Array();
    };

    Game_Synopsis.prototype.clearTextAndPage = function() {
        this._textList    = new Array();
        this._page        = 0;
    };

    Game_Synopsis.prototype.clearAllBackground = function() {
        this._mainBackground  = null;
        this._subBackground   = null;
    };

    Game_Synopsis.prototype.clearParticle = function() {
        this._particle = null;
    };

    Game_Synopsis.prototype.clearPicture = function() {
        this._picture         = null;
        this._picture_x       = 0;
        this._picture_y       = 0;
        this._picture_opacity = 255;
    };

    Game_Synopsis.prototype.clearBgm = function() {
        this._bgm         = null;
    };

    Game_Synopsis.prototype.clearCommonEvent = function() {
        this._commonEventNum = null;
    };

    Game_Synopsis.prototype.shouldNextScene = function() {
        return this._page === this._currentPage;
    };

    Game_Synopsis.prototype.shouldPrevPage = function() {
        return this._currentPage > 0;
    };

    //This means setting 'current page voice'. 
    Game_Synopsis.prototype.setVoice = function(fileName) {
        this._voiceData[this._page] = fileName;
    };

    //This means getting 'current page voice'. 
    Game_Synopsis.prototype.getVoice = function() {
        return this._voiceData[this._currentPage];
    };

    Game_Synopsis.prototype.nextPage = function() {
        this._currentPage++;
    };

    Game_Synopsis.prototype.prevPage = function() {
        this._currentPage--;
    };

    Game_Synopsis.prototype.canNextPage = function() {
        return this.getCurrentPage() < this.getMaxPage();
    };


    Game_Synopsis.prototype.canPrevPage = function() {
        return this.getCurrentPage() > 0;
    };

    Game_Synopsis.prototype.getCurrentPageTextList = function() {
        return this._textList[this._currentPage];
    };

    Game_Synopsis.prototype.getCurrentPage = function() {
        return this._currentPage;
    };

    Game_Synopsis.prototype.getMaxPage = function() {
        return this._page;
    };

    Game_Synopsis.prototype.setAlign = function(align) {
        switch(align){
            case 'left' : 
                this._align = 'left';
                break;
            case 'right' : 
                this._align = 'right';
                break;
            case 'center' :
                this._align = 'center'; 
                break;
            default:
                this._align = 'left';
                break;
        }
    };

    Game_Synopsis.prototype.getAlign = function() {
        return this._align;
    };

    Game_Synopsis.prototype.saveSynopsis = function(fileName) {
        //Set next file number.
        var nextFileNum = this._saveList.length;
        var listLength  = this._saveList.length;

        if(!fileName){
            fileName = String(nextFileNum);
        }
        //Confirm whether there is the same file name.
        for (var i = 0; i < listLength; i++){
            if(this._saveList[i].fileDict.fileName === fileName){
                //If the same name, get an index.
                nextFileNum = this._saveList[i].fileDict.fileNum;
                break;
            }
        }

        this._saveList[nextFileNum] = 
        {
            textList        : this._textList,
            page            : this._page,
            currentPage     : this._currentPage,
            bgm             : this._bgm,
            mainBackground  : this._mainBackground,
            subBackground   : this._subBackground,
            particle        : this._particle,
            picture         : this._picture,
            picture_x       : this._picture_x,
            picture_y       : this._picture_y,
            picture_opacity : this._picture_opacity,
            align           : this._align,
            commonEventNum  : this._commonEventNum,
            voiceData       : this._voiceData,
            fileDict        : {fileNum : nextFileNum, fileName : fileName}
        }
    };

    Game_Synopsis.prototype.loadSynopsis = function(fileName) {
        var fileNum     = -1;
        var listLength  = this._saveList.length;
        //Confirm whether there is the file.
        for (var i = 0; i < listLength; i++){
            if(this._saveList[i].fileDict.fileName === fileName){
                //If the same name, get an index.
                fileNum = this._saveList[i].fileDict.fileNum;
                break;
            }
        }

        //Load data.
        if(fileNum >= 0 && this._saveList.length > fileNum) {
            this._textList        = this._saveList[fileNum].textList;
            this._page            = this._saveList[fileNum].page;
            this._currentPage     = this._saveList[fileNum].currentPage;
            this._bgm             = this._saveList[fileNum].bgm;
            this._mainBackground  = this._saveList[fileNum].mainBackground;
            this._subBackground   = this._saveList[fileNum].subBackground;
            this._particle        = this._saveList[fileNum].particle;
            this._picture         = this._saveList[fileNum].picture;
            this._picture_x       = this._saveList[fileNum].picture_x;
            this._picture_y       = this._saveList[fileNum].picture_y;
            this._picture_opacity = this._saveList[fileNum].picture_opacity;
            this._align           = this._saveList[fileNum].align;
            this._commonEventNum  = this._saveList[fileNum].commonEventNum;
            this._voiceData       = this._saveList[fileNum].voiceData;
        }else{
            console.group();
            console.error('%cfileNum is invalid ! You should check the following parameter !','background-color: #5174FF');
            console.error('Game_Synopsis.prototype.LoadSynopsis()');
            console.groupEnd();
        }
    };

    Game_Synopsis.prototype.getDataLength = function() {
        return this._saveList.length;
    };

    Game_Synopsis.prototype.getDataList = function() {
        return this._saveList;
    };

    Game_Synopsis.prototype.getLastSelectedList = function() {
        return (this._lastSelectedList >= 0) ? this._lastSelectedList : this._lastSelectedList = 0;
    };

    Game_Synopsis.prototype.setLastSelectedList = function(index) {
        this._lastSelectedList = (index >= 0) ? index : 0;
    };

    Game_Synopsis.prototype.saveCurrentDataToTemp = function() {
        this._tempSavingData = 
        {
            textList        : this._textList,
            page            : this._page,
            currentPage     : this._currentPage,
            bgm             : this._bgm,
            mainBackground  : this._mainBackground,
            subBackground   : this._subBackground,
            particle        : this._particle,
            picture         : this._picture,
            picture_x       : this._picture_x,
            picture_y       : this._picture_y,
            picture_opacity : this._picture_opacity,
            align           : this._align,
            commonEventNum  : this._commonEventNum,
            voiceData       : this._voiceData,
        }
    };

    Game_Synopsis.prototype.loadCurrentDataFromTemp = function() {
        this._textList        = this._tempSavingData.textList;
        this._page            = this._tempSavingData.page;
        this._currentPage     = this._tempSavingData.currentPage;
        this._bgm             = this._tempSavingData.bgm;
        this._mainBackground  = this._tempSavingData.mainBackground;
        this._subBackground   = this._tempSavingData.subBackground;
        this._particle        = this._tempSavingData.particle;
        this._picture         = this._tempSavingData.picture;
        this._picture_x       = this._tempSavingData.picture_x;
        this._picture_y       = this._tempSavingData.picture_y;
        this._picture_opacity = this._tempSavingData.picture_opacity;
        this._align           = this._tempSavingData.align;
        this._commonEventNum  = this._tempSavingData.commonEventNum;
        this._voiceData       = this._tempSavingData.voiceData;
    };

    Game_Synopsis.prototype.loadSynopsisForLookingBack = function(fileNum) {
        //Load data.
        if(fileNum >= 0 && this._saveList.length > fileNum) {
            this._textList        = this._saveList[fileNum].textList;
            this._page            = this._saveList[fileNum].page;
            this._currentPage     = this._saveList[fileNum].currentPage;
            this._bgm             = this._saveList[fileNum].bgm;
            this._mainBackground  = this._saveList[fileNum].mainBackground;
            this._subBackground   = this._saveList[fileNum].subBackground;
            this._particle        = this._saveList[fileNum].particle;
            this._picture         = this._saveList[fileNum].picture;
            this._picture_x       = this._saveList[fileNum].picture_x;
            this._picture_y       = this._saveList[fileNum].picture_y;
            this._picture_opacity = this._saveList[fileNum].picture_opacity;
            this._align           = this._saveList[fileNum].align;
            this._commonEventNum  = this._saveList[fileNum].commonEventNum;
            this._voiceData       = this._saveList[fileNum].voiceData;
        }else{
            console.group();
            console.error('%cfileNum is invalid ! You should check the following parameter !','background-color: #5174FF');
            console.error('Game_Synopsis.prototype.LoadSynopsis()');
            console.groupEnd();
        }
    };

////==============================
//// NTMO.POS.Scrolling
////  This class is for scrolling POS scene images.
//==============================
    NTMO.POS.ScrollBackImages = function(parent) {
        this.initialize.apply(this, arguments);
    };

    NTMO.POS.ScrollBackImages.prototype.initialize = function(parent, mainFileName, subFileName) {
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
    };

    NTMO.POS.ScrollBackImages.prototype.createSprites = function() {
        //Create.
        this._backMainSprite = new TilingSprite(ImageManager.loadTsumio(this.getMainFileName()));
        this._backSubSprite  = new TilingSprite(ImageManager.loadTsumio(this.getSubFileName()));
        //AddChild.
        this._parent.addChild(this._backMainSprite);
        this._parent.addChild(this._backSubSprite);
    };

    NTMO.POS.ScrollBackImages.prototype.moveMainSprite = function(x, y, width, height) {
        this._backMainSprite.move(x, y, width, height);
    };

    NTMO.POS.ScrollBackImages.prototype.moveSubSprite = function(x, y, width, height) {
        this._backSubSprite.move(x, y, width, height);
    };

    NTMO.POS.ScrollBackImages.prototype.setMainSpeed = function(speedX, speedY) {
        this._mainSpeedX = (isFinite(speedX)) ? speedX : 0;
        this._mainSpeedY = (isFinite(speedY)) ? speedY : 0;
    };

    NTMO.POS.ScrollBackImages.prototype.setSubSpeed = function(speedX, speedY) {
        this._subSpeedX = (isFinite(speedX)) ? speedX : 0;
        this._subSpeedY = (isFinite(speedY)) ? speedY : 0;
    };

    NTMO.POS.ScrollBackImages.prototype.getMainFileName = function() {
        if(this._mainFileName){
            return this._mainFileName;
        }
        return null;
    };

    NTMO.POS.ScrollBackImages.prototype.getSubFileName = function() {
        if(this._subFileName){
            return this._subFileName;
        }
        return null;
    };

    NTMO.POS.ScrollBackImages.prototype.update = function() {
        this.updateOriginPosition();
    };

    NTMO.POS.ScrollBackImages.prototype.updateOriginPosition = function() {
        //Main.
        this._backMainSprite.origin.x += this._mainSpeedX;
        this._backMainSprite.origin.y += this._mainSpeedY;
        //Sub.
        this._backSubSprite.origin.x  += this._subSpeedX;
        this._backSubSprite.origin.y  += this._subSpeedY;
    };

////==============================
//// NTMO.POS.ParticleImage
////  This class implements particle image for POS scene.
//==============================
    NTMO.POS.ParticleImage = function(parent, fileName, opacity, blendMode, isFlashing) {
        this.initialize.apply(this, arguments);
    };

    NTMO.POS.ParticleImage.prototype.initialize = function(parent, fileName, opacity, blendMode, isFlashing) {
        //Initialize basic settings.
        this._parent         = parent;//parent scene.
        this._particleSprite = null;
        this._speedX         = 0;
        this._speedY         = 0;
        this._fileName       = fileName;

        //Flashing settings.
        this._opacity        = Number(opacity);
        this._blendMode      = Number(blendMode);//0:Normal 1:Addition 2:Multiplication 3:Screen
        this.CENTER_OPACITY  = 255/2;
        this._amp            = this._opacity / 2;//Wave amplitude
        this._phase          = 0;//Wave phase
        this._isFlashing     = isFlashing;

        //Create.
        this.createSprite();
        this.moveSprite(0, 0, Graphics.width, Graphics.height);
    };

    NTMO.POS.ParticleImage.prototype.createSprite = function() {
        //Create and set.
        this._particleSprite           = new TilingSprite(ImageManager.loadTsumio(this.getFileName()));
        this._particleSprite.blendMode = this._blendMode;
        this._particleSprite.opacity   = this._opacity;
        //AddChild.
        this._parent.addChild(this._particleSprite);
    };

    NTMO.POS.ParticleImage.prototype.moveSprite = function(x, y, width, height) {
        this._particleSprite.move(x, y, width, height);
    };

    NTMO.POS.ParticleImage.prototype.setSpeed = function(speedX, speedY) {
        this._speedX = (isFinite(speedX)) ? speedX : 0;
        this._speedY = (isFinite(speedY)) ? speedY : 0;
    };

    NTMO.POS.ParticleImage.prototype.getFileName = function() {
        if(this._fileName){
            return this._fileName;
        }
        return null;
    };

    NTMO.POS.ParticleImage.prototype.isFlashing = function() {
        return this._isFlashing;
    };

    NTMO.POS.ParticleImage.prototype.update = function() {
        this.updateOriginPosition();
        this.updateOpacity();
    };

    NTMO.POS.ParticleImage.prototype.updateOriginPosition = function() {
        this._particleSprite.origin.x += this._speedX;
        this._particleSprite.origin.y += this._speedY;
    };

    NTMO.POS.ParticleImage.prototype.updateOpacity = function() {
        if(this.isFlashing()){
            //Get new opacity.
            var d         = Math.sin(this._phase * Math.PI / 180);
            this._opacity = d * this._amp + this.CENTER_OPACITY;
            this._phase++;
            //Set new opacity.
            this._particleSprite.opacity = this._opacity;
        }
    };

})();