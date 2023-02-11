---
layout: post
title: 為Blog啟用google站內搜尋功能
tags: [Blog, Gihub pages]
---

寫網誌後發現剛更新的文章通常沒辦法利用站內搜尋找到，查了一下似乎是網站知名度太低，google在茫茫網海中尚未發現它的存在,挺令人哀傷的，還好這問題可以利用 [google search console](https://www.google.com/webmasters/tools/?hl=zh-TW)解決。

<!--more-->

## 讓google收錄你的網站
search console會要求你驗證網站所有權，驗證的方法有很多種，我採用的是在網頁中加入html tag

編輯`themes/jacman/layout/_partial/head.ejs`加入
~~~ html
    <meta name="google-site-verification" content="x99kAHj-gCMS5M9ADRJOZwI_xsHXfgWfUpOcAhEivNk" />
~~~
之後在search console中點選vertify即完成驗證。
![ownership](https://i.imgur.com/qWHcXqq.png)

## 提交sitemap
[ref1](http://zhaojiandong.github.io/hexo-optimization1/)
`sitemap.xml`是一個檔案，紀錄網站所有links形成的集合，方便網路爬蟲了解網站的架構並進行index，如此網站才能被搜尋得到。[ref](https://support.google.com/webmasters/answer/156184?hl=zh-Hant) 
`heox`提供了sitemap generator
1. 安裝:`npm install hexo-generator-sitemap --save`
2. 設置：編輯 `_config.yml`，加入以下內容
~~~
plugins:
- hexo-generator-sitemap
~~~
目前作到這一步hexo會報錯，暫且先紀錄到這裡。
**更新** : 根據[此issue](https://github.com/hexojs/hexo-renderer-jade/issues/4)，`hexo 3.2`不用在`_config.yml`中加入`-plugins`的設定，它會自動載入所有已安裝的plugin，加入plugin的設定則會使hexo只載入那些plugins而出錯。

![sitemap](https://i.imgur.com/welf0uM.png)
之後需要提交sitemap到google search console，提交成功的畫面
![!cse sitemap](https://i.imgur.com/8hrQkCs.png)

## 修改jacman's _config.yml

~~~
#### Custom Search
google_cse: 
  enable: true
  cx: ## e.g. 018294693190868310296:abnhpuysycw your Custom Search ID.
~~~
並在`source`資料夾建一個`index.md`內容如下
~~~
layout: search 
title: search
---
~~~
最終成果～
![result](https://i.imgur.com/7tKx8rO.png)


## Reference
[hexo博客换主题--icarus](http://www.jianshu.com/p/3e341d86acd2)


