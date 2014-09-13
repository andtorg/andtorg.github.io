---
layout: post
title: "Remove prefix from filenames"
description: ""
category: "fast-recipes"
tags: [bash, linux]
---
{% include JB/setup %}

Assume you have some files with the same prefix, e.g. “old_” and want to rename them by stripping out the prefix.

In a bash shell here’s the code to write down ($==prompt)

    $ for files in `ls old_*`
    > do
    > newfilename=`echo $files | cut -c5-`
    > mv $files $newfilename
    > done