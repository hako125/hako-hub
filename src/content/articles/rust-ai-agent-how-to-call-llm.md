---
title: "[Rust开发AI Agent]-1- 接入LLM"
description: "使用Rust接入LLM，以及接入时的一些思考"
pubDate: 2026-11-04
category: ai-agent
tags: ["Rust", "Agent"]
---

> 参考视频：https://www.bilibili.com/video/BV1dyjL6LE7B?spm_id_from=333.788.videopod.sections&vd_source=29318665ff9f1884a88ad866a2912804

## 用到的lib

核心： async-openai

```toml
anyhow = "1.0.104"
async-openai = { version = "0.42.2", features = ["chat-completion"] }
dotenvy = "0.15.7"
schemars = "1.2.3"
serde = { version = "1.0.229", features = ["derive"] }
serde_json = "1.0.154"
tokio = { version = "1.54.1", features = ["full"] }
tracing = "0.1.44"
tracing-subscriber = "0.3.23"
```

## 步骤

### 1. 配置base url和api key

- base url有OpenAI/Anthropic两种格式，对应的链接可以到对应LLM的文档去查询，比如我这里用的是DS的OpenAI格式 API https://api-docs.deepseek.com/zh-cn/。
- api key需要到LLM平台进行购买申请 (不能暴露!)

这里我将相关配置写到.env文件中，并添加到.gitignore中

```plain
OPENAI_BASE_URL=https://api.deepseek.com
OPENAI_API_KEY=xxxxxxxxxxxxxxxxxxx
```

rust中可以用**dotenvy**这个crate来读取.env文件中的内容并加载到环境变量中， 后续用async-openai这个crate来操作的时候会自动读取对应的值（要注意环境变量的名字不能写错了，OPENAI_BASE_URL和OPENAI_API_KEY是定死的）

### 2. 构造提示词

对于LLM，提示词并不是一段普通的字符串，还包含 role, name等信息。

```json
{ "role": "system",    "content": "你是一名全能助手" },
{ "role": "user",      "content": "今晚吃什么？" },
```

系统提示词（给LLM定一个设定），用户提示词（用户的真实诉求）

- ChatCompletionRequestSystemMessageArgs：构造系统提示词
- ChatCompletionRequestUserMessageArgs：构造用户提示词

构建提示词的步骤：

```rust
ChatCompletionRequestSystemMessageArgs::default()  // 创建构建器
    .content("你是一个全能助手")  // 设置提示词内容
    .build()?           // 构建
    .into(),      // 转换
```

> 这个构造过程，采用了构建器设计模式，为什么这么设计可以了解一下这个设计模式（简单来说就是可以解决可选参数很多的时候的一些麻烦）

### 3. 构造请求体

使用 **CreateChatCompletionRequestArgs** 来构建请求体

```rust
let request = CreateChatCompletionRequestArgs::default()  // 创建构建器
        .model("deepseek-flash")   // 模型名称
        .messages(messages)   // 提示词列表
        .max_tokens(2048u32)   // （可选） 返回最大token数
        .build()?;    // 构建
```

### 4. 创建api client 发送请求调用LLM

```rust
let client = async_openai::Client::new();  // 创建client，这一步会自动读取环境变量

let response = client.chat().create(request).await?;  // 发送请求
```

- Client::new()： 创建api client的默认构造函数。
- client.chat():  获取 Chat Completions API
- create()：执行Chat Completions API的请求创建操作

### 5. 处理response

至此便是调用LLM的一个完整的步骤， 最后处理response的方式很多， 下面是其中一种:

```rust
let content = response
        .choices
        .into_iter()
        .next()
        .and_then(|c| c.message.content)
        .ok_or_else(|| anyhow::anyhow!("No Content in response"))?;
```

## 一些思考


**初次体验时，发现async-openai这个crate完成一个环节，所需要的调用的函数很多，有些反直觉**

这一点首先体现在使用构建器设计模式，如：构建提示词和请求体的环节。

了解了一下是这些结构可选的属性非常之多，但是必要的只有几个。 因此构造结构涉及了 传参以及参数校验问题。采用构建器可以更优雅的设置属性，并且把校验的环节抽取到了build()中也达到了解耦。而且还更有函数式编程的味道了，我个人还挺喜欢这个设计。

然后则体现在发送请求时先调用chat()再调用create()

后面了解到这是一个分组的概念。client下面不只有chat api 还有其他api，chat()这一步相当于获取分组。

## 代码

