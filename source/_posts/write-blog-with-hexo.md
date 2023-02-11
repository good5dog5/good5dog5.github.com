---
date: 2016-03-27 12:12:00
layout: post
category: Blog
title: 利用hexo寫blog並用Travis CI部署
tags: [Hexo, Blog, Travis CI, Jekyll]
---

寫網誌也有一段時間了，從最開始的無名小站，到比較進階可以自己改css, javascript的[blogger](https://www.blogger.com)，這些平台都給了我不錯的使用體驗，外觀也都很漂亮，只是用起來覺得綁手綁腳，且所有內容都在server端，萬一哪天服務結束了 (無名小站..)則過去的文章紀錄也就隨之消失。 

<!--more-->

後來發現[Jekyll](https://jekyllrb.com/)這個statistic site generator，他能夠把markdowm文件轉換成靜態網頁， 且所有的文章都存在local端，心中踏實了不少，更棒的是用git 去做verison control，並且可以發布到github page，所有願望一次滿足覺得幸福。 

Jekyll有個小缺點，更換佈景主題的時候要搬動_post中的文章，並從新設定`config.yml`中的所有資料，這些問題在 [hexo](https://jekyllrb.com/)中迎刃而解，hexo是利用node.js寫成的blog framework，具有高度可擴充性及架構, 更能讓使用者專住在內容，而不用耗費時間在調整複雜的架構設定。 

## 使用 Travis CI 自動佈署 hexo

說實在hexo的安裝有點麻煩，且上傳到github的只有static site的部份，hexo主體的部份並不會上傳，故如果改天要用另外一台機器寫 blog就得先從新架設一次hexo的環境且套用同樣一份佈景主題，所產生的static site才不會與之前發布的衝突，而 Travis CI能夠簡化架設環境的麻煩。 

### Travis CI與 Continous Integration(CI)

CI是應用在團隊開發時的一種實踐，團隊中每天會有多次push/pull整合到mainline，而CI的目標就是降低整合時發生各種錯誤的機會，透過自動化建制和自動測試等方法，能提早偵測出錯誤並修復之，進而提昇 整個團洞的開發速度。[wiki](https://www.wikiwand.com/en/Continuous_integration)

而[Travis CI](https://travis-ci.org/)是一個FOSS,分散式的軟體，提供github上repo Continous integration服務， 有趣的是他有兩個網站，分別提供免費即收費的服務。
* https://travis-ci.org/
* https://travis-ci.com/

Travis CI會在指定的github repo中等待new commit或pull request，並執行寫在`.travis.yml`中的指令，通常為 建制或自動測試等動作,完成後Travic CI會用email或IRC通知使用者結果。 

### workflow
[ 探索工作流：Travis CI 自动化构建 Hexo](http://v2cc.github.io/2015/09/02/unbelievable-workflow-autodeploy-hexo-by-travis/)










## Reference
[探索工作流：Travis CI 自动化构建 Hexo (一) ](http://v2cc.github.io/2015/09/02/unbelievable-workflow-autodeploy-hexo-by-travis/)
