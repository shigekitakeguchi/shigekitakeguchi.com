# Tailwind Next.js Starter Blog

Next.jsとTailwind CSSを使用した多言語対応（日本語・英語）ブログテンプレートです。

## 特徴

- ✨ **Next.js 14** - Pages Routerを使用
- 🎨 **Tailwind CSS** - モダンなスタイリング
- 🌍 **多言語対応** - 日本語と英語のサポート（next-intl）
- 🌙 **ダークモード** - ライト/ダークテーマの切り替え
- 📝 **Markdown** - Markdownファイルでブログ投稿を管理
- 🏷️ **タグ機能** - 投稿にタグを付与可能
- 📱 **レスポンシブ** - モバイルフレンドリーなデザイン
- ⚡ **Vercel対応** - Vercelに簡単にデプロイ可能

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## ブログ投稿の追加

ブログ投稿は `content/` ディレクトリにMarkdownファイルとして追加します。

### ディレクトリ構造

```
content/
  en/
    first-post.md
    second-post.md
  ja/
    first-post.md
    second-post.md
```

### Markdownファイルの形式

各投稿は以下の形式で記述します：

```markdown
---
title: "投稿のタイトル"
date: "2024-01-01"
excerpt: "投稿の概要"
tags: ["tag1", "tag2"]
---

投稿の本文をここに記述します。
```

## Vercelへのデプロイ

### 方法1: Vercel CLIを使用

1. Vercel CLIをインストール：
```bash
npm i -g vercel
```

2. デプロイ：
```bash
vercel
```

### 方法2: GitHub経由でデプロイ

1. GitHubにリポジトリをプッシュ
2. [Vercel](https://vercel.com)にログイン
3. 「New Project」をクリック
4. GitHubリポジトリを選択
5. 設定を確認して「Deploy」をクリック

Vercelは自動的にNext.jsプロジェクトを検出し、適切な設定でデプロイします。

## プロジェクト構造

```
.
├── pages/                  # Pages Router
│   ├── _app.tsx           # アプリケーションのルートコンポーネント
│   ├── _document.tsx       # HTMLドキュメントのカスタマイズ
│   ├── index.tsx          # ルートページ（リダイレクト）
│   └── [locale]/          # 多言語対応のルーティング
│       ├── index.tsx      # ホームページ
│       └── blog/          # ブログページ
│           ├── index.tsx  # ブログ一覧
│           └── [slug].tsx # 個別投稿
├── components/             # Reactコンポーネント
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── PostCard.tsx
├── content/               # Markdownブログ投稿
│   ├── en/
│   └── ja/
├── lib/                   # ユーティリティ関数
│   └── posts.ts
├── messages/              # 翻訳ファイル
│   ├── en.json
│   └── ja.json
├── public/                # 静的ファイル
│   └── images/            # 画像ファイル
├── styles/                # スタイルファイル
│   └── globals.css        # グローバルスタイル
├── i18n.ts                # 国際化設定
├── middleware.ts          # Next.jsミドルウェア
└── package.json
```

## 静的ファイルの配置

画像やその他の静的ファイルは `public/` ディレクトリに配置します。

### ディレクトリ構造

```
public/
├── images/           # 画像ファイル
│   ├── logo.png
│   ├── hero.jpg
│   └── posts/        # 投稿用の画像
├── favicon.ico       # ファビコン
└── documents/        # PDFなどのドキュメント
```

### 画像の使用方法

#### 方法1: Next.jsのImageコンポーネント（推奨）

```tsx
import Image from '@/components/Image'

<Image 
  src="/images/logo.png" 
  alt="Logo" 
  width={200} 
  height={100} 
/>
```

#### 方法2: 通常のimgタグ

```tsx
<img src="/images/hero.jpg" alt="Hero image" />
```

#### 方法3: CSSのbackground-image

```css
.hero {
  background-image: url('/images/hero.jpg');
}
```

### 外部画像の使用

外部URLの画像を使用する場合は、`next.config.js`にドメインを追加してください：

```javascript
module.exports = {
  images: {
    domains: ['example.com', 'cdn.example.com'],
  },
}
```

## カスタマイズ

### スタイルの変更

`tailwind.config.js` を編集してTailwindの設定をカスタマイズできます。

### 言語の追加

1. `i18n.ts` の `locales` 配列に言語コードを追加
2. `messages/` ディレクトリに新しい言語のJSONファイルを追加
3. `content/` ディレクトリに新しい言語のディレクトリを作成

## ライセンス

MIT


