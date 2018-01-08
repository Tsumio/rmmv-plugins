//=============================================================================
// BB_ShopCostPlus.js
// Copyright (c) 2018 BB ENTERTAINMENT
//=============================================================================

/*:
 * @plugindesc ショップでの売買時にコストを一つ追加するプラグイン
 * @author ビービー(ツミオが一部修正)
 * 
 * @param 起動スイッチ
 * @type switch
 * @default 1
 * @desc ここで指定したスイッチがONの時ショップを起動するとコスト追加
 * デフォルト：1
 *
 * @param 追加コスト単位
 * @type string
 * @default Ｓ
 * @desc 追加するコストの単位
 * デフォルト：Ｓ
 *
 * @param 追加コスト種類
 * @type number
 * @min 0
 * @max 1
 * @default 0
 * @desc 0 = 変数、1 = アイテム
 * デフォルト：0
 *
 * @param 追加コストID
 * @type number
 * @min 1
 * @default 1
 * @desc 追加するコストの種類で指定したもののID
 * デフォルト：1
 *
 * @param コマンド名称：購入
 * @type string
 * @default 購入
 * @desc 購入するコマンド名称
 * デフォルト：購入
 *
 * @param コマンド名称：売却
 * @type string
 * @default 売却
 * @desc 売却するコマンド名称
 * デフォルト：売却
 *
 * @param コマンド名称：終了
 * @type string
 * @default 終了
 * @desc ショップを出るコマンド名称
 * デフォルト：終了
 *
 * @param アイテム背景四角の色
 * @type number
 * @min 0
 * @max 31
 * @default 0
 * @desc アイテムの名前、追加コスト、金額につける背景の色
 * テキストカラーで選択　デフォルト：0
 *
 * @param アイテム背景四角の透明度
 * @type number
 * @min 0
 * @max 255
 * @default 64
 * @desc 背景フレームの透明度　0～255
 * デフォルト：64
 *
 * @param 売却コスト倍率
 * @type number
 * @decimals 1
 * @default 0.5
 * @desc 売却時に追加コストを得る倍率
 * デフォルト：0.5
 *
 * @help ■プラグインの概要
 * パラメータで指定したスイッチがＯＮのときに
 * ショップで購入する際に消費するコストを1つ追加することができます。
 * 
 * ■プラグインパラメータ
 * 【起動スイッチ】
 * 　ここで指定したスイッチがONの時ショップを起動するとコスト追加
 * 　デフォルト：1
 * 
 * 【追加コスト単位】
 * 　追加するコストの単位
 * 
 * 【追加コスト種類】
 * 　0 = 変数、1 = アイテム
 * 
 * 【追加コストID】
 * 　追加コスト種類で指定したもののID
 * 
 * 【コマンド名称：購入】
 * 　購入するコマンド名称
 * 
 * 【コマンド名称：売却】
 * 　売却するコマンド名称
 * 
 * 【コマンド名称：終了】
 * 　ショップを出るコマンド名称
 * 
 * 【アイテム背景四角の色】
 * 　アイテムの名前、追加コスト、金額につける背景の色
 * 　テキストカラーで選択　デフォルト：0
 * 
 * 【アイテム背景四角の透明度】
 * 　背景フレームの透明度　0～255
 * 
 * 【売却コスト倍率】
 * 　売却時に追加コストを得る倍率
 * 
 * ■利用規約
 * このプラグインは、MITライセンスのもとで公開されています。
 * Copyright (c) 2018 BB ENTERTAINMENT
 * Released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * 
 * ■コンタクト
 * BB ENTERTAINMENT Twitter: https://twitter.com/BB_ENTER/
 * BB ENTERTAINMENT BLOG   : http://bb-entertainment-blog.blogspot.jp/
 */

(function() {
    'use strict';
//-----------------------------------------------------------------------------
//  プラグインパラメータ管理
//-----------------------------------------------------------------------------
var parameters = PluginManager.parameters('BB_ShopCostPlus');
var BBShopCostPlusSwitch = Number(parameters['起動スイッチ']);
var BBShopCostPlusUnit = String(parameters['追加コスト単位']);
var BBShopCostPlusType = Number(parameters['追加コスト種類']);
var BBShopCostPlusId = Number(parameters['追加コストID']);
var BBShopCostPlusBuy = String(parameters['コマンド名称：購入']);
var BBShopCostPlusSell = String(parameters['コマンド名称：売却']);
var BBShopCostPlusCancel = String(parameters['コマンド名称：終了']);
var BBShopCostPlusSquare = Number(parameters['アイテム背景四角の色']);
var BBShopCostPlusSquareOpacity = Number(parameters['アイテム背景四角の透明度']);
var BBShopCostPlusMultiply = Number(parameters['売却コスト倍率']);

//-----------------------------------------------------------------------------
//  Window_Scrapの定義
//-----------------------------------------------------------------------------
function Window_Scrap() {
    this.initialize.apply(this, arguments);
};

Window_Scrap.prototype = Object.create(Window_Base.prototype);
Window_Scrap.prototype.constructor = Window_Scrap;

Window_Scrap.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};

Window_Scrap.prototype.refresh = function() {
    var x = this.textPadding();
    var width = this.contents.width - this.textPadding() * 2;
    this.contents.clear();
    this.changeTextColor(this.systemColor());
    this.drawText(BBShopCostPlusUnit, 176, 0, 32);
    this.resetTextColor();
    if (BBShopCostPlusType == 0) {
        this.drawText($gameVariables.value(BBShopCostPlusId), x, 0, width - 28, 'right');
    } else if (BBShopCostPlusType == 1) {
        this.drawText($gameParty.numItems($dataItems[BBShopCostPlusId]), x, 0, width - 28, 'right');
    }
};

//-----------------------------------------------------------------------------
//  Window_ShopBuy
//-----------------------------------------------------------------------------
Window_ShopBuy.prototype.isEnabled = function(item) {
    if ($gameSwitches.value(BBShopCostPlusSwitch)) {
        if (BBShopCostPlusType == 0) {
            return (item && this.price(item) <= this._money &&
                    item.meta["cost2"] <= $gameVariables.value(BBShopCostPlusId) &&
                    !$gameParty.hasMaxItems(item));
        } else if (BBShopCostPlusType == 1) {
            return (item && this.price(item) <= this._money &&
                    item.meta["cost2"] <= $gameParty.numItems($dataItems[BBShopCostPlusId]) &&
                    !$gameParty.hasMaxItems(item));
        }
    } else {
        return (item && this.price(item) <= this._money &&
                !$gameParty.hasMaxItems(item));
    }
};

var _Window_ShopBuy_prototype_drawItem = Window_ShopBuy.prototype.drawItem;
Window_ShopBuy.prototype.drawItem = function(index) {
    var item = this._data[index];
    var rect = this.itemRect(index);
    var priceWidth = 64;
    rect.width -= this.textPadding();
    if ($gameSwitches.value(BBShopCostPlusSwitch)) {
        this.contents.paintOpacity = BBShopCostPlusSquareOpacity;
        this.contents.fillRect(rect.x, rect.y, rect.width - priceWidth * 2 - 32 + 4, 32, this.textColor(BBShopCostPlusSquare));
        this.contents.fillRect(rect.x + rect.width - priceWidth * 2 - 16 - 4, rect.y, priceWidth + 8, 32, this.textColor(BBShopCostPlusSquare));
        this.contents.fillRect(rect.x + rect.width - priceWidth - 4, rect.y, priceWidth + 8, 32, this.textColor(BBShopCostPlusSquare));
        this.contents.paintOpacity = 255;
    }
    this.changePaintOpacity(this.isEnabled(item));
    this.drawItemName(item, rect.x, rect.y, rect.width - priceWidth * 2 - 32);
    this.drawText(this.price(item), rect.x + rect.width - priceWidth, rect.y, priceWidth, 'right');
    if ($gameSwitches.value(BBShopCostPlusSwitch)) {
        this.drawText(item.meta['cost2'], rect.x + rect.width - priceWidth * 2 - 16, rect.y, priceWidth, 'right');
    }
    this.changePaintOpacity(true);
};

//-----------------------------------------------------------------------------
//  Window_Number
//-----------------------------------------------------------------------------
var _Window_ShopNumber_prototype_refresh = Window_ShopNumber.prototype.refresh;
Window_ShopNumber.prototype.refresh = function() {
    _Window_ShopNumber_prototype_refresh.call(this);
    if ($gameSwitches.value(BBShopCostPlusSwitch)) {
        this.drawTotalCost2();
    }
};

Window_ShopNumber.prototype.drawTotalCost2 = function() {
    var total = this.getCost() * this._number;// Changed by Tsumio.
    var x = this.cursorX();
    var width = this.contentsWidth() - this.textPadding();
    this.resetTextColor();
    this.drawText(total, x - 90,  this.priceY() - 36, 96, 'right');
    this.changeTextColor(this.systemColor());
    this.drawText(BBShopCostPlusUnit, x + 8,  this.priceY() - 36, 32, 'right');
    this.resetTextColor();
};

var _Window_ShopNumber_prototype_priceY = Window_ShopNumber.prototype.priceY;
Window_ShopNumber.prototype.priceY = function() {
    if ($gameSwitches.value(BBShopCostPlusSwitch)) {
        return Math.round(this.contentsHeight() / 2 + this.lineHeight());
    } else {
        return Math.round(this.contentsHeight() / 2 + this.lineHeight() / 2);
    }
};

//-----------------------------------------------------------------------------
//  Scene_Shop
//-----------------------------------------------------------------------------
var _Scene_Shop_prototype_create = Scene_Shop.prototype.create;
Scene_Shop.prototype.create = function() {
    _Scene_Shop_prototype_create.call(this);
    if ($gameSwitches.value(BBShopCostPlusSwitch)) {
        this.createScrapWindow();
    }
};

Scene_Shop.prototype.createScrapWindow = function() {
    this._ScrapWindow = new Window_Scrap(336,108,240,72);
	this.addWindow(this._ScrapWindow);
};

var _Scene_Shop_prototype_onNumberOk = Scene_Shop.prototype.onNumberOk;
Scene_Shop.prototype.onNumberOk = function() {
    _Scene_Shop_prototype_onNumberOk.call(this);
    if ($gameSwitches.value(BBShopCostPlusSwitch)) {
        this._ScrapWindow.refresh();
    }
};

//-----------------------------------------------------------------------------
//  Scene_Shop売買の処理
//-----------------------------------------------------------------------------
var _Scene_Shop_prototype_doBuy = Scene_Shop.prototype.doBuy;
Scene_Shop.prototype.doBuy = function(number) {
    _Scene_Shop_prototype_doBuy.call(this, number);
    if ($gameSwitches.value(BBShopCostPlusSwitch)) {
        if (BBShopCostPlusType == 0) {
            var Bprice = $gameVariables.value(BBShopCostPlusId);
            Bprice -= number * this._item.meta["cost2"];
            if (Bprice < 0) {
                Bprice = 0;
            }
            $gameVariables.setValue(BBShopCostPlusId, Bprice);
        } else if (BBShopCostPlusType == 1) {
            var Bprice = 0;
            Bprice = number * this._item.meta["cost2"];
            $gameParty.loseItem($dataItems[BBShopCostPlusId], Bprice);
        }
    }
};

var _Scene_Shop_prototype_doSell = Scene_Shop.prototype.doSell;
Scene_Shop.prototype.doSell = function(number) {
    _Scene_Shop_prototype_doSell.call(this, number);
    if ($gameSwitches.value(BBShopCostPlusSwitch)) {
        if (BBShopCostPlusType == 0) {
            var Bprice = $gameVariables.value(BBShopCostPlusId);
            Bprice += number * (this._item.meta["cost2"] * BBShopCostPlusMultiply);
            console.log(BBShopCostPlusMultiply);
            $gameVariables.setValue(BBShopCostPlusId, Bprice);
        } else if (BBShopCostPlusType == 1) {
            var Bprice = 0;
            Bprice = number * this._item.meta["cost2"] * BBShopCostPlusMultiply;
            $gameParty.gainItem($dataItems[BBShopCostPlusId], Bprice);
        }
    }
};

var _Scene_Shop_prototype_maxBuy = Scene_Shop.prototype.maxBuy;
Scene_Shop.prototype.maxBuy = function() {
    var max = $gameParty.maxItems(this._item) - $gameParty.numItems(this._item);
    var price = this.buyingPrice();
    var cost2 = this._item.meta["cost2"];
    if (price > 0) {
        if ($gameSwitches.value(BBShopCostPlusSwitch)) {
            if (BBShopCostPlusType == 0) {
                return Math.min(max, Math.floor(this.money() / price), Math.floor($gameVariables.value(BBShopCostPlusId) / cost2));
            } else if (BBShopCostPlusType == 1) {
                return Math.min(max, Math.floor(this.money() / price), Math.floor($gameParty.numItems($dataItems[BBShopCostPlusId]) / cost2));
            }
        } else {
            return Math.min(max, Math.floor(this.money() / price));
        }
    } else {
        return max;
    }
};
//-----------------------------------------------------------------------------
//  ShopCommandWindowの横幅を変更
//-----------------------------------------------------------------------------
Window_ShopCommand.prototype.windowWidth = function() {
    if ($gameSwitches.value(BBShopCostPlusSwitch)) {
        return 336;
    } else {
        return this._windowWidth;
    }
};

//-----------------------------------------------------------------------------
//  ShopCommandWindowのコマンド名称を変更
//-----------------------------------------------------------------------------
Window_ShopCommand.prototype.makeCommandList = function() {
    if ($gameSwitches.value(BBShopCostPlusSwitch)) {
        this.addCommand(BBShopCostPlusBuy, 'buy');
        this.addCommand(BBShopCostPlusSell, 'sell',   !this._purchaseOnly);
        this.addCommand(BBShopCostPlusCancel, 'cancel');
    } else {
        this.addCommand(TextManager.buy,    'buy');
        this.addCommand(TextManager.sell,   'sell',   !this._purchaseOnly);
        this.addCommand(TextManager.cancel, 'cancel');
    }

};

////=============================================================================
//// Bug Fix.
////  Added by Tsumio.
////=============================================================================
const _Scene_Shop_prototype_onBuyOk = Scene_Shop.prototype.onBuyOk;
Scene_Shop.prototype.onBuyOk = function() {
    _Scene_Shop_prototype_onBuyOk.call(this);
    this._numberWindow.setup(this._item, this.maxBuy(), this.buyingPrice(), this.buyingCost());
};

const _Scene_Shop_prototype_onSellOk = Scene_Shop.prototype.onSellOk;
Scene_Shop.prototype.onSellOk = function() {
    _Scene_Shop_prototype_onSellOk.call(this);
    this._numberWindow.setup(this._item, this.maxSell(), this.sellingPrice(), this.sellingCost());
};

Scene_Shop.prototype.buyingCost = function() {
    return Math.floor(this._item.meta['cost2']);
};

Scene_Shop.prototype.sellingCost = function() {
    return Math.floor(this._item.meta['cost2'] * BBShopCostPlusMultiply);
};

const _Window_ShopNumber_prototype_setup = Window_ShopNumber.prototype.setup;
Window_ShopNumber.prototype.setup = function(item, max, price, cost) {
    this._cost = cost;
    _Window_ShopNumber_prototype_setup.apply(this, arguments);
};

Window_ShopNumber.prototype.getCost = function() {
    return this._cost;
};

})();