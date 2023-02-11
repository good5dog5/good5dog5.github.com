---
date: 2016-04-09 12:12:00
layout: post
title: 一些常用的VIM plugins
tags: [vim, note]
---

## language related

### [pythone-mode](https://github.com/klen/python-mode)
一個整合了 [Pylint](https://www.pylint.org/)(python程式碼分析工具) [rope](https://github.com/python-rope/rope)(a python refactoring library)[pydoc](https://docs.python.org/2/library/pydoc.html)(Python原生的文件產生模組) 的plugin，讓寫python更方便快速。 

`,r` : 執行當前code
`K`  : 查詢當前游標所在的keyword

使用`:PymodeDoc`時發生**E21: Cannot make changes, 'modifiable' is off**
	~~~
	Error detected while processing function pymode#doc#show:
	line 7:
	Traceback (most recent call last):
	File "", line 1, in
	File "/home/phongvcao/.vim/bundle/python-mode/pymode/init.py", line 37, in get_documentation
	vim.current.buffer.append(str(out).splitlines(), 0)
	vim.error: Vim:E21: Cannot make changes, 'modifiable' is off
	~~~
上網找到[workaround](https://www.bountysource.com/issues/9393603-vim-error-cannot-make-changes-modifiable-is-off?utm_campaign=plugin&utm_content=tracker/42165&utm_medium=issues&utm_source=github)，把以下兩行加入`vimrc`即可
	~~~
	autocmd FileType qf,rst :setlocal modifiable
	autocmd FileType qf,rst :set modifiable
	~~~


### [YoucompleteMe](https://github.com/Valloric/YouCompleteMe#semantic-completion-for-other-languages)
大名鼎鼎的自動補全plugin，安裝過程挺麻煩的而且一直在變動。
`,gl` :YcmCompleter GoToDeclaration
`,gf` :YcmCompleter GoToDefinition
`,gg`:YcmCompleter GoToDefinitionElseDeclaration

### [YCM-Generator](https://github.com/rdnetto/YCM-Generator)
可以在專案中生成Youcompleteme所需的`.ycm_extra_conf.py`，專案的根目錄中須存在至少一種編譯系統
* make
* cmake
* qmake
* autotools

利用`:YcmGenerateConfig`或`:CCGenerateConfig` 產生。




