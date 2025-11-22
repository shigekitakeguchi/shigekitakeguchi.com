---
title: "Next.jsブログへようこそ"
date: "2024-01-15"
excerpt: "Next.js、TypeScript、CSS Modulesを使用したモダンなブログサイトの構築について説明します。"
---

# Next.jsブログへようこそ

このブログサイトは、以下の技術スタックを使用して構築されています：

- **Next.js 14** - React フレームワーク
- **TypeScript** - 型安全性の向上
- **CSS Modules** - スコープ付きスタイリング
- **Markdown** - コンテンツ管理

## 主な機能

### 1. 静的サイト生成（SSG）
Next.jsのApp Routerを使用して、ブログ記事を静的に生成しています。これにより、高速なページ読み込みが実現されます。

### 2. TypeScriptサポート
型安全性により、開発時のエラーを早期に発見できます。

```typescript
interface PostData {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
}
```

### 3. CSS Modules
コンポーネントごとにスコープされたスタイルを提供し、スタイルの競合を防ぎます。

### 4. Markdownサポート
gray-matterとremarkを使用して、MarkdownファイルをHTMLに変換します。

## 今後の予定

- ダークモード対応の改善
- 検索機能の追加
- タグ機能の実装
- RSSフィードの生成

このブログサイトのソースコードは、GitHubで公開されています。ご質問やフィードバックがございましたら、お気軽にお声がけください。

