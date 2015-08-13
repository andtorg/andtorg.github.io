---
layout: post
title: "Testing with Kettle"
description: "some experience on pdi transformation unit testing "
category: "bi"
tags: [pentaho, agile, tdd]
---
{% include JB/setup %}

## Scenario (to elaborate)
Desktop application that performs data manipulation with kettle engine. It features a lightweight gui that basically launches jobs and pass variables, plus a few 
maintenance and utility tasks.

Targets:
 * Build a robust set of automated tests executable during building phase 
 * Tests should be executed both in an isolated fashion and as suite
 * A report should be generated summing up the total number of tests, showing which one failed, like junit usually does
 * The failure of a single test should not block the following tests. It should prevent building, though.
 * Tests must be part of a maven building cycle, being this the tool of choice to support the development of this application
 * 
 
As a side note, Intellij IDEA is the companion IDE for this software: transformations and jobs are designed with Spoon, the pdi gui. All the rest is managed by the IDE.

## Testing in etl context


## Notes (to be deleted)
Appunti
prima soluzione: Job come suite runner.

PRO: 
- tutto in kettle
- facile controllo variabili

CONS:
- se un test fallisce, si blocca tutto
- diificoltà di visualizzare facilmente l'elenco test
- impossibile avere una statistica di quanti test sono eseguiti a livello di progetto: numerarli ha reso tutto più difficile