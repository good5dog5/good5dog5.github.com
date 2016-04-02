---
layout: post
category: C
title: '嵌入式系統作業 - Phonebook效能改進與分析'
tags: [C, gdb, embedded system]
---

[**github repository**](https://github.com/good5dog5/phonebook)  

參考[課程網頁](http://wiki.csie.ncku.edu.tw/embedded/2016q1h1)的作業要求：  

>* 在 GitHub 上 fork phonebook，然後適度修改 `phonebook_opt.c`和 `phonebook_opt.h`兩個檔案，使得這兩者執行時期的 cache miss 降低。請用 perf 驗證，而且改進的過程中，不能有功能方面的減損。
>* `phonebook_orig.[ch]` 不需要修改，我們關注的是 `phonebook_opt.[ch]`，當然要修改 `main.c` 也是允許的
>* `findName()` 的時間必須原本的時間更短
>* `append()` 的時間可以比原始版本稍久，但不應該增加太多
>* main.c 應該只有一份，不要建立新的 `main()`，善用 Makefile 定義對應的 CFLAGS

<!--more-->

先來看看 `phonebook_orig.h` 內的entry struct  



~~~c
typedef struct __PHONE_BOOK_ENTRY {
    char lastName[MAX_LAST_NAME_SIZE];
    char firstName[16];
    char email[16];
    char phone[10];
    char cell[10];
    char addr1[16];
    char addr2[16];
    char city[16];
    char state[2];
    char zip[5];
    struct __PHONE_BOOK_ENTRY *pNext;
} entry;
~~~

* 用GDB print sizeof(entry)得出size為136 bytes，但entry中member的總size
應該為131 bytes，因為word alignment的關係才湊成136(136%8=0)。

接著看 `main.c`  

~~~c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <assert.h>

#include IMPL      // WTF?

#define DICT_FILE "./dictionary/words.txt"
~~~
\#include IMPL須連Makefile一起看才能理解#

~~~make
SRCS_common = main.c

phonebook_orig: $(SRCS_common) phonebook_orig.c phonebook_orig.h
	$(CC) $(CFLAGS_common) $(CFLAGS_orig) \
		-DIMPL="\"$@.h\"" -o $@ \
		$(SRCS_common) $@.c

phonebook_opt: $(SRCS_common) phonebook_opt.c phonebook_opt.h
	$(CC) $(CFLAGS_common) $(CFLAGS_opt) \
		-DIMPL="\"$@.h\"" -o $@ \
		$(SRCS_common) $@.c
~~~
-DIMPL 會把main.c中的 #include IMPL換成 phonebook_opt.h或 phonebook_orig.h

### 利用perf尋找程式熱點
`./phonebook_orig & sudo perf top -p $!`

## cache  
因為我們對此次作業cache misses很在意，故要排除系統cache 的影響，
在每次執行之前手動藉由   

`echo 1 > /proc/sys/vm/drop_caches`來釋放cache。
>`Freeing the page cache:`  
>echo 1 > /proc/sys/vm/drop_caches  
>`Free dentries and inodes:`  
>echo 2 > /proc/sys/vm/drop_caches  
>`Free the page cache, dentries and the inodes:`  
>echo 3 > /proc/sys/vm/drop_caches  


## 開始optimize!

### 1.減少entry的大小  
---

原本的entry耗用136 bytes，但`append()`只會用到entry.lastName這個member
故把其他不相干的members都註解掉，比較原本的cache misses和註解掉後的cache misses。  

註解前：
~~~ bash
Performance counter stats for './phonebook_opt' (100 runs):  

         1,998,548      cache-misses              #   `94.496 % of all cache refs`  ( +-  0.33% )
         2,114,954      cache-references                                              ( +-  0.20% )
       263,123,256      instructions              #    1.40  insns per cycle          ( +-  0.02% )
       187,765,109      cycles                                                        ( +-  0.68% )

       0.072710909 seconds time elapsed                                               ( +-  0.68% )
~~~


註解後 

~~~ c
typedef struct __PHONE_BOOK_ENTRY {
    char lastName[MAX_LAST_NAME_SIZE];
    // char firstName[16];
    // char email[16];
    // char phone[10];
    // char cell[10];
    // char addr1[16];
    // char addr2[16];
    // char city[16];
    // char state[2];
    // char zip[5];
    struct __PHONE_BOOK_ENTRY *pNext;
} entry;
~~~


~~~  
Performance counter stats for './phonebook_opt' (100 runs):

           251,887      cache-misses              #   74.614 % of all cache refs      ( +-  0.13% )
           337,587      cache-references                                              ( +-  1.47% )
       242,971,052      instructions              #    1.81  insns per cycle          ( +-  0.02% )
       134,352,512      cycles                                                        ( +-  0.99% )

       0.052137429 seconds time elapsed                                               ( +-  1.03% )
~~~

![Comment 後的 performance](https://dl.dropboxusercontent.com/u/31201582/Blogger/2016-03-08-phonebook/comment_out_members.png)  
### 2. Hashing
---
採用[BKDR hash](http://www.partow.net/programming/hashfunctions/#BKDRHashFunction)
> This hash function comes from Brian Kernighan and Dennis Ritchie's book "The C Programming Language". It is a simple hash function using a strange set of possible seeds which all constitute a pattern of 31....31...31 etc, it seems to be very similar to the DJB hash function.  

~~~c
// BKDR Hash Function
unsigned int BKDRHash(char *str)
{
    unsigned int seed = 131; // 31 131 1313 13131 131313 etc..
    unsigned int hash = 0;

    while (*str)
    {
        hash = hash * seed + (*str++);
    }

    return (hash & 0x7FFFFFFF);
}
~~~
原來是來自Brian Kernighan and Dennis Ritchie's的書，所以才較BKDR阿，是個易於記憶，效能也不錯的hash funciton。
修改成用bit operation，較為有效率

~~~c
unsigned int BKDRHash(char *str)
{
    unsigned int hash = 0;
    while (*str)
    {
        hash = (hash<<5) - hash + (*str++);
    }
    return (hash % SIZE);
}
~~~

![最終的效能比較圖](https://dl.dropboxusercontent.com/u/31201582/Blogger/2016-03-08-phonebook/hash_vi.png)
