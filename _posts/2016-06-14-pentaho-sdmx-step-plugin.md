---
layout: post
title: "Pentaho SDMX Step Plugin"
description: "A step plugin to retrieve SDMX statistical timeseries through Pentaho Data Integration"
category: "bi"
tags: [pentaho, pdi, sdmx]
custom_css:
custom_js:
---
{% include JB/setup %}

## Intro
A few weeks ago, while looking for public datasets to build a [D3](https://d3js.org/) visualization on, I came across [SDMX](https://sdmx.org/)
for the first time. 

In brief, SDMX is a set of conventions some statistical institutions agree upon for sharing data across Internet, with a 
variety of scopes in mind: first and foremost to facilitate mutual comprehension and roll-up of consistent datasets, like happens, as example,
when a statistical national body needs to report data to a higher-level institution.

Besides, this technical standard allows public users to get data in a predictable format and in an automated way through the webservices, 
mostly RESTful, made available by a variety of providers like ECB, OECD, EUROSTAT. 

SDMX time series, exchanged above all in xml format (though, as it seems, json is becoming more and more common) are organized in a cube fashion, with 
attributes, namely dimensions, providing the context for time observations. The most evident strength of the model is that dimensions are concepts 
that the sdmx providers agree upon, so that they stay consistent across different time series. As a consequence, dimensions values (codes) are
a defined set as well.
 
However, I do not want to dive too much into the topic: the link provided above is the entry point to understand all the features of SDMX. Here
I would like to introduce a plugin for Pentaho Data Integration, a.k.a. kettle, acting as an input step to retrieve SDMX data.
 
## A PDI plugin
As you may know, [Pentaho Data Integration](http://community.pentaho.com/projects/data-integration/) is an amazing tool capable of ETL 
processing in a business intelligence scenario. It features a lot of useful connectors (input steps) to different datasources: databases, text files,
no-sql sources, generic webservices and so on. 

Being an open-source project, with a vibrant community and a great deal of widespread documentation, it can be easily extended with plugins loaded
at runtime, as this one. 

Pending the simplified [marketplace](http://www.pentaho.com/marketplace/) installation, the plugin can be built from source or downloaded directly
from [github](https://github.com/andtorg/sdmx-kettle) and copied to a local distribution of kettle right into /step folder.
 
The plugin is actually a wrapper around a cool open-source java [library](https://github.com/amattioc/SDMX) that greatly simplifies a lot of
tasks dealing with SDMX data: getting the available datasets (Dataflows), browsing the dimensions, retrieving time series, and so on. 
It produces a set of fields to populate the output stream for following manipulation through the other pdi steps.

A quick screencast can gives you a better idea:
<iframe width="560" height="315" src="https://www.youtube.com/embed/_l_bZTRiTNA" frameborder="0" allowfullscreen></iframe>

Basically, you first choose a Provider among those available, than browse the flows, i.e. the datasets, disseminated by the chosen provider. 
Under the hood, the plugin contacts the provider's webservice endpoint (thanks to the connector library mentioned above). Once a dataflow is chosen,
you will get the dataset analytical dimensions. For each dimension, you can click on the name and look through the appropriate codes to refine
your query, like writing a sql where clause.

Anytime, you can inspect the timeseries available, given the combinations of dimension/codes. When you are satisfied with the result, a click on 
"Get fields" button will prepare the output stream with the fields metadata. These fields will be the flow dimensions plus the time and the value
observed at each cube slice. In other words, you will end with a denormalized set of records. When done, you can attach whatever step suits you needs
and start a transformation: the stream will be populated by data dowloaded by the provider webservice.

Basically, that'all. There are a few enhancements I think I will add in next weeks, like an output field to store the query string.
Please take a bit of time to give it try and report a feedback.

Great thanks to all people that have made it possible: [Attilio Mattiocco](https://github.com/amattioc), who develops the sdmx java connector, 
and the [Pentaho](http://community.pentaho.com/) devs/community, who keep on delivering the magic.

So long for now.

