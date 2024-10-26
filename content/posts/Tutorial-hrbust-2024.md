+++
title = '2024哈尔滨理工大学计算机科学与技术学院程序设计竞赛题解'
date = 2024-10-24T10:10:02+08:00
draft = false
tags = ["题解"]
categories = ["题解"]
author = "Forsythia"
+++
  
所有代码：https://wwed.lanzout.com/i6gso2d8axgd

# A. 干杯！
> 字符串，签到

## ac code
```cpp
#include<iostream>
#include<cstdlib>
#include<cstring>
#include<set>
using namespace std;

string s;
void solve()
{
    getline(cin, s);
    set<char> st;
    for(auto ch : s)
        if(isalpha(ch)) st.insert(ch);
    cout << st.size();
}
int main()
{
    ios::sync_with_stdio(false); cin.tie(0); cout.tie(0);
    int Case = 1;
    //cin >> Case;
    while(Case --) solve();
    return 0;
}
```
# B. 墨墨的妙妙卡片
> 思维，签到

只要有一个卡片的初始位置正确就能一次完成排序。
## ac code
```cpp
string s;
void solve()
{
    cin >> s;
    cout << (s[0] == 'a' || s[1] == 'b' || s[2] == 'c' ? "YES" : "NO") << '\n';
}
```
# C. 墨墨与春日影
> 思维，签到

可以把演奏2分钟视为演奏2次1分钟，3分钟视为演奏3次1分钟。看是否能把所有演出平均分配到两次即可。
## ac code
```cpp
int a, b, c;
void solve()
{
    cin >> a >> b >> c;
    cout << (a + b * 2 + c * 3 & 1) << '\n';
}
```
# D. 时间管理
> 暴力

发现n<=20，枚举每一种分配方法复杂度为o($2^n$)。  
枚举分配方法可以用二进制位掩码。
## ac code
```cpp
#include<iostream>
using namespace std;
using LL = long long;

int n, k[25];
void solve()
{
    cin >> n;
    for(int i = 0; i < n; i ++) cin >> k[i];
    LL a, b, ans = 1e18;
    for(LL state = 0; state < 1LL << n; state ++){
        a = 0, b = 0;
        for(int i = 0; i < n; i ++)
            if(state >> i & 1) a += k[i];
            else b += k[i];
        ans = min(ans, max(a, b));
    }
    cout << ans;
}
int main()
{
    ios::sync_with_stdio(false); cin.tie(0); cout.tie(0);
    solve();
    return 0;
}
```
# E. HRBUST
> 字符串，签到

## ac code
```cpp
string s;
void solve()
{
    cin >> s;
    int ans = 0;
    for(int i = 0; i + 5 < s.size(); i ++)
        if(s[i] == 'H' && s[i + 1] == 'R' && s[i + 2] == 'B' && s[i + 3] == 'U' && s[i + 4] == 'S' && s[i + 5] == 'T')
            ans ++;
    cout << ans;
}
```
# F. 向左看"齐“
> 单调栈

维护一个单调递减的栈，栈顶即左边第一个小于的数。
## ac code
```cpp
#include<iostream>
#include<algorithm>
#include<stack>
using namespace std;
using LL = long long;
using ULL = unsigned long long;
using PII = pair<int, int>;
using PLL = pair<LL, LL>;
#define lowbit(x) (x&-x)
#define fi first
#define se second

const int N = 1e5 + 10;
int n;
void solve()
{
    cin >> n;
    stack<int> st;
    for(int i = 1, h; i <= n; i ++){
        cin >> h;
        while(st.size() && st.top() >= h) st.pop();
        if(st.empty()) cout << -1 << ' ';
        else cout << st.top() << ' ';
        st.push(h);
    }
}
int main()
{
    ios::sync_with_stdio(false); cin.tie(0); cout.tie(0);
    int Case = 1;
    //cin >> Case;
    while(Case --) solve();
    return 0;
}
```
# G. 复制粘贴吧的暴力排序
> 排序

排序后去重，可以使用unique函数等。 
## ac code
```cpp
#include<iostream>
#include<algorithm>
using namespace std;
using LL = long long;
using ULL = unsigned long long;
using PII = pair<int, int>;
using PLL = pair<LL, LL>;
#define lowbit(x) (x&-x)
#define fi first
#define se second

const int N = 1e7 + 10;
int n;
vector<int> a;
void solve()
{
    cin >> n;
    for(int i = 0, x; i < n; i ++) cin >> x, a.push_back(x);
    sort(a.begin(), a.end(), greater<int>());
    a.erase(unique(a.begin(), a.end()), a.end());
    for(auto x : a) cout << x << ' ';
}
int main()
{
    ios::sync_with_stdio(false); cin.tie(0); cout.tie(0);
    int Case = 1;
    //cin >> Case;
    while(Case --) solve();
    return 0;
}
```
# H. 救赎之道，不在其中
> 数学，快速幂

所有可能的情况一共$m^n$种，每一个犯人可信仰有m种情况，无法越狱的情况为两两相邻
$$(m - 1)^{n-1}$$
所以会发生越狱的情况即为
$$m^n - (m - 1)^{n-1} * m$$
数字较大，需要使用模下快速幂。
## ac code
```cpp
#include<iostream>
#include<algorithm>
using namespace std;
using LL = long long;
using ULL = unsigned long long;
using PII = pair<int, int>;
using PLL = pair<LL, LL>;
#define lowbit(x) (x&-x)
#define fi first
#define se second

const int MOD = 100003;
LL qpow(LL a, LL n)
{
    LL ret = 1;
    while(n){
        if(n & 1) ret = ret * a % MOD;
        a = a * a % MOD;
        n >>= 1;
    }
    return ret;
}
LL n, m;
void solve()
{
    cin >> m >> n;
    LL ans = (qpow(m, n) - qpow(m - 1, n - 1) * m % MOD + MOD) % MOD;
    cout << ans;
}
int main()
{
    ios::sync_with_stdio(false); cin.tie(0); cout.tie(0);
    int Case = 1;
    //cin >> Case;
    while(Case --) solve();
    return 0;
}
```
# I. 我们来玩游戏吧
> 数据结构

需要维护一种数据结构，支持：区间修改，区间查询。  
可以选择树状数组，线段树等，复杂度o(mlogn)。
## ac code
```cpp
#include<iostream>
#include<algorithm>
using namespace std;
using LL = long long;
using ULL = unsigned long long;
using PII = pair<int, int>;
using PLL = pair<LL, LL>;
#define lowbit(x) (x&-x)
#define fi first
#define se second

const int N = 1e5;
int n, m;
LL s1[N], s2[N];
void add(int x, int k)
{
    for(int i = x; i <= n; i += lowbit(i)) s1[i] += k, s2[i] += x * k;
}
LL query(int x)
{
    LL ret = 0;
    for(int i = x; i; i -= lowbit(i)) ret += (x + 1) * s1[i] - s2[i];
    return ret;
}
void solve()
{
    cin >> n >> m;
    for(int i = 1, x; i <= n; i ++) cin >> x, add(i, x), add(i + 1, -x);
    while(m --){
        int op, l, r, k;
        cin >> op >> l >> r;
        if(op == 1) cin >> k, add(l, k), add(r + 1, -k);
        else cout << query(r) - query(l - 1) << '\n';
    }
}
int main()
{
    ios::sync_with_stdio(false); cin.tie(0); cout.tie(0);
    int Case = 1;
    //cin >> Case;
    while(Case --) solve();
    return 0;
}
```
# J. 再见啦!
> 线性dp 

dp经典题。  
先考虑一个人的情况，因为每次只能向右或向下，转移dp(i, j) = max(dp(i - 1, j), dp(i, j - 1))  
因为答案要在全局最优，所以不能分成两次去走。我们考虑两人一起走，dp(x1, y1, x2, y2)，可以优化状态数：  
因为只能向右或向下，每次移动后x1 + y1 = x2 + y2 = k <= 2 * n  
于是有dp(k, x1, x2)，y1 = k - x1, y2 = k - x2  
两人将组合出4种转移。  
复杂度o($n^3$)  
## ac code
```cpp
#include<iostream>
#include<algorithm>
using namespace std;
using LL = long long;
using ULL = unsigned long long;
using PII = pair<int, int>;
using PLL = pair<LL, LL>;
#define lowbit(x) (x&-x)
#define fi first
#define se second

int n, g[30][30], dp[30][30][30];
void solve()
{
    cin >> n;
    int x, y, w;
    while(cin >> x >> y >> w, ~x && ~y && ~w) g[x][y] = w;
    for(int k = 2; k <= n << 1; k ++)
        for(int x1 = 1; x1 <= n; x1 ++)
            for(int x2 = 1; x2 <= n; x2 ++){
                int y1 = k - x1, y2 = k - x2;
                if(y1 < 1 || y1 > n || y2 < 1 || y2 > n) continue;
                int &t = dp[k][x1][x2];
                int v = g[x1][y1] + (x1 == x2 ? 0 : g[x2][y2]);
                
                t = max(t, max({dp[k - 1][x1 - 1][x2], 
                                dp[k - 1][x1][x2 - 1],
                                dp[k - 1][x1 - 1][x2 - 1],
                                dp[k - 1][x1][x2]}) + v);
            }
    cout << dp[n << 1][n][n];
}
int main()
{
    ios::sync_with_stdio(false); cin.tie(0); cout.tie(0);
    int Case = 1;
    //cin >> Case;
    while(Case --) solve();
    return 0;
}
```
# K. 墨墨想要去玩
> 排序，枚举

分别对a，b，c数组排序，枚举前三大的所有组合，两两间的日期不能相同。
## ac code
```cpp
#include<iostream>
#include<algorithm>
using namespace std;
using LL = long long;
using ULL = unsigned long long;
using PII = pair<int, int>;
using PLL = pair<LL, LL>;
#define lowbit(x) (x&-x)
#define fi first
#define se second

const int N = 1e6 + 10;
int n;
PII t[3][N];
void solve()
{
    cin >> n;
    for(int i = 0; i < 3; i ++){
        for(int j = 1; j <= n; j ++) cin >> t[i][j].fi, t[i][j].se = j;
        sort(t[i] + 1, t[i] + n + 1, greater<PII>());
    }
    int ans = 0;
    for(int i = 1; i <= 3; i ++)
        for(int j = 1; j <= 3; j ++)
            for(int k = 1; k <= 3; k ++){
                auto [a, at] = t[0][i];
                auto [b, bt] = t[1][j];
                auto [c, ct] = t[2][k];
                if(at == bt || bt == ct || at == ct) continue;
                ans = max(ans, a + b + c);
            }
    cout << ans << '\n';
}
int main()
{
    ios::sync_with_stdio(false); cin.tie(0); cout.tie(0);
    int Case = 1;
    cin >> Case;
    while(Case --) solve();
    return 0;
}
```
# L. 走格子
> bfs

## ac code
```cpp
#include<iostream>
#include<algorithm>
#include<queue>
using namespace std;
using LL = long long;
using ULL = unsigned long long;
using PII = pair<int, int>;
using PLL = pair<LL, LL>;
#define lowbit(x) (x&-x)
#define fi first
#define se second

int n, m, g[110][110], vis[110][110];
int dx[] = {-1, 0, 1, 0}, dy[] = {0, 1, 0, -1};
struct node
{
    int x, y, dis;
};
void solve()
{
    cin >> n >> m;
    for(int i = 1; i <= n; i ++)
        for(int j = 1; j <= m; j ++) cin >> g[i][j];
    if(g[1][1] == 3){
        cout << 0;
        return ;
    }
    queue<node> q;
    q.push({1, 1, 0});
    vis[1][1] = 1;
    while(q.size()){
        auto [x, y, dis] = q.front();
        q.pop();
        vis[x][y] = 1;
        for(int i = 0, xx, yy; i < 4; i ++){
            xx = dx[i] + x, yy = dy[i] + y;
            if(xx < 1 || xx > n || yy < 1 || yy > m) continue;
            if(g[xx][yy] == 2 || vis[xx][yy]) continue;
            if(g[xx][yy] == 3){
                cout << "Yes " << dis + 1;
                return ;
            }
            q.push({xx, yy, dis + 1});
            vis[xx][yy] = 1;
        }
    }
    cout << "No";
}
int main()
{
    ios::sync_with_stdio(false); cin.tie(0); cout.tie(0);
    int Case = 1;
    //cin >> Case;
    while(Case --) solve();
    return 0;
}
```
# M. 组建乐队
> 枚举，贪心

考虑枚举直接枚举每种价格的个数，复杂度过高。  
贪心地想，当我们拿3个1￥时，更好的方案是拿1个3￥代替，这对于3￥，6￥，10￥来说是一样的。每层循环不会超过2。
## ac code
```cpp
#include<iostream>
using namespace std;
using LL = long long;

void solve()
{
    int n; cin >> n;
    int ans = 2e9;
    for(int i1 = 0; i1 <= 2; i1 ++)
        for(int i3 = 0; i3 <= 1; i3 ++)
            for(int i6 = 0; i6 <= 2; i6 ++)
                for(int i10 = 0; i10 <= 2; i10 ++){
                    int x = i1 + i3 * 3 + i6 * 6 + i10 * 10;
                    int t = i1 + i3 + i6 + i10 + (n - x) / 15;
                    if(x <= n && !((n - x) % 15))
                        ans = min(ans, t);
                }
    cout << ans << '\n';
}
int main()
{
    ios::sync_with_stdio(false); cin.tie(0); cout.tie(0);
    int Case; cin >> Case;
    while(Case --) solve();
    return 0;
}
```
# N. 进击的败犬
> 二分

二分经典题进击的奶牛。
## ac code
```cpp
#include<iostream>
#include<algorithm>
using namespace std;
using LL = long long;
using ULL = unsigned long long;
using PII = pair<int, int>;
using PLL = pair<LL, LL>;
#define lowbit(x) (x&-x)
#define fi first
#define se second

const int N = 1e5 + 10;
int n, c, a[N];
bool check(int x)
{
    int cnt = 1;
    for(int i = 1, last = a[1]; i <= n; i ++)
        if(a[i] - last >= x) cnt ++, last = a[i];
    return cnt >= c;
}
void solve()
{
    cin >> n >> c;
    for(int i = 1; i <= n; i ++) cin >> a[i];
    sort(a + 1, a + n + 1);
    int l = 1, r = 1e9 + 10;
    while(l < r){
        int mid = l + r + 1 >> 1;
        if(check(mid)) l = mid;
        else r = mid - 1;
    }
    cout << l;
}
int main()
{
    ios::sync_with_stdio(false); cin.tie(0); cout.tie(0);
    int Case = 1;
    //cin >> Case;
    while(Case --) solve();
    return 0;
}
```
# O. 妮蔻的MAJOR梦
> dfs

如果在非初始地图中，访问到在初始地图访问过的点，即为开放图。  
可以维护vis(x, y, 0) : 初始地图是否访问过，vis(x, y, 1)/vis(x, y, 2) : 非初始地图的对应x/y坐标。  
## ac code
```cpp
#include<iostream>
#include<algorithm>
#include<cstring>
using namespace std;
using LL = long long;
using ULL = unsigned long long;
using PII = pair<int, int>;
using PLL = pair<LL, LL>;
#define lowbit(x) (x&-x)
#define fi first
#define se second

int n, m, vis[1510][1510][3];
int dx[] = {-1, 0, 1, 0}, dy[] = {0, 1, 0, -1};
string g[1510];
bool ok;
void dfs(int x, int y, int lx, int ly)
{
    if(ok) return ;
    if(vis[x][y][0] && (vis[x][y][1] != lx || vis[x][y][2] != ly)){
        ok = 1;
        return ;
    }
    vis[x][y][1] = lx, vis[x][y][2] = ly, vis[x][y][0] = 1;
    for(int i = 0; i < 4; i ++) {
        int xx = (x + dx[i] + n) % n, yy = (y + dy[i] + m) % m;
        int lxx = lx + dx[i], lyy = ly + dy[i];
        if(g[xx][yy] == '#') continue;

        if(vis[xx][yy][1] != lxx || vis[xx][yy][2] != lyy || !vis[xx][yy][0])
            dfs(xx, yy, lxx, lyy);
    }
}
void solve()
{
    memset(vis, 0, sizeof vis);
    ok = 0;
    PII S;
    for(int i = 0; i < n; i ++){
        cin >> g[i];
        for(int j = 0; j < m; j ++)
            if(g[i][j] == 'S') S = {i, j};
    }
    dfs(S.fi, S.se, S.fi, S.se);
    cout << (ok ? "Yes" : "No") << '\n';
}
int main()
{
    ios::sync_with_stdio(false); cin.tie(0); cout.tie(0);
    int Case = 1;
    //cin >> Case;
    while(cin >> n >> m) solve();
    return 0;
}
```
# P. 不给糖就捣蛋
> 二分

对边长进行二分，每次检查$\frac{w}{a} * \frac{h}{a}$是否大于等于k。
## ac code
```cpp
#include<iostream>
using namespace std;

const int N = 1e5 + 10;

pair<int, int> q[N];
int n, k;

bool check(int x)
{
    int cnt = 0;
    for(int i = 0; i < n; i ++)
        cnt += (q[i].first / x) * (q[i].second / x);
    return (cnt >= k ? 1 : 0);
}
int main()
{
    ios::sync_with_stdio(false); cin.tie(0);
    cin >> n >> k;
    for(int i = 0; i < n; i ++) cin >> q[i].first >> q[i].second;
    int l = 1, r = 1e5;
    int ans = 0;
    while(l < r){
        int mid = l + r + 1 >> 1;
        if(check(mid)) l = mid;
        else r = mid - 1;
    }
    cout << l << '\n';
    return 0;
}
```
# Q. 让我们打开天窗说亮话吧
> 图论，多源最短路

观察数据范围发现两点间最短路可以跑floyd。  
最短路中去边不好操作，考虑离线逆序处理查询，将去边变为加边。  
假设在u，v间加边。设x，y间距离原本为d(x, y),可以更新为x -> u -> v -> y，d(x, u) + w(u, v) + d(v, y)。  
题目限制操作一数量最多为300，复杂度为o($n^3$)。
## ac code
```cpp
#include<iostream>
#include<algorithm>
#include<random>
#include<cstdlib>
#include<vector>
#include<cstring>
#include<climits>
#include<cmath>
#include<map>
#include<set>
#include<queue>
#include<stack>
using namespace std;
using LL = long long;
using ULL = unsigned long long;
using PII = pair<int, int>;
using PLL = pair<LL, LL>;
#define lowbit(x) (x&-x)
#define fi first
#define se second

const int N = 310, M = N * N / 2;

int n, m, q;
LL d[N][N];
struct road
{
    int u, v, w;
}r[M];
struct query
{
    char op;
    int a, b;
};
void floyd()
{
    for(int k = 1; k <= n; k ++)
        for(int i = 1; i <= n; i ++)
            for(int j = 1; j <= n; j ++)
                d[i][j] = min(d[i][j], d[i][k] + d[k][j]);
}
void update(int u, int v)
{
    for(int i = 1; i <= n; i ++)
        for(int j = 1; j <= n; j ++)
            d[i][j] = min({d[i][j], d[i][u] + d[u][v] + d[v][j], d[i][v] + d[v][u] + d[u][j]});
}
void solve()
{
    cin >> n >> m >> q;
    for(int i = 1; i <= n; i ++)
        for(int j = 1; j <= n; j ++)
            d[i][j] = (i == j ? 0 : 1e18);
    for(int i = 1, u, v, w; i <= m; i ++)
        cin >> u >> v >> w, d[u][v] = d[v][u] = min(d[u][v], (LL)w), r[i] = {u, v, w};
    vector<query> vq;
    for(int i = 1; i <= q; i ++){
        char op; 
        int a, b = 0;
        cin >> op >> a;
        if(op == 'D'){
            auto [u, v, w] = r[a];
            d[u][v] = d[v][u] = 1e18;
        } 
        else cin >> b;
        vq.push_back({op, a, b});
    }
    floyd();
    reverse(vq.begin(), vq.end());
    vector<LL> ans;
    for(auto [op, a, b] : vq){
        if(op == 'D'){
            auto [u, v, w] = r[a];
            d[u][v] = d[v][u] = min(d[u][v], (LL)w);
            update(u, v);
            continue;
        }
        ans.push_back((d[a][b] >= 1e18 ? -1 : d[a][b]));
    }
    reverse(ans.begin(), ans.end());
    for(auto x : ans) cout << x << '\n';
}
int main()
{
    ios::sync_with_stdio(false); cin.tie(0); cout.tie(0);
    int Case = 1;
    //cin >> Case;
    while(Case --) solve();
    return 0;
}
```
# R. 关于acm竞赛中题目名字越长就越有可能是签到题这件事
> 并查集，平衡二叉树，启发式合并

需要在并查集中维护一种数据结构，支持：合并，插入，按序查询  
开n颗平衡树，对于操作1，用并查集进行合并两颗树，将小树合并至大树。  
平衡树可手写splay，使用pbds库的tree结构需要使用速度更快的rb_tree_tag。  
均摊时间复杂度o(nlongn)
## ac code
```cpp
#include<iostream>
#include<algorithm>
#include<random>
#include<cstdlib>
#include<vector>
#include<cstring>
#include<climits>
#include<cmath>
#include<map>
#include<set>
#include<queue>
#include<stack>
#include<ext/pb_ds/assoc_container.hpp>
#include<ext/pb_ds/tree_policy.hpp>
#include<ext/pb_ds/hash_policy.hpp>
#include<ext/pb_ds/trie_policy.hpp>
#include<ext/pb_ds/priority_queue.hpp>
using namespace std;
using LL = long long;
using ULL = unsigned long long;
using PII = pair<int, int>;
#define lowbit(x) (x&-x)
#define first fi
#define second se

const int N = 2e5 + 10;
int n, q;
__gnu_pbds::tree<int, 
__gnu_pbds::null_type, 
greater<int>, 
__gnu_pbds::rb_tree_tag, 
__gnu_pbds::tree_order_statistics_node_update> st[N];
struct DSU
{
    int p[N];
    void init()
    {
        for(int i = 0; i <= n; i ++) p[i] = i;
    }
    int find(int x)
    {
        return p[x] == x ? x : (p[x] = find(p[x]));
    }
    void merge(int a, int b)
    {
        int fa = find(a), fb = find(b);
        if(fa == fb) return ;
        if(st[fa].size() > st[fb].size()) swap(fa, fb);
        p[fa] = fb;
        for(auto x : st[fa]) st[fb].insert(x);
        st[fa].clear();
    }
}dsu;
void solve()
{
    cin >> n >> q;
    dsu.init();
    for(int i = 1; i <= n; i ++) st[i].insert(i);
    while(q --){
        char op;
        int n1, n2;
        cin >> op >> n1 >> n2;
        if(op == 'C') dsu.merge(n1, n2);
        else{
            n1 = dsu.find(n1);
            cout << (st[n1].size() >= n2 ? *st[n1].find_by_order(n2 - 1) : -1) << '\n';
        }
    }
}
int main()
{
    ios::sync_with_stdio(false); cin.tie(0); cout.tie(0);
    int Case = 1;
    //cin >> Case;
    while(Case --) solve();
    return 0;
}
```