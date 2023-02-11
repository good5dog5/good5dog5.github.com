---
layout: post
date: 2016-05-26 14:21:00
title: 初探D-Bus與polkit
tags: [D-Bus, Polkit]
---

自從把Window manager換成i3之後，很多以往在Gnome不會出現的問題一一浮現，例如當使用Network manager要連上新的Wifi SSID時會出現 `WARNING **: Failed to add/activate connection`，亦或是用udiskie-mount嘗試掛載usb device會出現`Not authorized to perform operation`等等，筆者發現這先問題牽扯到很多專有名詞與概念，故利用此篇來紀錄與整理。

<!--more-->
## D-Bus (Software Bus)
[wiki]
> D-Bus是一個行程間通訊(IPC)及遠端程序呼叫(RPC)機制，可以讓多個不同的電腦程式（Process）在同一臺電腦上同時進行通訊[4]。D-Bus作為freedesktop.org專案的一部份，其設計目的是使Linux桌面環境（如GNOME與KDE等）提供的服務標準化。
> 
> freedesktop.org專案同時也開發了一個稱為libdbus的自由及開放原始碼軟體函式庫，作為規範的參考實作。這個函式庫常與D-Bus本身混淆。也存在著其他的D-Bus實作，像是GDBus (GNOME)[5]，QtDBus (Qt/KDE)[6]，dbus-java[7]以及sd-bus（systemd的一部份）[8]。

[English wiki] (筆者翻譯覺得重要的部份)
一個作業系統中常有很多process參與，要為processes間建立一對一的IPC是低效且不可靠的方法。D-Bus提共一個抽象的Software Bus，讓一群彼此需要溝通的processes共享一個虛擬頻道，連接到此software bus的process並不知道底層實作細節，但保證連上後可以彼此通訊。

Linux的桌面環境藉由創建許多D-Bus實體而得益：
* 單一的`system bus`，可見於所有使用者與processes，提共對system services的存取(services provided by OS or by any system daemon)
* a `session bus` for each **user login session**, that provides desktop services to user applications in the same desktop session, and allows the integration of the desktop session as a whole.

## 解決polkit agent問題
> An authentication agent is used to make the user of a session prove that the user of the session really is the user (by authenticating as the user) or an administrative user (by authenticating as an administrator). 

~~~
sudo apt-get install policykit-1-gnome
~~~
定在 `~/.xinitrc`中加上
~~~
/usr/lib/policykit-1/polkitd --no-debug
/usr/lib/policykit-1-gnome/polkit-gnome-authentication-agent-1 &
~~~
