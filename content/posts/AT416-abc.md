+++
title = 'AT416 Abc'
date = 2025-07-26T21:28:16+08:00
draft = false
tags = []
categories = ["题解"]
author = "forsythia"
+++

# A - Vacation Validation

## ac code
~~~cpp
int n, l ,r;
string s;
void solve()
{
	cin >> n >> l >> r >> s;
	s = ' ' + s;
	for(int i = l; i <= r; i ++)
		if(s[i] != 'o'){
			cout << "No";
			return ;
		}
	cout << "Yes";
}
~~~

# B - 1D Akari

## ac code
~~~cpp
string s; 
void solve()
{
	cin >> s;
    string r = s;
    for(int i = 0; i < s.size(); i ++){
        if(s[i] == '#') r[i] = '#';
        else{
            if(i == 0 || s[i - 1] == '#') r[i] = 'o';
            else r[i] = '.';
        }
    }
    cout << r << '\n';
}
~~~

# C - Concat (X-th)

暴力即可

## ac code
~~~cpp
LL n, k, x;
void solve()
{
    cin >> n >> k >> x;
    vector<string> s(n);
    for(int i = 0; i < n; i ++) cin >> s[i];
    
    LL tot = 1;
    for(int i = 0; i < k; i ++) tot *= n;
    
    vector<string> v; 
    v.reserve(tot);
    for(int m = 0; m < tot; m ++){
        int t = m;
        string cur;
        for (int p = 0; p < k; p ++) {
            cur += s[t % n];
            t /= n;
        }
        v.push_back(cur);
    }
    sort(v.begin(), v.end());
    
    cout << v[x - 1] << '\n';
}
~~~

# D - Match, Mod, Minimize 2
## 题目重述

给定长度为 $N$ 的非负整数序列

$$
A=(A_1,A_2,\dots,A_N),\qquad
B=(B_1,B_2,\dots,B_N),
$$

以及正整数模数 $M$。
允许任意重排 $A$，最小化

$$
S=\sum_{i=1}^{N}\bigl((A_{\pi(i)}+B_i)\bmod M\bigr),
$$

其中 $\pi$ 为 $A$ 的某种排列。

## 思路

* 若存在某个 $A_j$ 使 $A_j+B_i\ge M$，则
  $(A_j+B_i)\bmod M = A_j+B_i-M,$
  相比不进位的 $A_j+B_i$ 至少减少 $M$。因此 **只要能进位就必须进位**。
* 在所有满足进位的元素中取最小的 $A_j$，可使贡献 $(A_j+B_i-M)$ 最小。
* 若无法进位，只能选剩余最小的 $A_j$，贡献为 $A_j+B_i(<M)$。

这些选择对每个 $B_i$ 独立成立，故可用贪心逐一匹配。

## ac code
~~~cpp
LL n, m;
void solve()
{
	cin >> n >> m;
    vector<LL> a(n), b(n);
    for(auto &x : a) cin >> x;
    for(auto &x : b) cin >> x;

    LL ans = 0;
    multiset<LL> st(a.begin(), a.end());
    for(int i = 0; i < n; i ++){
        LL bi = b[i];
        if(bi == 0){
            auto it = st.begin();
            ans += *it;
            st.erase(it);
            continue;
        }
        
        LL nd = m - bi;
        auto it = st.lower_bound(nd);
        if(it != st.end()){
            ans += *it + bi - m;
            st.erase(it);
        }
        else{
            auto it2 = st.begin();
            ans += *it2 + bi;
            st.erase(it2);
        }
    }
    
    cout << ans << '\n';
}
~~~

# E - Development

比较常见的最短路套路题

## 思路

设城市数为 $N$，现有道路数为 $M$，机场数随操作动态变化，坐飞机耗时固定为 $T$。

记

* $d_{ij}$：**当前**城市 $i$ 与城市 $j$ 之间仅经道路的最短路，若不可达则为 $\infty$。
* $\alpha_i$：城市 $i$ 到最近机场的最短路长，若不存在机场则为 $\infty$。

对于一对城市 $(x,y)$ 的最短旅行耗时为

$$
f(x,y)=\min\Bigl(d_{xy},\; \alpha_x + T + \alpha_y\Bigr)\,,
$$

其中第二项表示“走到最近机场→飞行→再走”的成本；若两端均无可达机场则该项为 $\infty$。
在回答 **类型 3** 查询时需计算

$$
\sum_{x=1}^{N}\sum_{y=1}^{N} f(x,y).
$$

以下给出支持三种操作的在线算法。

---

**初始化**

1. 将 $d_{ij}$ 初始化为道路边权（无边取 $\infty$）。
2. 跑一遍 Floyd

   $$
   d_{ij}=\min_{k}\bigl(d_{ik}+d_{kj}\bigr).
   $$

3. 设定拥有机场的城市集合 $\mathcal{A}$。
   计算

   $$
   \alpha_i=\min_{a\in\mathcal{A}} d_{ia}\quad(\alpha_i=\infty\ \text{若}\ \mathcal{A}=\varnothing).
   $$



**处理操作**

| 操作        | 说明         | 更新量                                                                                                                                                                      | 单次复杂度      |
| :-------- | :--------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------- |
| `1 x y t` | 新增道路       | 若 $t<d_{xy}$，令 $d_{xy}=d_{yx}=t$。随后仅以端点 $x,y$ 为**中继**更新最短路：  $d_{ij}\leftarrow\min\{d_{ij},\; d_{ix}+t+d_{yj},\; d_{iy}+t+d_{xj}\}$ 对所有 $i,j$。<br> 完成后重新计算全部 $\alpha_i$。 | $O(N^{2})$ |
| `2 x`     | 城市 $x$ 设机场 | 置 $\alpha_i\leftarrow\min(\alpha_i,d_{ix})$ 对所有 $i$。                                                                                                                     | $O(N)$     |
| `3`       | 询问总和       | 枚举所有有序对 $(i,j)$，累加  $\min(d_{ij},\alpha_i+T+\alpha_j)$。                                                                                                                  | $O(N^{2})$ |

---

* **单次操作**

  * 新增道路：$O(N^{2})$
  * 新增机场：$O(N)$
  * 查询总和：$O(N^{2})$

## ac code
~~~cpp
const LL INF = LLONG_MAX;

void solve()
{
    int n, m;
    cin >> n >> m;
    LL d[n][n];
    for(int i = 0; i < n; i ++)
        for(int j = 0; j < n; j ++)
            d[i][j] = (i == j) ? 0 : INF;
            
    for(int i = 0; i < m; i ++){
		LL a, b, c;
        cin >> a >> b >> c;
        a --; b --;
        if(c < d[a][b]){
            d[a][b] = c;
            d[b][a] = c;
        }
    }
    for(int k = 0; k < n; k ++)
        for(int i = 0; i < n; i ++)
            for(int j = 0; j < n; j ++)
                if(d[i][k] < INF && d[k][j] < INF)
                    if(d[i][k] + d[k][j] < d[i][j])
                        d[i][j] = d[i][k] + d[k][j];

    int K;
    LL val1;
    cin >> K >> val1;
    bool air[n] = {0};
    for(int i = 0; i < K; i ++){
        int cty;
        cin >> cty;
        cty --;
        air[cty] = 1;
    }
    LL val2[n];
    for(int i = 0; i < n; i ++){
        val2[i] = INF;
        for(int j = 0; j < n; j++)
            if(air[j] && d[i][j] < val2[i])
                val2[i] = d[i][j];
    }
    int Q;
    cin >> Q;
    while(Q--){
        int typ;
        cin >> typ;
        if(typ == 1){
            int x, y;
            LL t;
            cin >> x >> y >> t;
            x --; y --;
            if(t < d[x][y]){
                d[x][y] = t;
                d[y][x] = t;
                for(int r = 0; r < 2; r ++){
                    int k = (r == 0) ? x : y;
                    for(int i = 0; i < n; i ++) 
                        for(int j = 0; j < n; j++)
                            if(d[i][k] < INF && d[k][j] < INF)
                                if(d[i][k] + d[k][j] < d[i][j])
                                    d[i][j] = d[i][k] + d[k][j];
				}
                for(int i = 0; i < n; i ++){
                    val2[i] = INF;
                    for(int j = 0; j < n; j ++)
                        if(air[j] && d[i][j] < val2[i])
                            val2[i] = d[i][j];
                }
            }
        }
        else if(typ == 2){
	        int x;
	        cin >> x;
	        x --;
	        if(!air[x]){
	            air[x] = 1;
	            for(int i = 0; i < n; i ++)
	                if(d[i][x] < INF)
	                    if(d[i][x] < val2[i])
	                        val2[i] = d[i][x];
	        }
        }
        else if(typ == 3){
            LL tot = 0;
            for(int i = 0; i < n; i++) {
                for(int j = 0; j < n; j++) {
                    LL val = d[i][j];
                    if(val2[i] < INF && val2[j] < INF) {
                        LL fly = val2[i] + val1 + val2[j];
                        if(fly < val) val = fly;
                    }
                    if(val < INF) tot += val; 
                }
            }
            
            cout << tot << '\n';
        }
    }
}
~~~

# F - Paint Tree 2

## 思路
一条“操作路径”要么完全落在某个子树内，要么向上穿过父边继续延伸。
因此可在树上做分治背包。