---
layout: post
category: Tools
title: 為tmux撰寫啟動script
tags: [Tmux, Script, Linux, Note]
---

* [my tmux.conf](https://github.com/good5dog5/dotfile/blob/master/config/XDG_CONFIG/tmux/tmux.conf)
* [Tmux rock!](http://www.slideshare.net/chenkaie/tmux-rocks)

[Tmux](https://www.wikiwand.com/en/Tmux)是一個terminal multiplexr，用來管理多個[virtual console](https://www.wikiwand.com/en/Virtual_console)，使用久了會發現自己有特定的workflow，比如常會開一個window專門用來寫blog，旁邊令一個pane則是用來執行`hexo server`，再加上幾個windows拿來寫作業之類的，感覺是時候寫個script來自動畫這些daily task。

<!--more-->

## 從範例學習
[[Question on rediit](https://www.reddit.com/r/tmux/comments/3nhx80/how_can_i_use_one_command_to_open_several_tmux/)]
~~~ sh
#!/bin/sh
tmux new-session -d -s config

tmux new-window -t config:0 -n 'name' 'vi text/file'
tmux new-window -t config:2 -n 'name' 'vi text/file'
tmux new-window -t config:3 -n 'name' 'vi text/file'
tmux new-window -t config:4 -n 'name' 'vi text/file'
tmux new-window -t config:5 -n 'name' 'vi text/file'

tmux select-window -t config:1
tmux -2 attach-session -t config
~~~

* `tmux new-session -d -s config`: 產生一個名叫 `config`的new session, not attached。
~~~
 new-session [-AdDP] [-c start-directory] [-F format] [-n window-name] [-s session-name] [-t target-session] [-x width] [-y height]
             [shell-command]
                   (alias: new)
             Create a new session with name session-name.

             The new session is attached to the current terminal unless -d is given.  window-name and shell-command are the name of and shell
             command to execute in the initial window.  If -d is used, -x and -y specify the size of the initial window (80 by 24 if not
             given).

             If run from a terminal, any termios(3) special characters are saved and used for new windows in the new session.

             The -A flag makes new-session behave like attach-session if session-name already exists; in the case, -D behaves like -d to
             attach-session.

             If -t is given, the new session is grouped with target-session.  This means they share the same set of windows - all windows
             from target-session are linked to the new session and any subsequent new windows or windows being closed are applied to both
             sessions.  The current and previous window and any session options remain independent and either session may be killed without
             affecting the other.  Giving -n or shell-command are invalid if -t is used.

             The -P option prints information about the new session after it has been created.  By default, it uses the format
             ‘#{session_name}:’ but a different format may be specified with -F.
~~~

* `tmux new-window -t config:0 -n 'name' 'vi text/file'` : 產生名叫name的new window，bind到剛剛建的`config`的第0個tab， 執行`vi text/file`
~~~
 new-window [-adkP] [-c start-directory] [-F format] [-n window-name] [-t target-window] [shell-command]
                   (alias: neww)
             Create a new window.  With -a, the new window is inserted at the next index up from the specified target-window,
             moving windows up if necessary, otherwise target-window is the new window location.

             If -d is given, the session does not make the new window the current window.  target-window represents the window
             to be created; if the target already exists an error is shown, unless the -k flag is used, in which case it is
             destroyed.  shell-command is the command to execute.  If shell-command is not specified, the value of the
             default-command option is used.  -c specifies the working directory in which the new window is created.

             When the shell command completes, the window closes.  See the remain-on-exit option to change this behaviour.

             The TERM environment variable must be set to “screen” for all programs running inside tmux.  New windows will
             automatically have “TERM=screen” added to their environment, but care must be taken not to reset this in shell
             start-up files.

             The -P option prints information about the new window after it has been created.  By default, it uses the format
             ‘#{session_name}:#{window_index}’ but a different format may be specified with -F.
~~~
* `tmux select-window -t config:1` : 選擇config session中的第1個window。
~~~
select-window [-lnpT] [-t target-window]
                   (alias: selectw)
             Select the window at target-window.  -l, -n and -p are equivalent to the last-window, next-window and
             previous-window commands.  If -T is given and the selected window is already the current window, the command
             behaves like last-window.
~~~
* `tmux -2 attach-session -t config`: 強迫tmux用256色顯示，並產生新client連上名叫config的session
~~~
	-2:Force tmux to assume the terminal supports 256 colours.

 attach-session [-dr] [-c working-directory] [-t target-session]
                   (alias: attach)
             If run from outside tmux, create a new client in the current terminal and attach it to target-session.  If used
             from inside, switch the current client.  If -d is specified, any other clients attached to the session are
             detached.  -r signifies the client is read-only (only keys bound to the detach-client or switch-client commands
             have any effect)

             If no server is started, attach-session will attempt to start it; this will fail unless sessions are created in
             the configuration file.

             The target-session rules for attach-session are slightly adjusted: if tmux needs to select the most recently used
             session, it will prefer the most recently used unattached session.

             -c will set the session working directory (used for new windows) to working-directory.
~~~
### 修改版
~~~ sh
#!/usr/bin/env bash
tmux new-session -d -s AutoSession

tmux new-window -t AutoSession:1 -n 'blog' 'cd ~/github'
tmux new-window -t AutoSession:2 -n 'test' 'vi text/file'

tmux select-window -t config:1
tmux -2 attach-session -t config
~~~

[Question on StackOverflow](http://stackoverflow.com/questions/23149699/tmux-create-window-failed-index-in-use-0)
要注意tmux new-window -t AutoSession:1 -n 'blog'會產生錯誤 `Tmux create window failed: index in use: 1`，因為new-session會產生一個window，故window 1會在new-session完成後馬上產生，解決辦法是在new-session命令後直接指定其他options。
