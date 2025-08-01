+++
title = 'C/C++项目合集'
date = 2025-07-22T15:09:37+08:00
draft = false
tags = []
categories = ["面试"]
author = "forsythia"
+++

**这篇文章将主要收录做过的c/cpp项目，项目源码存放于GitHub**

---

# 高性能 C++ Web 服务器项目

2025.4 ~ 2025.5

**https://github.com/F0rsyth1a/TinyWebServer**

---
 
基于 C++11 的 Linux 多线程高并发 Web 轻量级服务器，具备完整的 HTTP 请求解析、连接管理、事件驱动机制、数据库操作与日志功能，适用于高性能、低延迟网络服务场景。

**技术栈：**

- **并发模型：** 自定义线程池 + epoll(实现 ET/LT) + 半同步/半反应堆模拟 Proactor 模式
- **定时器机制：** 手写最小堆 + 哈希表映射实现的连接定时管理
- **数据库：** 使用数据库连接池避免频繁创建连接
- **后端逻辑：** 使用状态机解析 HTTP 请求报文，实现 GET 和 POST 请求
- **日志系统：** 实现同步/异步日志模块，支持高频日志写入

**项目亮点：**

- 支持万级并发客户端接入；
- 设计并实现了完整的线程池/数据库连接池，复用机制提升服务器并发性能；
- 构建自定义定时器模块，性能优异；
- 利用 epoll ET 模式和非阻塞套接字处理大并发客户端连接，提升响应速度；
- 支持同步/异步日志记录，便于故障定位与性能调优；
- 模块化设计，网络通信、线程管理、定时器、日志与数据库等组件均解耦易扩展。
- 完善的错误处理机制与日志追踪能力。
