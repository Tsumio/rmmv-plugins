//=============================================================================
// WarnGamePadConnecting.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.1 2017/10/05 ブラウザ版にも対応。
// 1.0.0 2017/10/05 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc This plugin report the gamepad has been disconnected.
 * @author Tsumio
 *
 * @param ----Basic Settings----
 * @desc 
 * @default 
 * 
 * @param DisconnectingMessage
 * @type text
 * @desc This message is displayed when the gamepad is disconnected.
 * @default Gamepad is disconnected.Please reconnect.
 * 
 * @param ReloadedMessage
 * @type text
 * @desc This message is displayed when the window is reloaded.
 * @default Gamepad is probably disconnected.Please reconnect if necessary.
 * 
 * 
 * 
 * @help This plugin report the gamepad has been disconnected.
 * 
 * ----feature----
 * -> When the game pad is disconnected, you can display a message demanding reconnection.
 * -> In addition to physical disconnection, a message is displayed even when the screen is reloaded by F5 key etc.
 * 
 * ----how to use----
 * You can use this plugin just by introducing.
 * If necessary, set the plugin parameter.
 * 
 * If the gamepad is not connected (unrecognized state), message will not be displayed.
 * As a rule, you will need to enter some kind of button to recognize the game pad.
 * Please note that it is not recognized at startup.
 * 
 * This plugin assumes a local environment, it works to some extent also in a browser environment.
 * For example, in case of chrome, even if you press F5 key, message will not be displayed, but message will be displayed when physically disconnected.
 * Also, it seemed that display of alert was blocked at RPGatsumaru.
 * Please acknowledge that in other browser environments there may be a problem.
 * 
 * ----reason why setting two message----
 * The reason for setting two types of sentences in the plugin parameters is as follows.
 * 
 * When physically disconnected, it can be seen that it is disconnected certainly.
 * So "DisconnectingMessage" is displayed.
 * 
 * When reloading with F5 key etc., there may be cases that it is not disconnected.
 * It is probably depending on the environment (but I have not confirmed that.).
 * Therefore, "ReloadedMessage" is displayed.
 * 
 * ----plugin command----
 * There is no plugin command.
 * 
 * ----change log---
 * 1.0.1 2017/10/05 Supports browser version.
 * 1.0.0 2017/10/05 Release.
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
 * @plugindesc ゲームパッドが切断されたことを報告するプラグインです。
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * @param 切断メッセージ
 * @type text
 * @desc ゲームパッドが切断されたときに表示するメッセージ内容です。
 * @default ゲームパッドが切断されました。再接続してください。
 * 
 * @param リロード時のメッセージ
 * @type text
 * @desc ゲームがF5キーなどによってリロードされたときに表示するメッセージです。
 * @default ゲームパッドが切断された可能性があります。必要があれば再接続してください。
 * 
 * @help ゲームパッドが切断されたことを報告するプラグインです。
 * 
 * 【特徴】
 * ・ゲームパッドが切断されたとき、再接続を促すメッセージを表示させることができます。
 * ・物理的な切断のほか、F5キーなどによって画面がリロードされた場合にもメッセージを表示します。
 * 
 * 【使用方法】
 * プラグインを導入するだけで使用できます。
 * 必要があればプラグインパラメーターを設定してください。
 * 
 * ゲームパッドが接続されていない状態（認識されていない状態）の場合はメッセージを表示しません。
 * 通常、何かしらのボタンを入力しなければゲームパッドは認識されません。
 * つまり起動時に何もしなければゲームパッドは認識されていません。ご注意ください。
 * 
 * 当プラグインはローカル環境を想定していますが、ブラウザ環境でもある程度は動作します。
 * 例えばクロームの場合、F5キーを押してもメッセージは表示されませんが、物理的な切断時にはメッセージが表示されます。
 * また、RPGアツマールではアラートの表示がブロックされるようでした。
 * 他にもブラウザ環境では問題があるかもしれませんので、その点ご了承ください。
 * 
 * 【メッセージをわけている理由】
 * プラグインパラメーターに二種類の文章を設定する理由は以下の通りです。
 * 
 * 物理的に切断された場合、確実に切断されているとわかるので「切断メッセージ」を表示させています。
 * 
 * F5キーなどでリロードされた場合、環境によっては切断されていない場合があるかもしれません（未確認）。
 * したがって「リロード時のメッセージ」を表示させています。
 * 
 * 【プラグインコマンド】
 * このプラグインにプラグインコマンドはありません。
 * 
 * 
 * 【更新履歴】
 * 1.0.1 2017/10/05 ブラウザ版にも対応。
 * 1.0.0 2017/10/05 公開。
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
    var pluginName = 'WarnGamePadConnecting';

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

////=============================================================================
//// Get and set pluguin parameters.
////=============================================================================
    var param         = {};
    //Basic Stteings
    param.disconnectingMessage     = getParamString(['DisconnectingMessage', '切断メッセージ']);
    param.reloadedMessage          = getParamString(['ReloadedMessage', 'リロード時のメッセージ']);

////=============================================================================
//// Display disconnecting alert.
////=============================================================================
    function alertDisconnectingError(){
        window.alert(param.disconnectingMessage);
    }

    function alertReloadedMessage(){
        window.alert(param.reloadedMessage);
    }

    function addEventListenerForNwjs(){
        var gui = require('nw.gui');
        var win = gui.Window.get();
        win.on('loaded', function(){

            window.addEventListener('gamepaddisconnected', function(e) {
                alertDisconnectingError();
            });

            //Emitted when window reloaded(F5).
            win.on('loading', function() {
                if(navigator.getGamepads()[0]){
                    alertReloadedMessage();
                }
            });
        });
    }

    function addEventListenerForOthers() {
        window.addEventListener('gamepaddisconnected', function(e) {
            alertDisconnectingError();
        });

        var isChrome = (ua.indexOf('chrome') > -1) && (ua.indexOf('edge') == -1);
        if(!isChrome){
            window.addEventListener("beforeunload", function (e) {
                if (navigator.getGamepads) {
                    if(navigator.getGamepads()[0]){
                            var confirmationMessage = param.reloadedMessage;
                            e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
                            return confirmationMessage;              // Gecko, WebKit, Chrome <34
                    }
                }
            });
        }

        document.addEventListener("DOMContentLoaded", function(event) {
            document.addEventListener("keydown" , function(e){
                if(e.keyCode === 116){//F5
                    if (navigator.getGamepads) {
                        if(navigator.getGamepads()[0]){
                            alertReloadedMessage();
                        }
                    }
                }
            });
        });
    }

    //Execute.
    if(!Utils.isNwjs()){
        addEventListenerForOthers();
    }

////=============================================================================
//// SceneManager
////  Add a original event listener.
////=============================================================================
    var _SceneManager_initialize = SceneManager.initialize;
    SceneManager.initialize        = function() {
        _SceneManager_initialize.apply(this, arguments);
        if(Utils.isNwjs()){
            addEventListenerForNwjs();
        }
    };

})();

