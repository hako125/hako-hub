---
title: "[Rust开发AI Agent]-2- 格式化/流式输出"
description: "研究下LLM的格式化/流式输出，还有一个Deepseek的坑。"
pubDate: 2026-11-05
category: ai-agent
tags: ["Rust", "Agent"]
---

## 结构化输出

结构化输出是指让LLM的回复变成可以让程序处理的结构化语言，如json。

> 在Rust里用serde定义数据结构，schemars自动生成JSON Schema 发给LLM，返回就会直接反序列化。

