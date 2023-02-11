---
date: 2016-07-09 03:50:42
layout: post
title: 利用 GNU Privacy Guard (GPG) 加解密檔案
tags: [gpg, gnu, crypto]
---

GPG 是 unix-based
系統常用的加解密工具，各種常用的應用如信件軟體和通訊軟體都依靠他來保證雙向通訊的安全。
簡單紀錄一下如何利用 gpg 對檔案進行加解密。

<!--more-->

# 安裝

## OSX

```
brew install gnupg
```

## 其他作業系統
可到 [GnuPG](https://www.gnupg.org/download/#binary) 下載對應安裝檔。

### Encrypt:
~~~
gpg --cipher-algo AES256 --symmetric filename.tar.gz

#等同
gpg --cipher-algo AES256 -c filename.tar.gz
~~~
會產生名為 `filename.tar.gz.gpg`的加密檔，原來的`filename.tar.gz`亦存在。

### Decrypt:
~~~ bash
gpg --output filename.tar.gz --decrypt filename.tar.gz.gpg

# 等同
gpg -o filename.tar.gz -d filename.tar.gz.gpg
~~~

