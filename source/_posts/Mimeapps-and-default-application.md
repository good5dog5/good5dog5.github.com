---
date: 2016-04-09 12:12:00
layout: post
title: 利用MIME type綁定各類預設應用程式
tags: [MIME type, Linux]
---

針對不同檔案類型，常常存有許多同性質的應用程式，例如文字檔，Linux上就有`vim`, `emacs`, `gedit`等等，如果有一個方法可以指定各型檔案的預設應用程式(default application)，則日常操作上會順心很多，在Linux上可以透過 檔案管理器(file manager)，MIME type，環境變數來指定預設程式。

<!--more-->

## MIME type
MIME type現在被稱為`Internet Media Types`，一開始是為email而設計的，其縮寫原本代表`Multipurpose Internet Mail Extensions`，但現在延伸到其他應用。

[freedesktop.org](https://standards.freedesktop.org)維護了一份資料庫，紀錄了所有MIME type及檔案類型的對應，例如以下副檔名和MIME type的對應： 
~~~
.txt – text/plain
.html – text/html
.mp3 – audio/mpeg3
.png – image/png
.doc – application/msword
~~~
在Windows上，檔案需要有副檔名(file extension)才能被正確的打開，否則系統會無法判斷其檔案類型，可是Unix系統即使沒有副檔名一樣能被正確地開啟，主要差異是Windows系統捨棄了MIME type的支援，而Linux的檔案系統會在檔案的檔頭(header or metadata)中儲存檔案的MIME type。

### 設定方式(default.list and mimeapps.list)
`default.list`和`mimeapps.list`都是用來紀錄各mime type對應應用程式的設定檔，透過修改`$HOME/.local/share/applications/mimeapps.list`，可以改變各種預設應用程式，修改後執行`update-mime-database    ~/.local/share/mime`使改變生效。
我的mimeapps.list
~~~ 
[Default Applications]
text/html=firefox.desktop
x-scheme-handler/http=firefox.desktop
x-scheme-handler/https=firefox.desktop
x-scheme-handler/about=firefox.desktop
x-scheme-handler/unknown=firefox.desktop
x-scheme-handler/ftp=firefox.desktop
x-scheme-handler/chrome=firefox.desktop
application/x-extension-htm=firefox.desktop
application/x-extension-html=firefox.desktop
application/x-extension-shtml=firefox.desktop
application/xhtml+xml=firefox.desktop
application/x-extension-xhtml=firefox.desktop
application/x-extension-xht=firefox.desktop
application/pdf=zathura.desktop;
video/x-ogm+ogg=vlc.desktop
video/dv=vlc.desktop
video/mpeg=vlc.desktop
video/x-mpeg=vlc.desktop
video/msvideo=vlc.desktop
video/quicktime=vlc.desktop
video/x-anim=vlc.desktop
video/x-avi=vlc.desktop
video/x-ms-asf=vlc.desktop
video/x-ms-wmv=vlc.desktop
video/x-msvideo=vlc.desktop
video/x-nsv=vlc.desktop
video/x-flc=vlc.desktop
video/x-fli=vlc.desktop
video/x-flv=vlc.desktop
video/vnd.rn-realvideo=vlc.desktop
video/mp4=vlc.desktop
video/mp4v-es=vlc.desktop
video/mp2t=vlc.desktop
video/x-matroska=vlc.desktop
video/webm=vlc.desktop
image/x-eps=feh.desktop
image/x-ico=feh.desktop
image/x-portable-bitmap=feh.desktop
image/x-portable-graymap=feh.desktop
image/x-portable-pixmap=feh.desktop
image/x-xbitmap=feh.desktop
image/x-xpixmap=feh.desktop
image/tiff=feh.desktop
image/x-psd=feh.desktop
image/x-webp=feh.desktop
image/jpeg=feh.desktop
application/x-trash=gedit.desktop
text/plain=gvim.desktop

[Added Associations]
x-scheme-handler/http=firefox.desktop;
x-scheme-handler/https=firefox.desktop;
x-scheme-handler/ftp=firefox.desktop;
x-scheme-handler/chrome=firefox.desktop;
text/html=firefox.desktop;
application/x-extension-htm=firefox.desktop;
application/x-extension-html=firefox.desktop;
application/x-extension-shtml=firefox.desktop;
application/xhtml+xml=firefox.desktop;
application/x-extension-xhtml=firefox.desktop;
application/x-extension-xht=firefox.desktop;
application/x-bittorrent=transmission-gtk.desktop;
application/pdf=zathura.desktop;
video/x-matroska=vlc.desktop;
video/dv=vlc.desktop;
video/mpeg=vlc.desktop;
video/x-mpeg=vlc.desktop;
video/msvideo=vlc.desktop;
video/quicktime=vlc.desktop;
video/x-anim=vlc.desktop;
video/x-avi=vlc.desktop;
video/x-ms-asf=vlc.desktop;
video/x-ms-wmv=vlc.desktop;
video/x-msvideo=vlc.desktop;
video/x-nsv=vlc.desktop;
video/x-flc=vlc.desktop;
video/x-fli=vlc.desktop;
video/x-flv=vlc.desktop;
video/vnd.rn-realvideo=vlc.desktop;
video/mp4=vlc.desktop;
video/mp4v-es=vlc.desktop;
video/mp2t=vlc.desktop;
video/webm=vlc.desktop;
image/x-eps=feh.desktop
image/x-ico=feh.desktop
image/x-portable-bitmap=feh.desktop
image/x-portable-graymap=feh.desktop
image/x-portable-pixmap=feh.desktop
image/x-xbitmap=feh.desktop
image/x-xpixmap=feh.desktop
image/tiff=feh.desktop
image/x-psd=feh.desktop
image/x-webp=feh.desktop
image/jpeg=feh.desktop;shotwell-viewer.desktop;
inode/directory=thunar.desktop;
application/x-trash=gedit.desktop;
text/plain=gvim.desktop;
~~~


## Command
* `xdg-mime`
	> command line tool for querying information about file type handling and adding descriptions for new file types
	~~~ sh
	$ xdg-mime query default text/plain
	gvim.desktop
	$ xdg-mime query filetype foo.txt 
	text/plain
	~~~
	
* `file`
	~~~ sh
	$ file --mime-type foo.txt
	text/plain
	~~~

* `stat` - display file or file system status
	~~~ sh
	$ stat ~/test/test.c
	File: ‘/home/jordan/test/test.c’
	Size: 277             Blocks: 8          IO Block: 4096   regular file
	Device: 802h/2050d      Inode: 787434      Links: 1
	Access: (0664/-rw-rw-r--)  Uid: ( 1000/  jordan)   Gid: ( 1000/  jordan)
	Access: 2016-04-08 23:22:13.469538594 +0800
	Modify: 2016-04-08 23:22:11.485538674 +0800
	Change: 2016-04-08 23:22:11.489538673 +0800
	Birth: -

	$ stat -f /
	File: "/"
	ID: 6660e78ba44d9d99 Namelen: 255     Type: ext2/ext3
	Block size: 4096       Fundamental block size: 4096
	Blocks: Total: 7177215    Free: 3561879    Available: 3191537
	Inodes: Total: 1831424    Free: 1346725
	~~~

## Reference
[MIME Types Explained: Why Linux and Mac OS X Don’t Need File Extensions](http://www.howtogeek.com/192628/mime-types-explained-why-linux-and-mac-os-x-dont-need-file-extensions/)
[Cannot set default application for text/plain](https://forum.kde.org/viewtopic.php?f=67&t=108683)
[Arch wiki - Default applications](https://wiki.archlinux.org/index.php/default_applications#gnome-defaults-list)
