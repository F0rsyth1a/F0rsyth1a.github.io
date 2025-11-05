+++
title = 'CFEDU181 Div2'
date = 2025-07-23T00:55:51+08:00
draft = false
tags = []
categories = ["题解"]
author = "forsythia"
+++

# A. Difficult Contest

## 思路
从大到小排序即可

## ac code
~~~cpp
string s;
void solve()
{
	cin >> s;
	sort(s.begin(), s.end(), greater<char>());
	cout << s << '\n';
}
~~~

# B. Left and Down

## 思路
- 目标是到达 $(0, 0)$，每次操作最多可以减少 $k$ 单位的横纵坐标。
- 操作的代价由使用过的不同 $(dx, dy)$ 决定。
为使 $(a, b)$ 同时减到 0，**最多可能用到**的不同方向数量是：

$$
  d = \max\left(\left\lceil \frac{a}{k} \right\rceil, \left\lceil \frac{b}{k} \right\rceil\right)
$$

- 若 $(a, b)$ 的最大公约数 $\gcd(a, b) \ge d$，说明只需构造最多 $d$ 个向量方向，即可抵达原点。**最小代价为 1**（即只用一个向量方向即可线性到达）。
  
- 否则，至少需要两个方向组合才能实现，**最小代价为 2**。

## ac code
~~~cpp
LL a, b, k;
void solve()
{
    cin >> a >> b >> k;
    LL g = __gcd(a, b);
    LL d = max((a + k - 1) / k, (b + k - 1) / k);
    cout << (g >= d ? 1 : 2) << '\n';
}
~~~

# C. Count Good Numbers

## 题目重述

定义一个整数是 **Good** 的，当且仅当它的所有质因子都是 **大于等于10的质数**。

现在给定两个正整数 $l$ 和 $r$，求区间 $[l, r]$ 中有多少个 **Good 数**。

## 思路

一个数如果含有一位数质因子（ $2, 3, 5, 7$），它就不是 Good 数。

**等价于：**
> 求区间 $[l, r]$ 中，不含任何 $2, 3, 5, 7$ 作为质因子的整数个数。

设 $g(n)$ 表示 $[1, n]$ 中 **不是** $2, 3, 5, 7$ 的倍数的数的个数。

根据容斥原理计算：

~~~
g(n) = n 
     - n/2 - n/3 - n/5 - n/7 
     + n/LCM(2,3) + n/LCM(2,5) + n/LCM(2,7) + n/LCM(3,5) + ...
     - n/LCM(2,3,5) - ... 
     + n/LCM(2,3,5,7)
~~~

## ac code
~~~cpp
LL g(LL n)
{
    return n - n/2 - n/3 - n/5 - n/7 
           + n/6 + n/10 + n/14 + n/15 + n/21 + n/35 
           - n/30 - n/42 - n/70 - n/105 
           + n/210;
}

void solve()
{
    LL l, r;
    cin >> l >> r;
    cout << g(r) - g(l - 1) << '\n';
}
~~~

# D. Segments Covering

## 题目重述

给定一条线段，共有 $m$ 个格子，从 $1$ 到 $m$ 编号。

现在有 $n$ 个区间，每个区间形如 $[l, r]$，以概率 $\frac{p}{q}$ 出现，独立地决定。

求**每个格子被恰好一个区间覆盖的概率**是多少？

## 思路

由于每个区间是独立存在的，整个问题等价于计算所有覆盖方案中，**使每个格子恰好被一个区间覆盖的方案的总概率**。

考虑逆序 DP：

- 遍历每个能从位置 $i$ 开始的区间 $(r, p)$；
- 若选择该区间，此时，$i \to r$ 被完全覆盖，贡献为：
    - $\texttt{当前概率} = \frac{p}{1-p} \cdot pf[r] \cdot dp[r + 1]$
- 最后 $dp[i] = \texttt{cf} \cdot \texttt{所有可行选择贡献和}$

最终答案为 $dp[1]$

## ac code
~~~cpp
//F0rsyth1a
#include<iostream>
#include<algorithm>
#include<random>
#include<vector>
#include<cstdlib>
#include<cstring>
#include<climits>
#include<cmath>
#include<map>
#include<set>
#include<queue>
#include<stack>
#ifdef PBDS
#include<ext/pb_ds/assoc_container.hpp>
#include<ext/pb_ds/tree_policy.hpp>
#include<ext/pb_ds/hash_policy.hpp>
#include<ext/pb_ds/trie_policy.hpp>
#include<ext/pb_ds/priority_queue.hpp>
#endif
#define lowbit(x) (x&-x)
#define fi first
#define se second
using namespace std;
using LL = long long;
using ULL = unsigned long long;
using PII = pair<int, int>;
using PLL = pair<LL, LL>;

#define IOS
// #define CF
// #define FRE
// #define PBDS

const int MOD = 998244353;
int n, m;
LL pw(LL a, LL e) 
{ 
    LL r = 1;
    while(e){ 
        if (e & 1) r = r * a % MOD;
        a = a * a % MOD;
        e >>= 1; 
    }
    return r; 
}
void solve()
{
	cin >> n >> m;
	vector<vector<pair<int, int>>> g(m + 2);
	for(int i = 0, l, r, p, q; i < n; i ++){
	    cin >> l >> r >> p >> q;
	    int pr = (LL)p * pw(q, MOD - 2) % MOD;
	    g[l].push_back({r, pr});
	}
	
	vector<int> pd(m + 2, 1);
	for(int i = 1; i <= m; i ++){
	    LL t = 1;
	    for(auto& e : g[i])
	    	t = t * (MOD + 1 - e.se) % MOD;
	    pd[i] = t;
	}
	
	vector<int> pf(m + 2, 1), ip(m + 2);
	for(int i = 1; i <= m; i ++)
		pf[i] = (LL)pf[i - 1] * pd[i] % MOD;
	for(int i = 0; i <= m; i ++) 
		ip[i] = pw(pf[i], MOD - 2);
		
	vector<int> dp(m + 3); 
	dp[m + 1] = 1;
	for(int i = m; i; i --){
	    if(g[i].empty()){ 
			dp[i] = 0;
			continue;
		}
	    LL cf = (LL)pd[i] * ip[i] % MOD, s = 0;
	    for(auto& e : g[i]){
	        int r = e.fi, pp = e.se;
	        LL rt = (LL)pp * pw((MOD + 1 - pp) % MOD, MOD - 2) % MOD;
	        s = (s + rt * pf[r] % MOD * dp[r + 1]) % MOD;
	    }
	    dp[i] = cf * s % MOD;
	}
	
	cout << dp[1] << "\n";
}
int main()
{
    #ifdef IOS
    ios::sync_with_stdio(false); cin.tie(0); cout.tie(0);
	#endif
	#ifdef FRE
    freopen(".in", "r", stdin); freopen(".out", "w", stdout);
    #endif
    int Case = 1;
	#ifdef CF
    cin >> Case;
	#endif
    while(Case --) solve();
	    
	return 0;
}
~~~