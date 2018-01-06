//=============================================================================
// SuperFastInput.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2018 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2018/01/06 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc Super-fast input sample program.
 * @author Tsumio
 *
 * @param ----Basic Settings----
 * @desc 
 * @default 
 * 
 * 
 * @help Super-fast input sample program.
 * 
 * ----feature----
 * -> Super-fast input sample program.
 * 
 * ----how to use----
 * Just by installing the plugin.
 * 
 * ----plugin command----
 * There is no plugin command.
 * 
 * ----change log---
 * 1.0.0 2018/01/06 Release.
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
 * @plugindesc 高速キー入力対応プログラムのサンプルです。
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * 
 * @help 高速キー入力対応プログラムのサンプルです。
 * 
 * 【特徴】
 * ・高速キー入力対応プログラムのサンプルです。
 * 
 * 【使用方法】
 * プラグインを導入するだけで使用できます。
 * 
 * 【プラグインコマンド】
 * プラグインコマンドはありません。
 * 
 * 【更新履歴】
 * 1.0.0 2018/01/06 公開。
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
    var pluginName = 'SuperFastInput';

////==============================
//// Global Settings.
////==============================
    let param           = {};
    param.okKeyCounter  = 0;
    param.anyKeyCounter = 0;
    param.inputedKeys   = [];


////=============================================================================
//// SuperFastInput
////  Get keys.
////=============================================================================
    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function () {
        _Scene_Map_update.call(this);

        this.captureInput();
        
        if (Input.isTriggered('shift')) {
            for (let i = 0; i < 1000; i++) {
                this.createTestSprite();
            }
            this.resetCounter();
        }

        this.releaseInput();
    };

    Scene_Map.prototype.createTestSprite = function () {
        const bitmap = ImageManager.loadFace('Actor1');
        const sprite = new Sprite(bitmap);
        this.addChild(sprite);
    };

    Scene_Map.prototype.resetCounter = function () {
        param.okKeyCounter  = 0;
        param.anyKeyCounter = 0;
    };
    
    Scene_Map.prototype.captureInput = function () {
        for (let key of param.inputedKeys) {
            if(key === 90){//Zキー
                param.okKeyCounter++;
                console.log(`決定キー押された回数：${param.okKeyCounter}`);
            }
        }
    };

    Scene_Map.prototype.releaseInput = function () {
        param.inputedKeys.splice(0, param.inputedKeys.length);
    };

    //Create key state array.
    let keyState = [];
    for (let i = 0; i < 256; i++) {
        keyState[i] = { index:i, value:false };
    }

    //Key up
    function onKeyUpOriginal(event) {
        for (let key of keyState) {
            if (event.keyCode === key.index) {
                key.value = false;
            }
        }
    }
    document.addEventListener('keyup', onKeyUpOriginal.bind(this));

    //Key down
    function onKeyDownOriginal(event) {
        for (let key of keyState) {
            if (event.keyCode === key.index && !key.value) {
                key.value = true;
                param.anyKeyCounter++;
                console.log(`何らかのキー押された回数：${param.anyKeyCounter}`);
                param.inputedKeys.push(key.index);
            }
        }
    }
    document.addEventListener('keydown', onKeyDownOriginal.bind(this));

})();
