---
layout: post
category: Linux
title: 解決urxvt 中文字方塊問題
tags: [Linux, urxvt, fixed]
---

使用urxvt近一年，最近在用mutt收mail時突然發現部份中文字顯示為方塊，但在`gnome-terminal`中能正常顯示。

<!--more-->

* "眾"在urxvt中顯示成方塊

![urxvt中顯示錯誤](https://dl.dropboxusercontent.com/u/31201582/Blogger/2016-03-19-urxvt-chinese-word-birck/urxvt.png)

* 但在gnome-terminal中卻正常


![gnome-terminal顯示正常](https://dl.dropboxusercontent.com/u/31201582/Blogger/2016-03-19-urxvt-chinese-word-birck/gnome-terminal.png)

參考了網路上的資料，[悟道洞穴人](http://yuex.in/post/2013/09/terminal-switching.html)

> urxvt 和 xterm 都可以设置两种字体。不同的是二者在 .Xresources
> 中的资源名是不同的。urxvt 通过 URxvt.font: xft:*，xft:* 来指定，而 xterm
> 要分别使用 xterm.faceName 和 xterm.faceNameDoubleSize 来指定英文和中文字体。

故把`~/.Xresources`的

~~~
URxvt.font        : xft:Droid\ Sans\ Mono\ For\ Powerline:regular:size=13
~~~

改成

~~~
URxvt.font        : xft:Droid\ Sans\ Mono\ For\ Powerline:regular:size=13 ,xft:WenQuanYi Micro Hei Mono:regular:size=13:minspace=true
~~~



ubuntu 可以透過執行 `sudo apt-get install ttf-wqy-microhei`,來安裝
`WenQuanYi Micro Hei Mono`字體。 





