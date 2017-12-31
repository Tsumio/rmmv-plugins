### GitPitchとは

- GitPitchはPresentationを作成できる
- 要はパワーポイントみたいなやつ
- そう、今あなたが見てるこれです
- 細かいことは[このサイト](http://paiza.hatenablog.com/entry/2017/06/22/GitHub%E3%81%A0%E3%81%91%E3%81%A7%E8%B6%85%E9%AB%98%E6%A9%9F%E8%83%BD%E3%81%AA%E3%82%B9%E3%83%A9%E3%82%A4%E3%83%89%E8%B3%87%E6%96%99%E3%81%8C%E4%BD%9C%E3%82%8C%E3%82%8B%E3%80%8CGitPitch%E3%80%8D%E3%81%AE)を参照してほしい
- 次のスライドから本題です


---


### 複数のPresentationを作成したい
- GitPitchで複数のPresentationを作りたい |
- が、やり方がわからず詰まった |
- 外国の方がリプライで教えてくれたので、それをシェアしたい |
- と言っても実はWikiには普通に書いてることだけど……

---


### 方法1
#### 複数のリポジトリを作る
- リポジトリごとにPITCHME.mdを置く |
- たぶん一番シンプル |
- でもPresentationのために複数のリポジトリ作りたくないはず |
- というわけで次


---


### 方法2
#### ブランチでわける
- ブランチごとにPITCHME.mdを置く |
- 先の方法よりはマシ |
- でもPresentationのためにブランチを作るのがなんだか嫌だ
- **というわけで次が本命**

---

### 方法3
#### フォルダごとにわける
- 各フォルダにPITCHME.mdを置く |
- たぶん皆さんがやりたいのはコレ |
- ただし各フォルダにPITCHME.mdを置くだけではPresentationとして認識されない |
- **どうすればよいか？**

---

### アドレスで管理できる
- 実は各フォルダごとにPITCHME.mdを置いた場合、アドレスで各Presentationを管理できる
- 具体的には以下の通り
- https://gitpitch.com/user/repo/branch?p=フォルダ名
- ブランチが不要ならrepo?p=フォルダ名 |
- 具体例は、**このPresentationのアドレスを参照**
  
その他の詳細は[Wiki](https://github.com/gitpitch/gitpitch/wiki/Asset-Sharing)に書いてます。  
ただし英語。