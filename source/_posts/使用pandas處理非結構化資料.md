---
date: 2019-12-03 15:50:42
layout: post
title: 使用 pandas 處理非結構話資料
tags: [python, pandas, data engineer]
---

TO be finished.
<!--more-->

# Universal functions (ufunc)

pandas 底層以 numpy 的 ndarray 去表現 columns values 的集合，而 numpy 提供了一系列的 universal
function 可以加速 ndarray 的運算速度。

https://docs.scipy.org/doc/numpy/reference/ufuncs.html


## Vectorization

透過特殊硬體，讓原本需要多個 iteration 才能完成的運算並行處理，compiler
會知道底層硬體是否支持向量化操作，而自動產生對應的 binary code.

[!scalar v.s vectorized](https://lappweb.in2p3.fr/~paubert/ASTERICS_HPC/images/vectorization.png)
