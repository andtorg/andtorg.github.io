---
layout: post
title: "A simple python web server"
description: ""
category: "fast-recipes"
tags: [linux, python, ubuntu]
---
{% include JB/setup %}


Ubuntu (like other distros) is shipped with a python webserver, very useful to create a fast environment for test and dev purposes, without bothering with a full Apache setup.

Create a folder and save an index.html within it.

Then in the shell, cd and digit:

    $ python -m SimpleHTTPServer

This will start a webserver listening on port 8000.

Cool, isn’t it?