---
layout: post
title: Bash script筆記
tags: [Note, Bash, script]
---

在Linux上長需要寫些Shell script解決繁瑣的問題，可是很多語法常常寫過就忘，這篇主要是紀錄自己常忘記的東西。

<!--more-->

## Array
比較常用 `array=(one two three)`這種宣告方法

### Dereferencing the variables in array
假設array=(one two three)
則`echo ${array{*}}`和`echo ${array{@}}`一樣都會印出 **one two three**，只是${array{*}}會將"one two three"視為單一字串。

## mysterious '-'
`cd -`可以在當前目錄和上一個拜訪過得目錄之間做切換，`curl -sL http://xxxx | sudo -E bash -`可以讓bash執行curl下載的script，到底`-`是啥東西呢？

根據[POSIX Utility Syntax Guidelines](http://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap12.html#tag_12_02)
> Guideline 13: 
> For utilities that use operands to represent files to be opened for either reading or writing, the '-' operand should be used to mean only standard input (or standard output when it is clear from context that an output file is being specified) or a file named -. 

也就是說，當utility後面接的operand是檔案（檔名）時，`-`會被視為`stdin`或`stdout`，端看使用情境，否則就單純只是代表名為`-`的檔案。
另外，POSIX對`cd`時後面接的`-`有特別的定義：
> -
    When a <hyphen> is used as the operand, this shall be equivalent to the command:
    Whencd "$OLDPWD" && pwd 
    Whenwhich changes to the previous working directory and then writes its name.

理解以上之後，可以試試看 `echo "echo echo"| bash -`，這會印出`echo`。


