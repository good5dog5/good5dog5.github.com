---
date: 2016-03-23 12:12:12
layout: post
category: Job
title: 用 Latex 寫份精美的個人履歷吧! - Use Awesome-cv as template
tags: [Latex, Resume, Job]
---

2016 研究所放榜後，閒來無事想找個業界實習機會。 
一開始填完 104 的基本資料後就收到許多面試邀請，只是都是房仲或是保險業。
和業界老師聊聊才發現，要找到好的工作機會需要一份正式且精練的簡歷 (CV)，上網看了一下國外工程師的履歷後發現，他們的排版都特別精美，才知道[Latex](https://www.wikiwand.com/zh-tw/LaTeX) 這套排版程式，他除了可以被拿來寫論文外，也可用來寫 CV 唷。


<!--more-->

## 安裝

完整安裝 latex live, 需要 4GB 的空間, 請先確認系統有足夠的空間。
Unix 系統可用 `df -h` 查看系統容量, 若是 Mac 可用 `Disk Utility` 查看
![disk utility](diskUtility.png)
~~~ sh
sudo apt-get install texlive-full
~~~

## 使用Awesome-cv
由於時間緊迫，沒有太多時間從頭開始刻一個自己的template，經過一番搜索後在github上找到一個叫[Awesome-CV](https://github.com/posquit0/Awesome-CV)的repo，
是一個架構完整的resume template，把相關資料填進去後用能得到一份精美，條列清晰且言簡意賅的resume。

![resume example](https://i.imgur.com/JI4Uh5M.png)

## 檔案結構

~~~
.
├── awesome-cv.cls
├── examples
├── fontawesome.sty
├── fonts
├── Makefile
└── README.md
~~~

* `awesome-cv.cls`
   awesome-cv的class file，可以在其他latex file中引用，例如在 `./example/resume.tex`中：

   ~~~ tex
    \documentclass[11pt, a4paper]{awesome-cv}
   ~~~

   每個`class file`中都會以以下兩行指令做開頭

   ~~~ tex
    \NeedsTeXFormat{LaTeX2e}
    \ProvidesClass{my_cv}[2011/03/26 My custom CV class]
   ~~~
   `\NeedsTeXFormat`告訴Compiler此class是用哪一版



### 中文化
Awesome-cv預設的語言是英文，若填入中文的資料會產生亂碼或直接空白，後來得知可使用[CJK](http://cjk.ffii.org/)(Chinese/Japanese/Korean) package
可以解決中文字型的問題。

範例([參考](http://www.hitripod.com/blog/2011/04/xetex-chinese-font-cjk-latex/))：

~~~ tex
\documentclass[12pt]{article}
% 1. Dec. 2009更新：使用[encapsulate]才是正確的用法
\usepackage[encapsulated]{CJK} 
\begin{document}

% 開始 CJK 環境，設定編碼，設定字體
\begin{CJK}{UTF8}{bsmi} 
正體中文測試。This is a test.
 % 結束 CJK 環境
\end{CJK}

\end{document}
~~~

或者
在`\begin{document}`下面添加`\begin{CJK*}{UTF8}{bsmi}`，在`\end{document}`上面添加`\end{CJK*}`.

把以上檔案存成`chinese.tex`,用`xelatex chinese.tx`，一切順利的話會得到`chinese.pdf`

![chinese.pdf](https://i.imgur.com/v5RJK1n.png)

但當要使用CJK不支援的中文字型時問題就會比較複雜，最佳的解決方法為`xeTex`。
`xetex`可以轉換系統所有的`.ttf`檔，並利用fontconfig才取用系統字型，故不用為寫tex
file額外裝其他字型檔。

##常用命令

### \vspace和\vskip的差別
\vspace和\vskip皆能夠產生垂直距離，但
1. \vspace是latex命令，\vskip是tex命令
2. 使用方法
    \vspace{1cm}
    \vskip 1cm
[參考](http://geowu.blogspot.tw/2012/09/vspacevskip.html)


## Reference
[How to write a LaTeX class file and design your own CV](https://www.sharelatex.com/blog/2011/03/27/how-to-write-a-latex-class-file-and-design-your-own-cv.html)
[將使用 CJK 的範本無痛轉移到 XeTeX](http://www.hitripod.com/blog/2011/04/cjk-template-compile-using-xetex/)
[XeTeX：解決 LaTeX 惱人的中文字型問題](http://www.hitripod.com/blog/2011/04/xetex-chinese-font-cjk-latex/)
[XeTeX 快速上手 ](http://electronic-blue.wikidot.com/doc:xetex)
[[心得] newcommand renewcommand providecommand](https://www.ptt.cc/bbs/LaTeX/M.1352185883.A.6C5.html)
[How does the \newcolumntype command work?](http://tex.stackexchange.com/questions/257128/how-does-the-newcolumntype-command-work)
