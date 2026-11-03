---
title: "Cross-Sell Models Fail on Class Imbalance, Not on Algorithms"
description: "Swapping XGBoost for a neural net does nothing if 88% of your labels are one class. A short field note from an insurance ML project."
pubDate: 2026-01-04
category: ai-ml
tags: ["Python", "Machine Learning", "Imbalanced Data"]
minutes: 7
---

The dataset had 381,109 rows and the target was almost entirely zeros: only 12.3% of
customers had responded to a previous campaign. The first model scored 87.7% accuracy
and was, for all practical purposes, a constant predictor.

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
