---
title: "TypeScriptの便利なテクニック"
date: "2024-01-10"
excerpt: "TypeScriptを使った開発で知っておくと便利なテクニックを紹介します。"
---

# TypeScriptの便利なテクニック

TypeScriptを使った開発で、より効率的にコードを書くためのテクニックをいくつか紹介します。

## 1. ユーティリティ型の活用

TypeScriptには多くの便利なユーティリティ型が用意されています。

### Partial<T>
オブジェクトのすべてのプロパティをオプショナルにします。

```typescript
interface User {
  id: number
  name: string
  email: string
}

type PartialUser = Partial<User>
// { id?: number; name?: string; email?: string; }
```

### Pick<T, K>
指定したプロパティのみを抽出します。

```typescript
type UserEmail = Pick<User, 'email'>
// { email: string }
```

### Omit<T, K>
指定したプロパティを除外します。

```typescript
type UserWithoutId = Omit<User, 'id'>
// { name: string; email: string }
```

## 2. 型ガードの活用

実行時に型をチェックする関数を作成できます。

```typescript
function isString(value: unknown): value is string {
  return typeof value === 'string'
}

function processValue(value: unknown) {
  if (isString(value)) {
    // ここでは value は string 型として扱われる
    console.log(value.toUpperCase())
  }
}
```

## 3. 条件型（Conditional Types）

条件に基づいて型を決定できます。

```typescript
type ApiResponse<T> = T extends string 
  ? { message: T } 
  : { data: T }

type StringResponse = ApiResponse<string>  // { message: string }
type NumberResponse = ApiResponse<number>  // { data: number }
```

## 4. テンプレートリテラル型

文字列の型を動的に生成できます。

```typescript
type EventName<T extends string> = `on${Capitalize<T>}`

type ClickEvent = EventName<'click'>  // 'onClick'
type ChangeEvent = EventName<'change'>  // 'onChange'
```

これらのテクニックを活用することで、より型安全で保守性の高いコードを書くことができます。

