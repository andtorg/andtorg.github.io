---
layout: post
title: "Split a mysql dump file"
description: ""
category: "fast-recipes"
tags: [sed, mysql]
custom_css:
custom_js:
---
{% include JB/setup %}

As an ETL developer, or a common unlucky consultant, I usually face awful source database with poor documentation. Sometimes, things get even
worse like when a giant unknown mysql dump is provided both for profiling reason and (worse and worse) for production flow.

Yesterday was one of these day. I was loading this 770MB sql file that was growing towards 1.5gb once indexes were taken into account. It contained a
lot of useless data about application sessions, cache, blob images and so on. I thought that a better way to manage this file, above all in
the future dev/prod stages must exists, and then I assembled this small script using sed. 
Nothing new, of course: the internet is already full of magic. Nonetheless, I want to share this couple of lines of sed/bash trick, hoping some other 
developers can find it useful:

    for i in `sed -n -e 's/CREATE TABLE \`\(.*\)\`.*$/\1/p' dump.sql`; do 
      echo $i; sed -n -e "/Table structure for.*\`$i\`/,/Table structure for/p" dump.sql > $i.txt; 
    done;

Now you have a single text file for each table in the database dump for both a more suitable analysis and an easier ETL design.

That's all, folks!

