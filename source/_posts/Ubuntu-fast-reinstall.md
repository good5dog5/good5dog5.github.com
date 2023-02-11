---
date: 2016-04-12 12:12:00
layout: post
title: 快速重灌Ubuntu
tags: [Ubuntu, Gnome, i3 wm, apt-get, dd]
---
又把Ubuntu玩壞了，很多設定都要從寫，先來個紀錄。

<!--more-->

## 製作開機USB
[[ref](https://wiki.archlinux.org/index.php/USB_flash_installation_media#Using_dd)]
~~~
dd bs=4M if=/path/to/ubuntu.iso of=/dev/sdx && sync
~~~

## 備份package list
### 備份PPA list
[[ref](http://askubuntu.com/questions/28644/how-can-i-backup-my-ppas)]
~~~
grep -RoPish '(?<=ppa.launchpad.net/)[^/]+/[^/ ]+' /etc/apt | sort -u | sed 's/^/ppa:/'

# This script generate sth. like this:

# ppa:ubuntu-wine/ppa
# ppa:am-monkeyd/nautilus-elementary-ppa
# ppa:nilarimogard/webupd8
# ppa:ubuntu-x-swat/x-updates
# ppa:tualatrix/ppa
# ppa:banshee-team/banshee-unstable
# ppa:chromium-daily/beta
# ppa:libreoffice/ppa
# ppa:banshee-team/ppa
~~~
然後在重新安完ubuntu後，可以利用`~/ppa-backup.txt xargs -I % sudo add-apt-repository %`加回PPA。

### urxvt
correct copy to system clipboard and paste to system clipboard
change sh to bash

## i3-wm
### i3blocks
[[github(https://github.com/vivien/i3blocks)]]
Ubuntu只有在15.04之後才有把`i3blocks`納入official repository，14.04LTS只能手動從github下載安裝。
~~~ sh
git clone git://github.com/vivien/i3blocks
cd i3blocks
make clean debug # or make clean all
# make install
~~~
另外`i3blocks`依賴`ronn utility`，須安裝`ruby-ronn` package。

## 安裝中文字體
~~~ sh
$ sudo apt-get install ttf-wqy-*
~~~

## 利用fstab在開機自動掛載硬碟
* `sudo fdisk -l`:列出指定裝置的partition tables，若不指定裝置則是印出`/proc/partions`中的內容
	~~~ sh
	WARNING: GPT (GUID Partition Table) detected on '/dev/sda'! The util fdisk doesn't support GPT. Use GNU Parted.
	
	
	Disk /dev/sda: 128.0 GB, 128035676160 bytes
	255 heads, 63 sectors/track, 15566 cylinders, total 250069680 sectors
	Units = sectors of 1 * 512 = 512 bytes
	Sector size (logical/physical): 512 bytes / 512 bytes
	I/O size (minimum/optimal): 512 bytes / 512 bytes
	Disk identifier: 0x00000000
	
	   Device Boot      Start         End      Blocks   Id  System
	/dev/sda1               1   250069679   125034839+  ee  GPT
	
	Disk /dev/sdb: 500.1 GB, 500107862016 bytes
	81 heads, 63 sectors/track, 191411 cylinders, total 976773168 sectors
	Units = sectors of 1 * 512 = 512 bytes
	Sector size (logical/physical): 512 bytes / 4096 bytes
	I/O size (minimum/optimal): 4096 bytes / 4096 bytes
	Disk identifier: 0xbee46cc2
	
	   Device Boot      Start         End      Blocks   Id  System
	/dev/sdb1            2048   976773167   488385560   83  Linux
	~~~
* `sudo blkid `: locate/print block device attributes
	~~~ sh
	/dev/sda2: UUID="40a6134a-199b-4d5a-aaf9-ab331706e03a" TYPE="ext4" 
	/dev/sda3: UUID="04cf23d4-045c-4c72-92ca-e4069889599d" TYPE="ext4" 
	/dev/sda4: UUID="2b2e2214-831d-456e-b9ed-203077920dae" TYPE="swap" 
	/dev/sdb1: UUID="e3ebb57a-58ef-4779-9721-3662b0f2f548" TYPE="ext4"
	~~~
最終的`/etc/fstab`為：
~~~ sh
# /etc/fstab: static file system information.
#
# Use 'blkid' to print the universally unique identifier for a
# device; this may be used with UUID= as a more robust way to name devices
# that works even if disks are added and removed. See fstab(5).
#
# <file system> <mount point>   <type>  <options>       <dump>  <pass>
# / was on /dev/sda3 during installation
UUID=04cf23d4-045c-4c72-92ca-e4069889599d /                  ext4    errors=remount-ro 0       1
# /home was on /dev/sda2 during installation
UUID=40a6134a-199b-4d5a-aaf9-ab331706e03a /home              ext4    defaults          0       2
# swap was on /dev/sda4 during installation
UUID=3b2e2214-831d-456e-b9ed-203077920dae none               swap    sw                0       0
UUID=e3ebb57a-58ef-4779-9721-3662b0f2f548 /media/jordan/MASS ext4 	 defaults          0       0
~~~
最後，執行`sudo mount -a`，掛載所有在fstab中指定的檔案系統。

## 網路設定
**/etc/network/interfaces**
`auto interface` – Start the interface(s) at boot. That’s why the lo interface uses this kind of linking configuration.
`allow-auto interface` – Same as auto

## Reference
[1](http://askubuntu.com/questions/9135/how-to-backup-settings-and-list-of-installed-packages)

