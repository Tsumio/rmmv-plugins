//=============================================================================
// TsumioCommandBattle.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2019 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2019/01/23 公開。
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
 * @param ChargeSkillID
 * @type skill
 * @desc When using skills of cost 2 or more, skills to use when acts of pooling.
 * @default 7
 * 
 * @param ActionPriorityFormula
 * @type string
 * @desc A formula used to determine the order of commands.
 * @default this.agi / (this.getRegisterdActionNum() + 1);
 * 
 * @help This plugin changes the display of battle result.
 * 
 * ----feature----
 * -> Change the battle scene
 * -> The number of commands increased by the added number of action times
 * -> Skill that consumes cost becomes usable
 * -> Visible the registered command
 * 
 * ----how to use----
 * This plugin is for side view battle only.
 * You can use this plugin after setting some plugin parameters.
 * 
 * ----battle specification----
 * Each actor and enemy (hereinafter referred to as battler including both) increase the number of commands by "number of actions added".
 * Unlike the default battle, there is a judgment of the order of action for each command, so a battler that can act more than once does not necessarily move continuously.
 * When using skills that consume cost, if you do not keep the necessary cost, the skill equivalent to "Accumulate" is automatically used.
 * Timing of automatically canceling state is also different from the default one (For details, please see "timing of automatic state release").
 * 
 * ----how to determine the number of commands----
 * By default, the number of possible actions for each battler is 1.
 * You will be able to enter as many commands as you added in "Add Behavior" of Battler's "Feature".
 * By setting the probability of "add action number", it is also possible to change the number of possible battler' actions per turn.
 * 
 * ----show/hide enemy command----
 * Enemy commands are hidden by default.
 * If you want to display it, execute the following code in a script.
 * $gameSystem._visibleEnemyCommand = true;
 *
 * If you want to hide it again, execute the following code in a script.
 * $gameSystem._visibleEnemyCommand = false;
 * 
 * ----actor's memo tag----
 * <initCost:x>: Set initial retention cost to x. If omitted, it has the same meaning as 0.
 * 
 * ----enemy's memo tag----
 * <initCost:x>: Set initial retention cost to x. If omitted, it has the same meaning as 0.
 * 
 * ----skill's memo tag----
 * <cost:x>：Set the cost required to execute to x. If omitted, it has the same meaning as 1.
 * If you have to accumulate two costs to use that skill, set x to 2.
 * 
 * ----timing of automatic state release----
 * We will use the default state and the memo field of the state.
 *
 * None: As it is
 * At the end of action: the timing when it finishes executing all commands
 * At end of turn: When the actions of all the enemy ally ends
 * Release with damage: When you attacked yourself x% probability of cancellation
 * <attack:x>: Cancel with own probability x% probability
 * <eachAction:x>: Cancel with probability of x% at the end of each action of own
 *
 * Enhancement of the ability value is "one timing after" the timing when it has finished executing all commands.
 * 
 * ----change log---
 * 1.0.0 2019/01/23 Release.
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
 * @plugindesc コマンド入力バトルを実装するプラグイン。
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * @param 溜める際に使用するスキルID
 * @type skill
 * @desc コスト2以上のスキルを使用する際、溜める行為をするときに使用するスキルID。
 * @default 7
 * 
 * @param 行動順序の決定計算式
 * @type string
 * @desc 行動順序を決定するために使用する計算式。
 * @default this.agi / (this.getRegisterdActionNum() + 1);
 * 
 * @help コマンド入力バトルを実装します。
 * 
 * 【特徴】
 * ・バトルシーンを改変します
 * ・「行動回数追加」された分だけコマンドが増えます
 * ・コストを消費するスキルが使用可能になります
 * ・登録したコマンドを見ることができます
 * 
 * 【使用方法】
 * このプラグインはサイドビュー戦闘専用です。
 * プラグインの導入後、プラグインパラメーターを設定してください。
 * 
 * 【戦闘の仕様】
 * 各アクターとエネミー（以下両方を含めバトラーと呼ぶ）は「行動回数追加」された分だけコマンドが増えます。
 * デフォルト戦闘と違い、各コマンドごとに行動順序の判定があるため、複数回行動できるバトラーが必ずしも連続で動くとは限りません。
 * コストを消費するスキルを使用するとき、必要コストを保持していない場合は自動で「ためる」に相当するスキルが使用されます。
 * ステートの自動解除のタイミングもデフォルトのものとは違っています（詳細は「ステートの自動解除のタイミング」をご覧ください）。
 * 
 * 【コマンド数の決定方法】
 * デフォルトでは、各バトラーの可能行動回数は1です。
 * バトラーの「特徴」の「行動回数追加」で追加された分だけコマンドを多く入力できるようになります。
 * 「行動回数追加」の確率を設定することにより、ターンごとにバトラーの行動可能回数を変動させることも可能です。
 * 
 * 【敵のコマンドの表示・非表示】
 * 敵のコマンドはデフォルトでは非表示になっています。
 * もし表示したい場合、スクリプトで以下のコードを実行してください。
 * $gameSystem._visibleEnemyCommand = true;
 * 
 * 再び非表示にしたい場合、スクリプトで以下のコードを実行してください。
 * $gameSystem._visibleEnemyCommand = false;
 * 
 * 【アクターのメモタグ】
 * <initCost:x>：戦闘開始時の初期保持コストをxにする。省略した場合は0と同じ意味。
 * 
 * 【エネミーのメモタグ】
 * <initCost:x>：戦闘開始時の初期保持コストをxにする。省略した場合は0と同じ意味。
 * 
 * 【スキルのメモタグ】
 * <cost:x>：実行するのに必要なコストをxにする。省略した場合は1と同じ意味。
 * そのスキルを使用するのにコストを2溜めなければならない場合は2を指定する。
 * 
 * 【ステートの自動解除のタイミング】
 * ステートの自動解除はデフォルトのものと、ステートのメモ欄を利用します。
 * 
 * なし：そのまま
 * 行動終了時：自身が全てのコマンドを実行し終えたタイミング
 * ターン終了時：敵味方全ての行動が終了したタイミング
 * ダメージで解除：自身が攻撃を受けた時x%の確率で解除
 * <attack:x>：自身の攻撃時x％の確率で解除
 * <eachAction:x>：自身の各行動終了時x%の確率で解除
 * 
 * 能力値の強化は「自身が全てのコマンドを実行し終えたタイミング」を1ターンとします。
 * 
 * 【更新履歴】
 * 1.0.0 2019/01/23 公開。
 * 
 * 【備考】
 * 当プラグインを利用したことによるいかなる損害に対しても、制作者は一切の責任を負わないこととします。
 * 
 * 【利用規約】
 * ソースコードの著作権者が自分であると主張しない限り、
 * 作者に無断で改変、再配布が可能です。
 * 利用形態（商用、18禁利用等）についても制限はありません。
 * 自由に使用してください。
 */

(function() {
    'use strict';
    var pluginName = 'TsumioCommandBattle';

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

    //This function is not written by Triacontane.Tsumio wrote this function !
    var convertArrayParam = function(param) {
        if(param !== undefined){
            try {
                const array = JSON.parse(param);
                for(let i = 0; i < array.length; i++) {
                    array[i] = JSON.parse(array[i]);
                }
                return array;
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

////=============================================================================
//// Get and set pluguin parameters.
////=============================================================================
    var param                          = {};
    //説明文の設定
    param.chargeSkillID = getParamNumber(['ChargeSkillID', '溜める際に使用するスキルID']);
    //コマンドの順序決定計算式
    param.actionPriorityFormula = getParamString(['ActionPriorityFormula', '行動順序の決定計算式']);

////=============================================================================
//// CommandDir
////  コマンドの描画方向を示す静的クラス
////=============================================================================

    class CommandDir {
        static get LEFT() {
            return 4;
        }

        static get RIGHT() {
            return 6;
        }
    }

////=============================================================================
//// Game_BattleCommand
////  アクターやエネミーの行動をラップしたもの。
////  素早さを基準にしたCommandの実行優先度（速度・順番）を保持がメイン。
////=============================================================================

    class Game_BattleCommand {
        constructor(subject, skillId, priority, action) {
            this._subject  = subject;
            this._skillId  = skillId;
            this._priority = priority;
            this._action   = action;
        }

        /**
         * コマンドを実行するバトラー
         * @return {Game_Battler}
         */
        get subject() {
            return this._subject;
        }

        /**
         * @return {Number}
         */
        get iconIndex() {
            switch(this.action._item._dataClass) {
                case 'skill' :
                    return this.skill.iconIndex;
                case 'item' :
                    return this.item.iconIndex;
            }
        }

        /**
         * @return {RPG.Skill}
         */
        get skill() {
            return $dataSkills[this._skillId];
        }

        /**
         * @return {RPG.Item}
         */
        get item() {
            return $dataItems[this._skillId];
        }

        /**
         * @return {Number}
         */
        get priority() {
            return this._priority;
        }

        /**
         * 実行すべきアクションを保持
         * @return {Game_Action}
         */
        get action() {
            return this._action;
        }

        setTarget(targetIndex) {
            this.action.setTarget(targetIndex);
        }

        isChargeSkillCommand() {
            if(this.isSkill()) {
                return this._skillId === param.chargeSkillID;
            }
            return false;
        }

        isSkill() {
            return this.action._item._dataClass === 'skill';
        }
    }

////=============================================================================
//// Game_System
////  敵の行動を表示するかどうかを設定する。
////=============================================================================

    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this._visibleEnemyCommand = false;
    };

    //敵の行動を表示するかどうか
    Game_System.prototype.visibleEnemyCommand = function() {
        return this._visibleEnemyCommand || false;
    };

////=============================================================================
//// BattleManager
////  行動するバトラーの順番を変更する
////=============================================================================

    const _BattleManager_startTurn = BattleManager.startTurn;
    BattleManager.startTurn = function() {
        _BattleManager_startTurn.call(this);
        this.makeBattleCommandOrders();
    };

    //コマンドの実行順序を決定する
    BattleManager.makeBattleCommandOrders = function() {
        let commands = [];
        if (!this._surprise) {
            $gameParty.members().forEach(x => {
                commands = commands.concat(x.getBattleCommands());
            });
        }
        if (!this._preemptive) {
            $gameTroop.members().forEach(x => {
                commands = commands.concat(x.getBattleCommands());
            });
        }
        commands.sort((a, b) => {
            return b.priority - a.priority;
        });
        this._actionBattlers = commands.map(x => x.subject);
    };

    //再定義。一度に一つしかactionを実行しないようにする。
    BattleManager.processTurn = function() {
        const subject = this._subject;
        const action = subject.currentAction();
        if (action) {
            action.prepare();
            if (action.isValid()) {
                this.startAction();
            }
            subject.removeCurrentAction();
            this.refreshStatusAndWindow(subject);
        }else {
            //Note:これがないと永遠に終了しなくなる
            this._subject = null;
        }
    };

    BattleManager.refreshStatusAndWindow = function(subject) {
        this.refreshStatus();
        subject.shouldRefreshCommand = true;
        this._logWindow.displayAutoAffectedStatus(subject);
        this._logWindow.displayCurrentState(subject);
        this._logWindow.displayRegeneration(subject);
        this._subject = this.getNextSubject();
        subject.callOnAllActionsEndIfNeeded();
        if(!this._subject) {
            //Note:これがないと、最後のアクターの行動が実行されなくなってしまう。
            //ロジックを確認してもう少しスマートにしたい。
           this._subject = subject;
        }
    };

    //戦闘終了時にsavingCostを全て初期化する
    const _BattleManager_endBattle = BattleManager.endBattle;
    BattleManager.endBattle = function(result) {
        _BattleManager_endBattle.apply(this, arguments);
        $gameParty.clearSavingCost();
    };

    //戦闘開始時にsavingCostを全て初期化する
    const _BattleManager_startBattle = BattleManager.startBattle;
    BattleManager.startBattle = function() {
        _BattleManager_startBattle.call(this);
        $gameParty.clearSavingCost();
    };
    
    //行動終了時にバフを剥がす処理を実行する
    const _BattleManager_endAction = BattleManager.endAction;
    BattleManager.endAction = function() {
        _BattleManager_endAction.call(this);
        this._subject.removeStatesByEachAction();
    };

    //再定義。もう少しスマートな実装方法はないか？
    BattleManager.selectPreviousCommand = function() {
        do {
            if (!this.actor() || !this.actor().selectPreviousCommand()) {
                this.changeActor(this._actorIndex - 1, 'undecided');
                if (this._actorIndex < 0) {
                    return;
                }
            }
            //ここから追加分
            if(this.actor().isAutoBattle()) {
                this.changeActor(this._actorIndex - 1, 'undecided');
            }
            //ここまで追加分。
        } while (this.actor() && !this.actor().canInput());
    };

////=============================================================================
//// Scene_Battle
////  見た目をコマンド形式に合わせて変更する。
////=============================================================================

    //登録したコマンドを消去していく処理を追加。
    //汚い
    const _Scene_Battle_selectPreviousCommand = Scene_Battle.prototype.selectPreviousCommand;
    Scene_Battle.prototype.selectPreviousCommand = function() {
        _Scene_Battle_selectPreviousCommand.call(this);
        if(BattleManager.actor() && BattleManager.actor().getRegisterdActionNum() > 0) {
            BattleManager.actor().shouldRefreshCommand = true;
            this.adjustSavingCost();
        }
    };

    //コマンドをキャンセルするとき、SavingCostの量を調整するために使用する
    Scene_Battle.prototype.adjustSavingCost = function() {
        const command = BattleManager.actor().getBattleCommands().pop();
        if(command.isChargeSkillCommand()) {
            BattleManager.actor().decreaseSavingCost();
        }else if(command.isSkill()) {
            BattleManager.actor()._savingCost += BattleManager.actor().fetchSavingCost(command.skill);
        }
    };

    const _Scene_Battle_onActorOk = Scene_Battle.prototype.onActorOk;
    Scene_Battle.prototype.onActorOk = function() {
        const action = BattleManager.inputtingAction();
        action.setTarget(this._actorWindow.index());
        BattleManager.actor().registerAnyCommand(action);
        BattleManager.actor().shouldRefreshCommand = true;
        _Scene_Battle_onActorOk.call(this);
    };

    const _Scene_Battle_onEnemyOk = Scene_Battle.prototype.onEnemyOk;
    Scene_Battle.prototype.onEnemyOk = function() {
        const action = BattleManager.inputtingAction();
        action.setTarget(this._enemyWindow.enemyIndex());
        BattleManager.actor().registerAnyCommand(action);
        BattleManager.actor().shouldRefreshCommand = true;
        _Scene_Battle_onEnemyOk.call(this);
    };

    //再定義。全体対象等で、選択の必要がない場合のみ先に登録しておく。
    //元の処理を呼ぶようにした場合、inputtingActionが二回目の処理となってうまくスキルを取得できないためこうしている。
    Scene_Battle.prototype.onSelectAction = function() {
        var action = BattleManager.inputtingAction();
        this._skillWindow.hide();
        this._itemWindow.hide();
        if (!action.needsSelection()) {
            //ここから追加分
            BattleManager.actor().registerAnyCommand(action);
            BattleManager.actor().shouldRefreshCommand = true;
            //ここまで追加分
            this.selectNextCommand();
        } else if (action.isForOpponent()) {
            this.selectEnemySelection();
        } else {
            this.selectActorSelection();
        }
    };

    //再定義。inputtingActionでスキルが取得できないため。
    Scene_Battle.prototype.commandGuard = function() {
        const action = BattleManager.inputtingAction();
        action.setGuard();
        BattleManager.actor().registerAnyCommand(action);
        BattleManager.actor().shouldRefreshCommand = true;
        this.selectNextCommand();
    };


////=============================================================================
//// Game_Battler
////  行動可能回数の情報を保持する。
////=============================================================================

    const _Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        _Game_Action_apply.apply(this, arguments);

        this.removeStatesByAttack();
    };

    //対象が敵でかつ、スキル使用時はステートを除ける処理を呼ぶ
    Game_Action.prototype.removeStatesByAttack = function() {
        if(this.isForOpponent() && this.isSkill()) {
            this.subject().removeStatesByAttack();
        }
    };

////=============================================================================
//// Game_Battler
////  行動可能回数の情報を保持する。
////=============================================================================

    const _Game_Battler_initMembers = Game_Battler.prototype.initMembers;
    Game_Battler.prototype.initMembers = function() {
        _Game_Battler_initMembers.call(this);
        this.shouldRefreshCommand = false;
        this.clearBattleCommands();
        this._savingCost = 0;
    };

    Game_Battler.prototype.clearBattleCommands = function() {
        this._battleCommands = [];
        this.shouldRefreshCommand = true;
    };

    Game_Battler.prototype.getBattleCommands = function() {
        return this._battleCommands;
    };

    //登録済みの行動回数を返す
    Game_Battler.prototype.getRegisterdActionNum = function() {
        return this.getBattleCommands().length;
    };

    //最大行動回数を返す
    Game_Battler.prototype.getMaxActionNum = function() {
        return this.numActions();
    };

    //まだコマンドを登録可能かどうかを返す
    Game_Battler.prototype.canRegisterAction = function() {
        return this.getRegisterdActionNum() < this.getMaxActionNum();
    };

    //行動の優先度を計算する
    Game_Battler.prototype.makeActionPriority = function() {
        //素早さ / 現在のコマンド登録数がデフォルト
        return eval(param.actionPriorityFormula);
    };

    //バトルコマンドを全て初期化する。
    const _Game_Battler_clearActions = Game_Battler.prototype.clearActions;
    Game_Battler.prototype.clearActions = function() {
        _Game_Battler_clearActions.call(this);
        this.clearBattleCommands();
    };

    //再定義。現在のアクションは独自に返すようにする
    Game_Battler.prototype.currentAction = function() {
        if(this.getRegisterdActionNum() > 0) {
            return this.getBattleCommands()[0].action;
        }
        return null;
    };
    
    //再定義。独自のものを消すようにする。
    Game_Battler.prototype.removeCurrentAction = function() {
        this.getBattleCommands().shift();
    };

    //現在溜めているコストを取得する
    Game_Battler.prototype.getCurrentSavingCost = function() {
        return this._savingCost;
    };

    //溜めているコストを1増加させる
    Game_Battler.prototype.increaseSavingCost = function() {
        this._savingCost++;
    };

    //溜めているコストを1減少させる
    Game_Battler.prototype.decreaseSavingCost = function() {
        if(this._savingCost > 0) {
            this._savingCost--;
        }
    };

    //溜めるスキルIDを返す
    Game_Battler.prototype.getChargeSkillID = function() {
        return param.chargeSkillID;
    };

    //十分なコストを保持しているかどうか
    Game_Battler.prototype.hasEnoughSaivingCost = function(skill) {
        const cost = skill.meta['cost'];
        if(cost) {
            return this._savingCost >= cost - 1;//-1して正常な計算値を算出する
        }
        return true;
    };

    //スキルのコストを取得
    Game_Battler.prototype.fetchSavingCost = function(skill) {
        const cost = skill.meta['cost'];
        if(cost) {
            return cost - 1;
        }
        return 0;
    };

    
    //必要があるときだけ全てのアクションが終了したことを通知する
    Game_Battler.prototype.callOnAllActionsEndIfNeeded = function() {
        if(!this.currentAction()) {
            this.onAllActionsEnd();
        }
    };

    //行動ごとにバフを剥がす処理を実行する
    Game_Battler.prototype.removeStatesByEachAction = function() {
        this.states().forEach(function(state) {
            const probability = state.meta['eachAction'];
            if (probability && Math.randomInt(100) < probability) {
                this.removeState(state.id);
            }
        }, this);
    };

    //行動ごとにバフを剥がす処理を実行する
    Game_Battler.prototype.removeStatesByAttack = function() {
        this.states().forEach(function(state) {
            const probability = state.meta['attack'];
            if (probability && Math.randomInt(100) < probability) {
                this.removeState(state.id);
            }
        }, this);
    };

////=============================================================================
//// Game_Actor
////  メモタグを取得する。コマンドの選択をおこなう。
////=============================================================================

    const _Game_Actor_initialize = Game_Actor.prototype.initialize;
    Game_Actor.prototype.initialize = function(actorId) {
        _Game_Actor_initialize.apply(this, arguments);
    };

    //コストを初期化する。初期保持コストはメタタグでも指定可能。
    Game_Actor.prototype.clearSavingCost = function() {
        if(this.actor()) {
            this._savingCost = this.actor().meta['initCost'] || 0;
        }
    };

    //再定義。コマンド登録できるならundecided状態にする。
    Game_Actor.prototype.makeActions = function() {
        Game_Battler.prototype.makeActions.call(this);
        if (this.canRegisterAction()) {
            this.setActionState('undecided');
        } else {
            this.setActionState('waiting');
        }

        if (this.isAutoBattle()) {
            this.makeAutoBattleCommand();
        } else if (this.isConfused()) {
            this.makeConfusionCommand();
        }
    };

    //混乱時の処理。攻撃だけ登録する。
    Game_Actor.prototype.makeConfusionCommand = function() {
        while(this.canRegisterAction()) {
            this.registerAttackCommand();
        }
        this.setActionState('waiting');
        this.shouldRefreshCommand = true;
    };

    //自動戦闘時の行動を作成
    Game_Actor.prototype.makeAutoBattleCommand = function() {
        while(this.canRegisterAction()) {
            this.registerAutoSelectingCommand();
        }

        this.setActionState('undecided');//Note:ここをwaitingにすると、次のターンからも固まってしまう。
        this.shouldRefreshCommand = true;
    };

    //攻撃コマンドを登録するだけ
    Game_Actor.prototype.registerAttackCommand = function() {
        const attackSkillId = this.attackSkillId();
        const priority      = this.makeActionPriority();
        const action        = new Game_Action(this);
        action.setAttack();
        this.getBattleCommands().push(new Game_BattleCommand(this, attackSkillId, priority, action));
    };

    //任意のコマンドを登録する
    //非常に汚い＆拡張性が皆無に等しいのでなんとかしたい。
    Game_Actor.prototype.registerAnyCommand = function(action) {
        const itemId        = action._item._itemId;
        const priority      = this.makeActionPriority();
        switch(action._item._dataClass) {
            case 'skill' :
                if(itemId === this.getChargeSkillID()) {
                    action.setSkill(this.getChargeSkillID());
                    this.increaseSavingCost();
                } else if(this.hasEnoughSaivingCost($dataSkills[itemId])) {
                    action.setSkill(itemId);
                    this._savingCost -= this.fetchSavingCost($dataSkills[itemId]);
                }else {
                    action.setSkill(this.getChargeSkillID());
                    this.increaseSavingCost();
                }
                break;
            case 'item' :
                action.setItem(itemId);
                break;
        }
        this.getBattleCommands().push(new Game_BattleCommand(this, action._item._itemId, priority, action));
    };

    //自動戦闘時、どのコマンドを選ぶかを決める処理
    Game_Actor.prototype.registerAutoSelectingCommand = function() {
        const list     = this.makeActionList();
        const priority = this.makeActionPriority();
        let maxValue   = Number.MIN_VALUE;
        let skillId    = this.attackSkillId();

        for (var j = 0; j < list.length; j++) {
            var value = list[j].evaluate();
            if (value > maxValue) {
                maxValue = value;
                skillId = list[j]._item.itemId();
            }
        }
        const action = new Game_Action(this);
        action.setSkill(skillId);
        this.getBattleCommands().push(new Game_BattleCommand(this, skillId, priority, action));
    };

    //元の処理を無視するが、何か機能が追加されていた場合はそれを実行しておく
    const _Game_Actor_selectNextCommand = Game_Actor.prototype.selectNextCommand;
    Game_Actor.prototype.selectNextCommand = function() {
        _Game_Actor_selectNextCommand.call(this);
        return this.canRegisterAction();
    };
    
    //元の処理を無視するが、何か機能が追加されていた場合はそれを実行しておく
    const _Game_Actor_selectPreviousCommand = Game_Actor.prototype.selectPreviousCommand;
    Game_Actor.prototype.selectPreviousCommand = function() {
        _Game_Actor_selectPreviousCommand.call(this);
        return this.getRegisterdActionNum() > 0;
    };

////=============================================================================
//// Game_Enemy
////  メモタグを取得する
////=============================================================================

    const _Game_Enemy_initialize = Game_Enemy.prototype.initialize;
    Game_Enemy.prototype.initialize = function(enemyId, x, y) {
        _Game_Enemy_initialize.apply(this, arguments);

        this._savingCost = this.fetchInitCostMeta() || 1;
    };

    //初期値として適用すべき行動可能回数をメタタグから取得する
    Game_Enemy.prototype.fetchInitCostMeta = function() {
        if(this.enemy()) {
            return this.enemy().meta['initCost'];
        }
    };

    const _Game_Enemy_makeActions = Game_Enemy.prototype.makeActions;
    Game_Enemy.prototype.makeActions = function() {
        _Game_Enemy_makeActions.call(this);
        this.registerAction();
    };

    //有効なアクションのリストを返す
    Game_Enemy.prototype.makeActionList = function() {
        var actionList = this.enemy().actions.filter(function(a) {
            return this.isActionValid(a);
        }, this);
        if (actionList.length > 0) {
            return actionList;
        }
        return [];
    };

    //元の処理を必要回数分呼び出す
    Game_Enemy.prototype.registerAction = function() {
        while(this.canRegisterAction()) {
            this.selectCommand(this.makeActionList());
            $gameTroop.increaseTurn();
        }
        this.shouldRefreshCommand = true;
    };

    //再定義。コマンドを一つ選択する。
    Game_Enemy.prototype.selectCommand = function(actionList) {
        var ratingMax = Math.max.apply(null, actionList.map(function(a) {
            return a.rating;
        }));
        var ratingZero = ratingMax - 3;
        actionList = actionList.filter(function(a) {
            return a.rating > ratingZero;
        });

        this.decideCommand(actionList, ratingZero);
    };

    //コマンドを決定する。何も選べない場合はスキル1番を選ぶ。
    //ロジックが複雑すぎる
    Game_Enemy.prototype.decideCommand = function(actionList, ratingZero) {
        const enemyAction   = this.selectAction(actionList, ratingZero);
        const priority = this.makeActionPriority();
        const action = new Game_Action(this);
        if(enemyAction) {
            if(this.hasEnoughSaivingCost($dataSkills[enemyAction.skillId])) {
                action.setSkill(enemyAction.skillId);
                this.getBattleCommands().push(new Game_BattleCommand(this, enemyAction.skillId, priority, action));
                this._savingCost -= this.fetchSavingCost($dataSkills[enemyAction.skillId]);
            }else {
                action.setSkill(this.getChargeSkillID());
                this.increaseSavingCost();
                this.getBattleCommands().push(new Game_BattleCommand(this, this.getChargeSkillID(), priority, action));
            }
        }else {
            this.getBattleCommands().push(new Game_BattleCommand(this, this.attackSkillId(), priority, action));
        }
    };

////=============================================================================
//// Game_Party
////  モーションを簡単にリクエストできるようにする
////=============================================================================

    //モーションを簡単に追加できるようにした
    Game_Party.prototype.requestMotion = function(motionType) {
        this.battleMembers().forEach(x => x && x.requestMotion(motionType));
    };

    //savingCostを初期化する
    Game_Party.prototype.clearSavingCost = function() {
        this.battleMembers().forEach(x => x && x.clearSavingCost());
    };

////=============================================================================
//// Sprite_Battler
////  バトラーのスプライトに、入力されたコマンド表示用のSpriteを付け足す
////=============================================================================

    const _Sprite_Battler_setBattler = Sprite_Battler.prototype.setBattler;
    Sprite_Battler.prototype.setBattler = function(battler) {
        /**
         * initializeではなくsetBattlerのタイミングでスプライトを生成する必要がある。
         * というのも、インスタンス生成時はbattlerが渡されていないこともあるから。
         * また、setBattlerは毎フレーム実行されている？
         */
        this.createInputtedCommandSprite(battler);
        _Sprite_Battler_setBattler.apply(this, arguments);
    };

    Sprite_Battler.prototype.createInputtedCommandSprite = function(battler) {
        if(!battler) {
            return;
        }
        if(this._battler === battler) {
            return;
        }
        
        const actionNum = battler.getMaxActionNum();
        const dir       = battler.isActor() ? CommandDir.LEFT : CommandDir.RIGHT;
        this._inputtedCommandSprite = new Sprite_InputtedCommand(actionNum, dir, battler);
        this.addChild(this._inputtedCommandSprite);
        battler.clearBattleCommands();
        this._inputtedCommandSprite.refresh();
    };

////=============================================================================
//// Sprite_InputtedCommand
////  入力されたコマンドを表示するためのSprite
////=============================================================================

    class Sprite_InputtedCommand extends Sprite {

        /**
         * Bitmapは固定で作る。幅も高さも適当。
         * @param {Number} commandNum 対象アクターの行動回数
         * @param {CommandDir} dir コマンドを描画する方向
         * @param {Game_Battler} battler バトラー
         */
        constructor(commandNum, dir, battler) {
            super(new Bitmap(Graphics.width/2, 60));
            this._commandNum = commandNum;
            this._commandDir = dir;
            this._battler    = battler;

            this.initializeAnchor();
        }

        initializeAnchor() {
            if(this.commandDir === CommandDir.LEFT) {
                this.anchor.set(1, 1);
            }else {
                this.anchor.set(0, 0.5);
            }
        }

        get commandNum() {
            return this._commandNum;
        }

        /**
         * コマンドを描画する方向
         * @return {CommandDir}
         */
        get commandDir() {
            return this._commandDir;
        }

        /**
         * @return {Game_Battler}
         */
        get battler() {
            return this._battler;
        }

        get underBarWidth() {
            return 50;
        }

        get underBarHeight() {
            return 5;
        }

        get underBarColor() {
            return 'blue';
        }

        get underBarSpace() {
            return 3 + this.underBarWidth;
        }

        update() {
            super.update();
            if(this.battler.shouldRefreshCommand) {
                this.refresh();
            }
        }

        refresh() {
            this.bitmap.clear();
            if(!this._shouldShowCommand()) {
                return;
            }
            this._drawUnderBar();
            this._drawCommandList();
            this.battler.shouldRefreshCommand = false;
        }

        /**
         * Actorなら表示。
         * 敵ならシステム情報を参照する。
         */
        _shouldShowCommand() {
            return this.battler.isActor() || (this.battler.isEnemy() && $gameSystem.visibleEnemyCommand());
        }

        _drawCommandList() {
            const commands = this.battler.getBattleCommands();
            if(BattleManager.isInputting()) {
                this._drawCommandListInOrder(commands);
            }else {
                this._drawCommandListWithEmpty(commands);
            }
        }

        _drawCommandListInOrder(commands) {
            commands.forEach((command, i) => {
                const leftX  = this.bitmap.width - (this.underBarSpace*i) - this.underBarSpace;
                const rightX = this.underBarSpace*i;
                let posX = (this.commandDir === CommandDir.LEFT) ? leftX : rightX;
                posX = posX + (this.underBarWidth/2) - Window_Base._iconWidth/2;
                this._drawIcon(command.iconIndex, posX, 15);//Note:15は適当な位置。
            });
        }

        _drawCommandListWithEmpty(commands) {
            const shiftNum = this.battler.getMaxActionNum() - commands.length;
            commands.forEach((command, i) => {
                const shiftX = shiftNum + i;
                const leftX  = this.bitmap.width - (this.underBarSpace*shiftX) - this.underBarSpace;
                const rightX = this.underBarSpace*shiftX;
                let posX = (this.commandDir === CommandDir.LEFT) ? leftX : rightX;
                posX = posX + (this.underBarWidth/2) - Window_Base._iconWidth/2;
                this._drawIcon(command.iconIndex, posX, 15);//Note:15は適当な位置。
            });
        }

        _drawIcon(iconIndex, x, y) {
            const bitmap = ImageManager.loadSystem('IconSet');
            const pw = Window_Base._iconWidth;
            const ph = Window_Base._iconHeight;
            const sx = iconIndex % 16 * pw;
            const sy = Math.floor(iconIndex / 16) * ph;
            this.bitmap.blt(bitmap, sx, sy, pw, ph, x, y);
        }

        _drawUnderBar() {
            const y = this.bitmap.height - 10;
            for(let i = 0; i < this.battler.getMaxActionNum(); i++) {
                const leftX  = this.bitmap.width - (this.underBarSpace*i) - this.underBarSpace;
                const rightX = this.underBarSpace*i;
                const posX = (this.commandDir === CommandDir.LEFT) ? leftX : rightX;
                this.bitmap.fillRect(posX, y, this.underBarWidth, this.underBarHeight, this.underBarColor);
            }
        }
    }

})();