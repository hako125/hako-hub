---
title: "[Rust开发AI Agent] 如何接入LLM"
description: "使用Rust接入LLM，以及接入时的一些常见坑点"
pubDate: 2026-11-04
category: ai-agent
tags: ["Rust", "Agent"]
---

> 参考视频：https://www.bilibili.com/video/BV1dyjL6LE7B?spm_id_from=333.788.videopod.sections&vd_source=29318665ff9f1884a88ad866a2912804

## Accuracy is the wrong dashboard

On a 12% positive rate, predicting "no" for every row gets you 88%. So the first
thing to change is the metric, not the model.

- **ROC AUC** — decent ranking signal, but optimistic under heavy imbalance.
- **PR AUC** — much more honest, because it ignores the true negatives you get for free.
- **Recall at fixed precision** — what the business actually buys: "of 1,000 calls, how
  many are real leads?"

## Class weights before architecture

Before touching the model, weight the loss by inverse frequency. In scikit-learn that
is a single argument, and it moved recall@P=0.5 from 0.19 to 0.61.

```python
from sklearn.ensemble import HistGradientBoostingClassifier
from sklearn.metrics import precision_recall_curve

model = HistGradientBoostingClassifier(
    class_weight="balanced",
    max_iter=400,
    learning_rate=0.05,
)
model.fit(X_train, y_train)

precision, recall, _ = precision_recall_curve(y_test, model.predict_proba(X_test)[:, 1])
```

## The feature that mattered

`Previously_Insured` alone explained a huge chunk of the variance: an existing
policyholder almost never converts to a cross-sell. Removing it dropped PR AUC by
0.14. That is not a modelling win — it is a *business* signal, and it belongs in the
feature, not in the hyperparameters.

## What I would do differently

1. Set up a PR-AUC baseline in the first hour, not the second week.
2. Stratify the split explicitly; a random split on imbalanced data drifts.
3. Report a confusion matrix at the operating threshold, not at 0.5.

The final model was a gradient-boosted tree with balanced weights, and it beat every
neural configuration I tried — by a margin that was mostly explained by not
overfitting to noise in the minority class.
