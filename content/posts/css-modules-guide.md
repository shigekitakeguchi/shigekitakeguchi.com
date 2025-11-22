---
title: "CSS Modules完全ガイド"
date: "2024-01-05"
excerpt: "CSS Modulesの基本的な使い方から高度なテクニックまで、包括的に解説します。"
---

# CSS Modules完全ガイド

CSS Modulesは、CSSクラス名をローカルスコープにすることで、スタイルの競合を防ぐ技術です。

## 基本的な使い方

### 1. ファイルの命名規則
CSS Modulesファイルは `.module.css` の拡張子を使用します。

```css
/* Button.module.css */
.button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}
```

### 2. Reactコンポーネントでの使用

```typescript
import styles from './Button.module.css'

function Button({ children, onClick }: ButtonProps) {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  )
}
```

## 高度なテクニック

### 1. クラス名の結合

```typescript
import styles from './Button.module.css'
import classNames from 'classnames'

function Button({ variant, size, children }: ButtonProps) {
  return (
    <button 
      className={classNames(
        styles.button,
        styles[variant],
        styles[size]
      )}
    >
      {children}
    </button>
  )
}
```

### 2. グローバルスタイルとの組み合わせ

```css
/* Button.module.css */
.button {
  composes: global-button from global;
  background-color: #007bff;
}

:global(.global-button) {
  font-family: Arial, sans-serif;
}
```

### 3. 変数の使用

```css
/* variables.module.css */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
}

.button {
  background-color: var(--primary-color);
}
```

## ベストプラクティス

1. **一貫した命名規則**: BEM記法やcamelCaseを使用
2. **コンポーネント単位での管理**: 関連するスタイルを同じファイルに配置
3. **再利用可能なスタイル**: 共通のスタイルは別ファイルに分離
4. **パフォーマンスの考慮**: 不要なスタイルの読み込みを避ける

CSS Modulesを活用することで、保守性の高いスタイル管理が可能になります。

