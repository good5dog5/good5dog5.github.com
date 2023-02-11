
---
date: 2014-03-16 12:12:00
layout: post
title: 我的第一個 shell script：利用 megadl 下載 Mega.co.nz 的檔案
tags: [Mega, shell script, megadl]
---

這篇是我在 2014 發布的舊文章。當時很興奮的紀錄自己用 megadl 下載檔案。 還記得那時 Mega.co.nz 就會限制單個 ip 的下載流量，然而 megadl 卻能超額下載而不被偵測，還因此覺得自己很厲害而沾沾自喜 XDD

今日看來只覺得有些尷尬，但又感謝自己一直能保有熱情持續學習，敬所有跌跌撞撞卻樂此不疲的 Linux.er.


<!--more-->


## 源起
切換到全 Linux 的作業環境後,很多應用程式都能找到替代方案,唯獨論壇上免空資源的下載器,大多是為了廣大的 windows 用戶所撰寫,自己常下載的免空大老"MEGA"就是其中一例,windows上可以利用MegaDownloader自動排程下載,linux下目前只有看到Megatools 這套cml界面的工具可用,而且裡面只有一個cmd是用來下載他人分享的內容,其餘都是用 來對自己的空間坐上傳,下載,查詢等等,與原來windows下的MegaDownloader功能相去甚遠。

## Megatools
Megatools 的 manual 如下

``` bash
megals(1) megatools manual megals(1)

name

megadl - download exported files and directories from mega.co.nz

synopsis

       megadl [--no-progress] [--path <path>] <links>...
       megadl --path - <filelink>
description

downloads exported files and folders from mega.co.nz. handles links like:

· https://mega.co.nz/#!7yvwhczz!baublakkkvv8him-8-qfmgoys289toqwn7rgfpzxb_w

· https://mega.co.nz/#f!hilfdajt!hlivvqqkse1d0ogxzuaojg

       when downloading individual files, these are placed into <path>. when downloading folders, the contents of the folder are placed into directory
       specified by <path>.

       to export files, you can use mega.co.nz web application, or megals(1)'s --export option.
options

       --path <path>
           local directory to download to. defaults to the current working directory.

           if <path> is -, remote file will be streamed to stdout.

       --no-progress
           disable download progress reporting. this is implied when streaming.

       --debug [<options>]
           Enable debugging of various aspects of the megatools operation. You may enable multiple debugging options separated by commas. (eg.  --debug
           api,fs)

           Available options are:

           ·    api: Dump Mega.co.nz API calls

           ·    fs: Dump Mega.co.nz filesystem (may require --reload to actually print something)

           ·    cache: Dump cache contents

       --version
           Show version information

       <links>
           File and folder links to download from.

       <filelink>
           Link to exported file to stream.
```

## 下載腳本

例如要下載一個連結為 `https://mega.co.nz/#!7YVWhCzZ!bauBlAkKKvv8hIm-8-qFmGOYS289ToQWN7rGFPzXB_wf` 的檔案則指令為 
``` sh
megadl "https://mega.co.nz/#!7YVWhCzZ!bauBlAkKKvv8hIm-8-qFmGOYS289ToQWN7rGFPzXB_w"
```

如果我有一連串的連結我就要手動作N次,很沒效率 剛好最近有接觸到shell script,就用他來批次化完成吧
先看code:

``` bash
#! /bin/bash

cd /media/G;

filename="$1";
passcode="$2";
scriptname=${filename%.*}.sh;

cat $filename | sed 's/^/megadl /' | awk -v q="'" '{print $1 " " q$2q }' >$scriptname; echo
"$scriptname" be created;

sh $scriptname;

echo Download finish remove "$scriptname"; rm $scriptname;'"

```

