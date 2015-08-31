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
Nonetheless, after roll-out I have endured a fair amount of bug fixing. Most of them could have been avoided with a more elaborated testing system.

Furthermore, starting the development of a second main release, I realized very soon that code breaking was all too likely. I decided then to introduce some automation.
at transformation level using kind of tdd approach with this key points in mind: 
 * Build a robust set of automated tests executable during building phase 
 * Tests should be executed both in an isolated fashion and as suite
 * A report should be generated summing up the total number of tests, showing which one failed, like junit usually does
 * The failure of a single test should not block the following tests. It should prevent building, though.
 * Tests must be part of a maven building cycle, being this the tool of choice to support the development of this application
 
As a side note, Intellij IDEA is the companion IDE for this software: transformations and jobs are designed with Spoon, the pdi gui. All the rest is managed by the IDE.

Of course, this is not a typical ETL scenario: there isn't any data warehouse to be built and maintained, any change data capture strategy or slowly-change dimension to accomodate.
However, the kind of tasks to accomplish were similar up to a point: setting connections, firing select statement to legacy db, transforming data according to business
rules, presenting distilled data to a third-party application.

I think that I still haven't got to the ending point of this approach but something is already clear and I would like to share it.

## Testing in etl context
A note to be thought about is that the concept of unit testing in an ETL environment is quite disguising. According to a general accepted mindset, unit tests happen at a very low 
level in software development. Typically a class method is something to write test about. Provided a well-written class (single responsability, design patterns, 
dependency injections and the likes) unit tests allow isolated checks. In ETL, on the contrary, you deal with complex transformations that manipulate an input data set to get an
output. We are normally far above one single class abstraction level. In Pentaho Data Integration a transformation is an ordered sequence of steps, each affecting the stream of
data in a specific way. From an internal point of view, a step is composed by a few classes, so the steps are the proper subjects for a unit test approach and actually
these tests are run when you build pdi from  source. No need for them in a solution development, then.

In pentaho forums and within the community, the test topic has been risen several times. There are already a lot of ideas coming from blog posts and there is also a very promising approach
consisting of building test dataset right into Spoon gui (ADD REFERENCE).
 
All this ideas and projects converge to a same point: transformation test requires a black box method. In other words you should write a golden data set, i.e. the data you would get as the output 
 of a trans, and the input data sets. Each test is successful if the output is equal to the golden one. So, at some point you should decorate your original transformation with a comparison.

I followed this approach, too. 

## What is in a test?
Whatever the thing to test or the used framework, writing a test always involved a setup of some fixtures, test execution, cleaning up. In other words you put the system
in a known state, execute the code, get the result (success or failure), clean up (tear down) the state. Pdi provides the user with all the tools
needed to write a job that acts as a test runner. From a functional point of view, you will have five kinds of entries: 
 * entries to create the storage medium needed: either database tables or files
 * entries to populate the storage: here you upload both the input data and the golden data
 * the transformation to be tested
 * transformations that compare golden and output data
 * entries to clean temp files or tables

I will try and touch all these points going depper here and there to show how useful pdi can be.

## Tables and connections
In a typical scenario you have two kinds of tables: source and target. The problem lays on the fact that you normally don't develop etl in a production-like environment.
So you won't probably have a source and a target database exactly equal to what your solution will deal with in prod. You may think that there is no need to stretch the tests
up to this point. For instance, using the concept of **result** as in [copy-rows-to-result step](http://wiki.pentaho.com/display/EAI/Copy+rows+to+result),
you can pass rows from a trans to another. So, you can avoid write a test to fire queries to a db and only check what happens in the middle: in fact you would test only the **T** 
in ETL.

In my opinion, however, testing queries can be valuable to better understand what you want, as often happens in a test-driven-development (tdd) approach. Furthermore it forces
you to put sql script under version control and keep them in sync with test code.

But how you can reproduce a source database? The answer is **simple-jndi**. 


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