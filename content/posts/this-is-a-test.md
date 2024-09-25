+++
title = 'This Is a Test'
date = 2024-09-23T16:27:05+08:00
draft = false
tags = []
categories = ["测试"]
+++

さびしさや　一尺消えて　ゆくほたる  
![20240925150536](https://raw.githubusercontent.com/F0rsyth1a/imgs/main/images/20240925150536.png)
# math
行内数学公式：$a^2 + b^2 = c^2$。

块公式，

$$
a^2 + b^2 = c^2
$$

<div>
$$
\boldsymbol{x}_{i+1}+\boldsymbol{x}_{i+2}=\boldsymbol{x}_{i+3}
$$
</div>

# code
~~~cpp
#include <iostream>
using namespace std;

//汉字
int cnt, n;
void move(char u, char v)
{
	cout << u << " -> " << v << '\n';
	cnt ++;
}
void hanoi(int n, char a, char b, char c)
{
	if(n == 1){
		move(a, c);
		return ;
	}
	hanoi(n - 1, a, c, b);
	move(a, c);
	hanoi(n - 1, b, a, c);
}
int main()
{
	cin >> n;
	hanoi(n, 'A', 'B', 'C');
	cout << cnt << '\n';
	return 0;
}
~~~