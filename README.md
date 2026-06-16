# gptcodexapp

Codexで進めたリポジトリ整備をまとめる公開作業ログダッシュボードです。

## 状態

公開ページでは、初期セットアップ、マージ済みプルリク、完了した課題、検証状態、次にやると良いことを確認できます。

## 公開ページ

`https://kararemo481.github.io/gptcodexapp/`

## ローカル確認

`index.html` をブラウザで開くと、手元でも画面を確認できます。

## ファイル構成

- `index.html`: ダッシュボード画面のHTML
- `styles.css`: 日本語表示に合わせたレスポンシブCSS
- `scripts/app.js`: 作業履歴と次タスクの表示処理
- `assets/workflow-map.svg`: 作業の流れを示す図
- `.github/workflows/validate.yml`: 必要ファイルがあるか確認する検証ワークフロー
- `.github/workflows/pages.yml`: PagesをActions公開に戻したい場合に使える公開ワークフロー

## 検証

GitHub Actionsの `Validate` が、必要なダッシュボード用ファイルの存在を確認します。
