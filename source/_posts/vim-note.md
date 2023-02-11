---
layout: post
date: 2016-03-24 12:12:00
category: Job
title: vim使用筆記
tags: [vim, Linux, Note]
---

* Use others vimrc
    ~~~ 
    vim -u ~/others.vimrc
    ~~~
## markdown word-wrap

> *Line breaking*, also known as *word wrapping*, is the process of breaking a section of text into lines such that it will fit in the available width of a page, window or other display area.

參考[Writing Prose with Vim](http://alols.github.io/2012/11/07/writing-prose-with-vim/), [vim-pencli](https://github.com/reedes/vim-pencil)
在用markdown寫blog時，常常一個段落洋洋灑灑很多字，超出螢幕寬度甚多，此時可以用word wrap的功能限定字元數, 其還分成`soft-wrapped`和`hard-wrapped`。

soft-wrapped中間行的結尾並不會有`換行字元`,只是在顯示上吻合指定的區域，而hard-wrapped則會在中間行存在換行字元,目前暫用vim-pencli做soft-wrapped。

目前暫時以vim-pencli解掉。

## expandtab or noexpandtab
`set tabstop=4` : 設定插入`tab`時用幾個space取代，例如本例是1個tab == 4 space
`set expandtab` : 把tab用指定數目的space取代
`shiftwidth`用來指定程式**indent**的space數。

以上設定完後，之後鍵入tab都會被4個space取代，但之前存在於文件中的tab並不會改變
`set retab`讓全文件apply新的tab設定。

有些文件如markdown，Makefile，需要tab才區別程式區段，可在`vimrc`中加入
~~~
autocmd FileType make\|markdown setlocal noexpandtab
~~~
## Update cscope database

撰寫了一隻`cscope_gen_database.sh`去產生cscope database

~~~ sh
#!/usr/bin/env bash

DIR=( "./"
      "/usr/include/i386-linux-gnu/sys/"
      "/usr/include/i386-linux-gnu/bits/"
    )

[ -e "cscope.files" ] && rm "cscope.files"

find /usr/include/ -maxdepth 1 -type f -name "*.[hc]" >> cscope.files

for d in "${DIR[@]}"; do

    if [ -d "$d" ]; then
       find $d -type f -name "*.[hc]" -o -name "*.cpp" >> cscope.files
    fi

done           

cscope -Rbq -i cscope.files
~~~
直接在vim中輸入 `!cscope_gen_database src_root`，src_root代表專案的根目錄。
接著輸入`cs reset`即完成。

## Remove '^M' symbol

有時用vim開啟文件，會在行尾看到`^M`符號，這是Windows(DOS)系統中的換行字元，可以下2種方法移除
1. 字串取代: :%s/^M/\r/g (ctrl-v then ctrl-m才能打出^M)
2. doc2unix指令
	ubuntu預設沒有安裝，需要安裝`tofrodos` package
	~~~
	sudo apt-get install tofrodos
	~~~
	之後執行 `todos xxx`     (即unix2doc xxx)
	若想轉回則 `fromdos xxx` (即doc2unix xxx)

## 修正文件中文亂碼問題
發現之前在windows編輯過得文件，在linux下會顯示亂碼，這是因為windows是以`big5`編碼，而linux是用`utf-8`，此問題可用`iconv`解決。
在`bash.alias`中加入
~~~ sh
Big5toUTF8 () { iconv -f big5 -t utf8 -c $1 -o $1; }
~~~

假設要轉換`foo`，直接輸入`Big5toUTF8 foo`即可。

## 常用vim regular expression
[[vimregex](http://vimregex.com/)] [[vim 我最常用的 regular expression](http://three-colors.blogspot.tw/2008/06/vim-regular-expression.html)]

Character set:
![character set](https://i.imgur.com/4WT4LgP.png)
`%s/(\+\s/(/`: 會把左括號`(`後的空白清除，例如執行後`( a`會變成`(a`
`%s/\s\+)/)/`: 會把左括號`)`前的空白清除，例如執行後`a )`會變成`a)`


## help
`h pattern` : 搜尋`pattern`相關的help文件
`link` : `ctrl+]`用來跳轉到quickref(follow the link)，`ctrl+T`回到原本的topic。
