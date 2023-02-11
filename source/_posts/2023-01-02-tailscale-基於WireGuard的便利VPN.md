---
date: 2022-12-14 20:37
layout: post
title: Tailscale, 基於 WireGuard 的便利 VPN
tags: [Tailscale, cloud, networking, vpn, wireguard]
---

終於終結需要開 linode, 設定 router port-forwarding, 學習 reverse ssh tunnel 與猶豫要不要付費買 ngork 的日子 XDD
<!--more-->


## Tailscale 是什麼

能將你所有的裝置加入同一個網段，彼此可以互相連通。

在過去讓裝置可在網際網路上被存取，會需要有台 public 的跳板機或是 router, 並透過 port-forwarding 或是 reverse ssh tunnel 的方式才可讓機器互相連通。而且每個 port 都需要設定，挺麻煩的。
![overview](tailscale-view.png)


## 使用步驟

首先在 [官網](https://tailscale.com) 上註冊帳號

在 *nix 系統上可夠過指令快速安裝: `curl -fsSL [https://tailscale.com/install.sh](https://tailscale.com/install.sh) | sh`
安裝好後下 `tailscale up` 啟動 tailscale daemon
接著就可以取得 `tailscale ip -4` 取得 tailscale 分配給你的內網 ip 
若有用 群暉(Synology) NAS 的朋友，在 Package Center 上也有對應的套件可以安裝
![synology-pacakge](synology-package.png)

安裝好後點開，就會跳出 authentication 視窗，透過 OAuth 即可完成認證。
![auth](auth.png)

## 適用情境
### Portainer
最近有個專案需要在 Proxmox VE 上的 VM 啟動多達 20 幾台的 docker container, 過程中需要一直查看 container logs。為求方便，我使用 Portainer  來取代繁雜的 docker 指令。

若沒有 tailscale 會需要對 portainer server 在 router 上做 port-forwarding, 而我所要監測的 VM 上也需要做一次才可使用 portainer agent。現在我只要開啟 tailscale 就可連接，極度方便。
![toggle](tailscale-toggle.png)
![portainer](portainer.png)