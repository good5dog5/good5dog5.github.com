---
date: 2019-07-09 10:50:42
layout: post
title: 解決 apt-get 顯示 public key is not AVALIABLE 的問題
tags: [gpg, debian, ubuntu, apt-get, apt]
---

用 apt-get update package index 或是安裝套件時，常會發生錯誤訊息為 `public key is not AVALIABLE`
的問題，紀錄一下對應的解法。

<!--more-->

# 原因
沒有對應的 public key，以此例而言， public key ID 是 `1F3045A5DF7587C3`

# 解法
從 key server 下載對應的公鑰即可

``` bash
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 1F3045A5DF7587C3
```

