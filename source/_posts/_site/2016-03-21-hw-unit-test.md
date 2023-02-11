---
title: 嵌入式系統作業 - Unit-test, 令用GDB進行自動化測試 
category: Homework
date: 2016-03-21 19:49:35
tags: [CLI, GDB, embedded system, c]
---

* [github repository](https://github.com/good5dog5/unit-tests)
* [課程網頁](http://wiki.csie.ncku.edu.tw/embedded/2016q1h2)

## 作業(B)

### 目標
> * 補強給定程式的 `swap()` 和 `bubble_sort()` 函式，並且研究如何用 `GDB` 進行自動測試
> * 實做 `Merge sort`，可參見 競技程式設計課程的解說，需要提供以下檔案:
>   * `merge.c`: merge_sort() 函式的實做
>   * `test-merge.sh`: 測試 merge_sort() 函式的 GDB script
>   * `data-merge.in`: 用來測試的輸入資料，原則上與 `data-bubble.in` 相仿 
> * 將你學習 GDB 的過程、指出原本程式不足之處 (程式碼寫出來就是給你改進的，可不是給你背誦用！)、如何修正和強化程式

## swap()
`swap.c`本身沒有main function
