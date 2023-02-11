---
date: 2018-11-12 17:53:00
layout: post
title: Redis 初探 - 使用 python 操作 redis
tags: [redis, python, memcached]
---

## Redis 是什麼?
redis 是 key:value pair’s cache system, 或是說是一套 distributed dictionary server
從 StackOverflow 的[問題](https://stackoverflow.com/questions/10558465/memcached-vs-redis) Memcached vs. Redis?  大家一面倒地推 Redis
## 安裝 redis server, redis-py

``` bash
brew install redis
pip install redis
```

## 設定並啟動 redis server

``` bash
ln -sfv /usr/local/opt/redis/*.plist ~/Library/LaunchAgents
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.redis.plist
redis-server /usr/local/etc/redis.conf
```

測試看看 redis 是否跑起來

``` bash
 redis-cli ping
```

## minimal test

``` python
import redis
r = redis.Redis(host='localhost', port=6379, db=0)
r.set('foo','bar')
True
r.get('foo')
bar
```
