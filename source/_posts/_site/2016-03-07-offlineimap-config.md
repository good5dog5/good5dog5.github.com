---
layout: post
category: CLI
title: Mutt手把手：offlineimap設定
tags: [CLI, config]
---

一直以來都用web界面來收發mail，接觸Linux後知道很多軟體都有對應的command line神器，而mutt就是email領域的神器。

而跟所有CLI神器一樣，要享受方便之前需要很多configuration，設定自己習慣的key binding，能為日後的使用省下大量的時間，
俗話說萬事起頭難，mutt的設定是目前我遇過數一數二難的，mutt依循Unix的設計哲學:只做一見事情，並把他做好([Do one thing and do it well](http://www.catb.org/esr/writings/taoup/html/ch01s06.html))

<!--more-->

### MUtt 簡介
根據 [Arch wiki](https://wiki.archlinux.org/index.php/Mutt): 

>Mutt is a text-based mail client renowned for its powerful features.
Though over 2 decades old, Mutt remains the mail client of choice for a great number of power-users. 
Unfortunately, a default Mutt install is plagued by complex keybindings along with a daunting amount of documentation. 
This guide will help the average user get Mutt up and running, and begin customizing it to their particular needs.  
  
  
Mutt一開始是設計作為MUA(Mail User Agent),即只有閱讀信件的功能，其他如收寄信功能則須由其他程式協助完成，
mutt只提共對應的界面。



### 收信，先從設定offlineimap開始

Mutt會由local disk中的mail folder讀取信件，而信件透過 IMAP 或 POP3 等協定從mail server下載到local
端的mail folder，目前最廣為採用的mail sync程式為[offlineIMAP](http://www.offlineimap.org/)，
透過設定 offlineimaprc 可以讓 offlineimap 有效且快速的同步多帳號的 mail。

1.offlineimaprc




