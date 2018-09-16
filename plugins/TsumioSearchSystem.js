//=============================================================================
// TsumioSearchSystem.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2018 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2018/09/16 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc This plugin implements Collider.
 * @author Tsumio
 *
 * @param ----Basic Settings----
 * @desc 
 * @default 
 * 
 * @help This plugin implements Collider.
 * 
 * ----feature----
 * -> Visually display the collider.
 * -> Execute the event on collision.
 * 
 * ----how to use----
 * After introducing this plugin, collider will be displayed when you run the game.
 * When the player's collider (circle and segment) collide with the event collider (circle), start the event.
 * 
 * ----script command---
 * [Show visual collider]
 *  $gameSystem.showCollider();
 * 
 * [Hide visual collider]
 *  $gameSystem.hideCollider();
 * 
 * [Change the collider size of the event]
 *  this.character(0).collider.colliderSize = 230;
 *  //Note:Change the size of collider to 230.
 * 
 * [Change player's circular collider size]
 *  $gamePlayer.collider.colliderSize = 230;
 *  //Note:Change the size of circular collider to 230.
 * 
 * [Change player's segment collider length]
 *  $gamePlayer.segment.length = 200;
 *  //Note:Change the length of segment collider to 200.But has a known issue.
 * 
 * ----known issue----
 * When you change $gamePlayer.segment.length, there is a difference between the apparent position and the actual position of the segment.
 * Perhaps the actual position may be misaligned.
 * Please help me if you are good at mathematics.
 * 
 * ----change log---
 * 1.0.0 2018/09/16 Release.
 * 
 * ----remarks----
 * I shall not be responsible for any loss, damages and troubles from using this plugin.
 * 
 * ----Terms of Use----
 * This plugin is free for both commercial and non-commercial use.
 * You may edit the source code to suit your needs,
 * so long as you don't claim the source code belongs to you.
 * 
 */
/*:ja
 * @plugindesc コライダーを実装するプラグイン
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * 
 * @help コライダーを実装するプラグイン
 * 
 * 
 * 【特徴】
 * ・コライダーを視覚的に表示します。
 * ・衝突時にイベントを実行します。
 * 
 * 【使用方法】 
 * プラグインの導入後、ゲームを実行するとコライダーが表示されるようになります。
 * プレイヤーのコライダー（円状のものと、線分のものがある）がイベントのコライダー（円状）に衝突した場合、イベントを起動します。
 * また、スクリプトコマンドを実行することでコライダーのサイズを調整したり、視覚的に非表示にすることができます。
 * 
 * 【スクリプトコマンド】
 * ・コライダーの視覚的な表示
 *  $gameSystem.showCollider();
 * 
 * ・コライダーの視覚的な非表示
 *  $gameSystem.hideCollider();
 * 
 * ・該当イベントのコライダーサイズを変更
 *  this.character(0).collider.colliderSize = 230;
 *  //Note:コライダーのサイズを230に変更
 * 
 * ・プレイヤーの円状コライダーサイズを変更
 *  $gamePlayer.collider.colliderSize = 230;
 *  //Note:円状コライダーのサイズを230に変更
 * 
 * ・プレイヤーの線分コライダーサイズを変更
 *  $gamePlayer.segment.length = 200;
 *  //Note:線分コライダーのサイズを200に変更。ただしバグあり。
 * 
 * 【既知の不具合】
 * $gamePlayer.segment.lengthを変更したとき、線分の見た目の位置と実際の位置に差異がある。
 * ひょっとすると実際の位置もずれてるかも。
 * 数学得意な人助けて。
 * 
 * 【更新履歴】
 * 1.0.0 2018/09/16 公開。
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
    var pluginName = 'TsumioSearchSystem';

//////=============================================================================
///// TSS_Color
/////  色をわけるようの静的クラス
/////==============================================================================

    const TSS_COLOR = {GREEN:0, RED:1, BLUE:2};

//////=============================================================================
///// Game_System
/////  コライダーをSpriteとして表示するかどうかを追加
/////==============================================================================

    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this._isColliderVisible = true;
    };

    Game_System.prototype.showCollider = function() {
        this._isColliderVisible = true;
    };

    Game_System.prototype.hideCollider = function() {
        this._isColliderVisible = false;
    };

    Game_System.prototype.isColliderVisible = function() {
        return this._isColliderVisible;
    };

//////=============================================================================
///// Game_Character
/////  コライダー用のModelを追加
/////==============================================================================

    const _Game_Character_initMembers = Game_Character.prototype.initMembers;
    Game_Character.prototype.initMembers = function() {
        _Game_Character_initMembers.call(this);
        this.collider = new Game_CircleCollider();
    };

    Game_Character.prototype.executeCollisionEvent = function() {
        //Note:特に今は処理はない。子クラスで実装。一応用意してるだけ。
    };

//////=============================================================================
///// Game_Event
/////  衝突時にイベントを実行するようにする
/////==============================================================================

    const _Game_Character_executeCollisionEvent = Game_Character.prototype.executeCollisionEvent;
    Game_Event.prototype.executeCollisionEvent = function() {
        _Game_Character_executeCollisionEvent.call(this);
        //Note:条件は適当。ゲームに合わせて変えればいい。
        //     特に、連続で衝突判定してほしい場合これでは不適切。
        //     OnCollisionEnterやOnCollisionExitなどを実装してもいいかも。
        if(!$gameMessage.isBusy() && $gamePlayer.canMove() && !$gameMap.isEventRunning() && !this.collider.isHit) {
            $gameMap._interpreter.setup(this.list(), this.eventId());
            this.eventId()
        }
    };

//////=============================================================================
///// Game_Player
/////  衝突時にイベントを実行するようにする
/////==============================================================================

const _Game_Player_initMembers = Game_Player.prototype.initMembers;
    Game_Player.prototype.initMembers = function() {
        _Game_Player_initMembers.call(this);
        this.segment  = new Game_Segment();
    };


//////=============================================================================
///// Scene_Map
/////  衝突判定をおこなう
/////==============================================================================

    const _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
    Scene_Map.prototype.createDisplayObjects = function() {
        _Scene_Map_createDisplayObjects.call(this);
        //Note:イベントのジェネレーターを生成するが、もっと適切な生成場所あるかも
        this.eventGen = this.targetEventsGenerator();
    };

    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        this.checkCollision();
    };

    Scene_Map.prototype.checkCollision = function() {
        this.eventGen.next().value.forEach((value, index) => {
            if(!value.isNearTheScreen()) {
                return;
            }

            //線分との衝突判定
            if($gamePlayer.segment.isCollideWithCircle(value.collider)) {
                value.executeCollisionEvent();
                value.collider.setColorAndHitting('red', TSS_COLOR.RED);
            }else {
                //線分と衝突していなければ円との衝突判定
                if($gamePlayer.collider.isCollideWithCircle(value.collider)) {
                    value.executeCollisionEvent();
                    value.collider.setColorAndHitting('blue', TSS_COLOR.BLUE);
                }else {
                    value.collider.setColorAndHitting('green', TSS_COLOR.GREEN);
                }
            }
        });
    };

    Scene_Map.prototype.targetEventsGenerator = function*() {
        const events = this.getDividedEventsArr();
        while(true) {
            yield* events;
        }
    }

    Scene_Map.prototype.getDividedEventsArr = function() {
        const events = $gameMap.events();
        const length = events.length;
        const dividedNum = Math.ceil(length / 4);
        const dividedArr = [];
        const targetNum = Math.ceil(length / dividedNum);

        for(let i = 0; i < targetNum; i++) {
            var j = i * dividedNum;
            var p = events.slice(j, j + dividedNum);
            dividedArr.push(p);
        }

        return dividedArr;
    }

//////=============================================================================
///// Game_Collider
/////  コライダー用のModel
/////==============================================================================
    class Game_CircleCollider {

        constructor() {
            this.initialize.apply(this, arguments);
        }

        initialize() {
            this.colliderSize  = null;
            this.isHit = false;
            this.x = Number.MIN_SAFE_INTEGER;
            this.y = Number.MIN_SAFE_INTEGER;
            this.color = 'green';
        }

        get colliderHalfSize() {
            return this.colliderSize/2;
        }

        setColorAndHitting(color, isHit) {
            this.color = color;
            this.isHit = isHit;
        }

        /**
         * 
         * @param {Game_CircleCollider} circle 
         */
        isCollideWithCircle(circle) {
            //Note:スプライトのロードに時間がかかるため、ここではじいておかないと正常な値がセットされる前に判定され、trueが返される場合がある
            //     もう少しいい方法あるかもだけど面倒なのでとりあえずこのまま。
            if(this.x === Number.MIN_SAFE_INTEGER) {
                return false;
            }

            const a = (circle.x - this.x) * (circle.x - this.x) + (circle.y - this.y) * (circle.y - this.y);
            const b = (circle.colliderHalfSize + this.colliderHalfSize) * (circle.colliderHalfSize + this.colliderHalfSize)
            if(a <= b) {
                return true;
            }
            return false;
        }
    }
    window[Game_CircleCollider.name] = Game_CircleCollider;

//////=============================================================================
///// Game_Segment
/////  セグメント用のModel
/////==============================================================================
    class Game_Segment {

        constructor() {
            this.initialize.apply(this, arguments);
        }

        initialize() {
            this.length  = 100;
            this.posX = 0;
            this.posY = 0;
            this.vecX = 0;
            this.vecY = 0;
        }

        /**
         * @param {Game_CircleCollider} circle 
         */
        isCollideWithCircle(circle) {
            const xa = this.posX - circle.x;
            const ya = this.posY - circle.y;

            const a = (this.vecX * this.vecX + this.vecY * this.vecY);
            const b = 2.0 * (this.vecX * xa + this.vecY * ya);
            const c = xa * xa + ya * ya - circle.colliderHalfSize * circle.colliderHalfSize;

            //二次元方程式が解けない場合は衝突していないとみなす
            let d = b * b - 4.0 * a * c;
            if(d < 0.0) {
                return false;
            }

            //解の公式を解く
            d = Math.sqrt(d);
            const t0 = (-b + d) / (2.0 * a);
            const t1 = (-b - d) / (2.0 * a);

            //線分内の最寄りのtを探る
            let t = 2.0;
            if((t0 >= 0.0) && (t0 <= 1.0) && (t0 < t)) {
                t = t0;
            }
            if((t1 >= 0.0) && (t1 <= 1.0) && (t1 < t)) {
                t = t1;
            }
            if(t > 1.0) {
                return false;
            }

            return true;
        }
    }
    window[Game_Segment.name] = Game_Segment;

//////=============================================================================
///// Sprite_Character
/////  丸い枠と線分を追加する
/////==============================================================================

    const _Sprite_Character_initialize = Sprite_Character.prototype.initialize;
    Sprite_Character.prototype.initialize = function(character) {
        _Sprite_Character_initialize.apply(this, arguments);

        //Note:なぜかupdateメソッド内で初期化処理がおこなわれているので、これで判断
        this._isCreatedCollider = false;
    };

    Sprite_Character.prototype.createCollider = function() {
        //コライダーに使う情報の生成。デフォルトのサイズ50は適当。
        const collider = this._character.collider;
        const width    = collider.colliderSize || 50;
        const height   = collider.colliderSize || 50;
        const x        = width/2;
        const y        = height/2;
        const rect     = new Rectangle(x, y, width, height);

        //実際の作成
        collider.colliderSize = collider.colliderSize || (width+height)/2;
        this.collider = new Sprite_CharacterCollider(new Bitmap(width, height),
            rect, collider);
        this.addChild(this.collider);

        //作成フラグON
        this._isCreatedCollider = true;
    };

    Sprite_Character.prototype.createSegment = function() {
        //プレイヤー以外はセグメントを作らない
        if(this._character !== $gamePlayer) {
            return;
        }

        //セグメントに使う情報の生成
        const width  = 1;
        const length = this._character.segment.length || 100;
        //実際の作成
        this.segment = new Sprite_CharacterSegment(new Bitmap(width, length), length, this._character);
        this.addChild(this.segment);
    };

    const _Sprite_Character_update = Sprite_Character.prototype.update;
    Sprite_Character.prototype.update = function() {
        _Sprite_Character_update.call(this);

        //Note:ロードに時間がかかっているため、patternWidthが0以上であることでロード完了を判断している。
        //     あんまりよくないかも。
        if(!this._isCreatedCollider && this.patternWidth() > 0) {
            //_memberIndexがあるのはフォロワーであり、フォロワーは対象外にする
            if(this._character._memberIndex) {
                return;
            }
            this.createCollider();
            this.createSegment();
        }
    };

//////=============================================================================
///// Sprite_CharacterCollider
/////  丸い枠を追加する
/////==============================================================================

    class Sprite_CharacterCollider extends Sprite {
        /**
         * 
         */
        constructor(bitmap, rect, collider) {
            super(bitmap, rect, collider);
        }

        /**
         * 
         * @param {Bitmap} bitmap 
         * @param {Rectangle} rect 
         */
        initialize(bitmap, rect, collider) {
            super.initialize(bitmap);
            this._model  = collider;
            this._prevRadius = this.radius;
            this._prevHit = false;
            this._color = 'green';

            this._setAppropriateAnchor();
            this._createCircle(rect);
        }

        /**
         * @return {Game_CircleCollider}
         */
        get model() {
            return this._model;
        }

        get radius() {
            return this.model.colliderHalfSize;
        }


        update() {
            super.update();

            this.updateVisible();
            this.updateColor();
            this.updateModel();
            this.refreshRadius();
            this._prevRadius = this.radius;
            this._prevHit = this.model.isHit;
        }

        updateVisible() {
            this.visible = $gameSystem.isColliderVisible();
        }

        updateColor() {
            if(this._prevHit === this.model.isHit) {
                return;
            }

            this._color = this.model.color;
            this._createCircle(this._getCircleRect(), this.model.isHit);
        }

        updateModel() {
            this.model.x = this.getGlobalPosition().x;
            if(this.anchor.y === 1) {
                this.model.y = (this.getGlobalPosition().y) - this.radius;
            }else {
                //HACK:これでおおよそうまく行くみたいだが、理由は不明。うまくいかないこと出るかも。
                this.model.y = (this.getGlobalPosition().y) - this.radius + this.radius*0.8;
            }
        }

        refreshRadius() {
            if(this.shouldRefreshRadius()) {
                this._setAppropriateAnchor();
                this._createCircle(this._getCircleRect());
            }
        }

        /**
         * 前回保存した半径と現在の半径が違うならリフレッシュすべき
         */
        shouldRefreshRadius() {
            return this._prevRadius !== this.radius;
        }

        /**
         * 
         * @param {Rectangle} radius 
         */
        _setAppropriateAnchor() {
            //Note:40は適当な大きさ。
            //大きいときはアンカーYを1にしないと変になるが、逆に小さい時はアンカーYを0.6にしないと変になる。
            if(this.radius > 40) {
                this.anchor.x = 0.5;
                this.anchor.y = 0.6;
            }else {
                this.anchor.x = 0.5;
                this.anchor.y = 1;
            }
        }

        /**
         * 
         * @param {Rectangle} rect 
         */
        _createCircle(rect, isHit = false) {
            this.bitmap = new Bitmap(rect.width, rect.height);
            this.bitmap.drawCircle(rect.x, rect.y, 2, 'red');
            this.bitmap.drawEmptyCircle(rect.x, rect.y, this.radius, this._color);
        }

        _getCircleRect() {
            return new Rectangle(this.radius, this.radius, this.model.colliderSize, this.model.colliderSize);
        }
    }

//////=============================================================================
///// Sprite_CharacterCollider
/////  線分を追加する
/////==============================================================================

    class Sprite_CharacterSegment extends Sprite {
        /**
         * 
         */
        constructor(bitmap, length, character) {
            super(bitmap, length, character);
        }

        /**
         * 
         * @param {Bitmap} bitmap 
         * @param {Number} length 線分の長さ
         */
        initialize(bitmap, length, character) {
            super.initialize(bitmap);

            //メンバーの初期化
            this._character = character;
            this._model   = this.character.segment;
            this._radius  = 20;//Note:大きくするとなんかずれる。計算方法おかしいかも
            this._plusPos = new Point(0, 0);
            this._prevDir = null;

            //セグメントの作成
            this._createSegment(length);
        }

        /**
         * @return {Game_Character}
         */
        get character() {
            return this._character;
        }

        /**
         * @return {Game_Segment}
         */
        get model() {
            return this._model;
        }

        get length() {
            return this.model.length;
        }

        /**
         * @return {Point}
         * 補正ポジション
         */
        get plusPos() {
            return this._plusPos;
        }

        update() {
            super.update();

            this.updateVisible();
            if(this._prevDir !== this.character.direction()) {
                this.updateView();
            }
            this.updateModelPos();
        }

        updateVisible() {
            this.visible = $gameSystem.isColliderVisible();
        }

        updateView() {
            switch(this.character.direction()) {
                case 2 : 
                    this.rotation = 0;
                    this._plusPos.set(0, 0);
                    break;
                case 4 :
                    this.rotation = Math.PI/2;
                    this._plusPos.set(this.length/4, -(this._radius));
                    break;
                case 6 : 
                    this.rotation = -(Math.PI/2);
                    this._plusPos.set(-(this.length/4), -(this._radius));
                    break;
                case 8 :
                    this.rotation = Math.PI;
                    this._plusPos.set(0, -(this.length/2));
                    break;
            }
            this.pivot.set(this._plusPos.x, this._plusPos.y);
            this._prevDir = this.character.direction();
        }

        updateModelPos() {
            //座標系
            this.model.posX = this.getGlobalPosition().x - this._plusPos.x;
            this.model.posY = this.getGlobalPosition().y + this._plusPos.y;
            //ベクトル
            switch(this.character.direction()) {
                case 2 : 
                    this.model.vecX = 0;
                    this.model.vecY = this.length;
                    break;
                case 4 :
                    this.model.vecX = -this.length;
                    this.model.vecY = 0;
                    break;
                case 6 : 
                    this.model.vecX = this.length;
                    this.model.vecY = 0;
                    break;
                case 8 :
                    this.model.vecX = 0;
                    this.model.vecY = -this.length;
                    break;
            }
        }

        /**
         * 
         * @param {Rectangle} rect 
         */
        _createSegment(length) {
            this.bitmap.fillRect(0, 0, 1, length, 'red');
        }
    }

//////=============================================================================
///// Bitmap
/////  コライダーや探索のための単純な図形描画処理を追加
/////==============================================================================

    //塗りつぶさない円
    Bitmap.prototype.drawEmptyCircle = function(x, y, radius, color) {
        var context = this._context;
        context.save();
        context.strokeStyle = color;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2, false);
        context.stroke();
        context.restore();
        this._setDirty();
    };

})();