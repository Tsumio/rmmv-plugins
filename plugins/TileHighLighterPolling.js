//=============================================================================
// TileHighLighterPolling.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2018 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2018/09/12 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:
 * @plugindesc This plugin light the tiles.
 * @author Tsumio
 *
 * @param ----Basic Settings----
 * @desc 
 * @default 
 * 
 * @param DefaultColor
 * @type string
 * @desc Set the default color for highlight.
 * @default blue
 * 
 * @param Intensity
 * @type number
 * @decimals 2
 * @desc Set the intensity for highlight.
 * @default 0.5
 * 
 * @help This plugin light the tiles.
 * This plugin works only with RPG Maker version 1.6.1 or later.
 * 
 * ----feature----
 * -> Make each tile lighting.
 * -> Change the light intensity and color for each tile.
 * 
 * ----how to use----
 * After introducing this plugin, please set use the script command.
 * You can set plugin parameters.
 * 
 * ----script command---
 * (X, Y) = X position and Y position.
 * 
 * Ex:Light (10, 10) tile.
 * const tile = $gameMap.highlightArray[10][10];
 * tile.turnOn();
 * 
 * Ex:Light (3, 4) tile in red.
 * const tile = $gameMap.highlightArray[3][4];
 * tile.turnOn();
 * tile.changeColor('red');
 * //Note:The color can be specified with string and color code.
 *
 * Ex:Turn off (3, 4) lighting tile.
 * const tile = $gameMap.highlightArray[3][4];
 * tile.turnOff();
 * 
 * Ex：Strengthen the light of (5, 5) tile
 * const tile = $gameMap.highlightArray[5][5];
 * tile.changeIntensity(1);
 * //Note:changeIntensity takes a value from 0 to 1.
 * 
 * 
 * ----change log---
 * 1.0.0 2018/09/12 Release.
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
 * @plugindesc タイルを光らせるプラグイン
 * @author ツミオ
 *
 * @param ----基本的な設定----
 * @desc 
 * @default 
 * 
 * @param デフォルトカラー
 * @type string
 * @desc ハイライトのデフォルトカラー。
 * @default blue
 * 
 * @param 光の強さ
 * @type number
 * @decimals 2
 * @desc ハイライトの強さ。
 * @default 0.5
 * 
 * @help タイルを光らせるプラグイン
 * 
 * 当プラグインはRPGツクールMVバージョン1.6.1以降でのみ動作します。
 * 
 * 【特徴】
 * ・指定のタイルを光らせることができます
 * ・各タイルごとに光の強さや色を変更できます
 * 
 * 【使用方法】 
 * プラグインの導入後、スクリプトコマンドを実行することでタイルを光らせることができます。
 * また、プラグインパラメータを設定することで既定の色や光の強さを変更することもできます。
 * 
 * 【スクリプトコマンド】
 * 例：X座標10、Y座標10のタイルを光らせる
 * const tile = $gameMap.highlightArray[10][10];
 * tile.turnOn();
 * 
 * 例：X座標3，Y座標4のタイルを赤色で光らせる
 * const tile = $gameMap.highlightArray[3][4];
 * tile.turnOn();
 * tile.changeColor('red');
 * //Note:色は文字列で指定できる他、カラーコードでの指定にも対応しています。
 *
 * 例：X座標3,Y座標4のタイルの光を消す
 * const tile = $gameMap.highlightArray[3][4];
 * tile.turnOff();
 * 
 * 例：X座標5,Y座標5のタイルの光を強くする
 * const tile = $gameMap.highlightArray[5][5];
 * tile.changeIntensity(1);
 * //Note:changeIntensityは0から1の値を受け取ります。
 * 
 * 【更新履歴】
 * 1.0.0 2018/09/12 公開。
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

//スクリプトから操作する用
TM_Highlight = null;

(function() {
    'use strict';
    var pluginName = 'TileHighLighterPolling';

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

////=============================================================================
//// Get and set pluguin parameters.
////=============================================================================
    var param                = {};
    param.defaultColor   = getParamString(['DefaultColor', 'デフォルトカラー']);
    param.intensity      = getParamString(['Intensity', '光の強さ']);

//////=============================================================================
///// Game_Highlight
/////  ハイライトのModel
/////==============================================================================

    class Game_Highlight {

        constructor(x, y, tileSize, lightColor = 'white', intensity = 0.5) {
            console.assert(typeof(intensity)  === 'number', 'intensityが数字型ではありません');

            this.initialize.apply(this, arguments);
        }

        initialize(x, y, tileSize, lightColor = 'white', intensity = 0.5) {
            //位置関係の初期化
            this._realX = x;
            this._realY = y;
            this._tileSize = tileSize;
    
            //色とアルファ値の初期化
            this._lightColor = lightColor;
            this._intensity  = intensity;
            this._alpha      = 0.5;

            //見えるかどうかの設定
            this._visible    = false;

            //Dirtyの設定
            this._dirty = false;
        }

        get lightColor() {
            return this._lightColor;
        }

        get intensity() {
            return this._intensity;
        }

        get alpha() {
            return this._alpha;
        }

        get visible() {
            return this._visible;
        }

        get dirty() {
            return this._dirty;
        }

        /**
         * 光の強さを永続的に変更する。現在のハイライトに変更を反映するには続けてturnOnを呼ぶ必要がある。
         * @param {Number} newIntensity 新しい光の強さ
         */
        changeIntensity(newIntensity) {
            console.assert(typeof(newIntensity)  === 'number', 'newIntensityが数字型ではありません');
            this._intensity = newIntensity;
        }

        changeColor(lightColor) {
            this._lightColor = lightColor;
            this._dirty = true;
        }

        turnOn() {
            this._alpha   = this.intensity;
            this._visible = true;
            this._dirty   = true;
        }

        turnOff() {
            this._alpha   = 0;
            this._visible = false;
        }

        screenX() {
            var tw = this._tileSize;
            return Math.round(this.scrolledX() * tw);
        }

        screenY() {
            var th = this._tileSize;
            return Math.round(this.scrolledY() * th);
        }

        scrolledX() {
            return $gameMap.adjustX(this._realX);
        }

        scrolledY() {
            return $gameMap.adjustY(this._realY);
        }
    }
window[Game_Highlight.name] = Game_Highlight;

//////=============================================================================
///// HighlightSprites
/////  ハイライトのスプライトセット
/////==============================================================================

    /**
     * 個別のハイライト用スプライト
     */
    class HighlightSprite extends Sprite {

        /**
         * @param lightColor 色。文字でも記号でも。
         */
        initialize(model, bitmap) {
            super.initialize(bitmap);
            //位置の初期化
            this._model  = model;
            this.visible = false;
        }

        get lightColor() {
            return this.model.lightColor;
        }

        get intensity() {
            return this.model.intensity;
        }

        /**
         * @return {Game_Highlight}
         */
        get model() {
            return this._model;
        }

        update() {
            super.update();
            
            this.updateVisible();
            if(this.visible) {
                this.updatePosition();
                this.updateAlpha();
                this.updateDirty();
            }
        }

        /**
         * update系を強制実行する
         */
        refreshAll() {
            this.updateLightColor();
            this.updateVisible();
            this.updatePosition();
            this.updateAlpha();

        }

        updateVisible() {
            //Note:毎フレームこれやるの重くならないか？
            //     しかしObserverパターンを使わないなら他の方法が思いつかない。
            this.visible = this.model.visible;
        }

        updatePosition() {
            this.x = this.model.screenX();
            this.y = this.model.screenY();
        }

        updateAlpha() {
            this.alpha = this.model.alpha;
        }

        updateDirty() {
            if(this.model.dirty) {
                this.updateLightColor();
                this.model._dirty = false;//Note:本当は参照したくない
            }
        }

        updateLightColor() {
            this.bitmap.clear();
            this.bitmap.fillAll(this.model.lightColor);
        }
    }

//////=============================================================================
///// HighlightSprites
/////  ハイライトのスプライトセット
/////==============================================================================

    /**
     * ハイライトのスプライトセット
     */
    class HighlightSpriteset {
        /**
         * 
         * @param {Number} mapWidth マップの幅
         * @param {Number} mapHeight マップの高さ
         * @param {Number} tileSize タイルサイズ
         * @param {Number} sortingLayer Z座標
         */
        constructor(mapWidth, mapHeight, tileSize = 48, sortingLayer = 2) {
            console.assert(typeof(tileSize)  === 'number', 'tileSizeが数字型ではありません');
            console.assert(tileSize >= 1, 'tileSizeは1以上でなければなりません');
            console.assert(typeof(mapWidth)  === 'number', 'mapWidthが数字型ではありません');
            console.assert(typeof(mapHeight) === 'number', 'mapHeightが数字型ではありません');
            console.assert(typeof(sortingLayer) === 'number', 'sortingLayerが数字型ではありません');

            this.initialize.apply(this, arguments);
        }

        initialize(mapWidth, mapHeight, tileSize = 48, sortingLayer = 2) {
            //サイズ関係の初期化
            this._tileSize  = tileSize;
            this._mapWidth  = mapWidth;
            this._mapHeight = mapHeight;
            this._sortingLayer = sortingLayer;

            //スプライト関係の初期化
            this._container        = this._createContainer();
            this._highlightSprites = this._createHighlightSprites(this._container);
        }

        /**
         * @return {PIXI.Container} コンテナ
         */
        get container() {
            return this._container;
        }

        /**
         * @return {Game_Highlight[]}
         */
        get highlightArray() {
            return this._highlightArray;
        }

        get sprites() {
            return this._highlightSprites;
        }

        get sortingLayer() {
            return this._sortingLayer;
        }

        get tileSize() {
            return this._tileSize;
        }

        get mapWidth() {
            return this._mapWidth;
        }

        get mapHeight() {
            return this._mapHeight;
        }

        update() {
            this.updatePosition();
        }

        updatePosition() {
            this.container.children.forEach(sprite => {
                sprite.update();
            });
        }

        _createContainer() {
            const container = new PIXI.Container();
            container.z = 2;//Note:このZ座標はツクール独自のプロパティ

            return container;
        }

        /**
         * 
         * @param {PIXI.Container} container 
         */
        _createHighlightSprites(container) {
            const sprites = [];
            for(let x = 0; x < this._mapWidth; x++) {
                sprites.push([]);
                for(let y = 0; y < this._mapHeight; y++) {
                    let newRectangle = this._createRectangle($gameMap.highlightArray[x][y]);//Note:$gameMapに依存している
                    sprites[x].push(newRectangle);
                    container.addChild(newRectangle);
                    newRectangle.refreshAll();//Note:ModelにViewをあわせる
                }
            }

            return sprites;
        }

        /**
         * 
         * @param {Game_Highlight} highlight 
         */
        _createRectangle(highlight) {
            //スプライトの作成
            const rectangle = new HighlightSprite(highlight, new Bitmap(this._tileSize, this._tileSize));

            return rectangle;
        }
    }

//////=============================================================================
///// Spriteset_Map
/////  ハイライトのスプライトを追加する
/////==============================================================================

    const _Spriteset_Map_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function() {
        _Spriteset_Map_update.call(this);
        this.highlightSet.update();
    };

    const _Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
    Spriteset_Map.prototype.createLowerLayer = function() {
        _Spriteset_Map_createLowerLayer.call(this);

        const tileSize     = 48;
        const sortingLayer = 2;
        this.createHighlightData(tileSize);
        this.createHighlightSpriteset(tileSize, sortingLayer);
    };

    //Note:もう少し書き方あるかも
    Spriteset_Map.prototype.createHighlightData = function(tileSize) {
        //Nullでなければ即リターン
        if($gameMap.highlightArray) {
            return;
        }

        //Nullなら配列の作成
        $gameMap.highlightArray = [];
        for(let x = 0; x < $dataMap.width; x++) {
            $gameMap.highlightArray.push([]);
            for(let y = 0; y < $dataMap.height; y++) {
                $gameMap.highlightArray[x].push(new Game_Highlight(x, y, tileSize, param.defaultColor, Number(param.intensity)));
            }
        }
    };

    Spriteset_Map.prototype.createHighlightSpriteset = function(tileSize, sortingLayer) {
        //スプライトセットの作成
        this.highlightSet = new HighlightSpriteset($dataMap.width, $dataMap.height,
            tileSize, 
            sortingLayer);
        //タイルマップへ追加
        this._tilemap.addChild(this.highlightSet.container);
    };

//////=============================================================================
///// Game_Map
/////  セットアップ時にハイライトのインスタンスを空にする
/////==============================================================================

    const _Game_Map_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function(mapId) {
        _Game_Map_setup.apply(this, arguments);
        $gameMap.highlightArray = null;
    };

})();