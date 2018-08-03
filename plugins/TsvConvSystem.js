//=============================================================================
// TsvConvSystem.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2018 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2018/08/03 公開。
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/Tsumio/rmmv-plugins
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================

/*:ja
 * @plugindesc TSVファイルから会話データを読み込むプラグイン
 * @author ツミオ
 *
 * 
 * @help TSVファイルから会話データを読み込むプラグイン
 * 
 * 当プラグインはRPGツクールMVバージョン1.6.1以降でのみ動作します。
 * また、ブラウザ版やスマホ版で動作するかどうかは未確認です。
 * 
 * 【使用方法】 
 * プラグインの導入後、プラグインコマンドを実行することでTSVデータから会話データを読み込むことができます。
 * 
 * 【TSVデータの作り方】
 * TSVデータはGoogleスプレッドシートから生成することを前提にしています。
 * Googleスプレッドシートの「ファイル→形式を指定してダウンロード→タブ区切りの値」を選択してください。
 * 出力されたファイルをプロジェクトの「dataフォルダ」に入れてください。
 * 
 * A：区別名
 * B:会話内容
 * C以降：自由に何でも
 * 
 * 【プラグインコマンド】
 * 「会話 区別名」で会話データを読み込みます。
 * 区切りは半角スペースです。
 * 
 * 例：
 * 会話 村人Aの話1
 * 
 * 【注意点】
 * 改行は半角スペースで判定しています。
 * したがって、英語等の文章では使いにくいです。
 *
 * 【更新履歴】
 * 1.0.0 2018/08/03 公開。
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

//外部からアクセスできるようにしておく
$dataConv = null;

(function() {
    'use strict';
    var pluginName = 'TsvConvSystem';

//////=============================================================================
///// Game_Interpreter
/////  プラグインコマンドを追加しているだけ。
/////=============================================================================
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === '会話' || command === 'Conv') {
            $gameMessage.newPage();
            for(let conv of $dataConv[args[0]]) {
                $gameMessage.add(conv);
            } 
        }
    };

//////=============================================================================
///// DataManager
/////  データロード時に会話データも読み込む
/////=============================================================================
    const _DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = async function() {
        _DataManager_loadDatabase.call(this);
        const loader = new ConvTextLoader();
        $dataConv    = await loader.createTextData();
    };

//////=============================================================================
///// ConvTextLoader
/////  会話データを読み込むためのクラス
/////=============================================================================
    class ConvTextLoader {

        //データを作成する。外部から呼ぶのはこいつだけ。
        async createTextData() {
            const uri      = '/data/convData.tsv';
            const origin   = await this.fetchTextData(uri);
            const textData = this.parseTextData(origin);

            return textData;
        }

        //tsvファイルを扱いやすい形式に変換
        parseTextData(origin) {
            const lfArray  = origin.split(/\r\n|\r|\n/);
            const textData = {};

            //ブラケット構文で要素をMAPに変換（ただのオブジェクト）
            for(let text of lfArray) {
                const elements = text.split('\t');
                textData[elements[0]] = elements[1].split(' ');
            }
            return textData;
        }

        //ファイルを取得する
        fetchTextData(uri) {
            return new Promise(function(resolve, reject) {
                //リクエストの作成
                var req = new XMLHttpRequest();
                req.open('GET', uri);
                req.overrideMimeType('text/plain');
                
                //リクエスト成功したなら
                req.onload = function() {
                    //成功したら200
                    if (req.status == 200) {
                        resolve(req.response);
                    }
                    else {
                        //なんかで失敗したら
                        reject(Error(req.statusText));
                    }
                };
            
                //エラー起きたら
                req.onerror = function() {
                    reject(Error('読み込めませんでした'));
                };
            
                //リクエストの送信
                req.send();
            });
        }
    }

})();
