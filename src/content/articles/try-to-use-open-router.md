---
title: "尝试一下Open Router"
description: "Open Router是一个统一API网关，兼容各种API标准，简单用一下"
pubDate: 2026-11-05
category: ai-agent
tags: ["Agent"]
---

LLM的api有各种规范，比如Open AI格式和Anthropic格式。

Open Router 对api格式进行了统一，通过这个网关，我们不需要在意用的是哪种格式的api。

使用Open Router 只需要配置Open Router的base url和api key，然后在发送请求时直接传入对应的模型名称就可以了

文档： https://openrouter.ai/docs/quickstart#using-the-openai-sdk