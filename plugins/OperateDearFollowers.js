//=============================================================================
// OperateDearFollowers.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.2 2017/09/10 フォロワーの操作解除時、自動ですり抜けをONにするよう変更。
// 1.0.1 2017/09/09 プラグインコマンドを追加。不具合の修正。
// 1.0.0 2017/09/09 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc This plugin enables the operation of the follower.
 * @author Tsumio
 *
 * @param ----Basic Settings----
 * @desc 
 * @default 
 * 
 * @param OperatingSwitchNumber
 * @type switch
 * @desc When you want to operate followers, this switch should be turned on.
 * @default 11
 * 
 * @help This plugin enables the operation of the follower.
 * 
 * ----feature----
 * -> Turn on a specific switch so you can operate the follower.
 * -> When you switch off the switch, the follower will automatically return.
 * 
 * ----how to use----
 * You can use this plugin after setting some plugin parameters.
 * 
 * ----script command operation----
 * When you want to operate a follower with a script command, turn ON the operation switch and write the following script.
 * this.operateFollower(followerNumber, moveRoute);
 * 
 * "followerNumber" start from 0;
 * "moveRoute" of argument can be received the same object as the object passed to the forceMoveRoute method.
 * Details of moveRoute are written in the following site.
 * https://ameblo.jp/rpgmaker1892/entry-12113554385.html
 * 
 * For example.
 * When you want the first follower to move to right one step, write as the following.
 *     var moveRoute = {
 *       "list":[{"code":3},
 *       ],
 *       "repeat":false,
 *       "skippable":true,
 *       "wait":true};
 *   this.operateFollower(0, moveRoute);
 * 
 * ----plugin command----
 * All plugin commands start with "ODF".
 * Plugin commands are distinguish uppercase and lowercase.
 * And separate each word with a space.
 * Please make sure.
 * 
 * "ODF processRouteEnd FollowerNumber" : RouteEnd.
 * "ODF moveDown FollowerNumber"  : Move down.
 * "ODF moveLeft FollowerNumber"  : Move left.
 * "ODF moveRight FollowerNumber" : Move right.
 * "ODF moveUp FollowerNumber"    : Move up.
 * "ODF moveLowerLeft FollowerNumber"  : Move lower left.
 * "ODF moveLowerRight FollowerNumber" : Move lower right.
 * "ODF moveUpperLeft FollowerNumber"  : Move upper left.
 * "ODF moveUpperRight FollowerNumber" : Move upper right.
 * "ODF moveRandom FollowerNumber" : Move random.
 * "ODF moveTowardPlayer FollowerNumber"   : Move toward player.
 * "ODF moveAwayFromPlayer FollowerNumber" : Move away from player.
 * "ODF moveForward FollowerNumber"  : Move forward.
 * "ODF moveBackward FollowerNumber" : Move backward.
 * "ODF turnDown FollowerNumber"  : Turn down.
 * "ODF turnLeft FollowerNumber"  : Turn left.
 * "ODF turnRight FollowerNumber" : Turn right.
 * "ODF turnUp FollowerNumber"    : Turn up.
 * "ODF turnRight90 FollowerNumber" : Turn right 90 dgrees.
 * "ODF turnLeft90 FollowerNumber" : Turn left 90 dgrees.
 * "ODF turn180 FollowerNumber" : Turn 180 dgrees.
 * "ODF turnRightOrLeft90 FollowerNumber" : Turn right or left 90 dgrees.
 * "ODF turnRandom FollowerNumber" : Turn random.
 * "ODF turnTowardPlayer FollowerNumber" : Turn toward player.
 * "ODF turnAwayFromPlayer FollowerNumber" : Turn away from player.
 * "ODF setWalkAnimeOn FollowerNumber" : On walking anime.
 * "ODF setWalkAnimeOff FollowerNumber" : Off walking anime.
 * "ODF setStepAnimeOn FollowerNumber" : On stepping anime.
 * "ODF setStepAnimeOff FollowerNumber" : Off stepping anime.
 * "ODF setDirectionFixOn FollowerNumber" : On fixing direction.
 * "ODF setDirectionFixOff FollowerNumber" : Off fixing direction.
 * "ODF setThroughOn FollowerNumber" : On through mode.
 * "ODF setThroughOff FollowerNumber" : Off through mode.
 * "ODF setTransparentOn FollowerNumber" : On transparent mode.
 * "ODF setTransparentOff FollowerNumber" : Off transparent mode.
 * "ODF jump FollowerNumber OffsetX OffsetY" : Jump.
 * "ODF setImage FollowerNumber ImageName ImageNumber" : Change character image.
 * "ODF wait FollowerNumber WaitTime" : Wait.
 * "ODF setMoveSpeed FollowerNumber Speed" : Change moving speed.
 * "ODF setMoveFrequency FollowerNumber Frequency" : Change moving requency.
 * "ODF setOpacity FollowerNumber Opacity" : Change opacity.
 * "ODF setBlendMode FollowerNumber BlendMode" : Change blend mode.
 * 
 * ----change log---
 * 1.0.2 2017/09/10 When canceling the follower's operation, change to automatically turn on through mode.
 * 1.0.1 2017/09/09 Add plugin commands.Bug fix.
 * 1.0.0 2017/09/09 Release.
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
 * @plugindesc フォロワーを操作するプラグインです。
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * @param 操作用スイッチ番号
 * @type switch
 * @desc フォロワーを操作したいとき、ONにするスイッチ番号を設定します。
 * @default 11
 * 
 * @help フォロワーを操作するプラグインです。
 * 
 * 【特徴】
 * ・特定のスイッチをONにすると、フォロワーを操作できるようになります。
 * ・スイッチをOFFにすると、フォロワーは自動で戻ってきます。
 * 
 * 【使用方法】
 * プラグインの導入後、プラグインパラメーターを設定することによって使用できます。
 * 
 * 
 * 【スクリプトコマンドでの操作】
 * フォロワーをスクリプトコマンドで操作するには、操作用のスイッチをONにしたあと、以下のような記述をします。
 * this.operateFollower(followerNumber, moveRoute);
 * 
 * followerNumberは0から始まります。
 * 引数moveRouteには、forceMoveRouteメソッドに渡すオブジェクトと同じオブジェクトを渡せます。
 * moveRouteの詳細は、以下のサイトに詳しく載っています。
 * https://ameblo.jp/rpgmaker1892/entry-12113554385.html
 * 
 * 例えば一番最初のフォロワーを右に一歩動かしたい場合、以下のように記述します。
 *     var moveRoute = {
 *       "list":[{"code":3},
 *       ],
 *       "repeat":false,
 *       "skippable":true,
 *       "wait":true};
 *   this.operateFollower(0, moveRoute);
 * 
 * 【プラグインコマンド】
 * 全てのプラグインコマンドは「ODF」から始まります。
 * また、説明上では視認性のためにカギカッコを使用していますが、実際にプラグインコマンドに入力する際には
 * カギカッコの入力は不要です。
 * 
 * 全てのプラグインコマンドは大文字と小文字を区別します。
 * 各単語の間は半角スペースで区切ります（全角では認識しません）。
 * 間違わないように気をつけてください。
 * 
 * 「ODF processRouteEnd フォロワー番号」 : 移動終了。
 * 「ODF moveDown フォロワー番号」  : 下に移動。
 * 「ODF moveLeft フォロワー番号」  : 左に移動。
 * 「ODF moveRight フォロワー番号」 : 右に移動。
 * 「ODF moveUp フォロワー番号」    : 上に移動。
 * 「ODF moveLowerLeft フォロワー番号」  : 左下に移動。
 * 「ODF moveLowerRight フォロワー番号」 : 右下に移動。
 * 「ODF moveUpperLeft フォロワー番号」  : 左上に移動。
 * 「ODF moveUpperRight フォロワー番号」 : 右上に移動。
 * 「ODF moveRandom フォロワー番号」 : ランダムに移動。
 * 「ODF moveTowardPlayer フォロワー番号」   : プレイヤーに近づく。
 * 「ODF moveAwayFromPlayer フォロワー番号」 : プレイヤーから遠ざかる。
 * 「ODF moveForward フォロワー番号」  : 一歩前進。
 * 「ODF moveBackward フォロワー番号」 : 一歩後退。
 * 「ODF turnDown フォロワー番号」  : 下を向く。
 * 「ODF turnLeft フォロワー番号」  : 左を向く。
 * 「ODF turnRight フォロワー番号」 : 右を向く。
 * 「ODF turnUp フォロワー番号」    : 上を向く。
 * 「ODF turnRight90 フォロワー番号」 : 右に90度回転。
 * 「ODF turnLeft90 フォロワー番号」 : 左に90度回転。
 * 「ODF turn180 フォロワー番号」 : 180度回転。
 * 「ODF turnRightOrLeft90 フォロワー番号」 : 右か左に90度回転。
 * 「ODF turnRandom フォロワー番号」 : ランダムに方向回転
 * 「ODF turnTowardPlayer フォロワー番号」 : プレイヤーの方を向く。
 * 「ODF turnAwayFromPlayer フォロワー番号」 : プレイヤーの逆を向く。
 * 「ODF setWalkAnimeOn フォロワー番号」 : 歩行アニメON。
 * 「ODF setWalkAnimeOff フォロワー番号」 : 歩行アニメOFF。
 * 「ODF setStepAnimeOn フォロワー番号」 : 足踏みアニメON。
 * 「ODF setStepAnimeOff フォロワー番号」 : 足踏みアニメOFF。
 * 「ODF setDirectionFixOn フォロワー番号」 : 向き固定ON。
 * 「ODF setDirectionFixOff フォロワー番号」 : 向き固定OFF。
 * 「ODF setThroughOn フォロワー番号」 : すり抜けON。
 * 「ODF setThroughOff フォロワー番号」 : すり抜けOFF。
 * 「ODF setTransparentOn フォロワー番号」 : 透明化ON。
 * 「ODF setTransparentOff フォロワー番号」 : 透明化OFF。
 * 「ODF jump フォロワー番号 オフセットX オフセットY」 : ジャンプ。
 * 「ODF setImage フォロワー番号 イメージ名 イメージ番号」 : 画像の変更。
 * 「ODF wait フォロワー番号 待機時間」 : ウェイト。
 * 「ODF setMoveSpeed フォロワー番号 移動速度」 : 移動速度の変更。
 * 「ODF setMoveFrequency フォロワー番号 移動頻度」 : 移動頻度の変更。
 * 「ODF setOpacity フォロワー番号 不透明度」 : 不透明度の変更。
 * 「ODF setBlendMode フォロワー番号 合成方法」 : 合成方法の変更。
 * 
 * 【更新履歴】
 * 1.0.2 2017/09/10 フォロワーの操作解除時、自動ですり抜けをONにするよう変更。
 * 1.0.1 2017/09/09 プラグインコマンドを追加。不具合の修正。
 * 1.0.0 2017/09/09 公開。
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
    var pluginName = 'OperateDearFollowers';

////=============================================================================
//// NTMO
////  Declare NTMO namespace.
////=============================================================================
    var NTMO = NTMO || {};
    NTMO.ODF = function(){
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

////=============================================================================
//// Get and set pluguin parameters.
////=============================================================================
    var param                          = {};
    //Basic Stteings
    param.operatingSwitchNumber        = getParamNumber(['OperatingSwitchNumber', '操作用スイッチ番号']);

//-----------------------------------------------------------------------------
// Settings for plugin command.
//-----------------------------------------------------------------------------
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'ODF') {
            switch (args[0]) {
                case 'processRouteEnd':
                case 'moveDown':
                case 'moveLeft':
                case 'moveRight':
                case 'moveUp':
                case 'moveLowerLeft':
                case 'moveLowerRight':
                case 'moveUpperLeft':
                case 'moveUpperRight':
                case 'moveRandom':
                case 'moveTowardPlayer':
                case 'moveAwayFromPlayer':
                case 'moveForward':
                case 'moveBackward':
                case 'turnDown':
                case 'turnLeft':
                case 'turnRight':
                case 'turnUp':
                case 'turnRight90':
                case 'turnLeft90':
                case 'turn180':
                case 'turnRightOrLeft90':
                case 'turnRandom':
                case 'turnTowardPlayer':
                case 'turnAwayFromPlayer':
                case 'setWalkAnimeOn':
                case 'setWalkAnimeOff':
                case 'setStepAnimeOn':
                case 'setStepAnimeOff':
                case 'setDirectionFixOn':
                case 'setDirectionFixOff':
                case 'setThroughOn':
                case 'setThroughOff':
                case 'setTransparentOn':
                case 'setTransparentOff':
                    NTMO.ODF_Base.operate(args[0], args[1]);
                    break;
                case 'jump':
                case 'setImage':
                    NTMO.ODF_Base.operate(args[0], args[1], args[2], args[3]);
                    break;
                case 'wait':
                case 'setMoveSpeed':
                case 'setMoveFrequency':
                case 'setOpacity':
                case 'setBlendMode':
                    NTMO.ODF_Base.operate(args[0], args[1], args[2]);
                    break;
            }
        }
    };


////==============================
//// NTMO.BGB_Base
//================================
    NTMO.ODF_Base = function(){
    };

    NTMO.ODF_Base.canGetFollower = function(num) {
        return $gamePlayer.followers()._data.length > num;
    };

    NTMO.ODF_Base.operate = function(command, num) {
        if(!NTMO.ODF_Base.canGetFollower(num)){
            return;
        }

        var follower = $gamePlayer.followers()._data[Number(num)];

        switch (command) {
            case 'processRouteEnd':
                follower.processRouteEnd();
                break;
            case 'moveDown':
                follower.moveStraight(2);
                break;
            case 'moveLeft':
                follower.moveStraight(4);
                break;
            case 'moveRight':
                follower.moveStraight(6);
                break;
            case 'moveUp':
                follower.moveStraight(8);
                break;
            case 'moveLowerLeft':
                follower.moveDiagonally(4, 2);
                break;
            case 'moveLowerRight':
                follower.moveDiagonally(6, 2);
                break;
            case 'moveUpperLeft':
                follower.moveDiagonally(4, 8);
                break;
            case 'moveUpperRight':
                follower.moveDiagonally(6, 8);
                break;
            case 'moveRandom':
                follower.moveRandom();
                break;
            case 'moveTowardPlayer':
                follower.moveTowardPlayer();
                break;
            case 'moveAwayFromPlayer':
                follower.moveAwayFromPlayer();
                break;
            case 'moveForward':
                follower.moveForward();
                break;
            case 'moveBackward':
                follower.moveBackward();
                break;
            case 'jump':
                follower.jump(Number(arguments[2]), Number(arguments[3]));
                break;
            case 'wait':
                follower._waitCount = Number(arguments[2]) - 1;
                break;
            case 'turnDown':
                follower.setDirection(2);
                break;
            case 'turnLeft':
                follower.setDirection(4);
                break;
            case 'turnRight':
                follower.setDirection(6);
                break;
            case 'turnUp':
                follower.setDirection(8);
                break;
            case 'turnRight90':
                follower.turnRight90();
                break;
            case 'turnLeft90':
                follower.turnLeft90();
                break;
            case 'turn180':
                follower.turn180();
                break;
            case 'turnRightOrLeft90':
                follower.turnRightOrLeft90();
                break;
            case 'turnRandom':
                follower.turnRandom();
                break;
            case 'turnTowardPlayer':
                follower.turnTowardPlayer();
                break;
            case 'turnAwayFromPlayer':
                follower.turnAwayFromPlayer();
                break;
            case 'setMoveSpeed':
                follower.setMoveSpeed(Number(arguments[2]));
                break;
            case 'setMoveFrequency':
                follower.setMoveFrequency(Number(arguments[2]));
                break;
            case 'setWalkAnimeOn':
                follower.setWalkAnime(true);
                break;
            case 'setWalkAnimeOff':
                follower.setWalkAnime(false);
                break;
            case 'setStepAnimeOn':
                follower.setStepAnime(true);
                break;
            case 'setStepAnimeOff':
                follower.setStepAnime(false);
                break;
            case 'setDirectionFixOn':
                follower.setDirectionFix(true);
                break;
            case 'setDirectionFixOff':
                follower.setDirectionFix(false);
                break;
            case 'setThroughOn':
                follower.setThrough(true);
                break;
            case 'setThroughOff':
                follower.setThrough(false);
                break;
            case 'setTransparentOn':
                follower.setTransparent(true);
                break;
            case 'setTransparentOff':
                follower.setTransparent(false);
                break;
            case 'setImage':
                follower.setImage(arguments[2], Number(arguments[3]));
                break;
            case 'setOpacity':
                follower.setOpacity(Number(arguments[2]));
                break;
            case 'setBlendMode':
                follower.setBlendMode(Number(arguments[2]));
                break;
        }
    };

////=============================================================================
//// Game_Followers
////  Add operating followers function.
////  Maybe I must override some methods.
////=============================================================================

    //Override.
    var _Game_Followers_updateMove = Game_Followers.prototype.updateMove;
    Game_Followers.prototype.updateMove = function() {
        //If user turn on the switch for operating followers, original method does not excute.
        if(this.canOperateFollowers()){
            this.updateOperatingFollowers();
            return;
        }

        _Game_Followers_updateMove.call(this);
    };

    Game_Followers.prototype.updateOperatingFollowers = function() {

    };

    Game_Followers.prototype.canOperateFollowers = function() {
        return $gameSwitches.value(param.operatingSwitchNumber);
    };

    Game_Followers.prototype.forceMoveRoute = function(num, moveRoute) {
        this._data[num].forceMoveRoute(moveRoute);
    };

    Game_Followers.prototype.clearMoveRoute = function() {
        for(var follower of this._data){
            follower.setMoveRoute(null);
            follower.setTransparent($dataSystem.optTransparent);
            follower.setThrough(true);
        }
    };

////=============================================================================
//// Game_Follower
////  Add operating follower function.
////  This is not follower"s" but follower class !
////=============================================================================

   var _Game_Follower_update = Game_Follower.prototype.update;
    Game_Follower.prototype.update = function() {
        if(this.canOperateFollower()){
            Game_Character.prototype.update.call(this);
            return;
        }

        _Game_Follower_update.call(this);
    };

    Game_Follower.prototype.canOperateFollower = function() {
        return $gameSwitches.value(param.operatingSwitchNumber);
    };

////=============================================================================
//// Game_Switches
////  Set gathering event !
////=============================================================================
    var _Game_Switches_setValue = Game_Switches.prototype.setValue;
    Game_Switches.prototype.setValue = function(switchId, value) {
        _Game_Switches_setValue.call(this, switchId, value);

        //Set gathering event.
        if(switchId === param.operatingSwitchNumber && 
            !$gameSwitches.value(param.operatingSwitchNumber)){
            $gamePlayer.followers().clearMoveRoute();
            $gamePlayer.gatherFollowers();
        }
    };

////=============================================================================
//// Game_Interpreter
////  Add a operating function !
////=============================================================================
    Game_Interpreter.prototype.operateFollower = function(num, moveRoute) {
        $gamePlayer.followers().forceMoveRoute(num, moveRoute);
    };

})();