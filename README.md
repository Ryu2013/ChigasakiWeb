# 茅ヶ崎WEB コーポレートサイト

React + TypeScript + Vite で構成した、GitHub Pages 向けの静的コーポレートサイトです。

## 構成

- React Router を `HashRouter` で利用
- バックエンドなしの静的サイト
- 公開対象ページ
  - トップ
  - 会社概要
  - サービス
  - ブログ
  - 採用情報
  - お問い合わせ

## 開発

ローカル開発は Docker Compose 前提です。

```bash
docker compose up
```

ブラウザで `http://localhost:5173` を開くと確認できます。

## ビルド

```bash
docker compose exec frontend npm run build
```

成果物は `dist/` に出力されます。

## GitHub Pages 公開

1. `docker compose exec frontend npm run build`
2. 生成された `dist/` を GitHub Pages の公開対象に配置
3. GitHub Pages を有効化

`HashRouter` を使っているため、GitHub Pages のような静的ホスティングでもルート直アクセスの 404 を避けられます。
