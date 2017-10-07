//=============================================================================
// ByeGoodBoy.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.1 2017/09/04 不具合の修正。
// 1.0.0 2017/09/03 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc When there is a level difference with the enemy, you will force victory to battle.
 * @author Tsumio
 *
 * @param ----Basic Settings----
 * @desc 
 * @default 
 * 
 * @param VariableNumber_DefaultEnemyLevel
 * @type variable
 * @desc We treat the numerical value set in this variable as default enemy level when tag is not set.
 * @default 10
 * 
 * @param VariableNumber_ForcedVictoryJudgment
 * @type variable
 * @desc If the level difference between your party and the enemy party is lower than the number set for this variable, you will win.
 * @default 11
 * 
 * @param VictoryEffect
 * @type select
 * @option EscapeType
 * @value EscapeType
 * @option CollapseType
 * @value CollapseType
 * @desc Select the effect type that occurs in enemy at forced victory.
 * @default EscapeType
 * 
 * @param AdditionalBattleLog
 * @type string
 * @desc Set additional characters to be displayed in the battle log at forced victory.
 * @default The enemies frightened and ran away!
 * 
 * @help When there is a level difference with the enemy, you will force victory to battle.
 * 
 * ----feature----
 * -> If there is a certain level difference between your party and enemy party, you can force victory to battle.
 * -> Set enemy's default level and level difference for forcing victory using variables.In other words, you can change dynamically in the game.
 * 
 * ----how to use----
 * You can use this plugin after setting some plugin parameters.
 * 
 * If you want to individually set the enemy's level, please write the following in the Enemy's memo field.
 * <BGB_LV:10>
 * Meaning: Calculate the level of the enemy as 10.
 * 
 * ----example1----
 * For example, in Easy Mode, 0 is set to the value of the variable number for forced victory judgment.
 * In this way, you can enforce all enemies with lower levels than yourself.
 * Conversely, in Hard Mode, set the variable number value for forced victory determination to 1000.
 * In this way, forced victory is virtually impossible.
 * 
 * ----example2----
 * If you do not want to force victory in a specific map, set the variable number value for forced victory to 1000.
 * After exiting the map, set the variable number value to original value.
 * It is possible to implement a map that can not be forced victory.
 * 
 * ----caution----
 * This plugin compares the total level of the current combat members.
 * In other words, the level of the booking member is not included.
 * 
 * ----plugin command----
 * There is no plugin command.
 * 
 * ----change log---
 * 1.0.1 2017/09/04 Bug fix.
 * 1.0.0 2017/09/03 Release.
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
 * @plugindesc 敵とレベル差があるとき、戦闘に強制勝利します。
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * @param デフォルト敵レベル用の変数番号
 * @type variable
 * @desc この変数に設定した数値を、タグ未設定時のデフォルト敵レベルとして扱います。
 * @default 10
 * 
 * @param 強制勝利判定用の変数番号
 * @type variable
 * @desc 自パーティーと敵パーティーのレベル差が、この変数に設定した数値より低ければ強制勝利します。
 * @default 11
 * 
 * @param 勝利エフェクト
 * @type select
 * @option 逃亡タイプ
 * @value EscapeType
 * @option 討伐タイプ
 * @value CollapseType
 * @desc 強制勝利時、エネミーに発生するエフェクトタイプを選択します。
 * @default EscapeType
 * 
 * @param バトルログ追加文字
 * @type string
 * @desc 強制勝利時のバトルログに表示する追加文字を指定します。
 * @default 敵は怯えて逃げていった！
 * 
 * @help 敵とレベル差があるとき、戦闘に強制勝利します。
 * 
 * 【特徴】
 * ・自パーティーと敵パーティーに一定以上のレベル差があった場合、戦闘に強制勝利することができます。
 * ・敵のデフォルトレベルや、レベル差は変数を用いて設定します（つまりゲーム内で動的に変更することが可能です）。
 * 
 * 【使用方法】
 * プラグインの導入後、プラグインパラメーターを設定することによって使用できます。
 * 
 * 個別に敵のレベルを設定したい場合、「ツール→データベース→敵キャラ」のメモ欄に、以下のような記述をしてください。
 * <BGB_LV:10>
 * 意味：当該エネミーのレベルを10として計算する。
 * 
 * 【使用例1】
 * 例えばイージーモードのときは、強制勝利判定用の変数番号の値に0を設定します。
 * こうすると、自分たちよりもレベルの低い敵には全て強制勝利できます。
 * 逆にハードモードのとき、強制勝利判定用の変数番号の値に1000を設定します。
 * こうすると、強制勝利は事実上不可になります。
 * 
 * 【使用例2】
 * 特定のマップでは強制勝利したくない場合、強制勝利判定用の変数番号の値に1000を設定します。
 * マップから出たあとに強制勝利判定用の変数番号の値を元に戻すことにより、強制勝利不可のマップを実装することができます。
 * 
 * 【注意】
 * このプラグインは、現在の戦闘メンバーの合計レベルを比較します。
 * つまり、控えメンバーのレベルは含まれません。
 * 
 * 
 * 【プラグインコマンド】
 * このプラグインにプラグインコマンドはありません。
 * 
 * 【更新履歴】
 * 1.0.1 2017/09/04 不具合の修正。
 * 1.0.0 2017/09/03 公開。
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
    var pluginName = 'ByeGoodBoy';

////=============================================================================
//// NTMO
////  Declare NTMO namespace.
////=============================================================================
    var NTMO = NTMO || {};
    NTMO.BGB = function(){
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
    param.varNum_DefaultLV     = getParamNumber(['VariableNumber_DefaultEnemyLevel', 'デフォルト敵レベル用の変数番号']);
    param.varNum_ForcedVictory = getParamNumber(['VariableNumber_ForcedVictoryJudgment', '強制勝利判定用の変数番号']);
    param.additionalBattleLog  = getParamString(['AdditionalBattleLog', 'バトルログ追加文字']);
    param.effectType           = getParamString(['VictoryEffect', '勝利エフェクト']);

////==============================
//// NTMO.BGB_Base
//================================
    NTMO.BGB_Base = function(){
    };

    NTMO.BGB_Base.forceVictory = function() {
        if (!SceneManager.isCurrentScene_BGB(Scene_Battle)) {//Is current scene Scene_Battle ?
            return;
        }

        //Is enemy total level and party level difference smaller than the specified value?
        if(!this.shouldCutBattleScene()){
            return;
        }

        //Perform collapse action.
        NTMO.BGB_Base.performCollapse();

        //Fire victory process.
        BattleManager.processVictory();
    };

    NTMO.BGB_Base.performCollapse = function() {
        $gameTroop.members().forEach(function(enemy) {
            //Add death state.
            enemy.addNewState(enemy.deathStateId());

            switch(param.effectType){//Select effect type.
                case 'EscapeType' :
                    enemy.escape_BGB();
                    break;
                case 'CollapseType' :
                    enemy.performCollapse();
                    break;
                default : 
                    enemy.escape_BGB();
                    break;
            }
        });
    };

    NTMO.BGB_Base.shouldCutBattleScene = function() {
        //Initialize variables.
        var actorTotalLevel = 0;
        var enemyTotalLevel = 0;
        var difference      = 0;

        //Get actor total level.
        $gameParty.battleMembers().forEach(function(actor) {
            actorTotalLevel += actor.level;
        });

        //Get enemy total level.
        $gameTroop.members().forEach(function(enemy) {
            enemyTotalLevel += (enemy.enemy().meta['BGB_LV']) ?
                  Number(enemy.enemy().meta['BGB_LV']) : $gameVariables.value(param.varNum_DefaultLV);
        });

        //Calculation of difference.
        difference = actorTotalLevel - enemyTotalLevel;

        return difference > $gameVariables.value(param.varNum_ForcedVictory);
    };

////=============================================================================
//// BattleManager
////  Add forcing victory function.
////=============================================================================
    var _BattleManager_startInput = BattleManager.startInput;
    BattleManager.startInput = function() {
        _BattleManager_startInput.call(this);

        NTMO.BGB_Base.forceVictory();
    };

    var _BattleManager_displayVictoryMessage = BattleManager.displayVictoryMessage;
    BattleManager.displayVictoryMessage = function() {
        $gameMessage.add(param.additionalBattleLog);
        _BattleManager_displayVictoryMessage.call(this);
    };

////=============================================================================
//// Game_Battler
////  Add escaping effect for this plugin.
////=============================================================================
    Game_Battler.prototype.escape_BGB = function() {
        this.requestEffect('disappear');
        SoundManager.playEscape();
    };

////=============================================================================
//// SceneManager
////  Add a function.I borrowed this function from Triacontane.Thanks!
////=============================================================================
    SceneManager.isCurrentScene_BGB = function(sceneClass) {
        return this._scene && this._scene.constructor === sceneClass;
    };

})();