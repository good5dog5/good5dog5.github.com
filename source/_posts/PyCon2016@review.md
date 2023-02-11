---
layout: post
date: 2016-06-05 10:35:00
title: PyCon TW 2016參加心得
tags: [PyCon, Python]
---

感謝Jserv老師贈票，讓我有機會參加2016 PyCon TW盛會，這是我第一次參加大型的opensource聚會，三天下來聽了很多有趣的演講，吸收了不少新知識，利用此篇來備忘一下～ 

<!--more-->

* [PyCon2016共筆](https://hackfoldr.org/pycontw2016/https%253A%252F%252Fhackmd.io%252Fs%252FSy-PYcHM)

# PyCon TW簡介
>  * 2008 年和 2011 年，thinker 籌畫了 PyCTW，也是 PyCon Taiwan 的前身。當時還是一日的活動，讓各地的 Python 愛好者能一整天聚在一起。

 > * 2012 年 yyc 與各社群參與者，催生了第一屆 PyCon Taiwan，議程主題以科學運算為主，也包含各種 Python 的小工具。從第一屆開始，就決定要遵從 PyCon US 的 [Everybody Pays](http://jessenoller.com/2011/05/25/pycon-everybody-pays/) 原則，不論是講者還是工作人員都要購票進場，這也成為與當時台灣其他研討會不同的特色。這屆設定了 250 報名人數上限，也順利完售。

> * 2013 年，續任主席的 yyc 決定擴大 PyCon Taiwan 的規模，並嘗試了許多新活動。在大會開始前，與良葛格合作，試辦收費的 Python 教學課程，報名非常踴躍，額滿後還有很多人詢問是否能加開課程。也在大會第一天議程結束，BoF 同好分享的時間，嘗試加入夜市活動。請來了音樂家現場演奏，搭配自助餐點及各社群的擺攤，有得吃也有得玩，成為本次大會的一大亮點。也因此，課程與夜市成為 PyCon Taiwan 的定番。yyc 也留下了心得。

> * 2014 年，Tim Hsu 從 yyc 接下 PyCon Taiwan 主席的工作。這年，我們要幹一票大的：接下亞太區 PyCon 的聖火，成為 PyCon APAC/Taiwan，定了新標語：「from everything import python」。與 CheckIO 合作舉辦 Python 解題競賽。為了顧及議程品質與贊助商曝光，特別規劃了贊助商 Show Time，以及 Job Fair 的活動。

> * 2015 年，由 Keith Yang 接任主席，再次承辦亞太區 PyCon 年會。2015 年也是電影回到未來續集主角馬蒂穿越時空抵達的年份。大會也呼應電影，將標語定為「Back to __future__ II」，也有「回到未來夜市」。議程方向希望帶領大家，瞭解如何利用 Python 去實踐一些想法，或是應用 Python 在不同領域的研究。同時也規劃了多堂課程，從基本的 Python 入門課，到寫網路爬蟲、資料探勘、訊號處理，或是與硬體樹莓派的互動。到了大會尾聲，大抽獎的時間，嘗試將台灣夜市傳統的 Bingo 遊戲結合網路技術，讓台下所有的會眾能從手機上，即時看到自己的號碼與連線，搭配越來越奇怪的賓果條件，歡樂指數破表。

> * 2016 年，也就是今年，回歸到 PyCon Taiwan，讓我們「Implement the Future, Together !」 

PyCon有很特別的 `everybody Pays`原則，有別於一般研討會常免除講者，甚至工作人員報名費的習慣，所有的參加者都需要付費，一視同仁，上面連結的原文不好了解的話可以參考[這篇](https://tw.pycon.org/2013/zh/blog/2013/03/05/everybody-pays-zh/)的解說。

# Day1 

## Keynote: 明日之後的世界 (The world after tomorrow) - 唐鳳
* 蔡英文總統的第一家庭成員是幾隻貓，這樣的好處是，你無法賄賂第一家庭XD
* 台灣最近的政治人物的改變很有趣，都變成是無黨籍的，形成先問政策不問黨派的現象
* 太陽花數位體驗營：意識形態就不是那麼重要了，重要的是如何形成共識。
* Game with Purpose，民主也可能是Game with Purpose。
* `法令可否送patch，或merge呢？把opensource開發的經驗，轉移到法令或法制的體系`

*意識型態：一個人對於既定印象的認定之後，可以不問事實，不管其他人想法，就做出某些推論，我的推論就是對的，別人都是錯的。（眼中只有自我，沒有他人）*

### Open-source and Open goverment

	開放資料: 讓台灣變成機器可讀的國家。
### 資料公開跟開放有什麼差別呢？

    公開：只是公開人類可讀的資料，例如 pdf 檔，無法再利用。
    開放：政府在釋出資料是機器可以讀的，例如csv、xml、xls，而不是只有人類可以讀懂，電腦可以利用這些資料進行分析跟視覺化呈現給更多人看
	，達到大眾可以讀懂的目的
* 前行政院長張善政，在交接時規定，所有的交接資料須先上傳到[slideshare](http://www.slideshare.net/)，讓人民與內閣成員先看過之後才能進行下個階段 


### 公民黑客運動
世界上有如此規模的公民黑客運動，只有兩個地方，這裡跟西班牙。
西班牙跟台灣有哪些相似的地方呢？
	* 解除報禁、解除戒嚴，剛好遇到電腦網路興起。
	* 因此覺得言論自由跟網路的興起是息息相關的。
    * 台灣的社會運動解禁與網路興起能夠相結合，而在國外則分流成兩群人，國外的社會運動參與者大多都有比較外向的性格。
	* 相對在台灣解除報禁、媒體的開放激起在電腦前的技術宅人員對社會運動的參與跟期待。
	* 在台灣和西班牙的相似點，能夠接觸網路的這一代，剛好是有言論自由的一代。

### vTaiwan的誕生
[vTaiwan](https://vtaiwan.tw/) 是取自 perl 6 等等社群的開發經驗而來。
一開始大家開始提案，提出大家最想解決的社會議題，並且投票選出最想解決的議題，Uber的問題得到第1高票。

Uber的共享經濟像是一種流行性感冒，到處延燒，但對於Uber的定價、提供給乘客的資訊或是品質等等規範，政府的法令卻是對他們一點辦法都沒有。
    * 依照流行病學的看法：接種疫苗去對待共享經濟，也就是讓乘客去意識到Uber所帶來的優缺點，想辦法讓公民去（立法）規範他們
	* Uber(共享經濟的變種)，巴黎市政府把其辦公室超掉了，但app仍然繼續跑XD
    * Ref: [快思慢想](http://www.books.com.tw/products/0010567579)

從一開始的4個族群在平台上的討論，分別是計程車隊司機、Uber司機、乘客，還有（最後一個忘記了XD）。
在平台上大家會各自提出自己的看法跟意見，並且也陳述各自找到的事實，每個人可以對別人的意見按讚，當你對別人的意見表示贊同時，你所代表的點就會往某個族群方向靠。

起初，4個族群分別群聚在一起，而且各自聚集到4個角落，變成毫無交集的四群人，但是經由時間的演變，大家試圖去找出可能的共識，大家開始提出很trivial的意見，像是安全第一，就拿了很高的贊成票。

台灣人有個有趣的現象，當有人考了 90 分，就會有人想要考 91 分、92 分。
當時 [pol.is](https://pol.is/home) 討論的[共識](https://pol.is/3phdex2kjf)，最高得到了 95 高分。(目前是 93 分)

### 審議式民主

在線上只要邀請大家不是用馬上做出決定的方式，是把事實攤出來讓大家慢慢討論有共識，這樣的做法引進到公部門的時候，做出決策的品質會比開專家會議還要來得好的。

階段：

    * 最低階民主參與方式是投票
    * 再來是將各自的資料跟事實呈現出來
    * 依據以上的事實提出各自的看法跟意見
    * 將各自的看法凝聚成共識
    * 讓共識進一步成為規範或是法條

    * 延伸閱讀：[審議式民主的理念與主張](http://nccur.lib.nccu.edu.tw/bitstream/140.119/34508/9/52501109.pdf)

### 社會議題
有些議題並非目前主流媒體所關注的部分，因此318之後有許多人開始新興媒體
> 不要恨媒體，自己作媒體

[報導者](https://www.twreporter.org/) 用開源的程式碼可以讓未來可以持續由眾人更新，報導跟圖片也全部採用 cc 類授權，當維護者離開時，也有人可以接手做後續的維護。

[政問](http://talkto.tw/) 用 360 度的環場攝影機去直播，但是攝影環境決定了名嘴講話的方式，所以他會很注意身邊的人是不是有沒有聽懂，營造彼此互相聆聽的氣氛，讓事情能夠被說得更清楚。 Ex: [台南的飛雁新村專案計畫](http://data.tainan.gov.tw/dataset/project-plan)


### 問題討論
* 為什麼 ptt 這麼鳥的介面以及難用的 UX 體驗不會被淘汰 是因為他夠難用而且具有資料隱密性？ 還是這是胎灣囡波萬的文化使然？
> 如果有用過 reddit 或 hackernews 也知道那個比 ptt 醜很多，但是也因為他夠難用才有一個門檻，通過某些檢驗，如此討論的素質就可以較高，難用的 UX 是凝聚社群的好方法 XD
> 覺得應該不能說 如此討論的素質就可以較高 ，應該是較為**一致**，畢竟設立門檻無法保證討論素質

## keynote: Python 導入系統軟體教學 - Jserv

### Abstract

系統軟體一般指編譯器、作業系統、虛擬機器，動態二進位轉換/編譯器一類所謂「比較硬」的軟體技術，往往需要搭配計算機架構 / 平行計算 / 網路架構 / GPU 等背景知識的熟稔，開發者必須破除典型以計算為主的思維，在系統層面觀察實際資料的流動，佐以軟硬體綜合規劃的方式去分析系統運作，從而改善效能。講者這四年在大學任教，就是帶著學生理解各式系統軟體，不乏「自幹」前述元件作為基礎訓練，過程中透過 Python 縮減系統驗證、自動化設計，以及視覺化的成本，希望藉由本議程分享相關經驗

### Thoughts
	* 邱吉爾：「所謂勇氣，是能夠一而再、再而三失敗，還不喪失熱情」
	* 愛爾蘭小說家 James Joyce: 「錯誤是通往新發現的入口」 (Mistakes are the portals of discovery)
	* T.S.Eliot:「出發了很久以後，我們又回到起點。在那裡，我們重新認識這個地方。」

* 把公司做專案管理那一套拿來管理學生
* 系統軟體就是讓硬體有生命
* 每天泡在開源發展，每天都跟大牛合作，不牛逼也難
* 漸進式開發，從規模小但富有特色的專案開始研究及貢獻
* 透過在 [Linux Foundation](http://events.linuxfoundation.org/) 的眾多研討會發表來獲取認同及知名度(每年都投，總會上吧！)
* 學生來PyCon，是來接觸「`學校不教的事`」 所以除此之外都是老師的事 (？)
* 「不要花太多時間追逐看起來很實用的專業。世界變化太快，這類專業多半存活幾年就會被取代。你還是要能從本質上了解現象與知識的關聯，才不會被每天冒出來的新詞迷惑。良好的基礎科學訓練仍然是把實務專業做好的基礎。」- 蔡志浩博士 

### Use Grasp to visualize scheduling

* [NCKU's Lab40](http://wiki.csie.ncku.edu.tw/embedded/Lab40)
![visualize](http://wiki.csie.ncku.edu.tw/embedded/Lab12/hsf.png)

### 前瞻火箭計畫
* [官網](http://arrc.tw/)
* [wiki](http://www.wikiwand.com/zh-tw/國立交通大學前瞻火箭研究中心)

*台灣本土火箭 要讓太空旅行夢想成真 | 吳宗信 Jong-Shinn Wu | TEDxTaipei* 
<iframe width="560" height="315" src="https://www.youtube.com/embed/7B9Up161sAI" frameborder="0" allowfullscreen></iframe>

*  We choose to go to the moon. We choose to go to the moon in this..., `not because they are easy, but because they are hard`, because ..., because that challenge is one that we are willing to accept, one we are unwilling to postpone, and one which we intend to win, and the others, too. 
* 火箭就是一場控制爆炸的表演藝術


*公視獨立特派員: 帶我去太空01*
<iframe width="560" height="315" src="https://www.youtube.com/embed/tVwboPfcPVk" frameborder="0" allowfullscreen></iframe>

*公視獨立特派員: 帶我去太空02*
<iframe width="560" height="315" src="https://www.youtube.com/embed/5hPrj829Mg4" frameborder="0" allowfullscreen></iframe>

*公視獨立特派員: 帶我去太空03*
<iframe width="560" height="315" src="https://www.youtube.com/embed/VtXIF_XD7zs" frameborder="0" allowfullscreen></iframe>

*Shimon Schocken and Noam NisanThe: self-organizing computer course*
<iframe src="https://embed-ssl.ted.com/talks/shimon_schocken_the_self_organizing_computer_course.html" width="854" height="480" frameborder="0" scrolling="no" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

*Linus Torvalds: The mind behind Linux*
<iframe src="https://embed-ssl.ted.com/talks/linus_torvalds_the_mind_behind_linux.html" width="854" height="480" frameborder="0" scrolling="no" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
## Talk: 那些年，我用 Django Admin 接的案子 - Michelle Leu
* [Django Girls 教學](https://carolhsu.gitbooks.io/django-girls-tutorial-traditional-chiness/content/)
這場演講講的是利用`Django Admin`去做些後台管理和佈署的工作，可能要有`Django`的使用經驗會比較聽得懂。

## Talk: Boost Maintainability - Mosky Liu
[Slides](https://speakerdeck.com/mosky/boost-maintainbility)

* 我們在開發程式的時候，都是 “read lines randomly” 的，不像電腦會逐行讀取。
>  [Making wrong code look wrong](http://www.joelonsoftware.com/articles/Wrong.html) - Joel on software

*Ex1*
~~~ py
next_page = page + 1
page = make_html(...)
~~~
改成下者後，可以明顯看出`next_page_no`是代表純數，`page_html`代表字串，可以防止對他們做不相干的運算而造成錯誤
~~~ py
next_page_no = page + 1
page_html = make_html(...)
~~~

### Maintainability
用人讀 code 的方式來定義 Maintainability 
> To understand a random line, the lines you need to read back.

相對於programmer的時間，運算資源比較不值錢。
把時間專注於想要做的事情，而不是 debug 上面。

* Be exact & consistent (命名要精準且有一致性)

*Ex2*

以這種方式來命名不夠準確所以很容易混亂
~~~ py
result = ...
result = ...
~~~
把result更明確的說明是何結果，例如為resp(response)，和解析過後的dictionary
~~~ py
resp = ...
parsed_dict = ...
~~~

*Ex3*
用d來標示dictionary
~~~ py
user = User(...)
user_d = {}
~~~

> Hint: func 的命名如果沒有取名好，那發現問題還需要查 document，這個更耗時
> 建議：func都用動詞開頭，就會記得加上()

不要把 `is_secure = True` 與 `req.is_secure()` 混用
以 `形容詞`、`介係詞` 來當 boolean 會比較好
或者用簡單的句子來表示 boolean: `req_is_secure = True`

* 常常用 dictionary，對一個領域不熟悉的話可以多查字典來找到更好的名字哦！

### Boost Maintainability

* Define our “Maintainability”
* Making it `zero`
* progressive from `zero`

### avoid `None`

考慮:
~~~ py
user = query_user(uid)
user.is_valid()
~~~
如果查不到 user 就 ret None 的話，就會噴 Error 囉！
這時要考量的，就是設計者接不接受使用exception

    N: user dummy object like an empty string.
    Y: just raise when you wanna assign to None.

### Structure Hint

~~~ py
users = {
	'mosky': 'mosky@email'
}
~~~
下者更為直覺，一看就懂
~~~ py
uid_email_map = {
	'mosky': 'mosky@email'
}
~~~

### Progressive from zero
* 不要自己自創縮寫，可以去網站上查
* 如果只是要在一個 func 裡面用而已，可以用註解來解釋縮寫定義
  （目前著重於讓人能夠更快讀懂 code，所以才這樣說）

  *Ex*
  ~~~ py
  receiver_address_dict #太長了，而且只在這個函式裡頭使用
  # rad: receiver address dict
  rad = ...
  ~~~

* 把程式分段跟分節
	* 把做一系列事情的分段及分節
	* 用 空行 來把不同的事情分隔開
	* 用 section 的方式來切開（Title comment 來區隔開不同的區塊）
	*Ex*

	~~~ py
	def request_or_get(url):

	if has_cache(url):
		return get_cache(url)

	content = request(url)
	set_cache(url, content)

	return content
	~~~

	分段分節後
	~~~ py
	# Check arguments
	...
	...

	# Query from table
	...
	...

	# Transform
	...
	...
	~~~
# Day2

## Talk: 用Numpy做一個自己的股票分析系統 - PF
[Slides](http://slides.com/iampf/pycon-2016)

* 使用過去的股票資料去預測未來資訊，建立在`歷史會不斷重演`的基礎上
* "上帝不擲骰子" - 愛因斯坦
* 過去的股市與期貨資料可到 *台灣證券交易所* 和 *台灣期貨交易所* 下載
* 平均移動線，K線，隨機指標
* 利用[Numpy](http://www.numpy.org/)加速運算

## Talk: 轉轉轉好運旺來一起來之雲端轉檔大作戰！ - 林進錕
[Slides](http://www.slideshare.net/ssuser25242a/ss-62714359)

這場演講令人印象深刻，講者除了職業是工程師外，還嘗試了很多宅宅工程師鮮少嘗試的事情，例如：為了自給自足而務農，攀岩泛舟，樂團主唱等等，原來工程師的生活也可以如此多元。此場演講全程以台語為主，英語的專有名詞為輔，講者流暢的台英語切換也是令我印象深刻的點之一。

### 需求
講者的工作需要對影片進行編碼，一部影片須轉成多種畫質(1080P, 720P...)並發布在各種平台(Android, iOS, Edge...)，面對每天上千部待處理的影片，需要一個工作分配的workflow，能把工作平均地分配到閒置的機器進行運算，達到load balancing。

### Review current solutions
講者的需求中，不需要管理Job server，去中心化，Worker可以根據需求被臨時加入，且不同需求的worker其效能可以不同。
* [Gearman](https://www.wikiwand.com/en/Gearman)

	* 須要管理Job server
	* 從worker角度出發，看不到workflow

* [Spotify luigi](https://github.com/spotify/luigi)

	* 須要管理Job server
	* 從Task角度出發，看不到workflow
	
### [KKBOX: MASS](https://github.com/kkbox/mass)
* 不須維護Job server，Based on Amazon SWF(Simple Workflow)，無中心化server,無資料庫
* 從Job角度，以Top-down來描述workflow，並用pythonic code代表一個job
* 可動態調整worker種類及數量

## Talk: Continuous Deployment in AWS Lambda and Python - Suiting
[Slides](http://www.slideshare.net/suitingtseng/continuous-deployment-in-aws-lambda)

### AWS Lambda
AWS Lambda is a `zero-administration` compute platform for `back-end` web developers that runs your code for you in the AWS cloud and provides you with a `ﬁne-grained pricing structure`.

AWS Lambda is a `serverless compute service` that runs your code in response to events and automatically manages the underlying compute resources for you. You can use AWS Lambda to `extend other AWS services` with custom logic, or create your own back-end services that operate at AWS scale, performance, and security. AWS Lambda can `automatically run code in response to multiple events`, such as modifications to objects in Amazon S3 buckets or table updates in Amazon DynamoDB.

## Talk: Ethereum 漲好快！快用 pyethapp 玩耍區塊鏈貨幣與建立智能契約 - 梁智程
* [Bitcoin: A Peer-to-Peer Electronic Cash System](https://bitcoin.org/bitcoin.pdf)

### 剖析Bitcoin
* 區塊鏈是一個非集中的、分散式的電子分類賬，追蹤記錄誰擁有多少比特幣，由世界各地所有的比特幣用戶共同維護。
* 去中心化，不須第三方信任機構即可避免掉[double-spending](https://www.youtube.com/watch?v=cOc8V64HUDQ)


# Day3

## Keynote: Intentional Communication - Steve Dower

### Description
Do you know how to talk? Do you know how to write? Good! Those are how you tell people about your ideas, whether online, at conferences, in printed media, or in code. But when you talk or write, are you thinking about why? Are you intentional about your message, your medium, and your meaning? In this session, Steve will explore some of the things to think about whenever you sit down to write, stand up to speak, or open your laptop to code. Not everyone will be a better speaker or writer by the end, but you will be able to be a more intentional communicator.

### Being intentional
* Who is your audience
* what is your intent
* how will you archieve your intent

###  What does your audience already have ?    
* knowledge
* assumptions
* experience
* emotions
* flaws
* fears

### QA

Q: speak 是一件很重要的事情，不過要怎麼克服緊張

	我也會緊張，每個人都會緊張，第一次會緊張、第二次比較不會、接下來就不太會緊張了
	熟悉準備要講的東西，雖然上台會緊張，但只要一開口，那就已經克服大辦恐懼了。

Q: 如果觀眾對於你的故事不買帳的話，要怎麼做？

	事實上這個真的發生過，不過就是編故事吧，雖然我不推薦

Q: 你會不會看你的錄影？

	這很尷尬，我才不看 XD
	而且我的聲音聽起來很好笑


## Talk: Time series prediction implement on Python - 古宣佑 Hsuanyo

### Time series
時間數列是指將某一現象所發生的數量變化，依時間的先後順序排列，以揭示隨著時間的推移，這一現象的發展規律，從而用以預測現象發展的方向及其數量。 

