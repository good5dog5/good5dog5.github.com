---
layout: post
title: Java 臨時抱佛腳
tags: [java, Note]
---

最近要去一家公司面試暑期實習，但考科之一是java，只有大學時碰過一點點，此篇為臨時抱佛腳的紀錄。
<!--more-->

* final修飾詞
	如果在指定變數值之後，就不想再改變變數值，可以在宣告變數時加上final限定，如果後續撰寫程式時，自己或別人不經意想修改final變數，就會出現編譯錯誤。
	例如編譯以下程式，因Class已經指定`GetResult`為`final`，之後class B對其改寫造成編譯錯誤。

	~~~ java
	class A 
	{
		final public int GetResult(int a, int b) { return 0; } 
	} 
	class B extends A 
	{ 
		public int GetResult(int a, int b) {return 1; } 
	} 
	public class Test 
	{
		public static void main(String args[]) 
		{ 
			B b = new B(); 
			System.out.println("x = " + b.GetResult(0, 1));  
		} 
	}
	~~~
	~~~ sh
	Test.java:7: error: GetResult(int,int) in B cannot override GetResult(int,int) in A
		public int GetResult(int a, int b) {return 1; } 
				   ^
	  overridden method is final
	1 error
	~~~

