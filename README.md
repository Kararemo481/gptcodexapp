# gptcodexapp

Codexで進めたリポジトリ整備をまとめる公開作業ログダッシュボードです。今は、ブラウザに保存できるTODOメモも使えます。

## できること

- マージ済みプルリクと完了した課題を確認する
- 次にやると良いことを見る
- TODOを追加する
- TODOに完了チェックを入れる
- 完了したTODOや不要なTODOを消す

## 公開ページ

`https://kararemo481.github.io/gptcodexapp/`

## TODOメモの保存

TODOメモはブラウザの `localStorage` に保存されます。同じブラウザで開くと前回の内容が残ります。別の端末や別のブラウザとは共有されません。

## ローカル確認

`index.html` をブラウザで開くと、手元でも画面を確認できます。

## ファイル構成

- `index.html`: ダッシュボード画面とTODOメモ欄のHTML
- `styles.css`: 日本語表示に合わせたレスポンシブCSS
- `scripts/app.js`: 作業履歴、次タスク、TODOメモの表示と保存処理
- `assets/workflow-map.svg`: 作業の流れを示す図
- `.github/workflows/validate.yml`: 必要ファイルとTODOメモの接続を確認する検証ワークフロー
- `.github/workflows/pages.yml`: PagesをActions公開に戻したい場合に使える公開ワークフロー

## 検証

GitHub Actionsの `Validate` が、必要なダッシュボード用ファイルとTODOメモの基本要素を確認します。
