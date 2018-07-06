//=============================================================================
// MenuCommonSample.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2018/07/06 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc Add a original command to MenuScene.
 * @author Tsumio
 *
 * @param ----Basic Settings----
 * @desc 
 * @default 
 * 
 * 
 * 
 * @help Add a original command to MenuScene.
 * 
 * ----feature----
 * -> Add a original command to MenuScene.
 * -> This plugin was created for blog posts.
 * 
 * ----how to use----
 * After introducing the plugin, new command are added to the menu scene.
 * The added command is enabled when switch number 1 is ON.
 * 
 * This plugin was created for blog posts.
 * 
 * ----change log---
 * 1.0.0 2018/07/06 Release.
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
 * @plugindesc メニューにコマンドを追加します。
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * 
 * @help メニューにコマンドを追加
 * このプラグインはブログの解説記事用に作成されました。
 * 
 * 【特徴】
 * ・メニューにコマンドが追加されます
 * ・ブログの解説記事用のプラグインです
 * 
 * 【使用方法】
 * プラグインの導入後、メニューにコマンドが追加されます。
 * 追加されたコマンドはスイッチ番号1がONのときに有効です。
 * 
 * このプラグインはブログの解説記事用に作成されました。
 * 
 * 【更新履歴】
 * 1.0.0 2018/07/06 公開。
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

////=============================================================================
//// Window_MenuCommand
////  メニューにコモンイベント用のコマンドを追加する
////=============================================================================

    //オリジナルコマンドを追加する
    const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        _Window_MenuCommand_addOriginalCommands.call(this);
        const menuText   = 'コモンイベント1';//メニューに表示するコマンドの文字列
        const symbolName = 'common1';//プログラム内で参照するシンボル名
        const enabled    = $gameSwitches.value(1);//プログラム内で参照するスイッチ番号。これがONなら利用可能になり、OFFなら利用不可になる。
        this.addCommand(menuText, symbolName, enabled);//コマンドを実際に追加する
    };

////=============================================================================
//// Scene_Menu
////  コマンドが選択されたときの処理
////=============================================================================
    
    //コマンドウィンドウ作成時に、オリジナルのコマンドのハンドラーを登録する
    const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _Scene_Menu_createCommandWindow.call(this);
        const symbolName = 'common1';//プログラム内で参照するシンボル名
        this._commandWindow.setHandler(symbolName, this.onSelectedCommon1.bind(this));//コマンドが選択されたときの処理を登録する
    };

    //オリジナルのコマンドが選択されたときに呼ばれる
    Scene_Menu.prototype.onSelectedCommon1 = function() {
        //おこないたい処理を書いていく。
        //処理はなんでもOKだが、ピクチャの表示等の一部の処理は不可（コアスクリプトの改造が必要）。
        this.recoverAllMembers();//メンバーのHPを全快する
        this._commandWindow.activate();//activateを呼ばないと固まって操作不能になるので、今回の場合は入れておく
        this._statusWindow.refresh();//refreshを呼ばないと、HPの回復がステータス画面上の見た目に反映されない
    };

    //メンバーのHPを全快する処理。
    Scene_Menu.prototype.recoverAllMembers = function() {
        //メンバー一人ひとりを取り出し、gainHp()を実行している。
        //よくわからない構文かもしれないので、ここでは単に「全員のHPを回復させているんだなー」くらいの認識でOK
        $gameParty.members().forEach( function(actor) {
            actor.gainHp(99999);
        });
    };

})();
