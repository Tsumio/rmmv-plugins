//=============================================================================
// BattleCommandModifier.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2019 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.2 2019/07/15 MITライセンスに変更。
// 1.0.1 2019/07/13 逃走コマンドを操作できるようにした。
// 1.0.0 2019/07/13 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:ja
 * @plugindesc バトルコマンドの使用可否コントロールします。
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * @help バトルコマンドの使用可否をコントロールします。
 * 
 * 【特徴】
 * ・バトルコマンドの使用可否をコントロールできます
 * ・個別のスキルの使用可否をコントロールできます
 * 
 * 【使用方法】
 * プラグインの導入後、スクリプトコマンドから使用します。
 * 
 * 【概要】
 * バトルコマンドや、特定のスキルの使用の可否をコントロールします。
 * 
 * 【スクリプト】
 * //攻撃コマンドを有効化
 * $gameSystem.enableAttackCommand();
 * //攻撃コマンドを無効化
 * $gameSystem.disableAttackCommand();
 * //スキルコマンドを有効化
 * $gameSystem.enableSkillCommand();
 * //スキルコマンドを無効化
 * $gameSystem.disableSkillCommand();
 * //防御コマンドを有効化
 * $gameSystem.enableGuradCommand();
 * //防御コマンドを無効化
 * $gameSystem.disableGuardCommand();
 * //アイテムコマンドを有効化
 * $gameSystem.enableItemCommand();
 * //アイテムコマンドを無効化
 * $gameSystem.disableItemCommand();
 * //逃走コマンドを有効化
 * $gameSystem.enableEscapeCommand();
 * //逃走コマンドを無効化
 * $gameSystem.disableEscapeCommand();
 * 
 * //特定のスキルを使用可能にする
 * $gameSystem.enableSpecificSkill(id);
 * //特定のスキルを使用不可にする
 * $gameSystem.disableSpecificSkill(id);
 * 
 * 【更新履歴】
 * 1.0.2 2019/07/15 MITライセンスに変更。
 * 1.0.1 2019/07/13 逃走コマンドを操作できるようにした。
 * 1.0.0 2019/07/13 公開。
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
    var pluginName = 'BattleCommandModifier';

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


//////=============================================================================
///// BattleManager
/////  コマンドの可否をコントロール
/////==============================================================================

    //逃走コマンド用の処理を追加
    const _BattleManager_canEscape = BattleManager.canEscape;
    BattleManager.canEscape = function() {
        const canUseEscape = $gameSystem.battleCommandModifier().canUseEscape;
        return _BattleManager_canEscape.call(this) && canUseEscape;
    };

//////=============================================================================
///// Window_ActorCommand
/////  コマンドの可否をコントロールするため、全ての処理をオーバーライド
/////==============================================================================

    //完全なオーバーライド
    Window_ActorCommand.prototype.addAttackCommand = function() {
        const canUseAttack = this._actor.canAttack() && $gameSystem.battleCommandModifier().canUseAttack;
        this.addCommand(TextManager.attack, 'attack', canUseAttack);
    };
    
    //完全なオーバーライド
    Window_ActorCommand.prototype.addSkillCommands = function() {
        //ここだけ追加分
        const canUseSkill = $gameSystem.battleCommandModifier().canUseSkill;
        //以下ほぼ元と同じ処理
        var skillTypes = this._actor.addedSkillTypes();
        skillTypes.sort(function(a, b) {
            return a - b;
        });
        skillTypes.forEach(function(stypeId) {
            var name = $dataSystem.skillTypes[stypeId];
            this.addCommand(name, 'skill', canUseSkill, stypeId);//Note:ここだけ変えた
        }, this);
    };
    
    //完全なオーバーライド
    Window_ActorCommand.prototype.addGuardCommand = function() {
        const canUseGuard = this._actor.canGuard() && $gameSystem.battleCommandModifier().canUseGuard;
        this.addCommand(TextManager.guard, 'guard', canUseGuard);
    };
    
    //完全なオーバーライド
    Window_ActorCommand.prototype.addItemCommand = function() {
        const canUseItem = $gameSystem.battleCommandModifier().canUseItem;
        this.addCommand(TextManager.item, 'item', canUseItem);
    };

//////=============================================================================
///// Window_BattleSkill
/////  特定のスキルを無効化にするための処理を追加する
/////==============================================================================

    //個別のスキルの使用可否をOn/Offする
    const _Window_BattleSkill_isEnabled = Window_BattleSkill.prototype.isEnabled;
    Window_BattleSkill.prototype.isEnabled = function(item) {
        const canUse = $gameSystem.canUseSpecificSkill(item.id);
        return _Window_BattleSkill_isEnabled.apply(this, arguments) && canUse;
    };

//////=============================================================================
///// Game_System
/////  秒数管理のためのメンバーを追加
/////==============================================================================

    //初期化
    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);

        this._battleCommandModifier = new Game_BattleCommandModifier();
    };

    //バトルコマンドの表示をコントロールするクラスを取得
    Game_System.prototype.battleCommandModifier = function() {
        if(!this._battleCommandModifier) {
            this._battleCommandModifier = new Game_BattleCommandModifier();
        }
        return this._battleCommandModifier;
    };

    //特定のスキルが使用可能かどうかを判定する
    Game_System.prototype.canUseSpecificSkill = function(id) {
        return this.battleCommandModifier().canUseSpecificSkill(id);
    };

    //特定のスキルを使用可能にする
    Game_System.prototype.enableSpecificSkill = function(id) {
        this.battleCommandModifier().removeDisabledSkill(id);
    };

    //特定のスキルを使用不可にする
    Game_System.prototype.disableSpecificSkill = function(id) {
        this.battleCommandModifier().addDisabledSkill(id);
    };

    //アタックコマンドを有効にする
    Game_System.prototype.enableAttackCommand = function() {
        this.battleCommandModifier().setAttackState(true);
        this._tryForceRefreshCommandWindows();
    };

    //アタックコマンドを無効にする
    Game_System.prototype.disableAttackCommand = function() {
        this.battleCommandModifier().setAttackState(false);
        this._tryForceRefreshCommandWindows();
    };

    //スキルコマンドを有効にする
    Game_System.prototype.enableSkillCommand = function() {
        this.battleCommandModifier().setSkillState(true);
        this._tryForceRefreshCommandWindows();
    };

    //スキルコマンドを無効にする
    Game_System.prototype.disableSkillCommand = function() {
        this.battleCommandModifier().setSkillState(false);
        this._tryForceRefreshCommandWindows();
    };

    //防御コマンドを有効にする
    Game_System.prototype.enableGuradCommand = function() {
        this.battleCommandModifier().setGuardState(true);
        this._tryForceRefreshCommandWindows();
    };

    //防御コマンドを無効にする
    Game_System.prototype.disableGuardCommand = function() {
        this.battleCommandModifier().setGuardState(false);
        this._tryForceRefreshCommandWindows();
    };

    //アイテムコマンドを有効にする
    Game_System.prototype.enableItemCommand = function() {
        this.battleCommandModifier().setItemState(true);
        this._tryForceRefreshCommandWindows();
    };

    //アイテムコマンドを無効にする
    Game_System.prototype.disableItemCommand = function() {
        this.battleCommandModifier().setItemState(false);
        this._tryForceRefreshCommandWindows();
    };

    //逃走コマンドを有効にする
    Game_System.prototype.enableEscapeCommand = function() {
        this.battleCommandModifier().setEscapeState(true);
        this._tryForceRefreshCommandWindows();
    };

    //逃走コマンドを無効にする
    Game_System.prototype.disableEscapeCommand = function() {
        this.battleCommandModifier().setEscapeState(false);
        this._tryForceRefreshCommandWindows();
    };

    //アクターコマンドウィンドウを強制的に更新しようとする
    Game_System.prototype._tryForceRefreshCommandWindows = function() {
        this._tryForceRefreshActorCommandWindow();
        this._tryForceRefreshPartyCommandWindow();
    };

    //アクターコマンドウィンドウを強制的に更新しようとする
    Game_System.prototype._tryForceRefreshActorCommandWindow = function() {
        if(SceneManager._scene._actorCommandWindow) {
            SceneManager._scene._actorCommandWindow.refresh();
        }
    };

    //パーティコマンドウィンドウを強制的に更新しようとする
    Game_System.prototype._tryForceRefreshPartyCommandWindow = function() {
        if(SceneManager._scene._partyCommandWindow) {
            SceneManager._scene._partyCommandWindow.refresh();
        }
    };

//////=============================================================================
///// Game_BattleCommandModifier
/////  バトルコマンドを操作できるかどうかを管理するクラス
/////==============================================================================


    class Game_BattleCommandModifier {
        constructor() {
            this.initializeMembers();
        }

        initializeMembers() {
            this._canUseAttack = true;
            this._canUseSkill = true;
            this._canUseGuard = true;
            this._canUseItem = true;
            this._canUseEscape = true;
            this._disabledSkillList = [];
        }

        get canUseAttack() {
            return this._canUseAttack;
        }

        get canUseSkill() {
            return this._canUseSkill;
        }

        get canUseGuard() {
            return this._canUseGuard;
        }

        get canUseItem() {
            return this._canUseItem;
        }

        get canUseEscape() {
            return this._canUseEscape;
        }

        /**
         * 無効化するスキルのリスト
         * @return {Number[]}
         */
        get disabledSkillList() {
            if(!this._disabledSkillList) {
                this._disabledSkillList = [];
            }
            return this._disabledSkillList;
        }

        /**
         * id番のスキルが使用可能かどうかを調べる
         * @param {Number} id 
         */
        canUseSpecificSkill(id) {
            return this.disabledSkillList.every(x => x !== id);
        }

        /**
         * 無効化スキルをリストへ新規に追加する
         * @param {Number} id 
         */
        addDisabledSkill(id) {
            const isAlreadContain = this.disabledSkillList.find(x => x === id);
            if(!isAlreadContain) {
                this.disabledSkillList.push(id);
            }
        }

        /**
         * 登録されている無効化スキルをリストから除去する。
         * 内部的には新しいリスト（インスタンス）を生成する。
         * @param {Number} id 
         */
        removeDisabledSkill(id) {
            this._disabledSkillList = this.disabledSkillList.filter(x => x !== id);
        }

        setAttackState(value) {
            this._canUseAttack = !!value;
        }

        setSkillState(value) {
            this._canUseSkill = !!value;
        }

        setGuardState(value) {
            this._canUseGuard = !!value;
        }

        setItemState(value) {
            this._canUseItem = !!value;
        }

        setEscapeState(value) {
            this._canUseEscape = !!value;
        }
    }
    window[Game_BattleCommandModifier.name] = Game_BattleCommandModifier;

})();