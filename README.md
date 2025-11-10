# 街撮りch 公式ブログ

Next.js + Tailwind CSSで構築されたi18n対応のブログサイトです。

## 技術スタック

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React**

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# 本番サーバーの起動
npm start
```

## プロジェクト構造

```
.
├── app/
│   └── [locale]/          # 言語別ルーティング
│       ├── layout.tsx     # レイアウト
│       ├── page.tsx       # ホームページ
│       └── globals.css    # グローバルスタイル
├── components/             # Reactコンポーネント
├── lib/                    # ユーティリティ関数
├── locales/                # 翻訳ファイル
│   ├── ja.json
│   └── en.json
├── types/                  # TypeScript型定義
└── middleware.ts           # i18nルーティング処理
```

## 機能

- ✅ 日本語/英語のi18n対応
- ✅ SEO最適化（hreflang、OGP、構造化データ）
- ✅ アクセシビリティ対応（AA準拠）
- ✅ レスポンシブデザイン
- ✅ パフォーマンス最適化（next/image使用）

## デプロイ

Vercelへのデプロイを推奨します。

```bash
# Vercel CLIでデプロイ
vercel
```



