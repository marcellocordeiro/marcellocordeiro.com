---
slug: markdown-tests
title: Markdown tests
description: Testing Markdown stuff
date: 2026-03-10
tags:
  - Test
  - Markdown
keywords:
  - markdown
  - test
image: "assets/blog-placeholder.jpg"
---

# Markdown tests

Seemingly random snippets of Markdown to test the MDX rendering.

---

## Contents

- [TypeScript](#typescript)
- [Rust](#rust)

---

## Autolink literals

www.example.com, https://example.com, and contact@example.com.

## Footnote

A note[^1]

[^1]: Big note.

## Strikethrough

~one~ or ~~two~~ tildes.

## Table

| a   | b   |   c |  d  |
| --- | :-- | --: | :-: |

## Tasklist

- [ ] to do
- [x] done

## TypeScript

**Bullet list:**

- _One_
- **Two**
- ~~Three~~

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(id: number): Promise<User> {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error("User not found");
  return res.json();
}
```

---

## Rust

> ⚠️ `turbofish`.

Text with `turbofish`

```rust
fn main() {
    let a = 42;
    println!("a = {a}");
}
```
