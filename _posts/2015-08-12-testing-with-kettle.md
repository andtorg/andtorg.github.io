---
layout: post
title: "Testing with Kettle"
description: "some experience on pdi transformation unit testing "
category: "bi"
tags: [pentaho, agile, tdd]
---
{% include JB/setup %}

## Scenario (to elaborate)
In the last few months I have been developing, on the behalf of a customer, the second main release of a java desktop application that performs some data manipulation using 
kettle engine. It features a lightweight gui that basically launches jobs and pass variables, plus a few maintenance and utility tasks. When I wrote the first release
I completely skipped the testing issue: the wrapping code was quite straightforward, and the transformations can be tested live using a carte istance on a production-like server.
Nonetheless, after roll-out I have endure a fair amount of bug fixing. Most of them could have been avoided with a more elaborated testing system.

Furthermore, starting the development of a second main release, I realized very soon that code breaking was all too likely. I decided then to introduce some automation 
at transformation level using kind of tdd approach with this key points: 
 * Build a robust set of automated tests executable during building phase 
 * Tests should be executed both in an isolated fashion and as suite
 * A report should be generated summing up the total number of tests, showing which one failed, like junit usually does
 * The failure of a single test should not block the following tests. It should prevent building, though.
 * Tests must be part of a maven building cycle, being this the tool of choice to support the development of this application
 
As a side note, Intellij IDEA is the companion IDE for this software: transformations and jobs are designed with Spoon, the pdi gui. All the rest is managed by the IDE.

Of course, this is not a tipical ETL scenario: there isn't any data warehouse to be built and maintained, any change data capture strategy or slowly-change dimension to accomodate.
However, the kind of tasks to accomplish were similar up to a point: setting connections, firing select statement to legacy db, transforming data according to business
rules, presenting distilled data to a third-party application.

## Testing in etl context


## Notes (to be deleted)
Esempio di carico immagini: ![My fair logo]({{ site.url }}/assets/images/andtorg.png)

Appunti
prima soluzione: Job come suite runner.

PRO: 
- tutto in kettle
- facile controllo variabili

CONS:
- se un test fallisce, si blocca tutto
- diificoltà di visualizzare facilmente l'elenco test
- impossibile avere una statistica di quanti test sono eseguiti a livello di progetto: numerarli ha reso tutto più difficile