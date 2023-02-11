
---
date: 2020-03-29 12:32:00
layout: post
title: 利用 MusicBrainz Database 學習 postgres

tags: [python, postgres, aws, lightsail]
---
![](https://upload.wikimedia.org/wikipedia/commons/9/91/MusicBrainz_Logo_2016.svg)

由於最近專案上大量使用 sql, 加上前陣子做了 [postgres 內部 index](https://www.slideshare.net/ssuserb41761/postgres-indexing-and-toward-big-data-application) 的研究，想更近一步優化 sql 的寫法，因此找了 musicvbrainz database 這 來練習，這裡紀錄一下整個安裝和設定的過程。

MusicBrainz是一個旨在創造開放資料音樂資料庫的專案，它原初的目的是針對光碟資料庫中的限制，但如今已不再將目標局限於CD後設資料儲存庫，而擴大為一種結構化的「音樂維基百科」。

<!--more-->

我在 [aws lightsail](https://aws.amazon.com/tw/lightsail/) 上開了一台 VPS, 從乾淨的環境開始裝設 postgres

``` sh
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
```

接著利用 mbdata 來創建 db 並導入 sql dump files.


## 遇到的問題

### 無法 remote access postgres from psql

解決辦法: lightsail enable 5432 port

