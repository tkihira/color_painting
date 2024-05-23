# 塗り絵 自動生成

Stability AI Platform のサンプルとして作りました

ライブデモ: https://color-painting.vercel.app/

## ビルド方法

### 外部サービス準備

Vercel を前提にしています。まず Vercel でアカウントを作ってください

https://vercel.com/

いたずら防止に reCAPTCHA v2 を導入しています。以下のページで新しいサイトを登録してください

https://www.google.com/recaptcha/admin

- `ラベル` は認識しやすい名前をつけてください
- `reCAPTCHA タイプ` は チャレンジ（v2） を選び、「私はロボットではありません」チェックボックスを選びます
- `ドメイン` には `localhost` と `vercel.app` を登録します

### 環境構築

ターミナルで

```
$ npm i
$ npx vercel
（全部 y で良い）
```

ブラウザで [Vercel](https://vercel.com/) のプロジェクトページを開き、Project Settings 画面にて、

- General > Build & Development Settings
    - Output Directory の Override をオンにして、 `./build/` を設定
- Environment Variables > Create new
    - Environments を全部チェックする（デフォルトでそうなっている）
    - Key: `STABILITY_API_KEY` で　https://platform.stability.ai/account/keys で作成した KEY を保存
    - Key: `RECAPTCHA_PUBLIC_KEY` で https://www.google.com/recaptcha/admin で作成した Site Key を保存
    - Key: `RECAPTCHA_SECRET_KEY` で https://www.google.com/recaptcha/admin で作成した Secret Key を保存

再度ターミナルで、

```
$ npx vercel pull
$ npx vercel env pull
```

を実行して、設定をサーバと同期する。以上で環境構築は終了です

### ローカル開発環境

```
$ npm run watch
```

これで http://localhost:3000/ で開発サーバが動きます。Serverless Functions もローカルで実行できます

### デプロイ

Preview 用のデプロイはこちら

```
$ npx vercel
```

Production 用のデプロイはこちら

```
$ npx vercel --prod
```

## ファイル構成

- `src/index.js`: クライアント側コード
- `api/generate.js`: Serverless Function
- `misc/text2image.mjs`: Node.js 画像生成サンプルコード（ローカル実験用）

## ライセンス

MIT