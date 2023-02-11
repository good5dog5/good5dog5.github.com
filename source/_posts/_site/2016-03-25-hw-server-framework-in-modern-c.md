---
layout: post
category: Work
title: 2016嵌入式系統課程w3 - server-framework效能分析與改進
tags: [C, Linux, Doxygen, embedded system]
---

* [github repository](https://github.com/good5dog5/server-framework)  
* [課程網頁](http://wiki.csie.ncku.edu.tw/embedded/2016q1h3)
* [作業區](https://embedded2016.hackpad.com/2016q1-Homework-3-a3Rb2XROJso)
* [我的hackpad問題集](https://embedded2016.hackpad.com/EkhOLpdBSfW)

## 目標
> * 閱讀以下材料:
>     * [How to use epoll? A complete example in C](https://banu.com/blog/2/how-to-use-epoll-a-complete-example-in-c/)
>     * [The Event Poll Interface](https://www.safaribooksonline.com/library/view/linux-system-programming/0596009585/ch04s02.html)
>     * [Understanding “volatile” qualifier in C](http://www.geeksforgeeks.org/understanding-volatile-qualifier-in-c/)
>     * [Unix Signals](http://cis-linux1.temple.edu/~giorgio/cis307/readings/signals.html)
>     * [信號量測](http://www.intra.idv.tw/data/tech/hw/travellogic.htm)
>     * [Reactor Pattern](http://www.wikiwand.com/en/Reactor_pattern)
>     * [pipe system call](http://www2.cs.uregina.ca/~hamilton/courses/330/notes/unix/pipes/pipes.html)
>     * [Sockets Tutorial](http://www.linuxhowtos.org/C_C++/socket.htm)
> * 研讀[第 5 週課程](https://embedded2016.hackpad.com/Mar-22-2016-Mar-22-2016--CH64GFFiviW)的物件導向程式設計參考資料，也一併紀錄問題於共筆上
> * 分析 `httpd` 程式執行效能，指出效能低落的原因，並且提出改進方案
>     * 需要實際去改寫程式碼！
> * 加分題
>     * 補完`tests/test-buffer.c`的測試項目
>     * 實做基本的 HTTP parser
>     * 參考`tests/test-protocol-server.c`，實做類似 BBS 的 telnet server，可允許使用者登入
>         BBS 控制碼可參考 [maplebbs](https://github.com/xeonchen/maplebbs-itoc)

<!--more-->

###  預先安裝的packages

```
sudo apt-get install apache2-utils check
 sudo apt-get install doxygen graphviz
```
* apache2-utils
  ```
  Apache HTTP Server (utility programs for web servers)
  Provides some add-on programs useful for any web server.  
  ```
* check
    ```
    unit test framework for C
    Check features a simple interface for defining unit tests, putting
    little in the way of the developer. Tests are run in a separate
    address space, so Check can catch both assertion failures and code
    errors that cause segmentation faults or other signals. The output
    from unit tests can be used within source code editors and IDEs.
    ```
* doxgen
    ```
    Documentation system for C, C++, Java, Python and other languages
    Doxygen is a documentation system for C, C++, Java, Objective-C, Python, IDL
    and to some extent PHP, C#, and D.  It can generate an on-line class browser
    (in HTML) and/or an off-line reference manual (in LaTeX) from a set of
    documented source files. There is also support for generating man pages
    and for converting the generated output into Postscript, hyperlinked PDF
    or compressed HTML.  The documentation is extracted directly from the sources.
    ```
* graphviz
    ```
    rich set of graph drawing tools
    Graph drawing addresses the problem of visualizing structural information
    by constructing geometric representations of abstract graphs and networks.
    Automatic generation of graph drawings has important applications in key
    technologies such as database design, software engineering, VLSI and
    network design and visual interfaces in other domains.
    ```
## 閱讀資料
### epoll
[ref1](http://blog.csdn.net/xiajun07061225/article/details/9250579)
> The epoll API performs a similar task to poll(2): monitoring multiple file descriptors to see if I/O is possible on any of them.

epoll能夠通時monitor許多file descriptor，並對I/O event做監聽。

1. **int epoll_create(int size)** or **int epoll_create1(int size)**
	產生出一個epoll instance並回傳一個file descriptor代表該instance, 自linux 2.6.8之後，`size`參數被忽略掉，使用完畢需用**close()**來釋放。
	
2. **epoll_ctl(2)** - control interface for an epoll descriptor
	`int epoll_ctl(int epfd, int op, int fd, struct epoll_event *event);`
	* 第一個参數epoll_create()的返回值。

	* 第二個參數表示operation,可為`EPOLL_CTL_ADD`：註冊新的fd及想監聽的event到epfd中, `EPOLL_CTL_MOD`：修改已經註冊之fd的監聽事件； `EPOLL_CTL_DEL`：從epfd中刪除(deregister)，event欄位可為`NULL`。

	* 第三個參數代表要監聽的fd。

	* 第四個參數代表要監聽的events,結構如下
	~~~ c
	typedef union epoll_data {
		void        *ptr;
		int          fd;
		uint32_t     u32;
		uint64_t     u64;
	} epoll_data_t;

	struct epoll_event {
		uint32_t     events;      /* Epoll events */
		epoll_data_t data;        /* User data variable */
	};
	~~~
	`events`是一組由下面幾種bit set組成的mask
	   EPOLLIN ：對應的fd可供讀
	   EPOLLOUT：對應的fd可供寫
	   EPOLLPRI：`There is urgent data available for read(2) operations.`(還不太懂他的意思)

	  以下兩者不用特別在`event`中設定， `epoll_wait(2)`預設會去監聽這些事件
	   EPOLLERR：對應的fd出錯
	   EPOLLHUP：對應的fd hang up 

	   EPOLLET：將對應的fd設為`Edge triggered`, epoll預設為`Level triggered`
	   EPOLLONESHOT：對該fd只監聽一次事件，即之後發生的events都會會被epoll回報，除非利用call epoll_ctl() with EPOLL_CTL_MOD再次設定events mask

	
* **epoll_wait(2)** - wait for an I/O event on an epoll file descriptor
 	`int epoll_wait(int epfd, struct epoll_event *events, int maxevents, int timeout);`

### reactor pattern

### Understanding “volatile” qualifier in C
[[ref1](http://newscienceview.blogspot.com/2013/09/c-volatile.html)] [[ref2](http://newscienceview.blogspot.com/2013/09/c-volatile.html)]
> The volatile keyword is intended to prevent the compiler from applying any optimizations on objects that can change in ways that cannot be determined by the compiler. 

`volatile`是變數的修飾詞,它代表其所修飾的變數可能在任何時刻意外地被的更新，compiler就不會對該變數做optimization(例如把該變數存入register，每次都從register中讀取,取而代之的是每次都從memory更新該值)。


當一個變數的內容可能會被意想不到的更新時(by hardware)，一定要使用volatile來聲明該變數。通常，只有三種類型的變數會發生這種“意外”：


* 在記憶體中進行位址映射的周邊暫存器(peripheral registers)；
* 在中斷處理程式中(interrupt service routine)可能被修改的全域變數(Global variables)；
* 多線程應用程式中(multi-threaded application) 的全域變數(Global variables)；

假設我們有一個8位元的狀態暫存器映射在位址0x1234上。系統需要我們一直監測狀態暫存器的值，直到它的值不為0為止。

錯誤的寫法及對應的optimized assembly code
``` c
uint * ptr = (uint *) 0x1234; // Wait for register to become non-zero.
while (*ptr == 0);
// Do something else.
```
``` asm
mov ptr, #0x1234     
mov a, @ptr loop
bz  loop 
```
優化的原理很簡單，c code的第一行把一個變數讀入reg(assembly code的ptr)，如果從變數相關的上下文來看，變數的值總是沒變，則沒有必要從記憶體中更新值到reg,故while loop會無窮執行下去。

如果把第一行寫成`uint volatile * ptr = (uint volatile *) 0x1234;`，則會強迫編譯器對該變數禁用優化，達到程式原本的目的。 
``` asm
      mov ptr, #0x1234
loop  mov a, @ptr    
	  bz  loop 
```
## 程式架構
運用[Homework 2](http://good5dog5.github.io/2016/03/14/hw_raytracing/#%E5%88%A9%E7%94%A8-Graphviz-%E7%94%A2%E7%94%9F%E5%87%BD%E6%95%B8%E5%91%BC%E5%8F%AB%E9%97%9C%E4%BF%82%E5%9C%96)所學
``` sh
#產生gmon.out
./httpd

#產生呼叫圖
gprof httpd| gprof2dot | dot -Tpng -o codemap.png
```

![結果](https://i.imgur.com/rmebmVi.png)

### httpd.c

從`http.c`的main function開始trace，裡頭的第一行`.on_data = ondata`，直覺的以為`on_data`會是一個structure或是變數，沒想到竟然是一個function。

``` c
//httpd.c
struct Protocol protocol = { .on_data = on_data };

static void on_data(server_pt srv, int fd)
{
    static char reply[] =
        "HTTP/1.1 200 OK\r\n"
        "Content-Length: 12\r\n"
        "Connection: keep-alive\r\n"
        "Keep-Alive: timeout=2\r\n"
        "\r\n"
        "Hello World!";
    char buff[1024];

    if (Server.read(srv, fd, buff, 1024))
        Server.write(srv, fd, reply, sizeof(reply));
}
```

而struct Protocal中`.on_data`定義為

``` c
    void (*on_data)(struct Server *, int sockfd); /**< called when a data is available */
```
這段我看不太懂，在stackoverflow找到一個不錯的[例子](http://stackoverflow.com/questions/11038430/how-to-create-a-typedef-for-function-pointers)
``` c
int foo(int i){ return i + 1;}
typedef int (*g)(int);  // Declare typedef
g func = &foo;          // Define function-pointer variable, and initialise
int hvar = func(3);     // Call function through pointer
```
故struct Protocal的`on_data`的意思為`一個回傳型態為void，引數型態為(struct Server *, int)的function`。
``` c
//httpd.c
start_server(.protocol = &protocol,
                 .timeout = 2,
                 .on_init = on_init,
                 .threads = THREAD_COUNT)
//protocol-server.h 
#define start_server(...) \
    Server.listen((struct ServerSettings){__VA_ARGS__})

//會被轉換成
Server.listen((struct ServerSettings){.protocol = &protocol, .timeout = 2, .on_init = on_init, .threads = 4});
```
`Struct Server`定義在`protocol-server.c`中，給個struct element都是一個function pointer，指向定義在`protocol-server.c`中的functions，故執行`Server.listen(xxx)`其實是呼叫`srv_listen(xxx)`，整個過程實現了資料封裝即資訊隱藏的概念。

``` c
/* Server API gateway */
const struct __SERVER_API__ Server = {
    .reactor = srv_reactor,
    .settings = srv_settings,
    .capacity = srv_capacity,
    .listen = srv_listen,
    .stop = srv_stop,
    .stop_all = srv_stop_all,
    .is_busy = is_busy,
    .get_protocol = get_protocol,
    .set_protocol = set_protocol,
    .get_udata = get_udata,
    .set_udata = set_udata,
    .set_timeout = set_timeout,
    .attach = srv_attach,
    .close = srv_close,
    .hijack = srv_hijack,
    .count = srv_count,
    .touch = srv_touch,
    .rw_hooks = rw_hooks,
    .read = srv_read,
    .write = srv_write,
    .write_move = srv_write_move,
    .write_urgent = srv_write_urgent,
    .write_move_urgent = srv_write_move_urgent,
    .sendfile = srv_sendfile,
    .each = each,
    .each_block = each_block,
    .fd_task = fd_task,
    .run_async = run_async,
    .run_after = run_after,
    .run_every = run_every,
    .root_pid = root_pid,
};

```
### protocol-server.c
``` c
static long srv_capacity(void)
{
    /* get current limits */
    static long flim = 0;
    if (flim) return flim;

#ifdef _SC_OPEN_MAX
    flim = sysconf(_SC_OPEN_MAX) - 1;
#elif defined(OPEN_MAX)
    flim = OPEN_MAX - 1;
#endif
//....
}
```
當變數被`static`修飾，就會一直存在memory中的data section，就算結束函數呼叫後仍存在，因此`flim`只有在`srv_capacity`第一次被呼叫時被初始為0並通過if statement取得flim的max value，之後呼叫`srv_capacity`都會直接被if statement卡住而直接return flim。

另外，`srv_capacity`也被須告為`static`，但其代表的意義為該function的存取範圍只限於該c file(`protocol-server.c`)，如此有利資訊隱藏和避免與其他c file的命名衝突。

POSIX允許application在 **compiler time** 或 **run time**去測試系統支不支援某個option或取得某設定值;若是在compiler time決定的話則須引入`<unistd.h>`和`<limits.h>`並且撰寫macro測試。若由runtime決定則可由`sysconf()`取得。

* pthread_mutex_init()


## 探索過程
Q: `ab -c 32 -n 100 http://localhost:8080/`的作用？
`ab`是Apache HTTP server benchmarking tool，`-c` option代表concurency，即一次送出的request數目，
`-n`代表總共發出幾次request。

## 效能改進

原版效能：

    Concurrency Level:      32
    Time taken for tests:   16.136 seconds
    Complete requests:      100
    Failed requests:        0
    Total transferred:      9900 bytes
    HTML transferred:       1300 bytes
    Requests per second:    6.20 [#/sec] (mean)
    Time per request:       5163.499 [ms] (mean)
    Time per request:       161.359 [ms] (mean, across all concurrent requests)
    Transfer rate:          0.60 [Kbytes/sec] received
    
    Connection Times (ms)
                  min  mean[+/-sd] median   max
    Connect:        0    1   0.6      1       3
    Processing:  3997 4042  64.9   3998    4138
    Waiting:        0    0   0.4      0       2
    Total:       3999 4044  64.7   4000    4138
