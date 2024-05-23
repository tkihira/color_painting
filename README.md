# 塗り絵 自動生成

Stability AI Platform のサンプルとして作りました

ライブデモ: https://color-painting.vercel.app/

## ビルド方法

Vercel を前提にしています。まず Vercel でアカウントを作ってください

https://vercel.com/

### 環境設定

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
    - `STABILITY_API_KEY` に　https://platform.stability.ai/account/keys で作成した KEY を保存
    - `RECAPTCHA_SECRET_KEY` に https://www.google.com/recaptcha/admin で作成した Secret Key を保存
        - ドメインは `localhost` と `vercel.app` を登録します

再度ターミナルで、

```
$ npx vercel pull
$ npx vercel env pull
```

を実行して、設定をサーバと同期する。以上で環境の準備は終了

### デバッグ

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

### ライセンス

MIT