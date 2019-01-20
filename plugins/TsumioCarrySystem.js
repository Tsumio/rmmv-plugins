//=============================================================================
// TsumioCarrySystem.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2019 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.2 2019/01/21 MITライセンスに変更。
// 1.0.1 2019/01/20 持ち運び時のプライオリティを変更。
// 1.0.0 2019/01/19 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:ja
 * @plugindesc イベントを持ち運ぶ機能を追加します。
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * @param イベントを拾うときのSE
 * @desc イベントを拾うときのデフォルトSEを設定します。
 * @type file
 * @dir audio/se
 * @default Jump1
 * 
 * @param イベントを投げるときのSE
 * @desc イベントを投げるときのデフォルトSEを設定します。
 * @type file
 * @dir audio/se
 * @default Earth3
 * 
 * @param イベントを投げられないときのSE
 * @desc イベントを投げられないときのデフォルトSEを設定します。
 * @type file
 * @dir audio/se
 * @default Buzzer1
 * 
 * @param イベントを投げられるリージョン番号
 * @desc イベントを投げられるリージョン番号を設定します。
 * @type number[]
 * @default ["1","2"]
 * 
 * @help イベントを持ち運ぶ機能を追加します。
 * 
 * このプラグインは帆波様向けに制作されたプラグインです。
 * 帆波様の意向により、MITライセンスとして公開します。
 * 
 * 【特徴】
 * ・イベントを投げる機能を実装します
 * ・ExpandEventsActionで発生していた不具合を修正しています
 * ・効果音やスイッチのOn/Offをイベントごとに指定できます
 * 
 * 【使用方法】
 * プラグインの導入後、プラグインパラメーターを設定してください。
 * 
 * 拾ったり投げたりすることを許可するイベントのメモ欄には
 * <canPickUp:true>
 * を記載してください。
 * 
 * 【イベントのメモタグ】
 *  イベントにメモタグを指定することによって、以下のものを指定できるようになります。
 * ・拾い時のSE
 * ・投げ時のSE
 * ・拾い時ONにするスイッチ番号
 * ・投げ時Offにするスイッチ番号
 * 
 * 例えば以下のようにメモタグを設定できます。
 * <canPickUp:true><throwSe:Equip1><pickUpSe:Equip2><offSwitch:5><onSwitch:4>
 * 意味：
 * ・投げた時Equip1を再生して
 * ・拾ったときEquip2を再生して
 * ・投げた時スイッチ5番をオフにして
 * ・拾った時スイッチ4版をオンにする
 * 
 * 【更新履歴】
 * 1.0.2 2019/01/21 MITライセンスに変更。
 * 1.0.1 2019/01/20 持ち運び時のプライオリティを変更。
 * 1.0.0 2019/01/19 公開。
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
    var pluginName = 'TsumioCarrySystem';

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
    var getParamDouble = function(paramNames, min, max) {
        var value = getParamString(paramNames);
        if (arguments.length < 2) min = -Infinity;
        if (arguments.length < 3) max = Infinity;
        return Number(value);
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
    //イベントを拾うときのSE
    param.pickUpSE = getParamString(['イベントを拾うときのSE', 'イベントを拾うときのSE']);
    //イベントを拾うときのSE
    param.throwSE = getParamString(['イベントを投げるときのSE', 'イベントを投げるときのSE']);
    //イベントを投げられないときのSE
    param.beepSE = getParamString(['イベントを投げられないときのSE', 'イベントを投げられないときのSE']);
    //イベントを投げられるリージョン番号
    param.regionIDs = getParamString(['イベントを投げられるリージョン番号', 'イベントを投げられるリージョン番号']);
    param.regionIDs = convertArrayParam(param.regionIDs);


////=============================================================================
//// Game_Player
////  投げアクションを実装する
////=============================================================================

    const _Game_Player_initialize = Game_Player.prototype.initialize;
    Game_Player.prototype.initialize = function() {
        _Game_Player_initialize.call(this);
        this._throwAction = new Game_ThrowAction();
    };

    //途中で保存したセーブでも使えるようにする
    Game_Player.prototype.getThrowAction = function() {
        return this._throwAction || new Game_ThrowAction();
    };

    const _Game_Player_update = Game_Player.prototype.update;
    Game_Player.prototype.update = function(sceneActive) {
        _Game_Player_update.apply(this, arguments);
        this.updateCarrying();
    };

    //運んでいるときの挙動を管理する
    Game_Player.prototype.updateCarrying = function() {
        if (!this.canMove() || $gameMessage.isBusy()) {
            return;
        }
        if(!Input.isTriggered('ok')) {
            return;
        }

        if(this.getThrowAction().isLocked) {
            this.getThrowAction().throw();
        }else {
            const x = $gameMap.roundXWithDirection(this.x, this.direction());
            const y = $gameMap.roundYWithDirection(this.y, this.direction());
            this.getThrowAction().lockEvent(x, y);
        }
    };

    //場所移動したとき、掴んでいたアイテムをリリースする
    const _Game_Player_performTransfer = Game_Player.prototype.performTransfer;
    Game_Player.prototype.performTransfer = function() {
        _Game_Player_performTransfer.call(this);
        this.getThrowAction()._release();
    };

////=============================================================================
//// Game_Event
////  投げアクション中のイベントがプレイヤーを追跡するようにする
////=============================================================================

    const _Game_Event_initMembers = Game_Event.prototype.initMembers;
    Game_Event.prototype.initMembers = function() {
        _Game_Event_initMembers.call(this);
        this.shouldTrack = false;
    };

    const _Game_Event_update = Game_Event.prototype.update;
    Game_Event.prototype.update = function() {
        _Game_Event_update.call(this);
        this.updateTrackingPlayer();
    };

    //持ち運び中、プレイヤーをトラッキングする
    Game_Event.prototype.updateTrackingPlayer = function() {
        if(!this.shouldTrack) {
            return;
        }
        this.setPosition($gamePlayer._realX, $gamePlayer._realY - 0.7);//Note:0.7は適当な数値
    };


////=============================================================================
//// Game_ThrowAction
////  投げアクションそのもの。Game_Playerが保持する。
////=============================================================================

    class Game_ThrowAction {
        constructor() {
            this._initializeMember();
        }

        _initializeMember() {
            this._isLocked        = false;
            this._carryingEventId = 0;
            this._prevThrowMode   = false;
            this._prevPriority    = 0;
        }

        /**
         * 現在イベントをロック中かどうか
         */
        get isLocked() {
            return this._isLocked;
        }

        /**
         * 運んでいる最中のイベントID
         */
        get carryingEventId() {
            return this._carryingEventId;
        }

        lockEvent(x, y) {
            if(this.isLocked) {
                return;
            }

            const targetEvents = $gameMap.eventsXy(x, y);
            if(targetEvents.length === 0) {
                return;
            }

            //イベントをロックする処理
            //Note:ロジックが汚い＆長いので、余裕があればリファクタリングしてメソッドとして抽出したい。
            const targetEvent = targetEvents[0];
            if(targetEvent.event().meta['canPickUp']) {
                this._carryingEventId = targetEvent.eventId();
                this._playPickUpSe(targetEvent);
                this._tryTurnOnPickUpSwitch(targetEvent);
                this._turnOnEventTracking(targetEvent);
                this._isLocked = true;
            }
        }

        throw() {
            if(!this.isLocked) {
                return;
            }
            if(!this._canThrow()) {
                AudioManager.playSe({'name':param.beepSE, 'volume':90, 'pitch':100, 'pan':0});
                return;
            }

            //前方にイベントがない場合のみ投げる
            //Note:ロジックが汚い＆長いので、余裕があればリファクタリングしてメソッドとして抽出したい。
            const x = $gameMap.roundXWithDirection($gamePlayer.x, $gamePlayer.direction());
            const y = $gameMap.roundYWithDirection($gamePlayer.y, $gamePlayer.direction());
            const forwardEventId = $gameMap.eventIdXy(x, y);
            if(!forwardEventId || forwardEventId === this.carryingEventId) {
                const event = $gameMap.event(this.carryingEventId);
                event.locate(x, y);
                this._playThrowSe(event);
                this._tryTurnOffThrowSwitch(event);
                this._turnOffEventTracking(event);
                this._release();
            }else {
                AudioManager.playSe({"name":param.beepSE,"volume":90,"pitch":100,"pan":0});
            }
        }

        /**
         * 投げたあと、ロック状態と運んでいる状態を元に戻す。
         */
        _release() {
            this._isLocked        = false;
            this._carryingEventId = 0;
        }

        _canThrow() {
            const x = $gameMap.roundXWithDirection($gamePlayer.x, $gamePlayer.direction());
            const y = $gameMap.roundYWithDirection($gamePlayer.y, $gamePlayer.direction());
            const regionId = $gameMap.regionId(x, y);

            return param.regionIDs.find(x => x === regionId);
        }

        /**
         * 拾い上げたときのSEを再生する
         * @param {Game_Event} event 
         */
        _playPickUpSe(event) {
            const seName = event.event().meta['pickUpSe'];
            if(seName) {
                AudioManager.playSe({'name':seName, 'volume':90, 'pitch':100, 'pan':0});
            }else {
                AudioManager.playSe({'name':param.pickUpSE, 'volume':90, 'pitch':100, 'pan':0});
            }
        }

        /**
         * 投げた際のSEを再生する
         * @param {Game_Event} event 
         */
        _playThrowSe(event) {
            const seName = event.event().meta['throwSe'];
            if(seName) {
                AudioManager.playSe({'name':seName, 'volume':90, 'pitch':100, 'pan':0});
            }else {
                AudioManager.playSe({'name':param.throwSE, 'volume':90, 'pitch':100, 'pan':0});
            }
        }

        /**
         * 拾い上げたとき、指定のスイッチをONにする。
         * 指定がなければ無視。
         * @param {Game_Event} event 
         */
        _tryTurnOnPickUpSwitch(event) {
            const switchId = event.event().meta['onSwitch'];
            if(switchId) {
                $gameSwitches.setValue(switchId, true);
            }
        }

        /**
         * 投げたとき、指定のスイッチをOFFにする。
         * 指定がなければ無視。
         * @param {Game_Event} event 
         */
        _tryTurnOffThrowSwitch(event) {
            const switchId = event.event().meta['offSwitch'];
            if(switchId) {
                $gameSwitches.setValue(switchId, false);
            }
        }

        /**
         * イベントのトラッキングを有効にする
         * @param {Game_Event} event 
         */
        _turnOnEventTracking(event) {
            event.shouldTrack = true;
            this._prevThrowMode = event.isThrough();
            this._prevPriority  = event._priorityType;
            event.setThrough(true);
            event.setPriorityType(9);
        }

        /**
         * イベントのトラッキングを無効にする
         * @param {Game_Event} event 
         */
        _turnOffEventTracking(event) {
            event.shouldTrack = false;
            event.setThrough(this._prevThrowMode);
            event.setPriorityType(this._prevPriority);
        }
    }
    window[Game_ThrowAction.name] = Game_ThrowAction;

})();