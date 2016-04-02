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
## 程式架構
運用[Homework 2](http://good5dog5.github.io/2016/03/14/hw_raytracing/#%E5%88%A9%E7%94%A8-Graphviz-%E7%94%A2%E7%94%9F%E5%87%BD%E6%95%B8%E5%91%BC%E5%8F%AB%E9%97%9C%E4%BF%82%E5%9C%96)所學
``` sh
#產生gmon.out
./httpd

#產生呼叫圖
gprof httpd| gprof2dot | dot -Tpng -o codemap.png
```

![結果](https://i.imgur.com/rmebmVi.png)
## 探索過程
Q: `ab -c 32 -n 100 http://localhost:8080/`的作用？
`ab`是Apache HTTP server benchmarking tool，`-c` option代表concurency，即一次送出的request數目，
`-n`代表總共發出幾次request。

從`http.c`的main function開始trace，裡頭的第一行`.on_data = ondata`，
直覺的以為`on_data`會是一個structure或是變數，沒想到竟然是一個function。

``` c
//main.c
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
`start_server`是個

```c
//main.c
start_server(.protocol = &protocol,
                 .timeout = 2,
                 .on_init = on_init,
                 .threads = THREAD_COUNT);
//protocol-server.h 
#define start_server(...) \
    Server.listen((struct ServerSettings){__VA_ARGS__})
```

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
