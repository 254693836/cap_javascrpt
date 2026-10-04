# CAP Product Catalog

Node.js / JavaScript で実装した SAP CAP のサンプルです。SQLite に商品を保存し、SAP Fiori elements の List Report と Object Page で一覧、登録、更新を行えます。

## 機能

- 商品の一覧表示、新規登録、更新（OData V4）
- SQLite と CSV による初期データ投入
- Fiori elements の List Report / Object Page
- Object Page の **Check** ボタン。表示中の商品がデータベースに存在するかを確認し、メッセージを表示します。

## 必要環境

- Node.js 20 以降
- npm 10 以降

## 起動方法

依存関係をインストールして CAP サーバーを起動します。

```bash
npm install
npm run watch
```

初回起動前に SQLite データベースを作成し、`db/data/demo-Products.csv` のデータを読み込みます。

```bash
npm run deploy
```

OData サービスは `http://localhost:4004/catalog/` で利用できます。

別のターミナルで Fiori elements アプリを起動します。

```bash
cd app/catalog
npm install
npm start
```

表示された URL をブラウザーで開いてください。Object Page の **Check** を押すと、現在の商品の存在確認結果がポップアップで表示されます。

## 確認

```bash
npm test
npm run build
```

`npm test` は OData の一覧取得、登録、更新、存在確認アクションを確認します。
