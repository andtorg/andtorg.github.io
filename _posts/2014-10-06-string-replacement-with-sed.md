---
layout: post
title: "String replacement with sed"
description: "replacing words in text files"
category: "fast-recipes"
tags: [sed, linux, pdi, pentaho]
---
{% include JB/setup %}

The following snippet from command line replaces all occurences of _oldWord_ with _brandNew_ in a file:

`sed -i 's/oldWord/brandNew/g' file.txt` 

As far as I know, the stream editor known as **sed** is the fastest tool to replace words in text files. Being a \*nix beast it can easily deal with standard input and output. This means you do not need to open files in a text editor and do some microsoftish copy/paste.

This is hugely cool both when you have a large file and when you should change a lot of files at the same time. A wildcard \* let you do the replacement for all the files in the same folder.

I have recently used it while doing a database migration with [Pentaho Data Integration](http://community.pentaho.com/projects/data-integration/), the amazing open source tool for extraction transform and load (ETL).

As it happens, PDI offers a handy wizard for migrating a whole database. It works by getting source tables metadata, generating the create statements into destination db and automagically devising a job with all the transformations needed to populate from source to destination tables.

When moving data among different database engines you can easily come across an unsupported datatype. In such a case, pdi set the type to **UNKNOWN**. In my case (informix -> mysql) all these unknowns can be translated to DATETIME. As pdi saves all metadata in plain xml (being a metadata-driven tool), I was able to use sed without open the transformations.Really a huge time saving.

By the way, I also changed in the same way the default commit size from 100 to 1000.       
