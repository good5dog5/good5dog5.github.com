---
layout: post
title: 2016嵌入式系統課程W6課程筆記
tags: [Embedded System, Note]
---

* [課程共筆](https://embedded2016.hackpad.com/Mar-29-2016--VJmq0R0ILi6)

> 「環境每天都或多或少在變化，如果我們不變通，終有一日會發現遠遠落後。如果在沒有轉變的情況下，處境突然變好了，那只是靠運氣，太被動。」
> 「主動改善最困難的地方，不是如何改善，而是你根本不認為有需要改善。」
> 「只要是為了變得更好，而不是為變而變，我們就應該踏出這一步，不應故步自封，否則，突破絕不會從天而降。」

<!--more-->

## 最佳化有時來自對系統的認知

有branch的版本 vs 沒有branch的版本
``` c
int32_t a, b;
if (b<0) a++; //等價於a -= b >> 31;
```

## 善用StackOverflow
1. 查tag
2. 看問問題的人是誰，你們也許有相同的興趣，google一下
3. 回覆者是誰，可以google一下

用google問題，找到的可能是和你同病相憐的人，請善用StackOverflow
[[Question on StackOverflow]](http://stackoverflow.com/questions/6297428/existing-threadpool-c-implementation)

## Thread pool
`migrate`: 從一個worker thread 轉移到令一個worker thread
`reuse`: 一個worker thread很快速，常為空可重複使用稱之。
* mutex lock有owner的概念，誰lock的就該由誰unlock。
* mutex_lock的cost基本上會是`加法`的50~100倍。
* `lock free`並不是不用lock，只是用的lock比較少而已，就像waterproof也不是完全防水
* Ring-buffer可以用來實作很多expire的概念，例如網路封包過一陣子會過期。
* 原本作業的想法，是長長排隊隊伍，到最後關頭才進行分組

task-migration可以在每個work
1. thread中，計算已經完成的task數，則之後要選擇migtate到的thread，就取counter最高的worker thread即可。
2. 或者可以把工作轉成atomic operation


``` c
do  {  
    work = NULL;  

    if  (thread_queue_len( thread ) <= 0)   //also atomic  
        break ;  
    tmp =  thread ->out;  

    //prefetch work  
    work = & thread ->work_queue[queue_offset(tmp)];  
}  while  (!__sync_bool_compare_and_swap(& thread ->out, tmp, tmp + 1));  
if  (work)  do_something();
```

其中 `__sync_bool_compare_and_swap`會由compiler轉成低階的**test-and-set**指令。

## ARM
* 現在的processor pipeline多為9~10 stage，Zen phone用的ARM A15可到27 stage
* ARM和MIPS都為RISC架構，其中ARM有`Barrel shifter`，能夠對register做shfit，重排register的bit
* ARM的PC是指向 **下兩道指令**，不同於MIPC的是指向 下一到

Q:如上面所說 PC 指向正在執行的後 2 條指令 (+8)，但若某道正在執行指令遇到中斷，這時候的 PC 會如何變化？
A:以Cortex M3/M4來說，而是以 **硬體給定** `EXC_RETURN`(exception return)作為新的PC，一旦返回原程式時才還原成 +8/+4
