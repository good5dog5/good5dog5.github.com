---
date: 2018-01-03 14:24:50
layout: post
title: 讓 TX2 boot on Hyp mode並啟動 KVM
tags: [KVM, kernel, hack]
---

近期由於實驗需要，必須在TX2上開啟 KVM(Kernel virtual machine)功能。

## Pre-requirement

1. [BuildJetsonTx2Kernel](https://github.com/good5dog5/buildJetsonTX2Kernel), 用來做native
   compile。雖然速度慢了點，但能先擺脫掉設定 cross-compile 的複雜問題
2. 一台安裝好 JetPack3.1 的 Host 主機,下載和安裝步驟請參考[說明](https://developer.nvidia.com/embedded/linux-tegra)
 
## Step

在 TX2 上執行
1. `git clone https://github.com/good5dog5/buildJetsonTX2Kernel && cd buildJetsonTx2Kernel`
2. `sudo ./getKernelSources.sh` 
   這時候會跳出 menuconfig 的視窗，選擇 Virtualization -> Enable KVM; 然後 Save & Exit
3. sudo ./makeKernel.sh 
   開始編譯 kernel image 和 dtb 檔案, 在這步驟會將一些 patch 打入 source tree。
4. ./copyImage.sh 
   將編譯好的 `Image` 檔複製到 /boot資料夾下
5. 將 TX2  $kernel/arch/arm64/boot/dts/tegra186-quill-p3310-1000-c03-00-base.dtb 搬到 Host 的
   $JetPack_L4T_3.1/64_TX2/Linux_for_Tegra_tx2/kernel/dtb 中

6. 讓 TX2 進入 `recovery mode`, 並執行 
   ``` sh
   sudo ./flash -r -k kernel-dtb jetson-tx2 mmcblk0p1
   ```
7. 重新啟動 TX2, 執行 `dmesg | grep "kvm"` 應該能看到如下畫面。 
   ![Success](https://i.imgur.com/L1zCpqA.png)
