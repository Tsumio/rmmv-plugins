//=============================================================================
// ShortestDistanceCalculator.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2020 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2020/11/08 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc Calculate the shortest distance
 * @author Tsumio
 *
 * @param ----Basic Settings----
 * @desc 
 * @default 
 * 
 * 
 * @help Calculate the shortest distance
 * 
 * ----feature----
 * -> Calculate the shortest distance between events and players
 * 
 * ----how to use----
 * After installing the plugin, use plugin command.
 * 
 * ----script command----
 * -> CharacterA.calcShortestDistance (CharacterB, number of reoccurrence)
 * Returns the shortest distance for characterA to reach characterB
 * 
 * Specify the target event or player for characters A and B.
  * The number of reoccurrence is 130 by default.
  * This number is the number of times the route is searched.
  * If you know the distance is more than 130, please specify more than 130 times.
 * 
 * ----example----
 * //Assign the shortest distance from event11 to event12 to dis
 * const dis = $gameMap.event(11).calcShortestDistance($gameMap.event(12));
 * console.log(dis);
 * 
 * //Assign the shortest distance from player to event12 to dis2
 * const dis2 = $gamePlayer.calcShortestDistance($gameMap.event(12));
 * console.log(dis2);
 * 
 * ----note----
 * The process of calculating the shortest distance (calcShortestDistance) is very heavy.
 * Running in parallel processing events may cause the game to be heavy.
 * 
 * ----change log---
 * 1.0.0 2020/01/08 Release.
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
 * @plugindesc 最短距離を計算するプラグイン
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * 
 * @help 最短距離を計算するプラグイン
 * 
 * 【特徴】
 * ・イベント同士やプレイヤーとの最短距離を計算できます
 * 
 * 【使用方法】
 * プラグインの導入後、スクリプトコマンドを使用します。
 * 
 * 【スクリプトコマンド】
 * ■キャラクターA.calcShortestDistance(キャラクターB, 再起回数)
 * キャラクターAがキャラクターBへ到達するための最短距離を返します
 * 
 * キャラクターA,Bには対象のイベントやプレイヤーなどを指定します。
 * 再起回数はデフォルトで130回が指定されています。
 * この回数は経路を探索する回数のことです。
 * 距離が130以上あることがわかっている場合、130回以上を指定してください。
 * 
 * 例：
 * //イベント11からイベント12への最短距離をdisへ代入
 * const dis = $gameMap.event(11).calcShortestDistance($gameMap.event(12));
 * console.log(dis);
 * 
 * //プレイヤーからイベント12への最短距離をdis2に代入
 * const dis2 = $gamePlayer.calcShortestDistance($gameMap.event(12));
 * console.log(dis2);
 * 
 * ■再起回数を超えた場合
 * JavaScript において正確に扱える最大整数値が返ってきます。
 * 
 * 【注意】
 * 最短距離を計算する処理（calcShortestDistance）は非常にコストが高くなっています。
 * 並列処理イベントで実行するとゲームが重くなる原因となるかもしれません。
 * 
 * 【更新履歴】
 * 1.0.0 2020/01/08 公開。
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
    var pluginName = 'ShortestDistanceCalculator';


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

//////=============================================================================
///// Game_Character
/////  距離の計算をおこなうメソッドを追加する
//////=============================================================================

    /**
     * targetへの最短距離を返す。
     * Note:非常にコストの高い処理なので、ループ等では呼ばないこと。
     * Note:100％最短経路を返すとは限らない。
     * Note:再起回数のデフォルト値の130は適当な値で意味は特にない。
     */
    Game_Character.prototype.calcShortestDistance = function(target, recursiveTimes = 130) {
        //現在のインスタンスを元に、画面上には存在しないダミーキャラクターを作成する
        const dummyCharacter = JsonEx.parse(JsonEx.stringify(this));

        //最短距離を計算する
        const calcShortestDistanceRecursive = function(count, x, y) {
            //再起の回数を制限する
            const canRecursive = count < recursiveTimes;
            if(!canRecursive) {
                return Number.MAX_SAFE_INTEGER;
            }
            //実際の計算をおこなう
            dummyCharacter.moveTowardCharacter2(target.x, target.y);
            const isMoved = dummyCharacter.x !== x || dummyCharacter.y !== y;
            const isArrived = dummyCharacter.existAround4(target);
            return isMoved && !isArrived ? calcShortestDistanceRecursive(count + 1) : count+1;
        };

        //最短距離を返す
        return calcShortestDistanceRecursive(0, dummyCharacter.x, dummyCharacter.y);
    };

    /**
     * moveTowardCharacterみたいなやつ。
     * Note:TouchInputによっておこる移動の処理を流用。
     * Note:次に移動すべき場所を計算するとき、moveTowardCharacterでは動きが止まる可能性が高過ぎる。
     */
    Game_Character.prototype.moveTowardCharacter2 = function(x, y) {
        const direction = this.findDirectionTo(x, y);
        if (direction > 0) {
            this.moveStraight(direction);
        }
    };

    /**
     * 周囲4方向に対象がいるかどうかを返す
     */
    Game_Character.prototype.existAround4 = function(target) {
        const diffX = Math.abs(this.x - target.x);
        const diffY = Math.abs(this.y - target.y);
        return (diffX + diffY) <= 1;
    };

    /**
     * 周り（4方向ではなく8方向をチェック）に対象キャラクターがいたらtrueを返す。
     * 8方向プラグインに対応させるならこちら。
     */
    Game_Character.prototype.existAround8 = function(target) {
        const fromX = Math.abs(this.deltaXFrom(target.x));
        const fromY = Math.abs(this.deltaYFrom(target.y));
        return fromX <= 1 && fromY <= 1;
    };

})();
