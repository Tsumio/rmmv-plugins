//=============================================================================
// MOG_PictureGallery_Patch.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2018 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2018/01/15 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc Patch plugin for MOG_PictureGallery.
 * @author Tsumio
 *
 * @param ----Basic Settings----
 * @desc 
 * @default 
 * 
 * 
 * @help Patch plugin for MOG_PictureGallery.
 * 
 * ----feature----
 * -> Patch plugin for MOG_PictureGallery.
 * -> Changes in "Number of Pictures" will be reflected even after save data is created.
 * 
 * ----how to use----
 * This plugin does not work on its own.
 * Please install MOG_PictureGallery above this plugin when installing.
 * 
 * MOG_PictureGallery will not reflect the change of "Number of Pictures" after save data is created.
 * When this patch is introduced, changes in "Number of Pictures" will be reflected even after save data is created.
 * 
 * Anyway, Moghunter released a wonderful plugin MOG_PictureGallery !
 * THANKS A LOT !
 * See his site.
 * https://atelierrgss.wordpress.com/
 * 
 * ----plugin command----
 * There is no plugin command.
 * 
 * ----change log---
 * 1.0.0 2018/01/15 Release.
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
 * @plugindesc MOG_PictureGalleryのパッチプラグインです。
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * 
 * @help MOG_PictureGalleryのパッチプラグインです。
 * 
 * 【特徴】
 * ・MOG_PictureGalleryのパッチプラグインです。
 * ・セーブデータ保存後もピクチャの最大登録数の変更が反映されるようになります。
 * 
 * 【使用方法】
 * このプラグインは単体では動作しません。
 * 導入する際は、このプラグインより上にMOG_PictureGalleryを設置するようにしてください。
 * 
 * MOG_PictureGalleryはセーブデータ保存後、ピクチャの最大登録数の変更が反映されなくなります。
 * このパッチを導入すると、セーブデータ保存後もピクチャの最大登録数の変更が反映されるようになります。
 * 
 * MOG_PictureGalleryの作者はMoghunter氏です。
 * すばらしいプラグインをありがとう！
 * Moghunter氏は以下のサイトを運営しています。
 * https://atelierrgss.wordpress.com/
 * 
 * 【プラグインコマンド】
 * プラグインコマンドはありません。
 * 
 * 【更新履歴】
 * 1.0.0 2018/01/15 公開。
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

var Moghunter = Moghunter;

(function() {
    'use strict';
    var pluginName = 'MOG_PictureGallery_Patch';

////=============================================================================
//// Game_System
////  Add refresh method.
////=============================================================================
    Game_System.prototype.refreshPictureList = function() {
        const length = this._picgl_data.length;
        for(let i = length; i < Moghunter.picturegallery_picture_number; i++) {
            this._picgl_data[i] = [false, String(Moghunter.picturegallery_file_name + (i + 1))];
        }
    }

////=============================================================================
//// Scene_Map
////  Override create.
////=============================================================================
    const _Scene_Map_create = Scene_Map.prototype.create;
    Scene_Map.prototype.create = function() {
        _Scene_Map_create.call(this);
        if ($gameSystem._picgl_data){
            $gameSystem.refreshPictureList();
        }
     }

})();
