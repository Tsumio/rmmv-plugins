//=============================================================================
// ChoiceListBugFix.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2017/09/16 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc This plugin fix a bug in choice list.
 * @author Tsumio
 *
 * 
 * @help This plugin fix a bug in choice list.
 * 
 * In the default behavior of RPGMaker, when you press the Up key from "No choice" and "Default" set to "None" in the "Show Choice", the cursor appears on the second choice from the bottom (from Alihycotto.Thanks!).
 * This plugin modify this behavior.
 * In other words, select the lowest option by pressing the Up key from the unselected state.
 * 
 * ----change log---
 * 1.0.0 2017/09/16 Release.
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
 * @plugindesc 選択肢のバグ修正用プラグインです
 * @author ツミオ
 *
 * 
 * @help 選択肢のバグ修正用プラグインです
 * 
 * ツクールのデフォルトの動作では、「選択肢の表示」で「デフォルト」を「なし」に設定したものが、無選択の状態から上キーを押すと、下から２番目の選択肢にカーソルが出ます（アリヒコットさんより）。
 * この挙動を修正し、無選択の状態から上キーを押すと一番下の選択肢を選択するようにします。
 * 
 * 
 * 【更新履歴】
 * 1.0.0 2017/09/16 公開。
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
    var pluginName = 'ChoiceListBugFix';

    var _Window_ChoiceList_cursorUp = Window_ChoiceList.prototype.cursorUp;
    Window_ChoiceList.prototype.cursorUp = function(wrap) {
        if(this.index() === -1 && $gameMessage.choiceDefaultType() === -1){
            this.select(this.maxItems()-1);
            return;
        }

        _Window_ChoiceList_cursorUp.call(this, wrap);
    };

})();