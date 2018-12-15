//=============================================================================
// TsumioBattleResult.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2018 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.1 2018/12/15 アイテムを何も取得していないときのテキストを設定できるようにした。
// 1.0.0 2018/12/15 公開。
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
 * @param DescSettings
 * @type struct<DescSettings>
 * @desc The setting of the text to be displayed in the explanation column of each window.
 * @default {"expDesc":"取得経験値","skillDesc":"習得スキル","noSkillDesc":"なし","noItemDesc":"なし","itemDesc":"取得アイテム"}
 * 
 * @param LevelUpAnimationSettings
 * @type struct<AnimationSettings>
 * @desc Animation settings to be played back at level up (eg just by displaying LevelUp!).
 * @default {"fileName":"levelUpAnim","seName":"Flash2","startId":"0","endId":"30","speed":"4","x":"0","y":"0"}
 * 
 * @param SkillGettingAnimationSettings
 * @type struct<AnimationSettings>
 * @desc Animation settings to be played back when skill is obtained (eg scrolls will spread).
 * @default {"fileName":"SkillGettingAnim","seName":"Skill3","startId":"0","endId":"30","speed":"4","x":"0","y":"0"}
 * 
 * @param ItemGettingAnimationSettings
 * @type struct<AnimationSettings>
 * @desc Animation settings to be played back at item acquisition (eg treasure box opens).
 * @default {"fileName":"itemAnim","seName":"Item2","startId":"0","endId":"30","speed":"4","x":"0","y":"0"}
 * 
 * @help This plugin changes the display of battle result.
 * 
 * ----feature----
 * -> Change the display of battle result
 * -> Play animation when displaying battle results
 * -> Animation can be skipped at user's arbitrary timing
 * 
 * ----how to use----
 * You can use this plugin after setting some plugin parameters.
 * 
 * ----animation settings----
 * Animation image is read from "img/uianimation".
 * Furthermore, the sequential number starts from startId.
 * For example, if fileName is set to "itemAnim", startId is set to "0", and endId is set to "3", it is as follows.
 * · Read "itemAnim0.png" from "img/uianimation"
 * · Read "itemAnim1.png" from "img/uianimation"
 * · Read "itemAnim3.png" from "img/uianimation"
 * 
 * ---no use animation----
 * If you do not want use animation, set endId to 0 and specify a dummy image file.
 * If a dummy image is not prepared, an error will occur
 * 
 * ----change log---
 * 1.0.1 2018/12/15 Add a function setting the text when not obtain any item.
 * 1.0.0 2018/12/15 Release.
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
 * @plugindesc 戦闘結果の表示を変更するプラグイン。
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * @param 説明文の設定
 * @type struct<DescSettings>
 * @desc 各ウィンドウの説明欄に表示するテキストの設定。
 * @default {"expDesc":"取得経験値","skillDesc":"習得スキル","noSkillDesc":"なし","noItemDesc":"なし","itemDesc":"取得アイテム"}
 * 
 * @param レベルアップ時アニメーションの設定
 * @type struct<AnimationSettings>
 * @desc レベルアップ時に再生されるアニメーションの設定（例：巻物が広がっていく）。
 * @default {"fileName":"levelUpAnim","seName":"Flash2","startId":"0","endId":"30","speed":"4","x":"0","y":"0"}
 * 
 * 
 * @param スキル取得時アニメーションの設定
 * @type struct<AnimationSettings>
 * @desc スキル取得時に再生されるアニメーションの設定（例：巻物が広がっていく）。
 * @default {"fileName":"SkillGettingAnim","seName":"Skill3","startId":"0","endId":"30","speed":"4","x":"0","y":"0"}
 * 
 * @param アイテム取得時アニメーションの設定
 * @type struct<AnimationSettings>
 * @desc アイテム取得時に再生されるアニメーションの設定（例：宝箱が開く）。
 * @default {"fileName":"itemAnim","seName":"Item2","startId":"0","endId":"30","speed":"4","x":"0","y":"0"}
 * 
 * 
 * @help 戦闘結果の表示を変更します。
 * 
 * 【特徴】
 * ・戦闘結果の表示を変更します
 * ・戦闘結果の表示時にアニメーションを再生することができます
 * ・アニメーションはユーザーの任意のタイミングでスキップできます
 * 
 * 【使用方法】
 * プラグインの導入後、プラグインパラメーターを設定してください。
 * 
 * 【アニメーションの設定】
 * アニメーション画像は「img/uianimation」から読み込みます。
 * また、連番はstartId（含む）から始まります。
 * 例えばfileNameに「itemAnim」とし、startIdを「0」、endIdを「3」に設定した場合は以下のようになります。
 * ・「img/uianimation」から「itemAnim0.png」を読み込む
 * ・「img/uianimation」から「itemAnim1.png」を読み込む
 * ・「img/uianimation」から「itemAnim3.png」を読み込む
 * 
 * 【アニメーションを使用しない場合】
 * アニメーションを使用しない場合、endIdを0にして、ダミーの画像ファイルを指定してください。
 * ダミーの画像を用意していない場合はエラーが発生します。
 * 
 * 【更新履歴】
 * 1.0.1 2018/12/15 アイテムを何も取得していないときのテキストを設定できるようにした。
 * 1.0.0 2018/12/15 公開。
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
/*~struct~AnimationSettings:
 * 
 * @param fileName
 * @type string
 * @desc アニメーションの連番を除くファイル名
 * 
 * @param seName
 * @type file
 * @dir audio/se
 * @desc アニメーション再生時に流すSE名
 * 
 * @param startId
 * @type number
 * @max 10000
 * @desc 連番の開始ID(startIdから始まってendId（含む）までの画像をアニメーション）。
 * @default 0
 * 
 * @param endId
 * @type number
 * @max 10000
 * @desc 連番の終了ID(startIdから始まってendId（含む）までの画像をアニメーション）。
 * @default 30
 * 
 * @param speed
 * @type number
 * @max 10000
 * @desc アニメーションのスピード(0に近いほど早い）
 * @default 4
 * 
 * @param x
 * @type number
 * @max 10000
 * @min -10000
 * @desc X座標。
 * @default 0
 * 
 * @param y
 * @type number
 * @max 10000
 * @min -10000
 * @desc Y座標。
 * @default 0
 */
/*~struct~DescSettings:
 * 
 * @param expDesc
 * @type string
 * @desc 取得した経験値を説明するテキスト。
 * @default 取得経験値
 * 
 * @param skillDesc
 * @type string
 * @desc スキルを習得したことを説明するテキスト。
 * @default 習得スキル
 * 
 * @param noSkillDesc
 * @type string
 * @desc 習得したスキルがないことを説明するテキスト。
 * @default なし
 * 
 * @param noItemDesc
 * @type string
 * @desc 取得したアイテムがないことを説明するテキスト。
 * @default なし
 * 
 * @param itemDesc
 * @type string
 * @desc アイテムを取得したことを説明するテキスト。
 * @default 取得アイテム
 */

(function() {
    'use strict';
    var pluginName = 'TsumioBattleResult';

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
    param.descSettings = getParamString(['DescSettings', '説明文の設定']);
    param.descSettings = convertParam(param.descSettings);
    //レベルアップ時アニメーションの設定
    param.levelUpAnimationSettings = getParamString(['LevelUpAnimationSettings', 'レベルアップ時アニメーションの設定']);
    param.levelUpAnimationSettings = convertArrayParam(param.levelUpAnimationSettings);
    //スキル取得時アニメーションの設定
    param.skillGettingAnimationSettings = getParamString(['SkillGettingAnimationSettings', 'スキル取得時アニメーションの設定']);
    param.skillGettingAnimationSettings = convertArrayParam(param.skillGettingAnimationSettings);
    //アイテム取得時アニメーションの設定
    param.itemGettingAnimationSettings = getParamString(['ItemGettingAnimationSettings', 'アイテム取得時アニメーションの設定']);
    param.itemGettingAnimationSettings = convertArrayParam(param.itemGettingAnimationSettings);


////=============================================================================
//// AnimSettings
////  補完をさせるためだけのクラス。実際には使用しない。
////=============================================================================

    class AnimSettings {
        /**
         * @return {String} アニメーションの連番を除くファイル名
         */
        get fileName() {
            return null;
        }

        /**
         * @return {String} 再生するSE名
         */
        get seName() {
            return null;
        }

        /**
         * @return {Number} 連番の開始ID(プラグインパラメータで設定される)
         */
        get startId() {
            return null;
        }

        /**
         * @return {Number} 連番の終了ID(startIdから始まってendIdまでの画像をアニメーション)
         */
        get endId() {
            return null;
        }

        /**
         * @return {Number} アニメーションのスピード(0に近いほど早い）
         */
        get speed() {
            return null;
        }

        /**
         * @return {Number} X座標
         */
        get x() {
            return null;
        }

        /**
         * @return {Number} Y座標
         */
        get y() {
            return null;
        }
    }


////=============================================================================
//// ImageManager
////  ファイルを読み込むためのメソッドを追加する。async/awaitを使いたいから。
////=============================================================================

    ImageManager.loadUIAnimation = function(filename, hue) {
        return this.loadBitmapAsync(`img/${AnimSettingsManager.folderName}/`, filename, hue, true);
    };

    ImageManager.loadFaceAsync = function(filename, hue) {
        return this.loadBitmapAsync('img/faces/', filename, hue, true);
    }

    //ロードが完了した時点でresolveを実行する
    ImageManager.loadBitmapAsync = function(folder, filename, hue, smooth) {
        return new Promise((resolve, reject) => {
            const bitmap = this.loadBitmap(folder, filename, hue, smooth);
            bitmap.addLoadListener(() => {
                resolve(bitmap);
            });
        });
    };

////=============================================================================
//// AnimSettingsManager
////  アニメーションの設定を管理するクラス。状態は保持しない
////=============================================================================
    class AnimSettingsManager {
        /**
         * UIアニメーション用画像を入れておくフォルダ
         */
        static get folderName() {
            return 'uianimation';
        }
    }

////=============================================================================
//// BattleManager
////  元の勝利メッセージを潰し、独自のウィンドウを表示するように変える
////=============================================================================

    //完全にオーバーライド
    BattleManager.displayVictoryMessage = function() {
    };

    //完全にオーバーライド
    BattleManager.displayRewards = function() {
    };

    //勝利時に結果ウィンドウを表示する
    const _BattleManager_processVictory = BattleManager.processVictory;
    BattleManager.processVictory = function() {
        _BattleManager_processVictory.call(this);
        SceneManager._scene._windowLayer.visible = false;
        this._resultWindow.show();
        this._resultWindow.onVictorySubject.notify();
        this._resultWindow._state.enter();
    };

    BattleManager.setResultWindow = function(window) {
        this._resultWindow = window;
    };

////=============================================================================
//// Window_BattleResult
////  戦闘結果を表示するウィンドウ
////=============================================================================
    class Window_BattleResult extends Window_Base {

        initialize(x, y, width, height) {
            super.initialize(x, y, width, height);
            this._onVictorySubject = new UI_Subject();
            this.hide();

            this._createExpArea();
            this._createSkillGettingArea();
            this._createItemGettingArea();
            this._createDummyArea();
            this.initializeState();
        }

        initializeState() {
            this._state = this._expArea;
            this._expArea.setNextState(this._skillArea);
            this._skillArea.setNextState(this._itemArea);
            this._itemArea.setNextState(this._dummyArea);
            this._dummyArea.setNextState(null);
        }

        get canInput() {
            return this.visible;
        }

        get onVictorySubject() {
            return this._onVictorySubject;
        }

        get state() {
            return this._state;
        }

        update() {
            super.update();
            if(!this.canInput) {
                return;
            }
            this._updateInput();
            this._updateState();
        }

        _createExpArea() {
            const x = 0;
            const y = this.contentsHeight();
            this._expArea = new ExpArea(this, x, y, param.levelUpAnimationSettings);
        }

        _createSkillGettingArea() {
            const x = 0;
            const y = 0;
            this._skillArea = new SkillGettingArea(this, x, y, param.skillGettingAnimationSettings);
        }

        _createItemGettingArea() {
            const x = 0;
            const y = 0;
            this._itemArea = new ItemGettingArea(this, x, y, param.itemGettingAnimationSettings);
        }

        _createDummyArea() {
            const x = 0;
            const y = 0;
            this._dummyArea = new DummyArea(this, x, y, null);
        }

        _updateInput() {
            if(Input.isTriggered('ok') || Input.isTriggered('cancel')) {
                this._handleState();
            }
        }

        _updateState() {
            this._state.update();
        }

        //Note:もう少し厳密なStateパターンにしたかたっが、他の処理が混入してしまっているので現状はこれ。リファクタリング対象。
        _handleState() {
            const newState = this._state.getNextState();
            if(newState) {
                this._state.exit();
                this._state = newState;
                this._state.enter();
            }
        }
    }

////=============================================================================
//// BattleResult_AreaBase
////  Window_BattleResultからのみ利用するエリアの基盤クラス。
////=============================================================================
    class BattleResult_AreaBase {
        /**
         * 
         * @param {Window_BattleResult} window 
         * @param {AnimSettings} settings
         */
        constructor(window, x, y, settings) {
            this._window = window;
            this._x = x;
            this._y = y;
            this._animation = null;
            this._settings = settings;
            this._nextState = null;

            this.initializeMember();
            this.initializeProcess();
            this.initializeObserver();
        }

        get nullState() {
            if(!this._nullState) {
                this._nullState = new NullResultArea(this.window);
            }
            return this._nullState;
        }

        initializeMember() {
        }

        initializeProcess() {
            this._createAnimationAsync();
            //this.drawDisplayObjects();
        }

        initializeObserver() {
            if(!this._animation) {
                return;
            }
            //this.onVictorySubject.subscribe(_ => this.drawDisplayObjects());
            this._animation.animationEndedSubject.subscribe(_ => this._handleState());
        }

        async _createAnimationAsync() {
            if(!this._settings) {
                return;
            }
            this._animation = new Sprite_UIAnimation(new Bitmap(Graphics.width, Graphics.height), this._settings);
            this.addChild(this._animation);
            await this._animation.loadAllAnimationBitmap();
        }

        /**
         * @return {Window_Base}
         */
        get window() {
            return this._window;
        }

        get x() {
            return this._x;
        }

        get y() {
            return this._y;
        }

        get windowWidth() {
            return this.window.width;
        }

        get windowHeight() {
            return this.window.height;
        }

        /**
         * @return {UI_Subject}
         */
        get onVictorySubject() {
            return this.window._onVictorySubject;
        }

        update() {
        }

        setNextState(state) {
            this._nextState = state;
        }

        drawDisplayObjects() {
        }

        drawTextEx(text, x, y) {
            this.window.drawTextEx(text, x, y);
        }

        drawText(text, x, y, maxWidth, align) {
            this.window.drawText(text, x, y, maxWidth, align);
        }

        //Note:LoadFaceが待機せずbltしようとするので、新しく非同期メソッドを作成した。中身はほぼWindow_Baseのやつのコピー
        async drawFace(faceName, faceIndex, x, y, width, height) {
            width = width || Window_Base._faceWidth;
            height = height || Window_Base._faceHeight;
            var bitmap = await ImageManager.loadFaceAsync(faceName);
            var pw = Window_Base._faceWidth;
            var ph = Window_Base._faceHeight;
            var sw = Math.min(width, pw);
            var sh = Math.min(height, ph);
            var dx = Math.floor(x + Math.max(width - pw, 0) / 2);
            var dy = Math.floor(y + Math.max(height - ph, 0) / 2);
            var sx = faceIndex % 4 * pw + (pw - sw) / 2;
            var sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
            this.window.contents.blt(bitmap, sx, sy, sw, sh, dx, dy);
        };

        drawActorFace(actor, x, y, width, height) {
            //Note:なぜか10ポイントぐらいずれているので、補正している。理由は謎。
            this.drawFace(actor.faceName(), actor.faceIndex(), x-10, y-10, width, height);
        }

        drawGauge(x, y, width, rate, color1, color2) {
            //Note:なぜか10ポイントぐらいずれているので、補正している。理由は謎。
            this.window.drawGauge(x-10, y-10, width, rate, color1, color2);
        }

        changeTextColor(color) {
            this.window.changeTextColor(color);
        }

        systemColor() {
            return this.window.systemColor();
        }

        resetTextColor() {
            this.window.resetTextColor();
        }

        clear() {
            this.window.contents.clear();
        }

        addChildToBack(displayObject) {
            this.window.addChildToBack(displayObject);
        }

        addChild(displayObject) {
            this.window.addChild(displayObject);
        }

        stopAnimation() {
            this._animation.stop();
        }

        playAnimation() {
            this._animation.play();
        }

        playSe() {
            if(this._settings.seName) {
                AudioManager.playSe({name:this._settings.seName, volume:100, pitch:100, pan:0});
            }
        }

        getNextState() {
            return this._nextState || this.nullState;
        }

        enter() {
            throw new Error('enterメソッドがオーバーライドされていません。');
        }

        exit() {
            throw new Error('enterメソッドがオーバーライドされていません。');
        }

        flashScreen() {
            $gameScreen.startFlash([255, 255, 255, 128], 30);
        }

        lineHeight() {
            return this.window.lineHeight();
        }

        /**
         * アイテムやスキルを入手したときの動作
         */
        processResultAnimation() {
            this.flashScreen();
            this.playAnimation();
            this.playSe();
        }

        _handleState() {
            if(this.window.state === this) {
                this.window._handleState(this);
            }
        }
    }

////=============================================================================
//// NullResultArea
////  Nullのとき実行されるクラス。
////  BattleResult_AreaBaseを継承していないのは、満たすべき契約がenterのみだから。
////=============================================================================
    class NullResultArea {
        constructor(window) {
            this.window = window;
        }

        enter() {
            this.window.hide();
        }

        exit() {
            //契約を満たすだけで何もすることはない。
        }

        update() {
            //契約を満たすだけで何もすることはない
        }
    }

////=============================================================================
//// DummyArea
////  キーを一つ受け取るようにするためのダミーエリア。Window_BattleResultからのみ利用する。
////=============================================================================

    class DummyArea extends BattleResult_AreaBase {
        enter() {
        }

        exit() {
        }
    }

////=============================================================================
//// ItemGettingArea
////  戦闘結果のアイテムエリア。Window_BattleResultからのみ利用する。
////=============================================================================

    class ItemGettingArea extends BattleResult_AreaBase {

        initializeMember() {
            super.initializeMember();
            this._x += this.boxMargin;
            this._y += this.boxMargin;
            this._obtainedWindow = null;
            this._isItemOrGoldObtained = false;
        }

        initializeObserver() {
            super.initializeObserver();
            this._animation.animationEndedSubject.subscribe(_ => this.drawDisplayObjects());
        }

        get boxWidth() {
            return this.window.contentsWidth()/2;
        }

        get boxHeight() {
            return this.window.contentsHeight()/2 + this.boxMargin;
        }

        get boxMargin() {
            return 20;
        }

        drawDisplayObjects() {
            super.drawDisplayObjects();
            this._createObtainedWindow();
        }

        enter() {
            this._isItemOrGoldObtained = (BattleManager._rewards.gold > 0) || (BattleManager._rewards.items.length > 0);
            if(this._isItemOrGoldObtained) {
                this.processResultAnimation();
            }else {
                this.stopAnimation();
            }
        }

        exit() {
            this.stopAnimation();
            //this._obtainedWindow.deselect();
            //this._obtainedWindow.deactivate();
        }

        _createObtainedWindow() {
            if(this._obtainedWindow) {
                return;
            }
            const x = this.x + this.window.contentsWidth() - this.boxWidth;
            const y = this.y + this.boxMargin + this.lineHeight();
            const width = this.boxWidth;
            const height = this.boxHeight - this.boxMargin - this.lineHeight();
            this._obtainedWindow = new Window_ObtainedItems(x, y, width, height, this.newSkillTexts);
            this.addChildToBack(this._obtainedWindow);
        }
    }

////=============================================================================
//// SkillGettingArea
////  戦闘結果のスキル取得用エリア。Window_BattleResultからのみ利用する。
////=============================================================================
    class SkillGettingArea extends BattleResult_AreaBase {

        initializeMember() {
            super.initializeMember();
            this._x += this.boxMargin;
            this._y += this.boxMargin;
            this._prevSkillArray = this._createPrevSkillArray();
            this._isAnyActorObtainedNewSkill = false;
            this._newSkillTexts = null;
            this._obtainedWindow = null;
        }

        initializeObserver() {
            super.initializeObserver();
            this._animation.animationEndedSubject.subscribe(_ => this.drawDisplayObjects());
        }

        /**
         * @return {Array}
         */
        get prevSkillArray() {
            return this._prevSkillArray;
        }

        /**
         * @return {Array}
         */
        get newSkillTexts() {
            return this._newSkillTexts;
        }

        get boxWidth() {
            return this.window.contentsWidth()/2;
        }

        get boxHeight() {
            return this.window.contentsHeight()/2 + this.boxMargin;
        }

        get boxMargin() {
            return 20;
        }

        drawDisplayObjects() {
            super.drawDisplayObjects();
            this._createObtainedWindow();
        }

        enter() {
            this._newSkillTexts = this._makeNewSkillText();
            this._isAnyActorObtainedNewSkill = this.newSkillTexts.length > 0;
            if(this._isAnyActorObtainedNewSkill) {
                this.processResultAnimation();
            }else {
                this.stopAnimation();
            }
        }

        exit() {
            this.stopAnimation();
            //this._obtainedWindow.deselect();
            //this._obtainedWindow.deactivate();
        }

        _makeNewSkillText() {
            const allSkills = $gameParty.allMembers().map(actor => {
                let lastSkills = this.prevSkillArray.find(skill => skill.id === actor.actorId());
                return {actorName:actor.name(), newSkills:actor.findNewSkills(lastSkills.lastSkills).map(x => x.name)};
            });
            const filtered = allSkills.filter(x => x.newSkills.length > 0);
            //Note:もう少しかっこよく書きたいが、やり方が思いつかなかったのでfor-ofを使った
            const result = [];
            for(let array of filtered) {
                for(let skill of array.newSkills) {
                    result.push({actorName:array.actorName, skillName:skill});
                }
            }
            return result;
        }

        _createPrevSkillArray() {
            return $gameParty.allMembers().map(x => {
                return {id:x.actorId(), lastSkills:x.skills()};
            });
        }

        _createObtainedWindow() {
            if(this._obtainedWindow) {
                return;
            }
            const x = this.x;
            const y = this.y + this.boxMargin + this.lineHeight();
            const width = this.boxWidth;
            const height = this.boxHeight - this.boxMargin - this.lineHeight();
            this._obtainedWindow = new Window_ObtainedSkills(x, y, width, height, this.newSkillTexts);
            this.addChildToBack(this._obtainedWindow);
        }
    }

////=============================================================================
//// ExpArea
////  戦闘結果の経験値エリア。Window_BattleResultからのみ利用する。
////=============================================================================

    class ExpArea extends BattleResult_AreaBase {

        initializeMember() {
            super.initializeMember();
            this._x += this.leftMargin;
            this._y -= ((this.boxHeight+this.bottomMargin) * this.lineMaxNum) - this.margin;
            this._prevLevelArray = this._createPrevLevelArray();
            this._isAnyActorLevelUp = false;
        }

        initializeProcess() {
            this._createBackground();
            super.initializeProcess();
        }

        initializeObserver() {
            super.initializeObserver();
        }

        get backColor() {
            return '#000';
        }

        get expGaugeColor1() {
            return '#FFD21E';
        }

        get expGaugeColor2() {
            return '#FF9900';
        }

        get expGaugeWidth() {
            return this.boxWidht - this.faceWidth - this.leftMargin;
        }

        get backPaintOpacity() {
            return 64;
        }

        /**
         * 1つの黒い枠の幅
         */
        get boxWidht() {
            //Note:1.5でなんでちょうどよく分割できるのかは謎。小数点をあまり使いたくないので注意。
            return (this.windowWidth/2) - this.leftMargin*1.5;
        }

        /**
         * 1つの黒い枠の高さ
         */
        get boxHeight() {
            return 45;
        }

        /**
         * 黒い枠の最大行数
         */
        get lineMaxNum() {
            return 4;
        }

        get leftMargin() {
            return 20;
        }

        get bottomMargin() {
            return 5;
        }

        /**
         * 一番下の部分のマージン
         */
        get margin() {
            return 25;
        }

        get faceWidth() {
            return 100;
        }

        get faceHeight() {
            return 32;
        }

        /**
         * @return {Array}
         */
        get prevLevelArray() {
            return this._prevLevelArray;
        }

        update() {
            
        }

        drawDisplayObjects() {
            super.drawDisplayObjects();
            this.clear();
            this._drawBackground();
            this._drawActorStatus();
            this._createExpCalcWindow();
        }

        enter() {
            this.drawDisplayObjects();
            if(this._isAnyActorLevelUp) {
                this.processResultAnimation();
            }else {
                this.stopAnimation();
            }
        }

        exit() {
            this.stopAnimation();
        }

        //HACK:マジックナンバーが多すぎるのでリファクタリング対象
        _createExpCalcWindow() {
            //Note:+8とか+4は補正用の数値。多分windowのframeを非表示にしているせいでずれている。リファクタリング対象。
            const width = this.boxWidht*1.5 + 8;
            const height = this.boxHeight + 8 + 18;//18は文字が表示できなかったので足した数字。
            const x = this.windowWidth - width - this.leftMargin + 4;
            const y = this.y - height;
            const window = new Window_ExpCalcArea(x, y, width, height);
            this.addChildToBack(window);
        }

        _createBackground() {
            this.bitmap = new Bitmap(this.windowWidth, this.windowHeight);
            this.backgroundSprite = new Sprite();
            this.backgroundSprite.bitmap = this.bitmap;
            this.addChildToBack(this.backgroundSprite);
        }

        _drawBackground() {
            this.bitmap.clear();
            this.bitmap.paintOpacity = this.backPaintOpacity;
            $gameParty.allMembers().forEach((actor, index) => {
                const pos = this._getBackgroundPosition(index);
                this.bitmap.fillRect(pos.x, pos.y, this.boxWidht, this.boxHeight, this.backColor);
            });
            this.bitmap.paintOpacity = 255;
        }

        _drawActorStatus() {
            $gameParty.allMembers().forEach((actor, index) => {
                const pos = this._getBackgroundPosition(index);
                this._drawFace(actor, pos);
                this._drawExpGauge(actor, pos);
                this._drawLevelText(actor, pos);
            });
        }

        _drawFace(actor, pos) {
            this.drawActorFace(actor, pos.x, pos.y, this.faceWidth, this.faceHeight);
        }

        _drawExpGauge(actor, pos) {
            const requiredPercent = this._calcNextExpPercent(actor);
            const rate = (typeof(requiredPercent)==='number') ? requiredPercent / 100 : 0;
            const padding = 5;//Note:5は適当な数字。顔グラから少し離したかっただけ。
            const x = pos.x + this.faceWidth + padding;
            const y = pos.y - this.bottomMargin;
            this.drawGauge(x, y, this.expGaugeWidth, rate, this.expGaugeColor1, this.expGaugeColor2);
        }

        _drawLevelText(actor, pos) {
            const padding = 20;//Note:20は適当な数字
            const x = pos.x + this.faceWidth;
            const y = pos.y - padding;
            const levelUpText = this._makeLevelUpText(actor);
            this.drawTextEx(`${TextManager.levelA} ${actor.level} ${levelUpText}`, x, y);
        }

        _calcNextExpPercent(actor) {
            //Initialize
            var requiredExp       = actor.nextRequiredExp();
            var nextLevelExp      = actor.nextLevelExp();
            var currentExp        = actor.currentExp();
            var previousLevelExp  = actor.expForLevel(actor.level);//Get the previous require level exp.
    
            //Calculate next exp percentage.
            if (actor.level === 1) {
                return currentExp / nextLevelExp * 100;
            }else if(actor.isMaxLevel()){
                return 100;
            }else{
                var pow          = Math.pow(10, 2);
                var remainingPer = 100 - (requiredExp / (nextLevelExp - previousLevelExp) * 100)//The remaining percentage
                return Math.floor(remainingPer * pow) / pow;
            }
        };
    

        _getBackgroundPosition(index) {
            let x = 0;
            let y = 0;
            const line = this._calcLine(index);
            if(index % 2 === 0) {
                x = this.x;
                y = this.y + (this.boxHeight*line) + (this.bottomMargin*line);
            }else {
                x = this.x + this.boxWidht + this.leftMargin;
                y = this.y + (this.boxHeight*line) + (this.bottomMargin*line);
            }
            return {x:x, y:y};
        }

        /**
         * 行数を計算する。
         * @param {Number} index 
         */
        _calcLine(index) {
            //Hack:本当はちゃんとした計算でやりたいが、やり方がわからないのでswitchゴリ押し。
            switch(index) {
                case 0:
                case 1:
                    return 0;
                case 2:
                case 3:
                    return 1;
                case 4:
                case 5:
                    return 2;
                case 6:
                case 7:
                    return 3;
            }
        }

        _createPrevLevelArray() {
            return $gameParty.allMembers().map(x => {
                return {id:x.actorId(), level:x.level};
            });
        }
        
        /**
         * 
         * @param {Game_Actor} actor 
         */
        _makeLevelUpText(actor) {
            const target = this.prevLevelArray.find(x => x && x.id === actor.actorId());
            const color = '\\c[3]';
            if(target && target.level < actor.level) {
                this._isAnyActorLevelUp = true;
                return ` ${color}${target.level}→${actor.level}!`;
            }else {
                return '';
            }
        }
    }

////=============================================================================
//// Scene_Battle
////  戦闘結果を表示するウィンドウを追加する
////=============================================================================

    //結果ウィンドウを登録する
    const _Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
    Scene_Battle.prototype.createDisplayObjects = function() {
        _Scene_Battle_createDisplayObjects.call(this);
        this.createBattleResult();
        BattleManager.setResultWindow(this._battleResultWindow);
    };

    //完全にオーバーライド
    Scene_Battle.prototype.updateBattleProcess = function() {
        if (this.isBattleProcessBusy() && !this._battleResultWindow.canInput) {
            BattleManager.update();
            this.changeInputWindow();
        }
    };

    Scene_Battle.prototype.isBattleProcessBusy = function() {
        return !this.isAnyInputWindowActive() || BattleManager.isAborting() ||
            BattleManager.isBattleEnd();
    };

    Scene_Battle.prototype.createBattleResult = function() {
        //Note:widthとheightは適当な数字
        const width   = 700;
        const height  = 600;
        const positon = this.calcCenterPosition(width, height);
        this._battleResultWindow = new Window_BattleResult(positon.x, positon.y, width, height);
        //windowLayerにaddしていないのは、$gameScreenの機能を使いたいから
        this._spriteset._baseSprite.addChild(this._battleResultWindow);
    };

    //画面上での中央位置をオブジェクトで返す
    Scene_Battle.prototype.calcCenterPosition = function(width, height) {
        const x = (Graphics.width - width)/2;
        const y = (Graphics.height - height)/2;
        return {x:x, y:y};
    };

////=============================================================================
//// Game_Actor
////  結果表示画面に合わせて改造
////=============================================================================
    //バトルシーンでのレベルアップメッセージを無効化する
    const _Game_Actor_displayLevelUp = Game_Actor.prototype.displayLevelUp;
    Game_Actor.prototype.displayLevelUp = function(newSkills) {
        if ($gameParty.inBattle()) {
            return;
        }
        _Game_Actor_displayLevelUp.call(this, newSkills);
    };

////=============================================================================
//// Window_ExceptFrame and Selectable
////  枠を非表示にしたウィンドウ
////=============================================================================
    class Window_ExceptFrame extends Window_Base {
        initialize(x, y, width, height) {
            super.initialize(x, y, width, height);
            this._windowFrameSprite.opacity = 0;
        }

        /**
         * ウィンドウ枠を非表示にするが、その幅がどうやら8らしいということ。
         */
        get frameWidth() {
            return 8;
        }
    }

    class Window_ExceptFrameSelectable extends Window_Selectable {
        initialize(x, y, width, height) {
            super.initialize(x, y, width, height);
            this._windowFrameSprite.opacity = 0;
        }

        /**
         * ウィンドウ枠を非表示にするが、その幅がどうやら8らしいということ。
         */
        get frameWidth() {
            return 8;
        }
    }

////=============================================================================
//// Window_ExpCalcArea
////  経験値を計算するためのウィンドウ
////=============================================================================
    
    class Window_ExpCalcArea extends Window_ExceptFrame {

        initialize(x, y, width, height) {
            super.initialize(x, y, width, height);
            this._targetExp  = BattleManager._rewards.exp;
            this._showingExp = 0;
            this._oneFrameExp = this._createGainExp();
            this._shouldUpdate = true;

            this.drawObtainedExp();
        }

        update() {
            super.update();
            this.updateInput();
            this.updateShowingExp();
        }

        get targetExp() {
            return this._targetExp;
        }

        get expDescText() {
            return param.descSettings.expDesc;
        }

        /**
         * 1フレームの更新で得られる経験値
         */
        get oneFrameExp() {
            return this._oneFrameExp;
        }

        /**
         * 数値が大きいほど更新が遅くなる
         */
        get speed() {
            return 150;
        }

        drawObtainedExp() {
            this.contents.clear();
            this.changeTextColor(this.systemColor());
            this.drawText(this.expDescText, 0, 0, this.contentsWidth(), 'left');
            this.resetTextColor();
            this.drawText(this._showingExp, 0, 0, this.contentsWidth(), 'right');
        }

        updateShowingExp() {
            if(!this._shouldUpdate) {
                return;
            }
            this._showingExp += this.oneFrameExp;
            this._showingExp = Math.min(this.targetExp, this._showingExp);
            this.drawObtainedExp();
            this._shouldUpdate = this.isShowingExpReachedTargetExp();
        }

        updateInput() {
            if(Input.isTriggered('ok') || Input.isTriggered('cancel')) {
                this._handleInput();
            }
        }

        isShowingExpReachedTargetExp() {
            return this._showingExp < this._targetExp;
        }

        _createGainExp() {
            if(this._targetExp < 100) {
                return 1;
            }
            return Math.round(this._targetExp / this.speed);
        }

        _handleInput() {
            //-1しているのは、同じ値だと画面が更新されなくなるため
            this._showingExp = this._targetExp-1;
        }
    }

////=============================================================================
//// Window_ObtainedSkills
////  新規に得たスキルを表示するためのウィンドウ
////=============================================================================

    class Window_ObtainedSkills extends Window_ExceptFrameSelectable {
        constructor(x, y, width, height, skills) {
            super(x, y, width, height, skills);
        }

        get noSkillsText() {
            return param.descSettings.noSkillDesc;
        }

        initialize(x, y, width, height, skills) {
            this._skills = skills;
            super.initialize(x, y, width, height);
            this.refresh();
            this.select(0);
            this.activate();
            this._createDescWindow();
        }

        drawItem(index) {
            const rect = this.itemRectForText(index);
            if(this._skills.length === 0) {
                this.drawText(this.noSkillsText, rect.x, rect.y, rect.width);
                return;
            }
            this.resetTextColor();
            const actorName = this._skills[index].actorName;
            const skillName = this._skills[index].skillName;
            this.drawText(TextManager.obtainSkill.format(skillName, actorName), rect.x, rect.y, rect.width);
        }

        maxItems() {
            //1は「noSkillText」を表示するためのやつ
            return this._skills.length || 1;
        }

        _createDescWindow() {
            const height = this.lineHeight()*2;
            const y = -(height);
            this.descWindow = new Window_ResultDesc(0, y, this.width, height, param.descSettings.skillDesc);
            this.addChild(this.descWindow);
        }
    }

////=============================================================================
//// Window_ObtainedItems
////  得たアイテムやゴールドを表示するためのウィンドウ
////=============================================================================

    class Window_ObtainedItems extends Window_ExceptFrameSelectable {
        constructor(x, y, width, height) {
            super(x, y, width, height);
        }

        get gold() {
            return this._gold;
        }

        get noItemText() {
            return param.descSettings.noItemDesc;
        }

        isObtainedGold() {
            return this.gold > 0;
        }

        initialize(x, y, width, height) {
            this._gold = BattleManager._rewards.gold;
            this._items = BattleManager._rewards.items;
            super.initialize(x, y, width, height);
            this.refresh();
            this.select(0);
            this.activate();
            this._createDescWindow();
        }

        drawAllItems() {
            super.drawAllItems();
            this.tryDrawNoItems();
        }

        //入手したゴールドもアイテムもなければ「なし」と表示する
        tryDrawNoItems() {
            if(this.maxItems() !== 0) {
                return;
            }
            const rect = this.itemRectForText(0);
            this.drawText(this.noItemText, rect.x, rect.y, rect.width);
        }

        //Hack:ロジックが非常に汚い。リファクタリング対象。
        drawItem(index) {
            this.resetTextColor();
            const rect = this.itemRectForText(index);
            //取得ゴールドの描画。0で分岐させる以外に方法が思いつかなかった
            if(index === 0) {
                if(this.isObtainedGold()) {
                    const goldText = this.convertEscapeCharacters(TextManager.obtainGold.format(this.gold));
                    this.drawText(goldText, rect.x, rect.y, rect.width);
                }else {
                    this.drawObtainedItem(index, rect);
                }
                return;
            }
            //取得アイテムの描画。
            //ゴールドを取得している場合、indexを-1しないとアイテム取得が1から始まってしまうことになるのでこうしている。
            const itemIndex = this.isObtainedGold() ? index-1 : index;
            this.drawObtainedItem(itemIndex, rect);
        }

        drawObtainedItem(index, rect) {
            const itemName  = this._items[index].name;
            const itemText  = this.convertEscapeCharacters(TextManager.obtainItem.format(itemName));
            this.drawText(itemText, rect.x, rect.y, rect.width);
        }

        maxItems() {
            //+1しているのはゴールド分
            return this.isObtainedGold() ? this._items.length + 1 : this._items.length;
        }

        _createDescWindow() {
            const height = this.lineHeight()*2;
            const y = -(height);
            this.descWindow = new Window_ResultDesc(0, y, this.width, height, param.descSettings.itemDesc);
            this.addChild(this.descWindow);
        }
    }

////=============================================================================
//// Window_ResultDesc
////  このウィンドウが何のためのウィンドウであるかを説明する小ウィンドウ
////=============================================================================
    class Window_ResultDesc extends Window_ExceptFrame {
        initialize(x, y, width, height, desc) {
            y += this.frameWidth;
            super.initialize(x, y, width, height);
            this._desc = desc;

            this.drawDescText();
        }

        get description() {
            return this._desc;
        }

        drawDescText() {
            this.changeTextColor(this.systemColor());
            this.drawText(this.description, 0, 0, this.contentsWidth(), 'center');
            this.resetTextColor();
        }
    }

////=============================================================================
//// Sprite_UIAnimation
////  UIアニメーションのためのスプライト。
////=============================================================================

    class Sprite_UIAnimation extends Sprite {
        constructor(bitmap, settings) {
            super(bitmap, settings);
        }

        initialize(bitmap, settings) {
            super.initialize(bitmap);
            this.initializeMember(settings);
            this._setPosition();
        }

        initializeMember(settings) {
            this.initializeAnimationSettings(settings);
            this.initializeBitmap();
            this.initializePublicMember();
        }

        initializeAnimationSettings(settings) {
            this._animFrame         = 0;
            this._animNumber        = 0;
            this._prevAnimNumber    = -1;
            this._settings          = settings;
            this._startId           = this.settings.startId;
            this._endId             = Number(this.settings.endId) + 1;//Note:+1することにより、適切なindexまで読み込むようになる
            this._speed             = Number(this.settings.speed);
            this._isPlayMode        = false;
            this.visible            = false;
        }

        initializeBitmap() {
            this._bitmapList = null;
            this._isBitmapLoaded = false;
        }

        initializePublicMember() {
            //Note:Publicと言っても、getアクセサのみ公開したい意図がある
            this._isAnimationEnded      = false;
            this._animationEndedSubject = new UI_Subject();
        }

        /**
         * @return {AnimSettings}
         */
        get settings() {
            return this._settings;
        }

        get fileName() {
            return this.settings.fileName;
        }

        get startId() {
            return this._startId;
        }

        get endId() {
            return this._endId;
        }

        get speed() {
            return this._speed;
        }

        /**
         * アニメーションを再生すべきかどうかの判定
         */
        get shouldPlayAnimation() {
            //ビットマップがロードされているなら
            return this._isBitmapLoaded && !this.isAnimationEnded && this._isPlayMode;
        }

        /**
         * アニメーションの再生が終了したかどうか
         */
        get isAnimationEnded() {
            return this._isAnimationEnded;
        }

        /**
         * 
         * @return {UI_Subject}
         */
        get animationEndedSubject() {
            return this._animationEndedSubject;
        }

        get animEndNumber() {
            return this.endId-this.startId;
        }

        _setPosition() {
            this.position.set(Number(this.settings.x), Number(this.settings.y));
        }

        /**
         * アニメーションで使用する全てのビットマップをロードする
         */
        async loadAllAnimationBitmap() {
            //ロード完了フラグをOFFにする
            this._isBitmapLoaded = false;

            //ここは非同期で実行される
            await Promise.all(this._createLoadingPromise())
                        .then(value => {
                            this._bitmapList = value;
                        });

            //最初のアニメーションを設定
            this.refreshBitmap(this.startId);
            //ロード完了フラグON
            this._isBitmapLoaded = true;
        }

        /**
         * ローディングするためのPromiseの配列を返す
         */
        _createLoadingPromise() {
            const tempArray = [];
            //古き良き時代の書き方。しかし、高速であり役に立つのでこのまま。
            for(let i = this.startId; i < this.endId; i++) {
                tempArray.push(ImageManager.loadUIAnimation(`${this.fileName}${i}`));
            }
            return tempArray;
        }

        /**
         * アニメーションのIDに従って、現在のBitmapをリフレッシュする
         * @param {Number} animId 
         */
        refreshBitmap(animId) {
            this.bitmap = this._bitmapList[animId];
            this._refresh();
        }

        update() {
            super.update();
            if(!this.shouldPlayAnimation) {
                return;
            }

            this.updateAnimationNumber();
            this.updateAnimation();
            this._animFrame++;
        }

        updateAnimation() {
            if(this._prevAnimNumber === this._animNumber) {
                return;
            }

            //ビットマップの更新
            this.refreshBitmap(this._animNumber);
            this._prevAnimNumber = this._animNumber;
            //アニメーションが終了したならば、それを報告する。なんかロジック汚い
            if(this._animNumber === this.animEndNumber) {
                this.stop();
            }
        }

        updateAnimationNumber() {
            if(this._animFrame % this.speed === 0) {
                this._animNumber++;
            }
        }

        play() {
            this._isPlayMode = true;
            this.visible     = true;
        }

        stop() {
            //これで止めておかないと、notifyしたとき無限ループする
            if(this._isAnimationEnded) {
                return;
            }
            this._isAnimationEnded = true;
            this._isPlayMode = false;
            this.visible     = false;
            this.animationEndedSubject.notify();
        }
    }

////=============================================================================
//// UI_Subject
////  UIアニメーションのためのSubject。Observerパターン
////=============================================================================

    class UI_Subject {
        constructor() {
            this._observers = [];
        }

        /**
         * @return {Array}
         */
        get observers() {
            return this._observers;
        }

        /**
         * 関数を登録する
         * @param {Function} observer 
         */
        subscribe(observer) {
            this._observers.push(observer);
        }

        notify() {
            this._observers.forEach(observer => observer());
        }
    }

})();