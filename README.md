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

`.github/workflows/deploy-pages.yml` で GitHub Actions から自動デプロイする構成です。

1. GitHub の `Settings > Pages` を開く
2. `Source` を `GitHub Actions` にする
3. `main` ブランチへ push する

`HashRouter` を使っているため、GitHub Pages のような静的ホスティングでもルート直アクセスの 404 を避けられます。

`dist/` を Git にコミットする必要はありません。Actions 上でビルドした成果物がそのまま Pages にデプロイされます。
